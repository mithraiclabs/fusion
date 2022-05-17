import { Box, Button, Grid, makeStyles } from "@mui/material";
import React from "react";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { NavLogo } from "../Images/NavLogo";

const styles = {
  container: {
    display: "flex",
    height: 100,
    background: "#E6E6E6",
    color: "#3E3E3E",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    padding: "0 0 0 100px",
  },
  rightContainer: {
    padding: "0 100px 0 0",
  },
};

export const Navbar: React.FC = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.leftContainer}>
        <NavLogo />
      </Box>
      <Box sx={styles.rightContainer}>
        <ConnectWalletButton sx={{ height: 55, width: 200, fontSize: 18 }} />
      </Box>
    </Box>
  );
};
