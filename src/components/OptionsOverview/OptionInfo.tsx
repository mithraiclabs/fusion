import React from "react";
import { Button, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
  tokenPricesMap,
} from "../../recoil";
import { DEFAULT_TEXT_COLOR } from "../../Theme";

const styles: Record<string, SxProps<Theme>> = {
  bottom: {
    height: 150,
    px: 3,
    alignItems: "center",
  },
  exerciseGridItem: {
    display: "flex",
    justifyContent: "flex-end",
  },
  exerciseBtn: {
    height: 60,
    width: 200,
    fontSize: "1.3em",
    borderRadius: "6px",
    textTransform: "none",
  },
};

export const OptionInfo: React.VFC<{
  projectKey: string;
  optionMetaKey: string;
  tokenAccountKey: string;
}> = ({ projectKey, optionMetaKey, tokenAccountKey }) => {
  const navigate = useNavigate();
  const network = useRecoilValue(networkAtom);

  const optionMeta = useRecoilValue(optionMarketFamily(optionMetaKey));
  const tokenAccount = useRecoilValue(tokenAccountsMap(tokenAccountKey));
  const project = projectList[mapNetworkTypes(network.key)][projectKey];
  const tokenPrice = useRecoilValue(tokenPricesMap(project.mintAddress));
  if (!optionMeta) {
    throw new Error(`Could not find OptionMarket with key ${optionMetaKey}`);
  }
  let expirationDate = "",
    strike = "";
  if (optionMeta) {
    strike = displayStrikePrice(optionMeta);
    expirationDate = displayExpirationDate(optionMeta);
  }
  return (
    <Grid container sx={styles.bottom}>
      <Grid item md={3}>
        <Typography variant="body1" component="div">
          Expires
        </Typography>
        <Typography variant="body2" component="div">
          {expirationDate}
        </Typography>
      </Grid>
      <Grid item md={3}>
        <Typography variant="body1" component="div">
          Amount
        </Typography>
        <Typography variant="body2" component="div">
          {tokenAccount?.amount} @ {strike} strike
        </Typography>
      </Grid>
      <Grid item md={3}>
        <Typography variant="body1" component="div">
          Current Price
        </Typography>
        {/* TODO: Make precision token/project specific? How to handle coins with many decimals and low value? */}
        <Typography variant="body2" component="div">
          1 {project.symbol} = ${tokenPrice?.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item md={3} sx={styles.exerciseGridItem}>
        <Button
          variant="contained"
          sx={{
            ...styles.exerciseBtn,
            ...{
              backgroundColor: project.primaryColor || DEFAULT_TEXT_COLOR,
            },
          }}
          onClick={() => {
            navigate(`/option/${optionMeta.key.toString()}`);
          }}
        >
          Exercise
        </Button>
      </Grid>
    </Grid>
  );
};
