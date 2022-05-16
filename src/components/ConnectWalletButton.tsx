import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

export const ConnectWalletButton: React.VFC<{ style?: CSSProperties }> = ({
  style,
}) => {
  return <WalletMultiButton style={style}>Connect Wallet</WalletMultiButton>;
};
