import { Box, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { MAX_PAGE_WIDTH } from "../../Theme";
import { Navbar } from "../Navbar";

const PageWrapper: React.FC = ({ children }) => {
  const theme = useTheme();
  const styles = useMemo(() => {
    return {
      container: {
        backgroundColor: theme.palette.background.default,
      },
      innerContainer: {
        margin: "auto",
        maxWidth: MAX_PAGE_WIDTH,
      },
    };
  }, [theme]);
  return (
    <Box sx={styles.container}>
      <Navbar></Navbar>
      <Box sx={styles.innerContainer}>{children}</Box>
    </Box>
  );
};

export default PageWrapper;
