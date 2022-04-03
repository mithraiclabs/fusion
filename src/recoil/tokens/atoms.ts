import { atomFamily } from "recoil";

/**
 * Map of token mint addresses to their price
 */
export const tokenPricesMap = atomFamily<number | null, string>({
  key: "tokenPricesMap",
  default: null,
});
