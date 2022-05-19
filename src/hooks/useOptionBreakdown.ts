import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { useRecoilValue } from "recoil";
import {
  costToExercise,
  displayExpirationDate,
  tokensToReceive,
} from "../lib/utils";
import { TokenAccountWithKey, tokenPricesMap } from "../recoil";
import { Project } from "../types";

type OptionBreakdown = {
  underlyingPrice?: number;
  underlyingSymbol: string;
  quoteSymbol: string;
  underlyingToReceive: number;
  quoteToExercise: number;
  netValue?: number;
  expirationDate: string;
};

export const useOptionBreakdown = ({
  optionMeta,
  optionTokenAccount,
  project,
}: {
  optionMeta: OptionMarketWithKey;
  optionTokenAccount: TokenAccountWithKey;
  project: Project;
}): OptionBreakdown => {
  const underlyingPrice = useRecoilValue(tokenPricesMap(project.mintAddress));

  // Tokens to receive is the underlying amount per contract * number of contracts held
  const amountToReceive = tokensToReceive(
    optionMeta,
    optionTokenAccount,
    "mainnet"
  );
  const exerciseInfo = costToExercise(
    optionMeta,
    optionTokenAccount,
    "mainnet"
  );

  // TODO: This assumes the quote asset is USD stable
  let netValue: undefined | number;
  if (underlyingPrice) {
    netValue = underlyingPrice * amountToReceive.amount - exerciseInfo.amount;
  }

  return {
    underlyingPrice: underlyingPrice ?? undefined,
    underlyingSymbol: amountToReceive.symbol,
    quoteSymbol: exerciseInfo.symbol,
    underlyingToReceive: amountToReceive.amount,
    quoteToExercise: exerciseInfo.amount,
    netValue,
    expirationDate: displayExpirationDate(optionMeta),
  };
};
