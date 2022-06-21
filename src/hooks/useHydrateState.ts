import { useEffect } from "react";
import { useLoadAllTokenPrices } from "../recoil";
import { useLoadSplTokens } from "./wallet";

export const useHydrateState = () => {
  useLoadSplTokens();
  const loadPrices = useLoadAllTokenPrices();
  useEffect(() => {
    loadPrices();
  }, [loadPrices]);
  return;
};
