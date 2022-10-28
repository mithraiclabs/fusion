import { Box, Theme } from "@mui/material";
import { SystemProps } from "@mui/system";
import React from "react";
import { OptionBreakdown } from "../../components/OptionBreakdown";
import { ExercisedOptionProvider } from "../../context/ExercisedOptionContext";

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
        <OptionBreakdown />
      </ExercisedOptionProvider>
    </Box>
  );
};
