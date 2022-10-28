import { Box, SxProps, Theme, Typography } from "@mui/material";
import { BN } from "@project-serum/anchor";
import React from "react";
import { useExercisedOption } from "../../context/ExercisedOptionContext";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";
import { useLoadSplTokens } from "../../hooks/wallet";
import { PAPER_COLOR, SUCCESS_GREEN } from "../../Theme";
import { Project } from "../../types";
import { JupiterWidget, PsyFinanceWidget, SolendWidget } from "./Widgets";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: PAPER_COLOR,
    border: "1px solid",
    borderRadius: "6px",
    marginBottom: 1,
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
  const tokens = useNetworkTokens();
  const underlyingToken =
    tokens[exercisedInfo.optionMarket?.underlyingAssetMint.toString() ?? ""];
  const u64Amount =
    exercisedInfo.optionMarket?.underlyingAmountPerContract.muln(
      Number(exercisedInfo?.amount)
    ) ?? new BN(0);
  const amount = u64Amount.toNumber() / Math.pow(10, underlyingToken.decimals);
  if (!project) return <h4>Success</h4>;
  return (
    <>
      <Box
        sx={{
          ...styles.container,
          ...{ borderColor: SUCCESS_GREEN },
        }}
      >
        <Box sx={styles.topContainer}>
          <Typography fontSize={65}>🎉</Typography>
        </Box>
        <Box>
          <Typography>
            Congrats, you exercised your tokens <br /> and received:
          </Typography>
          <Typography variant="h3" component="h3" color="textPrimary">
            {amount} {project.symbol}
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
