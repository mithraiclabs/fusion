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


 // Underlying Amount
export const displayUnderlyingAmt = (
  optionMarket: OptionMarket,
  underlyingMint: MintInfoWithKey,
): string => {
  const underlyingToken = Tokens.devnet[underlyingMint.pubkey.toString()];
  const underlyingAmount = bnToFloat(
    optionMarket.underlyingAmountPerContract,
    underlyingToken.decimals,
    2
  );
  return `${underlyingAmount}`;
};

// Project Symbol
export const displayProjectSymbol = (
  project: Project,
): string => {
  const projectSymbol = project.symbol;
  return projectSymbol;
};

// Strike Price
export const displayStrikePrice = (
  optionMarket: OptionMarket,
  underlyingMint: MintInfoWithKey,
  quoteMint: MintInfoWithKey
): string => {
  const quoteToken = Tokens.devnet[quoteMint.pubkey.toString()];
  const underlyingToken = Tokens.devnet[underlyingMint.pubkey.toString()];
  const strikeDisplay = formatStrike(
    optionMarket.underlyingAmountPerContract,
    optionMarket.quoteAmountPerContract,
    quoteToken.decimals,
    underlyingToken.decimals
  );
  return `${strikeDisplay}`;
};

// Quote Taken
export const displayQuoteToken = (
  quoteMint: MintInfoWithKey
): string => {
  const quoteToken = Tokens.devnet[quoteMint.pubkey.toString()];
  return `${quoteToken.symbol}`;
};

export const displayExpiration = (
  optionMarket: OptionMarket,
): string => {
  const expirationDate = new Date(optionMarket.expirationUnixTimestamp.toNumber() * 1000);
  return `${expirationDate.getFullYear()}-${expirationDate.getMonth()}-${expirationDate.getDay()}`;
};

// All Values
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

  return `Underlying Amount: ${underlyingAmount} Project Symbol: ${project.symbol} Strike Price: ${strikeDisplay} Quote Token: ${
    quoteToken.symbol
  } Expiration: ${expirationDate.getFullYear()}-${expirationDate.getMonth()}-${expirationDate.getDay()}`;
};
