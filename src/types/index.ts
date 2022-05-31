import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { Mint, RawAccount } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export type NetworkNames = "devnet" | "testnet" | "mainnet";

export type Account = {
  publicKey: PublicKey;
  accountName?: string;
};

export type Asset = {
  tokenSymbol: string;
  mintAddress: string;
  decimals: number;
  icon?: string;
  tokenName?: string;
};

export type Project = {
  name: string;
  description: string;
  mintAddress: string;
  symbol: string;
  logo: string;
  serumUsdMarket: string;
  serumProgramId: string;
  website: string;
  twitter: string;
  discord: string;
  // The project's primary color. Used for accents and buttons.
  primaryColor?: string;
};

export type OptionAccount = {
  optionMarket: OptionMarketWithKey;
  tokenAccount: RawAccount;
};

export type ProjectOptions = {
  project: Project;
  options: OptionAccount[];
};

export type MintInfoWithKey = Mint;
