import { Box, Button, SxProps, Theme, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { HEADER_TEXT_COLOR } from "../../Theme";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { NavLogo } from "../Images/NavLogo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
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
  connectBtn: { height: 55, width: 200, fontSize: 18, marginLeft: 3 },
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
        <Tooltip title="Recover Underlying/Rent for Expired Options">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/recover");
            }}
          >
            <EventRepeatIcon sx={navIconStyle} />
          </Button>
        </Tooltip>
      </Box>
      <Box sx={rightContainerStyles}>
        <NetworkMenu />
        <ConnectWalletButton sx={styles.connectBtn} />
      </Box>
    </Box>
  );
};
