import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Network } from "./types";

export const networks: Record<string, Network> = {
  [WalletAdapterNetwork.Mainnet]: {
    key: WalletAdapterNetwork.Mainnet,
    url:
      process.env.NODE_ENV === "development"
        ? // Use different endpoint on dev env due to domain restrictions.
          "https://neat-holy-pallet.solana-mainnet.discover.quiknode.pro/b7f3b928fe2c19c5037fa6e85c560e01239535be/"
        : "https://rpc1.psyfi.io/3acfe7e84a926c3353c55532307cf2ecd7bf9f5e/",
    name: "Mainnet-beta",
    ws:
      process.env.NODE_ENV === "development" // Use different endpoint on dev env due to domain restrictions.
        ? "wss://neat-holy-pallet.solana-mainnet.discover.quiknode.pro/b7f3b928fe2c19c5037fa6e85c560e01239535be/"
        : "wss://rpc1.psyfi.io/3acfe7e84a926c3353c55532307cf2ecd7bf9f5e/",
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
