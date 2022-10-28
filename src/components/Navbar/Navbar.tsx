import { Box, Button, Theme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { selectedWindowAtom } from "../../recoil/util";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { NavLogo } from "../Images/NavLogo";
import NetworkMenu from "./NetworkMenu";

const containerStyles = (theme: Theme) => ({
  display: "flex",
  maxHeight: "76px",
  minHeight: "76px",
  background: theme.palette.background.default,
  justifyContent: "center",
  color: "#3E3E3E",
  position: "sticky",
  top: 0,
  zIndex: 100,
});

const innerContainerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "left",
  marginLeft: "5em",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "65%",
  },
});

const rightContainerStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingRight: "10px",
  marginRight: 10,
  [theme.breakpoints.up("md")]: {
    paddingRight: 0,
  },
});

const styles = {
  connectBtn: {
    height: 40,
    width: 220,
    fontSize: 18,
    marginLeft: 3,
    padding: "2px 8px",
    borderRadius: "21px",
  },
};

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedWindow = useSetRecoilState(selectedWindowAtom);
  return (
    <Box sx={containerStyles}>
      <Box sx={innerContainerStyles}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            setSelectedWindow("Home");
          }}
        >
          <NavLogo />
        </Button>
      </Box>
      <Box sx={rightContainerStyles}>
        <ConnectWalletButton sx={styles.connectBtn} />
        <NetworkMenu />
      </Box>
    </Box>
  );
};
