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
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
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
    <ConnectionProvider endpoint={network.url}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
