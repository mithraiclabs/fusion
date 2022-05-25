import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { useExercisedOption } from "../../context/ExercisedOptionContext";
import { DEFAULT_TEXT_COLOR } from "../../Theme";
import { Project } from "../../types";
import { Hr } from "../Hr";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#FBFBFB",
    border: "1px solid",
    borderRadius: "10px",
    my: 3,
    py: 3,
    width: "100%",
    height: "100%",
  },
  topContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
  },
  divider: {
    my: 3,
  },
};

export const ExerciseSuccess: React.VFC<{ project: Project }> = ({
  project,
}) => {
  const exercisedInfo = useExercisedOption();
  return (
    <Box
      sx={{
        ...styles.container,
        ...{ borderColor: project.primaryColor || DEFAULT_TEXT_COLOR },
      }}
    >
      <Box sx={styles.topContainer}>
        <Box sx={styles.logo}>
          <img src={project.logo} loading="lazy" style={{ maxWidth: "100%" }} />
        </Box>
        <Typography variant="h3" component="h3">
          {project.name}
        </Typography>
      </Box>
      <Hr sx={styles.divider} />
      <Box>
        <Typography>
          Congrats, you exercised your
          <br /> tokens and received
        </Typography>
        <Typography variant="h3" component="h3" color="textPrimary">
          {exercisedInfo.amount?.toFixed(2)} {project.symbol}
        </Typography>
      </Box>
    </Box>
  );
};
