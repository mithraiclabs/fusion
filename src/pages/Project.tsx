import { useMatch } from "react-router-dom";
import React from "react";
import PortfolioRow from "../components/PortfolioRow";
import PortfolioHeader from "../components/PortfolioHeader";
import projectList from "../content/projectList";
import ExerciseModal from "../components/ExerciseModal";
import { useState } from "react";
import PortfolioSnippet from "../components/PortfolioSnippet";

import "../styles/Portfolio.scss";
import { useRecoilValue } from "recoil";
import { selectOwnedProjectOptionKeys, tokenSerumBookMap } from "../recoil";

const Project: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentOption, setCurrentOption] = useState<{
    tokenAccountKey: string;
    optionMarketKey: string;
  } | null>(null);
  const projectKey = useMatch("/project/:key")?.params?.key || "";
  const project = projectList[projectKey];
  const ownedProjectOptions = useRecoilValue(selectOwnedProjectOptionKeys);
  const ownedProjectOptionKeys = ownedProjectOptions[projectKey];

  const orderBook = useRecoilValue(tokenSerumBookMap(project.mintAddress));
  console.log("*** orderbook data", orderBook);

  return (
    <div className="portfolio-wrapper">
      {<PortfolioSnippet project={project} />}
      {<PortfolioHeader />}
      {ownedProjectOptionKeys.map((accountKeys) => {
        return (
          <PortfolioRow
            key={accountKeys.optionMarketKey}
            tokenAccountKey={accountKeys.tokenAccountKey}
            optionMarketKey={accountKeys.optionMarketKey}
            exerciseButtonCallback={() => {
              setOpenModal(true);
              setCurrentOption(accountKeys);
            }}
          ></PortfolioRow>
        );
      })}
      {currentOption && (
        <ExerciseModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          {...currentOption}
        />
      )}
    </div>
  );
};

export default Project;
