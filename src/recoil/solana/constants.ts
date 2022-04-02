import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Network } from "./types";

export const networks: Record<string, Network> = {
  [WalletAdapterNetwork.Mainnet]: {
    key: WalletAdapterNetwork.Mainnet,
    url: "https://psyoptions.genesysgo.net",
    name: "Mainnet",
    ws: "wss://psyoptions.genesysgo.net",
  },
  [WalletAdapterNetwork.Devnet]: {
    key: WalletAdapterNetwork.Devnet,
    url: "https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899",
    name: "Devnet",
    ws: "wss://psytrbhymqlkfrhudd.dev.genesysgo.net:8899",
  },
  localnet: {
    key: "localnet",
    url: "http://localhost:8899",
    name: "Localnet",
    ws: "wss://psyoptions.genesysgo.net",
  },
};
