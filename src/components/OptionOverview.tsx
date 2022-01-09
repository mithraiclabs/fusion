import { Box, Card, CardContent} from "@material-ui/core";
import React from "react";
import { displayHeader } from "../lib/optionMarketUtils";
import { MintInfoWithKey, OptionAccounts, Project } from "../types";
import styles from "../styles/OptionOverview.module.scss";



/** @jsxImportSource theme-ui */

const OptionOverview: React.FC<{
  project: Project;
  optionAccounts: OptionAccounts;
  mintInfos: Record<string, MintInfoWithKey>;
}> = ({ optionAccounts, project, mintInfos }) => {
  return (
    <Card className = {styles["card"]} variant="outlined">
      <CardContent className = "card-content">
        {displayHeader(
          project,
          optionAccounts.optionMarket, 
          mintInfos[optionAccounts.optionMarket.underlyingAssetMint.toString()],
          mintInfos[optionAccounts.optionMarket.quoteAssetMint.toString()]
        )}
      </CardContent>
    </Card> 


  );
};

export default OptionOverview;
