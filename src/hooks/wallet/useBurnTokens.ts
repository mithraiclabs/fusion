import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createBurnInstruction,
  createCloseAccountInstruction,
} from "@solana/spl-token2";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useCallback } from "react";
import { useShowSnackBar } from "../../context/SnackBarContext";

export const useBurnTokens = (mint?: PublicKey) => {
  const wallet = useWallet();
  const showMessage = useShowSnackBar();
  const { connection } = useConnection();
  return useCallback(
    async (amount: number) => {
      try {
        const { publicKey, signTransaction } = wallet;
        if (publicKey && signTransaction && mint) {
          const transaction = new Transaction();
          let optionTokenAccount = await getAssociatedTokenAddress(
            mint,
            publicKey
          );
          transaction.add(
            createBurnInstruction(
              optionTokenAccount,
              mint,
              publicKey,
              amount,
              undefined,
              TOKEN_PROGRAM_ID
            )
          );
          transaction.add(
            createCloseAccountInstruction(
              optionTokenAccount,
              publicKey,
              publicKey,
              undefined,
              TOKEN_PROGRAM_ID
            )
          );
          const { blockhash } = await connection.getRecentBlockhash();
          transaction.recentBlockhash = blockhash;
          transaction.feePayer = publicKey;
          await signTransaction(transaction);

          const txId = await connection.sendRawTransaction(
            transaction.serialize()
          );
          showMessage("Expired option account closed & rent claimed", txId);
          return true;
        }
      } catch (error) {
        showMessage(String(error));
        return false;
      }
    },
    [connection, mint, showMessage, wallet]
  );
};
