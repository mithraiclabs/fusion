import { Box, Theme } from "@mui/material";
import { SystemProps } from "@mui/system";
import React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { ExercisedOptionProvider } from "../../context/ExercisedOptionContext";
import { ExerciseFlowRouter } from "./ExerciseFlowRouter";

const innerContainerStyles = (theme: Theme): SystemProps<Theme> => ({
  maxWidth: "1000px",
  [theme.breakpoints.up("md")]: {
    width: "50%",
    minWidth: "600px",
  },
});

export const Option: React.VFC = () => {
  return (
    <Box sx={innerContainerStyles}>
      <ExercisedOptionProvider>
        <ExerciseFlowRouter />
      </ExercisedOptionProvider>
    </Box>
  );
};
