import { Box, SxProps, Theme } from "@mui/material";
import React from "react";
import { ExerciseSuccess } from "../../components/ExerciseSuccess";
import projectList from "../../content/projectList";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    maxWidth: "1097px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    my: 10,
    borderRadius: "10px",
  },
};

export const AfterExercise: React.VFC = () => {
  const project = projectList["SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp"];
  return (
    <Box sx={styles.container}>
      <ExerciseSuccess project={project} />
    </Box>
  );
};
