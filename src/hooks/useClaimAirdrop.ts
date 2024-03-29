import { AnchorProvider, BN } from "@project-serum/anchor";
import { makeSaberProvider } from "@saberhq/anchor-contrib";
import {
  utils,
  MerkleDistributorSDK,
  MerkleDistributorWrapper,
} from "@saberhq/merkle-distributor";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { handleClaim } from "../api";
import { useShowSnackBar } from "../context/SnackBarContext";
import { airdropAddress, recipientJson } from "../recoil/util";
import { usePsyAmericanProgram } from "./usePsyAmericanProgram";

export const useClaimAirdrop = () => {
  const program = usePsyAmericanProgram();
  const { publicKey, sendTransaction } = useWallet();
  const showMessage = useShowSnackBar();
  const provider = program.provider as AnchorProvider;
  const newProvider = makeSaberProvider(provider);
  const sdk = MerkleDistributorSDK.load({ provider: newProvider });
  const selectedJson = useRecoilValue(recipientJson);
  const distributorAddress = useRecoilValue(airdropAddress);

  return useCallback(async () => {
    if (!publicKey) {
      throw new Error("Wallet must be connected");
    }
    if (!distributorAddress) {
      throw new Error("No distributor address provided");
    }

    try {
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

      const { claims } = utils.parseBalanceMap(
        Object.entries(balanceMap).map(([authority, amount]) => {
          return {
            address: authority,
            earnings: amount.toString(),
          };
        })
      );
      if (!claims[publicKey.toString()]) {
        console.log("none");
      } else {
        const wrapper = await MerkleDistributorWrapper.load(
          sdk,
          new PublicKey(distributorAddress ?? "")
        );
        const claim = claims[publicKey.toString()];
        const tx = await wrapper.claim({
          claimant: publicKey,
          amount: claim.amount,
          index: new BN(claim.index),
          proof: claim.proof,
        });
        const built = tx.build(publicKey);
        const recentBlockhash = await provider.connection.getLatestBlockhash();
        built.recentBlockhash = recentBlockhash.blockhash;
        const txId = await sendTransaction(built, provider.connection);
        await handleClaim({
          wallet: publicKey.toString(),
          distributorAddress,
          claimedQty: Number(claim.amount),
        });
        showMessage("Successfully claimed airdrop", txId);
        return true;
      }
      return false;
    } catch (error) {
      console.log({ error });
      showMessage("Something went wrong, please try again");
      return false;
    }
  }, [
    publicKey,
    distributorAddress,
    selectedJson?.recipientList,
    sdk,
    provider.connection,
    sendTransaction,
    showMessage,
  ]);
};
