import { Box, Button, Grid, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import projectList from "../../content/projectList";
import { displayExpirationDate, displayStrikePrice } from "../../lib/utils";
import {
  optionMarketFamily,
  tokenAccountsMap,
  tokenPricesMap,
} from "../../recoil";
import { DEFAULT_TEXT_COLOR, BORDER_COLOR } from "../../Theme";

const pillStyles: Record<string, SxProps<Theme>> = {
  container: {
    border: `2px solid ${DEFAULT_TEXT_COLOR}`,
    borderRadius: 50,
    py: 0.5,
    px: 1.25,
  },
};

const Pill: React.FC = ({ children }) => {
  return <Box sx={pillStyles.container}>In Wallet</Box>;
};

const styles: Record<string, SxProps<Theme>> = {
  container: {
    backgroundColor: "#FBFBFB",
    border: "1px solid",
    borderRadius: "10px",
    my: 3,
  },
  top: {
    height: 100,
    px: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${BORDER_COLOR}`,
  },
  logoNameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: { height: 60, width: 60, display: "flex", mr: 2 },
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

export const OptionCard: React.VFC<{
  projectKey: string;
  optionMetaKey: string;
  tokenAccountKey: string;
}> = ({ projectKey, optionMetaKey, tokenAccountKey }) => {
  const navigate = useNavigate();
  const optionMeta = useRecoilValue(optionMarketFamily(optionMetaKey));
  if (!optionMeta) {
    throw new Error(`Could not find OptionMarket with key ${optionMetaKey}`);
  }
  const tokenAccount = useRecoilValue(tokenAccountsMap(tokenAccountKey));
  const project = projectList[projectKey];
  const tokenPrice = useRecoilValue(tokenPricesMap(project.mintAddress));
  let expirationDate = "",
    strike = "";
  if (optionMeta) {
    strike = displayStrikePrice(optionMeta);
    expirationDate = displayExpirationDate(optionMeta);
  }

  return (
    <Box
      sx={{
        ...styles.container,
        ...{ borderColor: project.primaryColor || DEFAULT_TEXT_COLOR },
      }}
    >
      <Box sx={styles.top}>
        <Box sx={styles.logoNameContainer}>
          <Box sx={styles.logo}>
            <img src={project.logo} loading="lazy" />
          </Box>
          <Typography variant="h3" component="h3">
            {project.name}
          </Typography>
        </Box>
        <Pill />
      </Box>
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
    </Box>
  );
};
