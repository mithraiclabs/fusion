import { useWallet } from "@solana/wallet-adapter-react";
import { Box } from "@mui/material";
import NoWalletConnected from "./NoWalletConnected";

export const OptionsOverview: React.VFC = () => {
  const { wallet } = useWallet();

  return wallet ? <Box>TODO: add options overview</Box> : <NoWalletConnected />;
};
