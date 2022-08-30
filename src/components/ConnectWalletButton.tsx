import React, { useMemo } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const styles: Record<string, React.CSSProperties> = {
  baseButton: {
    color: "#F2F4F6 !important",
    backgroundColor: "#3E3E3E !important",
    borderRadius: "50px !important",
    // @ts-ignore
    textTransform: "none !important",
  },
};
export const ConnectWalletButton: React.VFC<{
  sx?: React.CSSProperties;
}> = ({ sx }) => {
  const { publicKey, wallet } = useWallet();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (!wallet || !base58) return "Connect Wallet";
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [wallet, base58]);

  return (
    <WalletMultiButton sx={{ ...styles.baseButton, ...sx }}>
      {content}
    </WalletMultiButton>
  );
};

export const FusionWalletButton: React.VFC = () => {
  return (
    <WalletMultiButton
      sx={{
        background: (theme) => theme.palette.secondary.dark,
        borderRadius: "8px",
        width: "100%",
        height: "53px",
        color: "white",
        marginTop: "25px",
        "&:hover": {
          background: (theme) => `${theme.palette.secondary.dark}d3`,
        },
      }}
    >
      Please Connect Wallet
    </WalletMultiButton>
  );
};
