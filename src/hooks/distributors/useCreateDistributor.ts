import { AnchorProvider, BN } from "@project-serum/anchor";
import { makeSaberProvider } from "@saberhq/anchor-contrib";
import {
  TOKEN_PROGRAM_ID,
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token2";
import { utils, MerkleDistributorSDK } from "@saberhq/merkle-distributor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useShowSnackBar } from "../../context/SnackBarContext";
import {
  airDropTokenAmount,
  builderOptionMintKey,
  optionMarketKeyForMinting,
  projectInfo,
  recipientJson,
} from "../../recoil/util";
import { usePsyAmericanProgram } from "../usePsyAmericanProgram";
import { pushDistributorInfo } from "../../api";
import { networkAtom } from "../../recoil";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { decDiv } from "../../lib/utils";

export const useCreateDistributor = () => {
  const program = usePsyAmericanProgram();
  const { publicKey, signTransaction, sendTransaction } = useWallet();
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
    if (!optionTokenMint || !_projectInfo) {
      throw new Error("option token mint not found");
    }
    const {
      underlyingAssetMint,
      quoteAssetMint,
      expiration,
      underlyingPerContract,
      quotePerContract,
      description,
      name: optionName,
    } = _projectInfo;
    if (!underlyingAssetMint || !quoteAssetMint) {
      showMessage("Underlying and/or quote asset not selected");
      throw new Error("Missing underlying/quote mint");
    }
    if (!expiration) {
      showMessage("Expiration not set");
      throw new Error("Missing expiration");
    }
    if (!underlyingPerContract || !quotePerContract) {
      showMessage("Strike price data not set (underlying/quote per contract)");
      throw new Error("Missing underlying/quote per contract");
    }
    if (!description || !optionName) {
      showMessage("Airdrop description/name cannot be empty");
      throw new Error("Missing name/description");
    }
    if (!optionMarketKey) {
      showMessage("Something went wrong, please try again");
      throw new Error("Missing optionMarketKey");
    }

    const strikePrice = decDiv(quotePerContract, underlyingPerContract);
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
      const newKP = new Keypair();
      const pendingDistributor = await sdk.createDistributor({
        root: merkleRoot,
        maxTotalClaim: new BN(totalOptions),
        maxNumNodes: new BN(Object.keys(claims).length),
        tokenMint: optionTokenMint,
        base: newKP,
      });
      const { tx, ...distributorInfo } = pendingDistributor;
      console.log({ distributorInfo });
      const built = tx.build(publicKey);
      console.log({
        signers: tx.signers.map((s) => s.publicKey.toString()),
        signatures: built.signatures,
        distBase: distributorInfo.base.toString(),
      });

      const toTokenAccount = distributorInfo.distributorATA;

      let optionTokenAccount = await getAssociatedTokenAddress(
        optionTokenMint,
        publicKey
      );

      const sendTokenToDistributorTransaction = built.add(
        createTransferInstruction(
          optionTokenAccount,
          toTokenAccount,
          publicKey,
          Number(totalOptions.toFixed(0)), // tokens have 6 decimals of precision so your amount needs to have the same
          [],
          TOKEN_PROGRAM_ID // imported from '@solana/spl-token2'
        )
      );

      const signature = await sendTransaction(
        sendTokenToDistributorTransaction,
        connection,
        {
          signers: [newKP],
        }
      );
      // send the signed transaction
      showMessage("Success: distributor created", signature);
      const serverUpdated = await pushDistributorInfo({
        distributorAddress: distributorInfo.distributor.toString(),
        creatorWallet: publicKey.toString(),
        optionMarket: {
          optionMarketKey: optionMarketKey?.toString(),
          underlyingAssetMint,
          quoteAssetMint,
          expiration,
          strikePrice,
          optionName,
        },
        optionTokenQty: totalOptions,
        description: _projectInfo?.description ?? "no description",
        isMainnet:
          network.key === WalletAdapterNetwork.Mainnet ||
          network.name.toLowerCase().includes("mainnet") ||
          !network.url.includes("devnet"),
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
    signTransaction,
    optionTokenMint,
    _projectInfo,
    optionMarketKey,
    selectedJson?.recipientList,
    showMessage,
    sdk,
    totalOptions,
    connection,
    sendTransaction,
    network.key,
    network.name,
    network.url,
  ]);
};
