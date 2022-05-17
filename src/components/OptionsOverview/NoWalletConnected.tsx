import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { ConnectWalletButton } from "../ConnectWalletButton";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pt: 29,
  },
};

const NoWalletConnected: React.VFC = () => {
  return (
    <Box sx={styles.container}>
      <ConnectWalletButton sx={{ height: 78, width: 358, fontSize: 36 }} />
      <Typography variant="body1" component="p" color="textPrimary">
        Connect your wallet to see available options to claim
      </Typography>
      <Typography variant="body1" component="p" color="textPrimary">
        Follow our{" "}
        <Link
          href="https://twitter.com/PsyOptions"
          target={"_blank"}
          color="textPrimary"
        >
          twitter
        </Link>{" "}
        to get updates on upcoming airdrops or visit our{" "}
        <Link
          href="https://docs.psyoptions.io/"
          target="_blank"
          color="textPrimary"
        >
          docs
        </Link>{" "}
        to see a list of our partners.
      </Typography>
    </Box>
  );
};

export default NoWalletConnected;
