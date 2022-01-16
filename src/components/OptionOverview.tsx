import { Box, Card, CardContent } from "@material-ui/core";
import React from "react";
import {
  displayExpiration,
  displayHeader,
  displayProjectSymbol,
  displayQuoteToken,
  displayStrikePrice,
  displayUnderlyingAmt,
} from "../lib/optionMarketUtils";
import { MintInfoWithKey, OptionAccounts, Project } from "../types";
import styles from "../styles/OptionOverview.module.scss";
import { makeStyles } from "@material-ui/core";
/*
        {displayHeader(
          project,
          optionAccounts.optionMarket,
          mintInfos[optionAccounts.optionMarket.underlyingAssetMint.toString()],
          mintInfos[optionAccounts.optionMarket.quoteAssetMint.toString()]
        )}
*/

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      borderRadius: "10px",
      boxShadow: "0px 0px 10px 2px rgba(160,232,252);",
      borderColor: "rgb(160,232,252)",
      backgroundColor: "rgb(30, 30, 30)",
      borderWidth: "2px",
      //color: "rgb(22,22,16)",
      //display: "flex",
      //flexDirection: "grid",
      width: "500px",
      maxWidth: "800px",
      minWidth: "300px",
      //https://stackoverflow.com/questions/55059681/material-ui-responsive-based-on-element-size
    },
  },
}));

const OptionOverview: React.FC<{
  project: Project;
  optionAccounts: OptionAccounts;
  mintInfos: Record<string, MintInfoWithKey>;
}> = ({ optionAccounts, project, mintInfos }) => {
  //const classes = useStyles();
  return (
    <Card className={styles.outerCardContent}  onClick={() => {
      
      window.open("https://trade.psyoptions.io/#/");
    }}>
      
      <CardContent className={styles.cardContent}>
        <li>
          <p>
            Contract Size:{" "}
            {displayUnderlyingAmt(
              optionAccounts.optionMarket,
              mintInfos[
                optionAccounts.optionMarket.underlyingAssetMint.toString()
              ]
            )}
          </p>

          <p>Project Symbol: {displayProjectSymbol(project)}</p>

          <p>Expiration: {displayExpiration(optionAccounts.optionMarket)}</p>
        </li>
      </CardContent>
    </Card>
  );
};

export default OptionOverview;
