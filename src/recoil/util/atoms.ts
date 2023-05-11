import { PublicKey } from "@solana/web3.js";
import { atom } from "recoil";
import { recipientJsonType } from "../../types";
import { PriceData } from "../wallet";

export interface ProjectAirdropInfo {
  underlyingAssetMint: string;
  quoteAssetMint: string;
  expiration: number;
  underlyingPerContract: number;
  quotePerContract: number;
  description?: string;
  name: string;
}

export const projectInfo = atom<ProjectAirdropInfo | null>({
  key: "projectInfo",
  default: null,
});

export const airDropStage = atom<number>({
  key: "airDropStage",
  default: 1,
});

export const claimStageAtom = atom<number>({
  key: "claimStageAtom",
  default: 1,
});

export const airDropTokenAmount = atom<number>({
  key: "airDropTokenAmount",
  default: 0,
});

// This is for builder workflow proof of concept
export const recipientJson = atom<recipientJsonType>({
  key: "recipientJson",
  default: null,
});

export const optionMarketKeyForMinting = atom<PublicKey | null>({
  key: "optionMarketKeyForMinting",
  default: null,
});

export const builderOptionMintKey = atom<PublicKey | null>({
  key: "builderOptionMintKey",
  default: null,
});

export const distributorAddress = atom<PublicKey | null>({
  key: "distributorAddress",
  default: null,
});

// this serves the same purpose as distributor address but when claiming
export const airdropAddress = atom<string | null>({
  key: "airdropAddress",
  default: null,
});

export const airdropBalance = atom<number>({
  key: "airdropBalance",
  default: 0,
});

export const availableDistributors = atom<DistributorInfo[]>({
  key: "availableDistributors",
  default: [],
});

export const selectedClaim = atom<DistributorInfo | null>({
  key: "selectedClaim",
  default: null,
});

export const selectedWindowAtom = atom<WindowType>({
  key: "selectedWindow",
  default: "Home",
});

export const spotPriceMap = atom<PriceData>({
  key: "spotPriceMap",
  default: {},
});

export type DistributorInfo = {
  creatorWallet: string;
  description: string;
  distributorAddress: string;
  isMainnet: boolean;
  optionMarketKey: string;
  optionTokenQty: number;
  underlyingAssetMint: string;
  quoteAssetMint: string;
  optionName: string;
};

export type WindowType =
  | "Home"
  | "Create"
  | "Recover"
  | "Exercise"
  | "WriterBurn"
  | "Claim";
