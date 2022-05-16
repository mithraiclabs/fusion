import { Box, makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React from "react";
import { MAX_PAGE_WIDTH } from "../../Theme";
import { Navbar } from "../Navbar";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      backgroundColor: theme.palette.background.default,
    },
    innerContainer: {
      margin: "auto",
      maxWidth: MAX_PAGE_WIDTH,
    },
  };
});

const PageWrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Navbar></Navbar>
      <Box className={classes.innerContainer}>{children}</Box>
    </Box>
  );
};

export default PageWrapper;
