import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { useExercisedOption } from "../../context/ExercisedOptionContext";
import { useLoadSplTokens } from "../../hooks/wallet";
import { DEFAULT_TEXT_COLOR } from "../../Theme";
import { Project } from "../../types";
import { Hr } from "../Hr";
import { JupiterWidget, PsyFinanceWidget, SolendWidget } from "./Widgets";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#FBFBFB",
    border: "1px solid",
    borderRadius: "10px",
    my: 1,
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
  useLoadSplTokens();
  const exercisedInfo = useExercisedOption();
  if (!project) return <h4>Success</h4>;
  return (
    <>
      <Box
        sx={{
          ...styles.container,
          ...{ borderColor: project.primaryColor || DEFAULT_TEXT_COLOR },
        }}
      >
        <Box sx={styles.topContainer}>
          <Box sx={styles.logo}>
            <img
              src={project.logo}
              loading="lazy"
              alt={`Logo of ${project.name}`}
              style={{ maxWidth: "100%" }}
            />
          </Box>
          <Typography variant="h3" component="h3">
            {project.name}
          </Typography>
        </Box>
        <Hr sx={styles.divider} />
        <Box>
          <Typography>
            Congrats, you exercised your tokens <br /> and received:
          </Typography>
          <Typography variant="h3" component="h3" color="textPrimary">
            {exercisedInfo.amount?.toFixed(2)} {project.symbol}
          </Typography>
        </Box>
      </Box>
      {project.suggestedActions?.map((actionType) => {
        switch (actionType) {
          case "PsyFinance":
            return (
              <Box sx={styles.container} key={actionType}>
                <PsyFinanceWidget symbol={project.symbol} />
              </Box>
            );
          case "Solend":
            return (
              <Box sx={styles.container} key={actionType}>
                <SolendWidget symbol={project.symbol} />
              </Box>
            );
          case "JupiterAg":
            return (
              <Box sx={styles.container} key={actionType}>
                <JupiterWidget />
              </Box>
            );
          default:
            return null;
        }
      })}
    </>
  );
};
