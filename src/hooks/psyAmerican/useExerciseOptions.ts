import {
  instructions,
  OptionMarketWithKey,
  parseTransactionError,
} from "@mithraic-labs/psy-american";
import { BN, web3 } from "@project-serum/anchor";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useShowSnackBar } from "../../context/SnackBarContext";
import { tokenAccountsMap } from "../../recoil";
import { useProvider } from "../useProvider";
import { usePsyAmericanProgram } from "../usePsyAmericanProgram";
import { useSendAndConfirm } from "../wallet/useSendAndConfirm";

export const useExerciseOptions = (optionMarket: OptionMarketWithKey) => {
  const program = usePsyAmericanProgram();
  const provider = useProvider();
  const { publicKey } = useWallet();
  const showMessage = useShowSnackBar();
  const sendAndConfirm = useSendAndConfirm();
  // Look up the user's token account
  const walletUnderlyingTokenAccount = useRecoilValue(
    tokenAccountsMap(optionMarket.underlyingAssetMint.toString())
  );

  const walletOptionTokenSourceAcct = useRecoilValue(
    tokenAccountsMap(optionMarket.optionMint.toString())
  );

  const walletQuoteTokenSourceAcct = useRecoilValue(
    tokenAccountsMap(optionMarket.quoteAssetMint.toString())
  );

  return useCallback(
    async ({ amount }: { amount: BN }) => {
      if (!publicKey) {
        throw new Error("Wallet must be connected");
      }

      let walletOptionTokenAddress = walletOptionTokenSourceAcct?.key;
      if (!walletOptionTokenAddress) {
        throw new Error(
          "The connected wallet does not have any of these options"
        );
      }
      let walletQuoteTokenAddress = walletQuoteTokenSourceAcct?.key;
      if (!walletQuoteTokenAddress) {
        throw new Error(
          "The connected wallet does not have any Quote assets required to exercise"
        );
      }

      const tx = new web3.Transaction();
      let walletUnderlyingTokenAddress = walletUnderlyingTokenAccount?.key;
      if (!walletUnderlyingTokenAddress) {
        // Create the associated token account instruction and add to the transaction if the wallet does not have the account
        const address = await getAssociatedTokenAddress(
          optionMarket.underlyingAssetMint,
          publicKey
        );
        const ix = createAssociatedTokenAccountInstruction(
          publicKey,
          address,
          publicKey,
          optionMarket.underlyingAssetMint
        );
        tx.add(ix);
        walletUnderlyingTokenAddress = address;
      }
      const ix = await instructions.exerciseOptionsV2Instruction(
        program,
        amount,
        optionMarket,
        walletOptionTokenAddress,
        walletUnderlyingTokenAddress,
        walletQuoteTokenAddress
      );
      tx.add(ix);
      // TODO: Proper transaction error handling
      // TODO: Add toaster notifications for status of transaction
      const txId = await sendAndConfirm(tx, []);
      if (txId) {
        showMessage(
          `Successfully exercised ${amount.toString()} options`,
          txId
        );
      }
    },
    [
      program,
      optionMarket,
      walletOptionTokenSourceAcct,
      walletUnderlyingTokenAccount,
      walletQuoteTokenSourceAcct,
    ]
  );
};
