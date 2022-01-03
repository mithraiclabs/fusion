import { Box, Card, CardContent} from "@material-ui/core";
import React from "react";
import { displayHeader } from "../lib/optionMarketUtils";
import { MintInfoWithKey, OptionAccounts, Project } from "../types";
import styles from "../styles/OptionOverview.module.scss";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { jsx } from 'theme-ui';



/** @jsxImportSource theme-ui */

const OptionOverview: React.FC<{
  project: Project;
  optionAccounts: OptionAccounts;
  mintInfos: Record<string, MintInfoWithKey>;
}> = ({ optionAccounts, project, mintInfos }) => {
  return (
    //variant="outlined"
    <div className = {styles["option-card"]}>
    <Card variant="outlined">
      <CardContent >
        {displayHeader(
          project,
          optionAccounts.optionMarket, 
          mintInfos[optionAccounts.optionMarket.underlyingAssetMint.toString()],
          mintInfos[optionAccounts.optionMarket.quoteAssetMint.toString()]
        )}
      </CardContent>
    </Card> 

    </div>

  );
};

export default OptionOverview;
