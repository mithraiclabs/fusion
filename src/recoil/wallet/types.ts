import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { web3 } from "@project-serum/anchor";
import { Project } from "../../types";

export interface TokenAccount {
  amount: number;
  // closeAuthority: PublicKey;
  // closeAuthorityOption: number;
  // delegate: PublicKey;
  // delegateOption: number;
  delegatedAmount: number;
  isNative: number;
  // isNativeOption: number;
  mint: web3.PublicKey;
  owner: web3.PublicKey;
  state: number;
}

export interface TokenAccountWithKey extends TokenAccount {
  key: web3.PublicKey;
}

export type OwnedOptionKeys = {
  optionMarketKey: string;
  tokenAccountKey: string;
}

export type OwnedProjectOptionKeys = Record<string, OwnedOptionKeys[]>