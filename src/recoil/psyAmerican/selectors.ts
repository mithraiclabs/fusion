import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { selector, selectorFamily } from "recoil";
import projectList from "../../projects/projectList";
import {
  OwnedProjectOptionKeys,
  tokenAccountsMap,
  TokenAccountWithKey,
} from "../wallet";
import { Project } from "../../types";
import { optionMarketFamily, psyAmericanOptionKeys } from ".";
import { mapNetworkTypes } from "../../lib/utils";
import { networkAtom } from "../solana";

/**
 * Retrieve all the OptionMarkets
 */
export const selectAllOptionMarkets = selector<OptionMarketWithKey[]>({
  key: "selectAllOptionMarkets",
  get: ({ get }) =>
    get(psyAmericanOptionKeys)
      .map((key) => get(optionMarketFamily(key)))
      .filter((x) => !!x) as OptionMarketWithKey[],
});

/**
 * Retrieve all options in the wallet that belong to a known Project.
 */
export const selectOwnedProjectOptionKeys = selector<OwnedProjectOptionKeys>({
  key: "selectOwnedProjectOptions",
  get: ({ get }) => {
    const psyAmericanOptions = get(selectAllOptionMarkets);
    const ownedOptions = psyAmericanOptions.reduce((agg, optionMarket) => {
      // Check if the wallet contains the option token
      const tokenAccount = get(
        tokenAccountsMap(optionMarket.optionMint.toString())
      );
      if (!tokenAccount) return agg;
      if (tokenAccount && tokenAccount.amount) {
        const underlyingMint = optionMarket.underlyingAssetMint.toString();
        if (agg[underlyingMint] && Array.isArray(agg[underlyingMint])) {
          agg[underlyingMint].push({
            optionMarketKey: optionMarket.key.toString(),
            tokenAccountKey: tokenAccount.mint.toString(),
          });
        } else {
          agg[underlyingMint] = [
            {
              optionMarketKey: optionMarket.key.toString(),
              tokenAccountKey: tokenAccount.mint.toString(),
            },
          ];
        }
      }
      return agg;
    }, {} as OwnedProjectOptionKeys);
    return ownedOptions;
  },
});

/**
 * Retrieve all writer tokens in the wallet that belong to a known Project. (to recover the underlying/rent post expiration)
 */
export const selectOwnedProjectWriterKeys = selector<OwnedProjectOptionKeys>({
  key: "selectOwnedProjectWriterKeys",
  get: ({ get }) => {
    const psyAmericanOptions = get(selectAllOptionMarkets);
    const ownedOptions = psyAmericanOptions.reduce((agg, optionMarket) => {
      // Check if the wallet contains the writer token
      const writerTokenAccount = get(
        tokenAccountsMap(optionMarket.writerTokenMint.toString())
      );
      if (writerTokenAccount && writerTokenAccount.amount) {
        const underlyingMint = optionMarket.underlyingAssetMint.toString();
        if (agg[underlyingMint] && Array.isArray(agg[underlyingMint])) {
          agg[underlyingMint].push({
            optionMarketKey: optionMarket.key.toString(),
            tokenAccountKey: writerTokenAccount.mint.toString(),
          });
        } else {
          agg[underlyingMint] = [
            {
              optionMarketKey: optionMarket.key.toString(),
              tokenAccountKey: writerTokenAccount.mint.toString(),
            },
          ];
        }
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
    const network = get(networkAtom);
    return Object.keys(ownedProjectOptions).map(
      (key) => projectList[mapNetworkTypes(network.key)][key]
    );
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

export const selectOwnedWritersForProject = selectorFamily<
  {
    optionMarket: OptionMarketWithKey | null;
    tokenAccount: TokenAccountWithKey | null;
  }[],
  string
>({
  key: "selectOwnedWritersForProject",
  get:
    (projectKey) =>
    ({ get }) => {
      const ownedProjectWriterKeys = get(selectOwnedProjectWriterKeys);
      const ownedWritersForProject = ownedProjectWriterKeys[projectKey];
      return ownedWritersForProject.map((ownedKeys) => {
        return {
          optionMarket: get(optionMarketFamily(ownedKeys.optionMarketKey)),
          tokenAccount: get(tokenAccountsMap(ownedKeys.tokenAccountKey)),
        };
      });
    },
});
