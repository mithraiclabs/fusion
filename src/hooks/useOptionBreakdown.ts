import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { useRecoilValue } from "recoil";
import {
  costToExercise,
  displayExpirationDate,
  mapNetworkTypes,
  tokensToReceive,
} from "../lib/utils";
import { networkAtom, TokenAccountWithKey } from "../recoil";
import { Project } from "../types";
import { useTokenPrice } from "./wallet/useTokenPrice";

// TODO: Add strike price in quote to here.

type OptionBreakdown = {
  underlyingPrice?: number;
  underlyingSymbol: string;
  quoteSymbol: string;
  underlyingToReceive: number;
  quoteToExercise: number;
  netValue?: number;
  underlyingValue?: number;
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
  const prices = useTokenPrice();
  const underlyingPrice = prices[project.symbol]?.price ?? 0;
  const network = useRecoilValue(networkAtom);

  // Tokens to receive is the underlying amount per contract * number of contracts held
  const amountToReceive = tokensToReceive(
    optionMeta,
    optionTokenAccount,
    mapNetworkTypes(network.key)
  );
  const exerciseInfo = costToExercise(
    optionMeta,
    optionTokenAccount,
    mapNetworkTypes(network.key)
  );

  // TODO: This assumes the quote asset is USD stable
  let netValue: undefined | number, underlyingValue: undefined | number;
  if (underlyingPrice) {
    underlyingValue = underlyingPrice * amountToReceive.amount;
    netValue = underlyingValue - exerciseInfo.amount;
  }

  return {
    underlyingPrice: underlyingPrice ?? undefined,
    underlyingSymbol: amountToReceive.symbol,
    quoteSymbol: exerciseInfo.symbol,
    underlyingToReceive: amountToReceive.amount,
    quoteToExercise: exerciseInfo.amount,
    netValue,
    underlyingValue,
    expirationDate: displayExpirationDate(optionMeta),
  };
};
