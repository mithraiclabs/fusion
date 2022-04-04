import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { selector, selectorFamily } from "recoil";
import projectList from "../../content/projectList";
import {
  OwnedProjectOptionKeys,
  tokenAccountsMap,
  TokenAccountWithKey,
} from "../wallet";
import { Project } from "../../types";
import { optionMarketFamily, psyAmericanOptionKeys } from ".";

export const selectAllOptionMarkets = selector<OptionMarketWithKey[]>({
  key: "selectAllOptionMarkets",
  get: ({ get }) =>
    get(psyAmericanOptionKeys)
      .map((key) => get(optionMarketFamily(key)))
      .filter((x) => !!x) as OptionMarketWithKey[],
});

export const selectOwnedProjectOptionKeys = selector<OwnedProjectOptionKeys>({
  key: "selectOwnedProjectOptions",
  get: ({ get }) => {
    const psyAmericanOptions = get(selectAllOptionMarkets);
    const ownedOptions = psyAmericanOptions.reduce((agg, optionMarket) => {
      // Filter out all the one's that are  not long calls for a known project
      const project = projectList[optionMarket.underlyingAssetMint.toString()];
      if (!project) return agg;

      // Check if the wallet contains the option
      const tokenAccount = get(
        tokenAccountsMap(optionMarket.optionMint.toString())
      );
      if (!tokenAccount) return agg;
      if (agg[project.mintAddress] && Array.isArray(agg[project.mintAddress])) {
        agg[project.mintAddress].push({
          optionMarketKey: optionMarket.key.toString(),
          tokenAccountKey: tokenAccount.mint.toString(),
        });
      } else {
        agg[project.mintAddress] = [
          {
            optionMarketKey: optionMarket.key.toString(),
            tokenAccountKey: tokenAccount.mint.toString(),
          },
        ];
      }
      return agg;
    }, {} as OwnedProjectOptionKeys);
    return ownedOptions;
  },
});

/**
 * Get all of the Project's where the wallet owns some options
 */
export const selectOwnedProjects = selector<Project[]>({
  key: "selectOwnedProjects",
  get: ({ get }) => {
    const ownedProjectOptions = get(selectOwnedProjectOptionKeys);
    return Object.keys(ownedProjectOptions).map((key) => projectList[key]);
  },
});

export const selectOwnedOptionsForProject = selectorFamily<
  {
    optionMarket: OptionMarketWithKey | null;
    tokenAccount: TokenAccountWithKey | null;
  }[],
  string
>({
  key: "selectOwnedOptionsForProject",
  get:
    (projectKey) =>
    ({ get }) => {
      const ownedProjectOptionKeys = get(selectOwnedProjectOptionKeys);
      const ownedOptionsForProject = ownedProjectOptionKeys[projectKey];
      return ownedOptionsForProject.map((ownedKeys) => {
        return {
          optionMarket: get(optionMarketFamily(ownedKeys.optionMarketKey)),
          tokenAccount: get(tokenAccountsMap(ownedKeys.tokenAccountKey)),
        };
      });
    },
});
