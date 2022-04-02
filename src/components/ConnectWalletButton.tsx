import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

require("@solana/wallet-adapter-react-ui/styles.css");

export const ConnectWalletButton: React.VFC = () => {
  return <WalletMultiButton />;
};
