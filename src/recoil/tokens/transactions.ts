import { web3 } from "@project-serum/anchor";
import { Market } from "@project-serum/serum";
import { useCallback } from "react";
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { useProvider } from "../../hooks/useProvider";
import { selectOwnedProjects } from "../psyAmerican";
import { tokenPricesMap } from "./atoms";

export const useInsertTokenPrices = () =>
  useRecoilTransaction_UNSTABLE<[string[], number[]]>(
    ({ set }) =>
      (tokenMints, prices) => {
        tokenMints.forEach((mintAddress, index) => {
          set(tokenPricesMap(mintAddress), prices[index]);
        });
      },
    []
  );

export const useLoadAllTokenPrices = () => {
  const provider = useProvider();
  const ownedProjects = useRecoilValue(selectOwnedProjects);
  const updateState = useInsertTokenPrices();

  return useCallback(async () => {
    const prices = await Promise.all(
      ownedProjects.map(async (project) => {
        // TODO: Add util function that takes a Project and gets price.
        //  Add support for coingecko API.

        // Load the Serum market
        const market = await Market.load(
          provider.connection,
          new web3.PublicKey(project.serumUsdMarket),
          {},
          new web3.PublicKey(project.serumProgramId)
        );
        // Load the current order books
        const [bids, asks] = await Promise.all([
          market.loadBids(provider.connection),
          market.loadAsks(provider.connection),
        ]);

        const [bidPrice] = bids.getL2(1)[0];
        const [askPrice] = asks.getL2(1)[0];
        const price = (askPrice + bidPrice) / 2;
        return price;
      })
    );
    const tokenMints = ownedProjects.map((x) => x.mintAddress);
    updateState(tokenMints, prices);
  }, [provider.connection, ownedProjects, updateState]);
};
