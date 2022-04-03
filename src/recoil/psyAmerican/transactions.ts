import {
  getAllOptionAccounts,
  OptionMarketWithKey,
} from "@mithraic-labs/psy-american";
import { useCallback } from "react";
import { useRecoilTransaction_UNSTABLE } from "recoil";
import { usePsyAmericanProgram } from "../../hooks/usePsyAmericanProgram";
import { optionMarketFamily, psyAmericanOptionKeys } from "./atoms";

const useInsertPsyAmericanOptions = () =>
  useRecoilTransaction_UNSTABLE<[OptionMarketWithKey[]]>(
    ({ get, reset, set }) =>
      async (psyAmericanOptionMarkets) => {
        // reset all of the state when we load everything again
        const prevKeys = get(psyAmericanOptionKeys);
        prevKeys.forEach((prevKey) => reset(optionMarketFamily(prevKey)));
        reset(psyAmericanOptionKeys);
        // done resetting

        const keys = psyAmericanOptionMarkets.map((optionMarketWithKey) =>
          optionMarketWithKey.key.toString()
        );
        set(psyAmericanOptionKeys, keys);

        psyAmericanOptionMarkets.forEach((optionMarketWithKey) => {
          set(
            optionMarketFamily(optionMarketWithKey.key.toString()),
            optionMarketWithKey
          );
        });
      },
    []
  );

export const useLoadPsyAmericanOptions = () => {
  const program = usePsyAmericanProgram();
  const updateState = useInsertPsyAmericanOptions();

  return useCallback(async () => {
    // @ts-ignore: anchor version diff
    const options = await getAllOptionAccounts(program);
    updateState(options);
  }, [program, updateState]);
};
