import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  let baseButton = {};
  if (theme?.overrides?.MuiButtonBase?.root) {
    baseButton = theme?.overrides?.MuiButtonBase?.root;
  }
  return {
    baseButton,
  };
});

export const ConnectWalletButton: React.VFC<{ style?: CSSProperties }> = ({
  style,
}) => {
  const classes = useStyles();
  return (
    <WalletMultiButton className={classes.baseButton} style={style}>
      Connect Wallet
    </WalletMultiButton>
  );
};
