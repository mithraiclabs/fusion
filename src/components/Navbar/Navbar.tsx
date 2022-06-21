import { Box, Theme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { NavLogo } from "../Images/NavLogo";
import NetworkMenu from "./NetworkMenu";

const containerStyles = (theme: Theme) => ({
  display: "flex",
  maxHeight: "76px",
  minHeight: "76px",
  background: theme.palette.secondary.main,
  justifyContent: "center",
  color: "#3E3E3E",
  position: "sticky",
  border: `2px solid ${theme.palette.secondary.light}`,
  top: 0,
  zIndex: 100,
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
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingRight: "10px",
  [theme.breakpoints.up("md")]: {
    paddingRight: 0,
  },
});

const styles = {
  connectBtn: { height: 55, width: 200, fontSize: 18 },
};

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={containerStyles}>
      <Box sx={innerContainerStyles}>
        <Box
          sx={leftContainerStyles}
          onClick={() => {
            navigate("/");
          }}
        >
          <NavLogo />
        </Box>
        <Box sx={rightContainerStyles}>
          <ConnectWalletButton sx={styles.connectBtn} />
          <NetworkMenu />
        </Box>
      </Box>
    </Box>
  );
};
