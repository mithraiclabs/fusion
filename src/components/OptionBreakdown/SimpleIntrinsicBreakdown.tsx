import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { Box, Grid, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { TokenAccountWithKey, tokenPricesMap } from "../../recoil";
import { Project } from "../../types";
import { costToExercise, tokensToReceive } from "../../lib/utils";
import { useRecoilValue } from "recoil";
import { DEFAULT_TEXT_COLOR } from "../../Theme";
import { useOptionBreakdown } from "../../hooks/useOptionBreakdown";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    backgroundColor: "#FBFBFB",
    border: "1px solid",
    borderRadius: "10px",
    my: 3,
    textAlign: "center",
    py: 3,
  },
};

const GridHeader: React.FC = ({ children }) => {
  return <Typography>{children}</Typography>;
};

const BreakdownValue: React.FC = ({ children }) => {
  return <Typography>{children}</Typography>;
};

export const SimpleInstrinsicBreakdown: React.VFC<{
  optionMeta: OptionMarketWithKey;
  optionTokenAccount: TokenAccountWithKey;
  project: Project;
}> = ({ optionMeta, optionTokenAccount, project }) => {
  const breakdown = useOptionBreakdown({
    optionMeta,
    optionTokenAccount,
    project,
  });

  return (
    <Grid
      container
      sx={{
        ...styles.container,
        ...{ borderColor: project.primaryColor || DEFAULT_TEXT_COLOR },
      }}
    >
      <Grid item xs={4}>
        <GridHeader>Tokens to receive</GridHeader>
        <BreakdownValue>
          + {breakdown.underlyingToReceive.toFixed(2)}{" "}
          {breakdown.underlyingSymbol}
        </BreakdownValue>
      </Grid>

      <Grid item xs={4}>
        <GridHeader>Cost to exercise</GridHeader>
        <BreakdownValue>
          - {breakdown.quoteToExercise.toFixed(2)} {breakdown.quoteSymbol}
        </BreakdownValue>
      </Grid>

      <Grid item xs={4}>
        <GridHeader>Net Value</GridHeader>
        {breakdown.netValue && (
          <BreakdownValue>
            {Math.sign(breakdown.netValue) === -1 ? "-" : ""}$
            {Math.abs(breakdown.netValue).toFixed(2)} {breakdown.quoteSymbol}
          </BreakdownValue>
        )}
      </Grid>
    </Grid>
  );
};
