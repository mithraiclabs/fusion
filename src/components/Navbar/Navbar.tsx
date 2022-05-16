import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { NavLogo } from "../Images/NavLogo";

const useStyles = makeStyles((theme) => {
  return {
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
});

export const Navbar: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.leftContainer}>
        <NavLogo />
      </Box>
      <Box className={classes.rightContainer}>
        <ConnectWalletButton style={{ height: 55, width: 200, fontSize: 18 }} />
      </Box>
    </Box>
  );
};
