import { Box, Card, CardContent } from "@material-ui/core";
import React from "react";
import { displayExpiration, displayHeader, displayProjectSymbol, displayQuoteToken, displayStrikePrice, displayUnderlyingAmt } from "../lib/optionMarketUtils";
import { MintInfoWithKey, OptionAccounts, Project } from "../types";
import styles from "../styles/OptionOverview.module.scss";

/*
        {displayHeader(
          project,
          optionAccounts.optionMarket,
          mintInfos[optionAccounts.optionMarket.underlyingAssetMint.toString()],
          mintInfos[optionAccounts.optionMarket.quoteAssetMint.toString()]
        )}
*/

const OptionOverview: React.FC<{
  project: Project;
  optionAccounts: OptionAccounts;
  mintInfos: Record<string, MintInfoWithKey>;
}> = ({ optionAccounts, project, mintInfos }) => {
  return (
    <Card className={styles["card"]} variant="outlined">
      <CardContent className="card-content">
        <p>
          Contract Size: {displayUnderlyingAmt(
          optionAccounts.optionMarket,
          mintInfos[optionAccounts.optionMarket.underlyingAssetMint.toString()]
        )}
        </p>

        <p>
          Project Symbol: {displayProjectSymbol(project)}
        </p>

        <p>
          Strike Price: {displayStrikePrice(optionAccounts.optionMarket,
            mintInfos[optionAccounts.optionMarket.underlyingAssetMint.toString()],
            mintInfos[optionAccounts.optionMarket.quoteAssetMint.toString()])}
        </p>

        <p>
          Underlying Mint: {displayQuoteToken(mintInfos[optionAccounts.optionMarket.underlyingAssetMint.toString()])}
        </p>

        <p>
          Quote Mint: {displayQuoteToken(mintInfos[optionAccounts.optionMarket.quoteAssetMint.toString()])}
        </p>

        <p>
          Expiration: {displayExpiration(optionAccounts.optionMarket)}
        </p>

      </CardContent>
    </Card>


  );
};

export default OptionOverview;
