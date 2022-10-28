import { instructions, OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { BN, web3 } from "@project-serum/anchor";
import { WRAPPED_SOL_MINT } from "@project-serum/serum/lib/token-instructions";
import {
  createAssociatedTokenAccountInstruction,
  createCloseAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token2";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { handleExercise } from "../../api";
import { useSetExercisedOption } from "../../context/ExercisedOptionContext";
import { useShowSnackBar } from "../../context/SnackBarContext";
import { tokenAccountsMap } from "../../recoil";
import { usePsyAmericanProgram } from "../usePsyAmericanProgram";
import { useSendAndConfirm } from "../wallet/useSendAndConfirm";

export const useExerciseOptions = (
  optionMarket: OptionMarketWithKey | null
) => {
  const program = usePsyAmericanProgram();
  const { publicKey } = useWallet();
  const showMessage = useShowSnackBar();
  const sendAndConfirm = useSendAndConfirm();
  const setExercisedOptionParams = useSetExercisedOption();

  // Look up the user's token account
  const walletUnderlyingTokenAccount = useRecoilValue(
    tokenAccountsMap(optionMarket?.underlyingAssetMint?.toString() ?? "")
  );

  const walletOptionTokenSourceAcct = useRecoilValue(
    tokenAccountsMap(optionMarket?.optionMint?.toString() ?? "")
  );

  const walletQuoteTokenSourceAcct = useRecoilValue(
    tokenAccountsMap(optionMarket?.quoteAssetMint?.toString() ?? "")
  );

  return useCallback(
    async ({ amount }: { amount: BN }) => {
      if (!optionMarket) {
        return false;
      }
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
      const optionMarketKey = optionMarket.key.toString();
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
      // if options are wrapped sol, add instruction to close account
      if (optionMarket.underlyingAssetMint.equals(WRAPPED_SOL_MINT)) {
        tx.add(
          await createCloseAccountInstruction(
            walletUnderlyingTokenAddress,
            publicKey,
            publicKey,
            undefined,
            TOKEN_PROGRAM_ID
          )
        );
      }
      const txId = await sendAndConfirm(tx, []);
      if (txId) {
        showMessage(
          `Successfully exercised ${amount.toString()} options`,
          txId
        );
        await handleExercise({
          wallet: publicKey.toString(),
          optionMarketKey,
          exercisedQty: Number(amount),
        });
        // Update exercised option context
        setExercisedOptionParams({
          show: true,
          optionMarket,
          amount: amount.toNumber(),
        });
        return true;
      } else {
        return false;
      }
    },
    [
      program,
      optionMarket,
      walletOptionTokenSourceAcct,
      walletUnderlyingTokenAccount,
      walletQuoteTokenSourceAcct,
      publicKey,
      sendAndConfirm,
      setExercisedOptionParams,
      showMessage,
    ]
  );
};
