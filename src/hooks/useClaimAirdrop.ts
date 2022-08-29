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
import { useShowSnackBar } from "../context/SnackBarContext";
import { airdropAddress, recipientJson } from "../recoil/util";
import { usePsyAmericanProgram } from "./usePsyAmericanProgram";

export const useClaimAirdrop = () => {
  const program = usePsyAmericanProgram();
  const { publicKey } = useWallet();
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
        console.log({ wrapper, claims });
        const claim = claims[publicKey.toString()];
        const tx = await wrapper.claim({
          claimant: publicKey,
          amount: claim.amount,
          index: new BN(claim.index),
          proof: claim.proof,
        });
        const txId = await tx.send();

        showMessage("Successfully claimed airdrop", txId.signature);
        return true;
      }
      return false;
    } catch (error) {
      console.log({ error });
      showMessage("Something went wrong, please try again");
      return false;
    }
  }, [publicKey, sdk, selectedJson, distributorAddress, showMessage]);
};
