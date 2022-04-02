import { PublicKey } from "@solana/web3.js";
import { useRecoilCallback, useRecoilTransaction_UNSTABLE } from "recoil";
import { tokenAccountKeys, tokenAccountsMap } from ".";
import { TokenAccountWithKey } from "./types";
import { useConnection } from "@solana/wallet-adapter-react";
import { deserializeSplTokenAccount } from "../../lib/deserializeSplTokenAccount";

/**
 * Insert all of the token accounts.
 */
export const useUpdateAllSplTokenAccounts = () =>
  useRecoilTransaction_UNSTABLE<[TokenAccountWithKey[], boolean]>(
    ({ get, reset, set }) =>
      (splTokenAccounts, shouldReset) => {
        if (shouldReset) {
          const keys = get(tokenAccountKeys);
          keys.forEach((key) => {
            reset(tokenAccountsMap(key));
          });
        }
        set(
          tokenAccountKeys,
          splTokenAccounts.map((a) => a.mint.toString())
        );
        splTokenAccounts.forEach((splTokenAccount) => {
          set(
            tokenAccountsMap(splTokenAccount.mint.toString()),
            splTokenAccount
          );
        });
      },
    []
  );

/**
 * Upsert TokenAccount into recoil state.
 */
export const useGetSplTokenAccount = () => {
  const { connection } = useConnection();
  return useRecoilCallback<[PublicKey], void>(
    ({ set }) =>
      async (splTokenAccountAddress) => {
        const accountInfo = await connection.getAccountInfo(
          splTokenAccountAddress
        );
        if (!accountInfo) {
          return;
        }
        const decoded = deserializeSplTokenAccount(accountInfo);
        set(tokenAccountsMap(decoded.mint.toString()), {
          ...decoded,
          key: splTokenAccountAddress,
        });
      },
    [connection]
  );
};
