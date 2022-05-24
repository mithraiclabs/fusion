import { useRecoilValue } from "recoil";
import { networkAtom } from "../recoil";

/**
 * Create a solana explorer link from a txId.
 */
export const useTxExplorerLink = (txId: string | null) => {
  const network = useRecoilValue(networkAtom);

  if (!txId) {
    return "";
  }

  return `https://solscan.io/tx/${txId}${
    network.host || network.key === "localnet"
      ? `?cluster=custom&customUrl=${network.url}`
      : `?cluster=${network.key}`
  }`;
};
