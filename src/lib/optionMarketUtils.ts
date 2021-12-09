import * as anchor from "@project-serum/anchor";
import { OptionMarket } from "@mithraic-labs/psy-american";
import { MintInfoWithKey, Project } from "../types";
import { Tokens } from "@mithraic-labs/psy-token-registry";
import { BN } from "bn.js";
import { bnToFloat, formatStrike } from "./utils";

/**
 * Return a human readable display header for an option.
 *
 * TODO: remove the hardcoded Tokens registry and move to high level state
 *
 * @param project - The Project associated with the optionMarket
 * @param optionMarket - The OptionMarket for the held option
 * @returns
 */
export const displayHeader = (
  project: Project,
  optionMarket: OptionMarket,
  underlyingMint: MintInfoWithKey,
  quoteMint: MintInfoWithKey
): string => {
  const expirationDate = new Date(
    optionMarket.expirationUnixTimestamp.toNumber() * 1000
  );
  const quoteToken = Tokens.devnet[quoteMint.pubkey.toString()];
  const underlyingToken = Tokens.devnet[underlyingMint.pubkey.toString()];

  const strikeDisplay = formatStrike(
    optionMarket.underlyingAmountPerContract,
    optionMarket.quoteAmountPerContract,
    quoteToken.decimals,
    underlyingToken.decimals
  );

  const underlyingAmount = bnToFloat(
    optionMarket.underlyingAmountPerContract,
    underlyingToken.decimals,
    2
  );

  return `${underlyingAmount} ${project.symbol} ${strikeDisplay} ${
    quoteToken.symbol
  } ${expirationDate.getFullYear()}-${expirationDate.getMonth()}-${expirationDate.getDay()}`;
};
