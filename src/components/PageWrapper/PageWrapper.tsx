import { Box, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { Navbar } from "../Navbar";
import { SnackBarProvider } from "../../context/SnackBarContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const PageWrapper: React.FC = ({ children }) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();
  const styles = useMemo(() => {
    return {
      container: {
        backgroundColor: theme.palette.background.default,
        minHeight: `${height}px`,
      },
      innerContainer: {
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    };
  }, [theme, height]);
  return (
    <Box sx={styles.container}>
      <SnackBarProvider>
        <Navbar />
        <Box sx={styles.innerContainer}>{children}</Box>
      </SnackBarProvider>
    </Box>
  );
};

export default PageWrapper;
