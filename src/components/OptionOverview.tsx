import { Card, CardContent } from "@material-ui/core";
import React from "react";
import { displayHeader } from "../lib/optionMarketUtils";
import { MintInfoWithKey, OptionAccounts, Project } from "../types";

const OptionOverview: React.FC<{
  project: Project;
  optionAccounts: OptionAccounts;
  mintInfos: Record<string, MintInfoWithKey>;
}> = ({ optionAccounts, project, mintInfos }) => {
  return (
    <Card>
      <CardContent>
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
