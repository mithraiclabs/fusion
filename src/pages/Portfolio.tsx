import { useMatch } from "react-router-dom";
import React from "react";
import PortfolioRow from "../components/PortfolioRow";
import PortfolioHeader from "../components/PortfolioHeader";
import projectOptionsData from "../content/ProjectOptionsData";
import projectList from "../content/projectList";
import ExerciseModal from "../components/ExerciseModal";
import { useState } from "react";
import PortfolioSnippet from "../components/PortfolioSnippet";

import "../styles/Portfolio.scss";
import { OptionAccount } from "../types";

const Portfolio: React.FC = () => {
  // const wallet = useConnectedWallet();
  const [openModal, setOpenModal] = useState(false);
  const [currentOption, setCurrentOption] = useState<OptionAccount | null>(
    null
  );
  const projectKey = useMatch("/portfolio/:key")?.params?.key;
  if (!projectKey) return null;
  const project = projectList.find((proj) => proj.key === projectKey);
  if (!project) return null;
  const optionsList = projectOptionsData.find(
    (pOption) => pOption.project.key === projectKey
  )?.options;
  return (
    <div className="portfolio-wrapper">
      {<PortfolioSnippet project={project} />}
      {<PortfolioHeader />}
      {optionsList
        ? optionsList.map((option) => {
            return (
              <PortfolioRow
                optionAccount={option}
                exerciseButtonCallback={() => {
                  setOpenModal(true);
                  setCurrentOption(option);
                }}
              ></PortfolioRow>
            );
          })
        : null}
      {currentOption && (
        <ExerciseModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          project={projectList[0]}
          optionsAccount={currentOption}
        />
      )}
    </div>
  );
};

export default Portfolio;
