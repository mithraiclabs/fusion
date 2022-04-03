import { useEffect } from "react";
import { useLoadAllTokenPrices, useLoadPsyAmericanOptions } from "../recoil";
import { useLoadSplTokens } from "./wallet";

export const useHydrateState = () => {
  useLoadSplTokens();
  const load = useLoadPsyAmericanOptions();
  const loadPrices = useLoadAllTokenPrices();
  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    loadPrices();
  }, [loadPrices]);
};
