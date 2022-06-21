import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { useOptionBreakdown } from "../../hooks/useOptionBreakdown";
import { displayStrikePrice, mapNetworkTypes } from "../../lib/utils";
import { networkAtom, TokenAccountWithKey } from "../../recoil";
import { DEFAULT_TEXT_COLOR } from "../../Theme";
import { Project } from "../../types";
import { Hr } from "../Hr";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FBFBFB",
    border: "1px solid",
    borderRadius: "10px",
    my: 3,
    py: 3,
  },
  lineItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    my: 2,
    px: 3,
  },
  divider: {
    my: 3,
  },
};

export const DetailedBreakdown: React.VFC<{
  optionMeta: OptionMarketWithKey;
  optionTokenAccount: TokenAccountWithKey;
  project: Project;
}> = ({ optionMeta, optionTokenAccount, project }) => {
  const network = useRecoilValue(networkAtom);
  const breakdown = useOptionBreakdown({
    optionMeta,
    optionTokenAccount,
    project,
  });
  return (
    <Box
      sx={{
        ...styles.container,
        ...{ borderColor: project.primaryColor || DEFAULT_TEXT_COLOR },
      }}
    >
      <Box sx={styles.lineItem}>
        <Typography>{breakdown.underlyingSymbol} current price</Typography>
        <Typography variant="h4" component="p">
          ${breakdown.underlyingPrice?.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={styles.lineItem}>
        <Typography>Strike Price</Typography>
        <Typography variant="h4" component="p">
          {displayStrikePrice(optionMeta, mapNetworkTypes(network.key))}
        </Typography>
      </Box>

      <Box sx={styles.lineItem}>
        <Typography>Expiry Date</Typography>
        <Typography variant="h4" component="p">
          {breakdown.expirationDate}
        </Typography>
      </Box>

      <Hr sx={styles.divider} />

      <Box sx={styles.lineItem}>
        <Typography>
          Value of underlying {breakdown.underlyingSymbol}
        </Typography>
        <Typography variant="h4" component="p">
          ${breakdown.underlyingValue?.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={styles.lineItem}>
        <Typography>Total cost to exercise</Typography>
        <Typography variant="h4" component="p">
          ${breakdown.quoteToExercise?.toFixed(2)}
        </Typography>
      </Box>

      <Hr sx={styles.divider} />

      <Box sx={styles.lineItem}>
        <Typography>Net Value</Typography>
        <Typography variant="h4" component="p">
          {breakdown.netValue && (
            <>
              {Math.sign(breakdown.netValue) === -1 ? "-" : ""}$
              {Math.abs(breakdown.netValue).toFixed(2)} {breakdown.quoteSymbol}
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
};
