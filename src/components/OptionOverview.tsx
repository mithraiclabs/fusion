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
import graph from "./graph.png";
import { useHistory } from "react-router-dom";
import ProjectDetail from "./ProjectDetail";
import ProjectOverviewModal from "./ProjectOverviewModal";
/*
        {displayHeader(
          project,
          optionAccounts.optionMarket,
          mintInfos[optionAccounts.optionMarket.underlyingAssetMint.toString()],
          mintInfos[optionAccounts.optionMarket.quoteAssetMint.toString()]
        )}
*/

//window.open(`/Contributor`);

const OptionOverview: React.FC<{
  project: Project;
  optionAccounts: OptionAccounts;
  mintInfos: Record<string, MintInfoWithKey>;
}> = ({ optionAccounts, project, mintInfos }) => {
  //const classes = useStyles();

  /**
   * 
   *  <ProjectDetail
        projectDetail={project}
        optionAccountsDetail={optionAccounts}
        mintInfosDetail={mintInfos}
      />

   */

  return (
    <Card className={styles.outerCardContent}>
      <CardContent
        className={styles.cardContent}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <li>
          <p>
            <strong>Contract Size: </strong>{" "}
            {displayUnderlyingAmt(
              optionAccounts.optionMarket,
              mintInfos[
                optionAccounts.optionMarket.underlyingAssetMint.toString()
              ]
            )}
          </p>

          <p>
            <strong>Project Symbol: </strong> {displayProjectSymbol(project)}
          </p>

          <p>
            <strong>Expiration: </strong>{" "}
            {displayExpiration(optionAccounts.optionMarket)}
          </p>
        </li>

        <img
          className="graph"
          src={graph}
          alt="graph"
          width="250"
          height="250"
          style={{ margin: "15px" }}
        ></img>
      </CardContent>
      <ProjectOverviewModal         
        projectVal={project}
        optionAccVal={optionAccounts}
        mintInfoVal={mintInfos}/>
    </Card>
  );
};

export default OptionOverview;
