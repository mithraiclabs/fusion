import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { atom, atomFamily } from "recoil";

export const optionMarketFamily = atomFamily<OptionMarketWithKey|null, string>({
  key: "optionMarketFamily",
  default: null
});

export const psyAmericanOptionKeys = atom<string[]>({
  key: "optionMarketKeys",
  default: []
});
