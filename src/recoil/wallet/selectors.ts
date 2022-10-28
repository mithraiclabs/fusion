import { selector } from "recoil";
import { decMultiply } from "../../lib/utils";
import { tokenAccountsMap } from "../../recoil";
import {
  builderOptionMintKey,
  projectInfo,
  recipientJson,
} from "../../recoil/util";

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

export const getTotalContractsNeeded = selector<number>({
  key: "getTotalContractsNeeded",
  get: ({ get }) => {
    const jsonData = get(recipientJson);
    const totalContracts = jsonData?.recipientList.reduce(function (acc, obj) {
      return acc + Number(obj.amount);
    }, 0) as number;
    return totalContracts;
  },
});

export const getUnderlyingNeededForWholeAirdrop = selector<number>({
  key: "getUnderlyingNeededForWholeAirdrop",
  get: ({ get }) => {
    const airDropInfo = get(projectInfo);
    const totalContracts = get(getTotalContractsNeeded);
    return decMultiply(airDropInfo?.underlyingPerContract!, totalContracts);
  },
});
