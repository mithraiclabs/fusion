import { web3 } from "@project-serum/anchor";
import { RawAccount } from "@solana/spl-token2";

export interface TokenAccountWithKey extends RawAccount {
  key: web3.PublicKey;
}

export type OwnedOptionKeys = {
  optionMarketKey: string;
  tokenAccountKey: string;
};

export type OwnedProjectOptionKeys = Record<string, OwnedOptionKeys[]>;

export type PriceData = {
  [symbol: string]: {
    price: number;
    change: number;
    lastChanged: number;
  };
};
