import React, { useMemo } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core";
import { useWallet } from "@solana/wallet-adapter-react";

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
  const { publicKey, wallet } = useWallet();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (!wallet || !base58) return "Connect Wallet";
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [wallet, base58]);

  return (
    <WalletMultiButton className={classes.baseButton} style={style}>
      {content}
    </WalletMultiButton>
  );
};
