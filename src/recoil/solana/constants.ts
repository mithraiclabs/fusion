import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Network } from "./types";

export const networks: Record<string, Network> = {
  [WalletAdapterNetwork.Mainnet]: {
    key: WalletAdapterNetwork.Mainnet,
    url: "https://rpc-w2sb6smb3a-uc.a.run.app/",
    name: "Mainnet",
    ws: "wss://autumn-weathered-meme.solana-mainnet.quiknode.pro/4376a4a4f036359db54b1cec4b47558ff710ab8b/",
  },
  "mainnet-srm": {
    key: "mainnet-srm",
    url: "https://solana-api.projectserum.com/",
    name: "Mainnet-stm",
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
