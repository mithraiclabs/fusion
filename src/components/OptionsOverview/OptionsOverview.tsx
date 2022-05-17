import { useWallet } from "@solana/wallet-adapter-react";
import NoWalletConnected from "./NoWalletConnected";
import { OptionsDisplay } from "./OptionsDisplay";

export const OptionsOverview: React.VFC = () => {
  const { publicKey } = useWallet();

  return publicKey ? <OptionsDisplay /> : <NoWalletConnected />;
};
