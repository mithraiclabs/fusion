import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export type Network = {
  key: WalletAdapterNetwork | "custom" | "localnet";
  host?: string;
  url: string;
  ws: string;
  name: string;
};
