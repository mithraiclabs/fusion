import { useMemo } from "react";
import * as anchor from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useRecoilValue } from "recoil";
import { networkAtom } from "../recoil";

/**
 * Anchor Provider
 */
export const useProvider = () => {
  const network = useRecoilValue(networkAtom);
  const wallet = useAnchorWallet();

  return useMemo(() => {
    if (!wallet) {
      return;
    }
    const connection = new anchor.web3.Connection(network.url, {
      commitment: "processed",
    });
    // Wallet is not connected, return a default provider instance.
    return new anchor.Provider(connection, wallet, {
      commitment: "processed",
    });
  }, [network.url, wallet]);
};
