import { useEffect } from "react";
import axios from "axios";

export const COINGECKOBASE = "https://api.coingecko.com/api/v3";

const prices: {
  [symbol: string]: {
    price: number;
    change: number;
    lastChanged: number;
  };
} = {};

// this is also used as backup when pyth takes a while to start spitting out prices
const tokenSymbolMap = {
  "socean-staked-sol": "scnSOL",
  serum: "SRM",
  solana: "SOL",
  bitcoin: "BTC",
  ethereum: "ETH",
  "lido-staked-sol": "stSOL",
  "dust-protocol": "DUST",
  psyoptions: "PSY",
} as any;

export const useTokenPrice = () => {
  useEffect(() => {
    const priceObj = Object.values(prices)[0];
    if (!priceObj || priceObj.lastChanged < Date.now() - 10000) {
      axios
        .get(`${COINGECKOBASE}/simple/price`, {
          params: {
            ids: Object.keys(tokenSymbolMap).join(","),
            vs_currencies: "USD",
            include_24hr_change: "true",
          },
        })
        .then((res) => {
          const { data } = res;
          for (const [index, priceData] of Object.entries(data)) {
            const apiName = index;
            const token = tokenSymbolMap[apiName as keyof any];
            const { usd: price, usd_24h_change: change } = priceData as any;

            if (price)
              prices[token] = {
                price,
                change,
                lastChanged: Number(new Date()),
              };
          }
        });
    }
  }, []);

  return prices;
};
