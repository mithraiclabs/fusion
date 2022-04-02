import { useLoadSplTokens } from "./wallet";

export const useHydrateState = () => {
  useLoadSplTokens();
};
