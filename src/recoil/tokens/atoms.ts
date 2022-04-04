import { atomFamily } from "recoil";
import { SerumOrderBook } from "./types";

/**
 * Map of token mint addresses to their price
 */
export const tokenPricesMap = atomFamily<number | null, string>({
  key: "tokenPricesMap",
  default: null,
});

/**
 * Map of token mint address to the OrderBook
 */
export const tokenSerumBookMap = atomFamily<SerumOrderBook | null, string>({
  key: "tokenSerumBookMap",
  default: null,
});
