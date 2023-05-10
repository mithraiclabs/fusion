import { useRecoilTransaction_UNSTABLE } from "recoil";
import { availableDistributors, DistributorInfo } from "./atoms";
import { useCallback } from "react";
import { Network } from "../solana/types";
import { getAvailableDistributors } from "../../api";
import { PublicKey } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const useInsertAvailableDistributors = () =>
  useRecoilTransaction_UNSTABLE<[DistributorInfo[]]>(
    ({ set }) =>
      async (distributors) => {
        set(availableDistributors, distributors);
      },
    []
  );

export const useCheckAvailbleDistributors = () => {
  const updateState = useInsertAvailableDistributors();

  return useCallback(
    async (publicKey: PublicKey | null, network: Network) => {
      if (publicKey) {
        const list = await getAvailableDistributors({
          wallet: publicKey.toString(),
          isMainnet:
            network.name.toLowerCase().includes("mainnet") ||
            !network.name.toLowerCase().includes("devnet") ||
            network.key === WalletAdapterNetwork.Mainnet,
        });
        updateState(list);
      }
    },
    [updateState]
  );
};
