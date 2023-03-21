import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { spotPriceMap } from "../../recoil/util";
import { PriceData } from "../../recoil";

export const COINGECKOBASE = "https://api.coingecko.com/api/v3";
// this is also used as backup when pyth takes a while to start spitting out prices
const pythlessTokens = {
  "socean-staked-sol": "scnSOL",
  serum: "SRM",
  solana: "SOL",
  bitcoin: "BTC",
  ethereum: "ETH",
  "lido-staked-sol": "stSOL",
  "dust-protocol": "DUST",
  bonk: "BONK",
  psyoptions: "PSY",
  solend: "SLND",
} as any;

export const useTokenPrice = () => {
  const [spotPrices, setSpotPrices] = useRecoilState(spotPriceMap);

  useEffect(() => {
    axios
      .get(`${COINGECKOBASE}/simple/price`, {
        params: {
          ids: Object.keys(pythlessTokens).join(","),
          vs_currencies: "USD",
          include_24hr_change: "true",
        },
      })
      .then((res) => {
        const { data } = res;
        const prices = JSON.parse(JSON.stringify(spotPrices)) as PriceData;
        for (const [index, priceData] of Object.entries(data)) {
          const apiName = index;
          const token = pythlessTokens[apiName as keyof any];
          const { usd: price, usd_24h_change: change } = priceData as any;

          if (price)
            prices[token] = {
              price,
              change,
              lastChanged: Number(new Date()),
            };
        }
        setSpotPrices(prices);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
