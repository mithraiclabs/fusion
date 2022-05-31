import { Box, Theme } from "@mui/material";
import React from "react";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { NavLogo } from "../Images/NavLogo";

const containerStyles = (theme: Theme) => ({
  display: "flex",
  height: 100,
  background: "#E6E6E6",
  justifyContent: "center",
  color: "#3E3E3E",
});

const innerContainerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "65%",
  },
});

const leftContainerStyles = (theme: Theme) => ({
  paddingLeft: "10px",
  [theme.breakpoints.up("md")]: {
    paddingLeft: 0,
  },
});

const rightContainerStyles = (theme: Theme) => ({
  paddingRight: "10px",
  [theme.breakpoints.up("md")]: {
    paddingRight: 0,
  },
});

const styles = {
  connectBtn: { height: 55, width: 200, fontSize: 18 },
};

export const Navbar: React.FC = () => {
  return (
    <Box sx={containerStyles}>
      <Box sx={innerContainerStyles}>
        <Box sx={leftContainerStyles}>
          <NavLogo />
        </Box>
        <Box sx={rightContainerStyles}>
          <ConnectWalletButton sx={styles.connectBtn} />
        </Box>
      </Box>
    </Box>
  );
};
