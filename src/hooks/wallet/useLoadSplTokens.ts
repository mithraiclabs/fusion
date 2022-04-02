import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useEffect } from "react";
import {
  TokenAccountWithKey,
  useUpdateAllSplTokenAccounts,
} from "../../recoil";
import { deserializeSplTokenAccount } from "../../lib/deserializeSplTokenAccount";

export const useLoadSplTokens = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const updateAllSplTokenAccounts = useUpdateAllSplTokenAccounts();

  useEffect(() => {
    if (!publicKey) {
      return;
    }

    (async () => {
      try {
        const resp = await connection.getTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });
        const tokenAccounts: TokenAccountWithKey[] = resp.value.map(
          ({ account, pubkey }) => ({
            ...deserializeSplTokenAccount(account),
            key: pubkey,
          })
        );
        updateAllSplTokenAccounts(tokenAccounts, true);
      } catch (err) {
        // TODO show error notification
        console.error(err);
      }
    })();
  }, [connection, publicKey, updateAllSplTokenAccounts]);
};
