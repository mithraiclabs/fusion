import React, { useState, createContext, useContext, useEffect } from "react";
import { AccountLayout } from "@solana/spl-token";
import { useConnection } from "../hooks/useConnection";

const SolanaMetaContext = createContext<{
  splTokenAccountRentBalance?: number | null;
}>({
  splTokenAccountRentBalance: null,
});

export const useSolanaMeta = () => useContext(SolanaMetaContext);

export const SolanaMetaProvider: React.FC = ({ children }) => {
  const connection = useConnection();
  const [splTokenAccountRentBalance, setSplTokenAccountRentBalance] =
    useState(0);

  useEffect(() => {
    (async () => {
      try {
        const rentBalance = await connection.getMinimumBalanceForRentExemption(
          AccountLayout.span
        );
        setSplTokenAccountRentBalance(rentBalance);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [connection]);

  return (
    <SolanaMetaContext.Provider
      value={{
        splTokenAccountRentBalance,
      }}
    >
      {children}
    </SolanaMetaContext.Provider>
  );
};
