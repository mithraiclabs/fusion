import { AnchorProvider, BN } from "@project-serum/anchor";
import { makeSaberProvider } from "@saberhq/anchor-contrib";
import {
  TOKEN_PROGRAM_ID,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token2";
import { utils, MerkleDistributorSDK } from "@saberhq/merkle-distributor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useShowSnackBar } from "../context/SnackBarContext";
import {
  airDropTokenAmount,
  builderOptionMintKey,
  optionMarketKeyForMinting,
  projectInfo,
  recipientJson,
} from "../recoil/util";
import { usePsyAmericanProgram } from "./usePsyAmericanProgram";
import { pushDistributorInfo } from "../api";
import { networkAtom } from "../recoil";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const useCreateDistributor = () => {
  const program = usePsyAmericanProgram();
  const { publicKey, signTransaction } = useWallet();
  const showMessage = useShowSnackBar();
  const provider = program.provider as AnchorProvider;
  const newProvider = makeSaberProvider(provider);
  const sdk = MerkleDistributorSDK.load({ provider: newProvider });
  const _projectInfo = useRecoilValue(projectInfo);
  const selectedJson = useRecoilValue(recipientJson);
  const network = useRecoilValue(networkAtom);
  const optionMarketKey = useRecoilValue(optionMarketKeyForMinting);
  const totalOptions =
    useRecoilValue(airDropTokenAmount) /
    (_projectInfo?.underlyingPerContract ?? 1);
  const optionTokenMint = useRecoilValue(builderOptionMintKey);
  const { connection } = useConnection();
  return useCallback(async () => {
    if (!publicKey || !signTransaction) {
      throw new Error("Wallet must be connected");
    }
    if (!optionTokenMint) {
      throw new Error("option token mint not found");
    }
    const balanceMap: { [authority: string]: BN } = {};
    selectedJson?.recipientList.forEach(
      ({ recipient, amount }: { recipient: string; amount: string }) => {
        const prevBalance = balanceMap[recipient];
        if (prevBalance) {
          balanceMap[recipient] = prevBalance.add(new BN(Number(amount)));
        } else {
          balanceMap[recipient] = new BN(amount);
        }
      }
    );

    const { claims, merkleRoot } = utils.parseBalanceMap(
      Object.entries(balanceMap).map(([authority, amount]) => ({
        address: authority,
        earnings: amount.toString(),
      }))
    );

    try {
      const pendingDistributor = await sdk.createDistributor({
        root: merkleRoot,
        maxTotalClaim: new BN(totalOptions),
        maxNumNodes: new BN(Object.keys(claims).length),
        tokenMint: optionTokenMint,
      });
      const { tx, ...distributorInfo } = pendingDistributor;
      const pendingTx = await tx.send();
      const receipt = await pendingTx.wait();
      await pendingTx.confirm({});
      receipt.printLogs();
      console.log({
        bump: distributorInfo.bump,
        distributor: distributorInfo.distributor.toString(),
        distribtuorATA: distributorInfo.distributorATA.toString(),
      });
      const toTokenAccount = distributorInfo.distributorATA;

      let optionTokenAccount = await getAssociatedTokenAddress(
        optionTokenMint,
        publicKey
      );

      const sendTokenToDistributorTransaction = new Transaction().add(
        createTransferInstruction(
          optionTokenAccount,
          toTokenAccount,
          publicKey,
          Number(totalOptions.toFixed(0)), // tokens have 6 decimals of precision so your amount needs to have the same
          [],
          TOKEN_PROGRAM_ID // imported from '@solana/spl-token2'
        )
      );
      const latestBlockHash = await connection.getLatestBlockhash();
      sendTokenToDistributorTransaction.feePayer = publicKey;
      sendTokenToDistributorTransaction.recentBlockhash =
        latestBlockHash.blockhash;
      const signed = await signTransaction(sendTokenToDistributorTransaction);
      // send the signed transaction
      const signature = await connection.sendRawTransaction(signed.serialize());
      showMessage("Success: distributor created", signature);
      const serverUpdated = await pushDistributorInfo({
        distributorAddress: distributorInfo.distributor.toString(),
        creatorWallet: publicKey.toString(),
        optionMarketKey: optionMarketKey?.toString() ?? "",
        optionTokenQty: totalOptions,
        description: _projectInfo?.description ?? "no description",
        isMainnet: network.key === WalletAdapterNetwork.Mainnet,
        recipients: selectedJson?.recipientList ?? [],
      });
      return {
        distributorAddress: distributorInfo.distributor,
        serverUpdated,
      };
    } catch (error: any) {
      console.log({ error, st: error.stack });
      showMessage("something went wrong, please try again");
      return {
        distributorAddress: null,
        serverUpdated: false,
      };
    }
  }, [
    publicKey,
    connection,
    totalOptions,
    optionTokenMint,
    sdk,
    selectedJson,
    _projectInfo?.description,
    network.key,
    optionMarketKey,
    signTransaction,
    showMessage,
  ]);
};
