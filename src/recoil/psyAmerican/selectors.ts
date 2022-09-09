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
    const network = get(networkAtom);
    const ownedOptions = psyAmericanOptions.reduce((agg, optionMarket) => {
      // Filter out all the one's that are  not long calls for a known project
      const project =
        projectList[mapNetworkTypes(network.key)][
          optionMarket.underlyingAssetMint.toString()
        ];
      if (!project) return agg;

      // Check if the wallet contains the option
      const tokenAccount = get(
        tokenAccountsMap(optionMarket.optionMint.toString())
      );
      const writerTokenAccount = get(
        tokenAccountsMap(optionMarket.writerTokenMint.toString())
      );
      if (!tokenAccount && !writerTokenAccount) return agg;
      if (tokenAccount && tokenAccount.amount) {
        if (
          agg[project.mintAddress] &&
          Array.isArray(agg[project.mintAddress])
        ) {
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
    const network = get(networkAtom);
    const ownedOptions = psyAmericanOptions.reduce((agg, optionMarket) => {
      // Filter out all the one's that are  not long calls for a known project
      const project =
        projectList[mapNetworkTypes(network.key)][
          optionMarket.underlyingAssetMint.toString()
        ];
      if (!project) return agg;

      // Check if the wallet contains the writer token
      const writerTokenAccount = get(
        tokenAccountsMap(optionMarket.writerTokenMint.toString())
      );
      const optionTokenAccount = get(
        tokenAccountsMap(optionMarket.optionMint.toString())
      );

      const optionMeta = get(optionMarketFamily(optionMarket.key.toString()));

      if (
        writerTokenAccount &&
        writerTokenAccount.amount &&
        ((optionTokenAccount && optionTokenAccount.amount) ||
          optionMeta?.expired)
      ) {
        if (
          agg[project.mintAddress] &&
          Array.isArray(agg[project.mintAddress])
        ) {
          agg[project.mintAddress].push({
            optionMarketKey: optionMarket.key.toString(),
            tokenAccountKey: writerTokenAccount.mint.toString(),
          });
        } else {
          agg[project.mintAddress] = [
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
