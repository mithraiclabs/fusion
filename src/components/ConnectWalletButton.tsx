import React, { useMemo } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Box } from "@mui/system";
import { BORDER_RADIUS_1 } from "../Theme";

const styles: Record<string, React.CSSProperties> = {
  baseButton: {
    borderRadius: BORDER_RADIUS_1,
    textTransform: "uppercase",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
};

const WalletIcon = (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.2 3.55556V1.77778C16.2 0.797333 15.3927 0 14.4 0H2.7C1.2114 0 0 1.19644 0 2.66667V13.3333C0 15.2898 1.6146 16 2.7 16H16.2C17.1927 16 18 15.2027 18 14.2222V5.33333C18 4.35289 17.1927 3.55556 16.2 3.55556ZM14.4 11.5556H12.6V8H14.4V11.5556ZM2.7 3.55556C2.46827 3.54532 2.24946 3.44719 2.08915 3.28162C1.92883 3.11604 1.83936 2.89577 1.83936 2.66667C1.83936 2.43757 1.92883 2.2173 2.08915 2.05172C2.24946 1.88614 2.46827 1.78802 2.7 1.77778H14.4V3.55556H2.7Z"
      fill="#D6FF85"
    />
  </svg>
);

export const ConnectWalletButton: React.VFC<{
  sx?: React.CSSProperties;
}> = ({ sx }) => {
  const { publicKey, wallet } = useWallet();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (!wallet || !base58)
      return (
        <>
          {WalletIcon}
          <Box mx={0.4}></Box>Connect Wallet
        </>
      );
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [wallet, base58]);

  return (
    <WalletMultiButton
      sx={{
        ...styles.baseButton,
        ...sx,
        ...((!wallet || !base58) && {
          color: "secondary.dark",
          backgroundColor: "#000000 !important",
        }),
      }}
    >
      {content}
    </WalletMultiButton>
  );
};

export const FusionWalletButton: React.VFC = () => {
  return (
    <WalletMultiButton
      sx={{
        background: (theme) => theme.palette.secondary.dark,
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
