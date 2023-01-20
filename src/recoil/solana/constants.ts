import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Network } from "./types";

export const networks: Record<string, Network> = {
  [WalletAdapterNetwork.Mainnet]: {
    key: WalletAdapterNetwork.Mainnet,
    url: "https://cold-spring-firefly.solana-mainnet.quiknode.pro/0c365be8d2d5f50be883ea0afcfb2fb31452e755",
    name: "Mainnet-beta",
    ws: "wss://cold-spring-firefly.solana-mainnet.quiknode.pro/0c365be8d2d5f50be883ea0afcfb2fb31452e755",
  },
  "mainnet-srm": {
    key: "mainnet-srm",
    url: "https://solana-api.projectserum.com/",
    name: "Mainnet",
    ws: "wss://api.mainnet-beta.solana.com",
  },
  [WalletAdapterNetwork.Devnet]: {
    key: WalletAdapterNetwork.Devnet,
    url: "https://api.devnet.solana.com",
    name: "Devnet",
    ws: "wss://api.devnet.solana.com",
  },
  // localnet: {
  //   key: "localnet",
  //   url: "http://localhost:8899",
  //   name: "Localnet",
  //   ws: "wss://psyoptions.genesysgo.net",
  // },
};
