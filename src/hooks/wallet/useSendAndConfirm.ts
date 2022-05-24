import { parseTransactionError } from "@mithraic-labs/psy-american";
import { Signer, Transaction } from "@solana/web3.js";
import { useCallback } from "react";
import { useShowSnackBar } from "../../context/SnackBarContext";
import { useProvider } from "../useProvider";

export const useSendAndConfirm = () => {
  const provider = useProvider();
  const showMessage = useShowSnackBar();

  return useCallback(
    async (tx: Transaction, signers: Signer[]) => {
      let txId;
      try {
        txId = await provider.sendAndConfirm(tx, []);
      } catch (err) {
        const psyAmericanProgramErr = parseTransactionError(err);
        if (psyAmericanProgramErr) {
          console.error(
            "psyAmerican Program Error: ",
            psyAmericanProgramErr.msg
          );
          showMessage(
            `psyAmerican Program Error: ${psyAmericanProgramErr.msg}`,
            txId
          );
        } else {
          showMessage(`Error: ${err}`, txId);
        }
      }
      return txId;
    },
    [provider]
  );
};
