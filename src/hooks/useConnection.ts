import { useMemo } from "react";
import * as anchor from "@project-serum/anchor";
import { useRecoilValue } from "recoil";
import { networkAtom } from "../recoil";

/**
 * Anchor Provider
 */
export const useConnection = () => {
  const network = useRecoilValue(networkAtom);

  return useMemo(
    () =>
      new anchor.web3.Connection(network.url, {
        commitment: "processed",
      }),
    [network.url]
  );
};
