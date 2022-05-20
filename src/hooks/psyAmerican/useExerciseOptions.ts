import { instructions, OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { BN, web3 } from "@project-serum/anchor";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { tokenAccountsMap } from "../../recoil";
import { usePsyAmericanProgram } from "../usePsyAmericanProgram";

export const useExerciseOptions = (optionMarket: OptionMarketWithKey) => {
  const program = usePsyAmericanProgram();
  // TODO: Look up the user's token account
  const walletUnderlyingTokenAccount = useRecoilValue(
    tokenAccountsMap(optionMarket.underlyingAssetMint.toString())
  );

  return useCallback(
    async ({ amount }: { amount: BN }) => {
      const ix = await instructions.exerciseOptionsV2Instruction(
        program,
        amount,
        optionMarket,
        exerciserContractTokenKey,
        _exerciserUnderlyingAssetKey,
        exerciserQuoteAssetKey
      );
      const exerciseTx = new web3.Transaction().add(ix);
    },
    [program, optionMarket]
  );
};
