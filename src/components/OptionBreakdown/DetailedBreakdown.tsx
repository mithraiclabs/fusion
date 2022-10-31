import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import {
  Box,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { useOptionBreakdown } from "../../hooks/useOptionBreakdown";
import { displayStrikePrice, mapNetworkTypes } from "../../lib/utils";
import { networkAtom, TokenAccountWithKey } from "../../recoil";
import {
  DEFAULT_TEXT_COLOR,
  DESKTOP_PAPER_WIDTH,
  PAPER_COLOR,
} from "../../Theme";
import { Project } from "../../types";
import { ExerciseForm } from "../ExerciseForm";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "24px",
    width: DESKTOP_PAPER_WIDTH,
    backgroundColor: PAPER_COLOR,
    borderRadius: "6px",
    my: 3,
    paddingTop: "5px",
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
    tokenAccount: optionTokenAccount,
    project,
  });
  return (
    <Box
      sx={{
        ...styles.container,
        ...{ borderColor: project.primaryColor || DEFAULT_TEXT_COLOR },
      }}
    >
      <Table
        size="small"
        sx={{
          "& td": {
            borderBottom: "none",
          },
          "& td:nth-child(even)": {
            textAlign: "right",
          },
        }}
      >
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="body1">
                {breakdown.underlyingSymbol} current price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                ${breakdown.underlyingPrice?.toFixed(2)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Strike Price</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {displayStrikePrice(optionMeta, mapNetworkTypes(network.key))}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Expiry Date</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {breakdown.expirationDate}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">
                Value of underlying {breakdown.underlyingSymbol}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                ${breakdown.underlyingValue?.toFixed(2)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Total cost to exercise</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                ${breakdown.quoteToExercise?.toFixed(2)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Net Value</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">
                {breakdown.netValue && (
                  <>
                    {Math.sign(breakdown.netValue) === -1 ? "-" : ""}$
                    {Math.abs(breakdown.netValue).toFixed(2)}{" "}
                    {breakdown.quoteSymbol}
                  </>
                )}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ExerciseForm optionMarketKey={optionMeta.key.toString()} />
    </Box>
  );
};
