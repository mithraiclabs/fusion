import { Card, CardContent } from "@material-ui/core";
import React from "react";
import { displayHeader } from "../lib/optionMarketUtils";
import { OptionAccounts, Project } from "../types";

const OptionOverview: React.FC<{
  project: Project,
  optionAccounts: OptionAccounts
}> = ({optionAccounts, project}) => {
  return (
    <Card>
      <CardContent>
        {displayHeader(project, optionAccounts.optionMarket)}
      </CardContent>
    </Card>
  )
};

export default OptionOverview;
