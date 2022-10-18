import { atom } from "recoil";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import queryString from "query-string";
import { networks } from "./constants";
import { Network } from "./types";

export const networkAtom = atom<Network>({
  key: "network",
  default: networks["mainnet-srm"],
  effects: [
    ({ setSelf }) => {
      const { cluster } = queryString.parse(window.location.search);
      switch (cluster) {
        case "mainnet":
          setSelf(networks[WalletAdapterNetwork.Mainnet]);
          break;
        case "devnet":
          setSelf(networks[WalletAdapterNetwork.Devnet]);
          break;
        default:
          break;
      }
    },
  ],
});

export const customNetworkAtom = atom<Network>({
  key: "customNetworkAtom",
  default: {
    key: "custom",
    host: "",
    url: "",
    name: "Custom",
    ws: "",
  },
});
