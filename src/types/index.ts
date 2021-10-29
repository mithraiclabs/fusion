import { PublicKey } from '@solana/web3.js';

export type Account = {
  publicKey: PublicKey;
  accountName?: string
};

export type Asset = {
  tokenSymbol: string;
  mintAddress: string;
  decimals: number;
  icon?: string;
  tokenName?: string;
};
