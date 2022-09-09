import { useWallet } from "@solana/wallet-adapter-react";
import NoWalletConnected from "../OptionsOverview/NoWalletConnected";
import { WriterDisplay } from "./WriterDisplay";

export const WriterOverview: React.VFC = () => {
  const { publicKey } = useWallet();

  return publicKey ? <WriterDisplay /> : <NoWalletConnected />;
};
