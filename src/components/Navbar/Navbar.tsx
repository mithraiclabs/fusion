import { Box, Button, SxProps, Theme, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HEADER_TEXT_COLOR } from "../../Theme";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { NavLogo } from "../Images/NavLogo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GetAppIcon from "@mui/icons-material/GetApp";
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
  justifyContent: "space-around",
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

const navIconStyle = {
  fontWeight: 500,
  fontSize: 30,
  color: HEADER_TEXT_COLOR,
} as SxProps;

const styles = {
  connectBtn: { height: 55, width: 200, fontSize: 18 },
};

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={containerStyles}>
      <Box sx={innerContainerStyles}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <NavLogo />
        </Button>
      </Box>
      <Box sx={innerContainerStyles}>
        <Tooltip title="Create Airdrop">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/airdrop");
            }}
          >
            <AddCircleOutlineIcon sx={navIconStyle} />
          </Button>
        </Tooltip>
      </Box>
      <Box sx={innerContainerStyles}>
        <Tooltip title="Claim Airdrop">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/claim");
            }}
          >
            <GetAppIcon sx={navIconStyle} />
          </Button>
        </Tooltip>
      </Box>
      <Box sx={rightContainerStyles}>
        <ConnectWalletButton sx={styles.connectBtn} />
        <NetworkMenu />
      </Box>
    </Box>
  );
};
