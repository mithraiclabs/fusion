import { useTokenPrice } from "./wallet/useTokenPrice";

export const useHydrateState = () => {
  useTokenPrice();
  return;
};
