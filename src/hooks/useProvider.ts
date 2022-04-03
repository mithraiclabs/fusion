import { useMemo } from "react";
import * as anchor from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useRecoilValue } from "recoil";
import { networkAtom } from "../recoil";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

const defaultPayer = new Keypair();

/**
 * Anchor Provider
 */
export const useProvider = () => {
  const network = useRecoilValue(networkAtom);
  const wallet = useAnchorWallet();

  return useMemo(() => {
    const connection = new anchor.web3.Connection(network.url, {
      commitment: "processed",
    });
    // Wallet is not connected, return a default provider instance.
    return new anchor.Provider(connection, wallet ? wallet : new NodeWallet(defaultPayer), {
      commitment: "processed",
    });
  }, [network.url, wallet]);
};
