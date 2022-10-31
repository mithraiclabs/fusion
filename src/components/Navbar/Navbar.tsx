import { Box, Button, Stack, SwipeableDrawer, Theme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { selectedWindowAtom, WindowType } from "../../recoil/util";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { NavLogo } from "../Images/NavLogo";
import NetworkMenu from "./NetworkMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { Dashboard } from "../../pages/Home";
import { useWallet } from "@solana/wallet-adapter-react";
import { SMALL_SCREEN_WIDTH } from "../../Theme";

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
  const [selectedWindow, setSelectedWindow] =
    useRecoilState(selectedWindowAtom);
  const handleNavigate = (type: WindowType) => {
    setSelectedWindow(type);
    if (type === "Home") {
      navigate("/");
    }
  };
  const { publicKey } = useWallet();
  const { width } = useWindowDimensions();
  const [drawerOpen, setDrawerOpen] = useState(false);
  if (width < SMALL_SCREEN_WIDTH) {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        paddingTop={"6px"}
      >
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            setSelectedWindow("Home");
          }}
        >
          <NavLogo height="28px" />
        </Button>
        <SwipeableDrawer
          anchor={"left"}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
        >
          <Box
            sx={{
              width: "85vw",
              padding: "10px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              overflowY: "scroll",
              height: "100vh",
            }}
          >
            <NetworkMenu />
            <Dashboard
              navigationHandler={handleNavigate}
              selectedWindow={selectedWindow}
              walletConnected={!!publicKey}
              width={width * 0.85}
            />
          </Box>
        </SwipeableDrawer>
        <Button
          onClick={() => setDrawerOpen(true)}
          sx={{
            color: "black",
          }}
        >
          <MenuIcon />
        </Button>
      </Stack>
    );
  }
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
