import { web3 } from "@project-serum/anchor";
import { RawAccount } from "@solana/spl-token";

export interface TokenAccountWithKey extends RawAccount {
  key: web3.PublicKey;
}

export type OwnedOptionKeys = {
  optionMarketKey: string;
  tokenAccountKey: string;
};

export type OwnedProjectOptionKeys = Record<string, OwnedOptionKeys[]>;
