import { useMemo } from "react";
import * as anchor from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { useConnection } from "./useConnection";

const defaultPayer = new Keypair();

/**
 * Anchor Provider
 */
export const useProvider = () => {
  const connection = useConnection();
  const wallet = useAnchorWallet();

  return useMemo(() => {
    // Wallet is not connected, return a default provider instance.
    return new anchor.AnchorProvider(
      connection,
      wallet ? wallet : new NodeWallet(defaultPayer),
      {
        commitment: "processed",
      }
    );
  }, [connection, wallet]);
};
