import { useEffect } from "react";
import { useLoadPsyAmericanOptions } from "../recoil";
import { useLoadSplTokens } from "./wallet";

export const useHydrateState = () => {
  useLoadSplTokens();
  const load = useLoadPsyAmericanOptions();
  useEffect(() => {
    load();
  }, [load]);
};
