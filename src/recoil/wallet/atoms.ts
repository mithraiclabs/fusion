import { atom, atomFamily } from "recoil";
import { TokenAccountWithKey, OwnedOptionKeys } from "./types";

/**
 * store the info from the SPL Token Account owned by
 * the connected wallet.
 */
export const tokenAccountsMap = atomFamily<TokenAccountWithKey | null, string>({
  key: "tokenAccountsMap",
  default: null,
});

/**
 * List of all stored token mints within tokenAccountsMap.
 */
export const tokenAccountKeys = atom<string[]>({
  key: "tokenAccountKeys",
  default: [],
});
