import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { optionMarketFamily, psyAmericanOptionKeys } from "../../recoil";
import { selector } from "recoil";

export const selectAllOptionMarkets = selector<OptionMarketWithKey[]>({
  key: "selectAllOptionMarkets",
  get: ({ get }) =>
    get(psyAmericanOptionKeys)
      .map((key) => get(optionMarketFamily(key)))
      .filter((x) => !!x) as OptionMarketWithKey[],
});
