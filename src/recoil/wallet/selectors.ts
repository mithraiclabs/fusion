import { selector } from "recoil";
import { tokenAccountsMap } from "../../recoil";
import { builderOptionMintKey } from "../../recoil/util";

/**
 * Gets the amount of option tokens for the OptionMarket in the builder workflow
 */
export const getCurrentMintBalance = selector<number>({
  key: "getCurrentMintBalance",
  get: ({ get }) => {
    const mintKey = get(builderOptionMintKey) ?? "";
    const balance = get(tokenAccountsMap(mintKey.toString()));
    return balance ? Number(balance?.amount) : 0;
  },
});
