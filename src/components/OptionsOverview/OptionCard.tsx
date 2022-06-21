import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { mapNetworkTypes } from "../../lib/utils";
import projectList from "../../projects/projectList";
import { networkAtom } from "../../recoil";
import { DEFAULT_TEXT_COLOR, BORDER_COLOR } from "../../Theme";

const pillStyles: Record<string, SxProps<Theme>> = {
  container: {
    border: `2px solid ${DEFAULT_TEXT_COLOR}`,
    fontFamily: "Roboto",
    fontWeight: 400,
    borderRadius: 50,
    py: 0.5,
    px: 1.25,
  },
};

const Pill: React.FC = ({ children }) => {
  return <Box sx={pillStyles.container}>In Wallet</Box>;
};

const styles: Record<string, SxProps<Theme>> = {
  container: {
    backgroundColor: "#FBFBFB",
    border: "1px solid",
    borderRadius: "10px",
    my: 3,
  },
  top: {
    height: 100,
    px: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${BORDER_COLOR}`,
  },
  logoNameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: { height: 60, width: 60, display: "flex", mr: 2 },
};

export const OptionCard: React.FC<{
  projectKey: string;
}> = ({ projectKey, children }) => {
  const network = useRecoilValue(networkAtom);
  const project = projectList[mapNetworkTypes(network.key)][projectKey];

  return (
    <Box
      sx={{
        ...styles.container,
        ...{ borderColor: project.primaryColor || DEFAULT_TEXT_COLOR },
      }}
    >
      <Box sx={styles.top}>
        <Box sx={styles.logoNameContainer}>
          <Box sx={styles.logo}>
            <img src={project.logo} loading="lazy" />
          </Box>
          <Typography variant="h3" component="h3">
            {project.name}
          </Typography>
        </Box>
        <Pill />
      </Box>
      {children}
    </Box>
  );
};
