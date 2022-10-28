import React from "react";
import { Grid, SxProps, Theme, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import projectList from "../../projects/projectList";
import {
  displayExpirationDate,
  displayStrikePrice,
  mapNetworkTypes,
} from "../../lib/utils";
import {
  networkAtom,
  optionMarketFamily,
  tokenAccountsMap,
} from "../../recoil";
import { useTokenPrice } from "../../hooks/wallet/useTokenPrice";
import { PAPER_COLOR } from "../../Theme";

const styles: Record<string, SxProps<Theme>> = {
  bottom: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px",
    width: "664px",
    maxHeight: "69px",
    background: PAPER_COLOR,
    borderTop: "1px solid #AFAFAF",
    borderRadius: "0px 0px 6px 6px",
    alignSelf: "stretch",
    flexGrow: 0,
  },
  exerciseGridItem: {
    display: "flex",
    justifyContent: "flex-end",
  },
  exerciseBtn: {
    height: 60,
    width: "8em",
    fontSize: "1.3em",
    borderRadius: "6px",
    textTransform: "none",
    zIndex: 2,
  },
  bottomSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "16px",
    gap: "4px",
    width: "221.33px",
    height: "69px",
    background: (theme) => theme.palette.background.paper,
    flex: "none",
    order: 0,
    flexGrow: 1,
  },
};

export const OptionInfo: React.VFC<{
  projectKey: string;
  optionMetaKey: string;
  tokenAccountKey: string;
}> = ({ projectKey, optionMetaKey, tokenAccountKey }) => {
  const network = useRecoilValue(networkAtom);

  const optionMeta = useRecoilValue(optionMarketFamily(optionMetaKey));
  const tokenAccount = useRecoilValue(tokenAccountsMap(tokenAccountKey));
  const project = projectList[mapNetworkTypes(network.key)][projectKey];
  const prices = useTokenPrice();

  const tokenPrice = prices[project.symbol]?.price ?? 0;
  if (!optionMeta) {
    throw new Error(`Could not find OptionMarket with key ${optionMetaKey}`);
  }

  let expirationDate = "",
    timeZone = "",
    strike = "";
  if (optionMeta) {
    strike = displayStrikePrice(optionMeta, mapNetworkTypes(network.key));
    [expirationDate, timeZone] = displayExpirationDate(optionMeta);
  }
  return (
    <Grid container sx={styles.bottom}>
      <Grid
        item
        md={4}
        sx={{
          ...styles.bottomSection,
          borderRadius: "0px 0px 0px 6px",
        }}
      >
        <Typography
          variant="h5"
          component="h5"
          sx={{
            textAlign: "center",
            color: "#454545",
          }}
        >
          Amount / strike
        </Typography>
        <Typography variant="body2" component="p">
          {Number(tokenAccount?.amount)} @ {strike}
        </Typography>
      </Grid>
      <Grid
        item
        md={4}
        sx={{
          ...styles.bottomSection,
          borderWidth: "0px 1px",
          borderStyle: "solid",
          borderColor: "#AFAFAF",
        }}
      >
        <Typography
          variant="h5"
          component="h5"
          sx={{
            textAlign: "center",
            color: "#454545",
          }}
        >
          Current Price
        </Typography>
        {/* TODO: Make precision token/project specific? How to handle coins with many decimals and low value? */}
        <Typography variant="body2" component="p">
          1 {project.symbol} = ${tokenPrice?.toFixed(2)}
        </Typography>
      </Grid>
      <Grid
        item
        md={4}
        sx={{
          ...styles.bottomSection,
          borderRadius: "0px 0px 6px 0px",
        }}
      >
        <Typography
          variant="h5"
          component="h5"
          sx={{
            textAlign: "center",
            color: "#454545",
          }}
        >
          Expires ({timeZone})
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={
            optionMeta.expired
              ? {
                  color: "red",
                }
              : {}
          }
        >
          {expirationDate}
        </Typography>
      </Grid>
    </Grid>
  );
};
