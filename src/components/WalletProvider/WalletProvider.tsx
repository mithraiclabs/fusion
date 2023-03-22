import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { useRecoilValue } from "recoil";
import { networkAtom } from "../../recoil";

export const PsyWalletProvider: React.FC = ({ children }) => {
  const network = useRecoilValue(networkAtom);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({
        network: network.key as WalletAdapterNetwork,
      }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network: network.key as WalletAdapterNetwork }),
      new SolletExtensionWalletAdapter({
        network: network.key as WalletAdapterNetwork,
      }),
    ],
    [network]
  );

  return (
    <ConnectionProvider
      endpoint={network.url}
      config={{
        wsEndpoint: network.ws,
        disableRetryOnRateLimit: true,
        confirmTransactionInitialTimeout: 10000,
      }}
    >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
