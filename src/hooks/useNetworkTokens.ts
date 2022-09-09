import { Tokens } from "@mithraic-labs/psy-token-registry";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { networkAtom } from "../recoil";

export const useNetworkTokens = () => {
  const network = useRecoilValue(networkAtom);

  return useMemo(() => {
    switch (network.key) {
      case WalletAdapterNetwork.Mainnet:
        return Tokens.mainnet;
      case WalletAdapterNetwork.Devnet:
        return Tokens.devnet;
      case "localnet":
        return {};
      default:
        return Tokens.mainnet;
    }
  }, [network.key]);
};
