import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { TokenAccountWithKey } from "../../recoil";
import { Project } from "../../types";
import { useOptionBreakdown } from "../../hooks/useOptionBreakdown";
import { Box } from "@mui/system";
import { PAPER_COLOR } from "../../Theme";

export const StatBox: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "16px",
        gap: "4px",
        minWidth: "180px",
        maxHeight: "79px",
        background: PAPER_COLOR,
        borderRadius: "6px",
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <Typography
        variant="h4"
        sx={{
          ...(value.length > 13 && {
            fontSize: "18px",
          }),
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export const SimpleInstrinsicBreakdown: React.VFC<{
  optionMeta: OptionMarketWithKey;
  optionTokenAccount: TokenAccountWithKey;
  project: Project;
}> = ({ optionMeta, optionTokenAccount, project }) => {
  const breakdown = useOptionBreakdown({
    optionMeta,
    tokenAccount: optionTokenAccount,
    project,
  });

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"stretch"}
      width={"664px"}
    >
      <StatBox
        title="Tokens to receive"
        value={`+ ${breakdown.underlyingToReceive.toFixed(2)} ${
          breakdown.underlyingSymbol
        }`}
      />

      <StatBox
        title="Cost to exercise"
        value={`- ${breakdown.quoteToExercise.toFixed(2)} ${
          breakdown.quoteSymbol
        }`}
      />

      <StatBox
        title="Net Value"
        value={`${
          Math.sign(breakdown.netValue ?? 0) === -1 ? "-" : ""
        }$ ${Math.abs(breakdown.netValue ?? 0).toFixed(2)} ${
          breakdown.quoteSymbol
        }`}
      />
    </Stack>
  );
};
