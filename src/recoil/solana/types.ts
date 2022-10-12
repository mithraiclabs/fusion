import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export type NetworkKeys =
  | WalletAdapterNetwork
  | "custom"
  | "localnet"
  | "mainnet-srm";

export type Network = {
  key: NetworkKeys;
  host?: string;
  url: string;
  ws: string;
  name: string;
};
