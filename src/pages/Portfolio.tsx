import { useConnectedWallet } from "@saberhq/use-solana";
import { Link, useRouteMatch } from "react-router-dom";
import styles_app from "../styles/app.module.scss";
import React from "react";
import PortfolioRow from "../components/PortfolioRow";
import PortfolioHeader from "../components/PortfolioHeader";
import optionAccountsData from "../content/OptionAccountsData";
import projectOptionsData from "../content/ProjectOptionsData";
import projectList from "../content/projectList";
import ExerciseModal from "../components/ExerciseModal";
import { useState } from "react";
import PortfolioSnippet from "../components/PortfolioSnippet";
import { useParams } from "react-router-dom";
import { Project } from "../types";

import "../styles/Portfolio.scss";
import { OptionAccount } from "../types";

const Portfolio: React.FC = () => {
  // const wallet = useConnectedWallet();
  const [openModal, setOpenModal] = useState(false);
  const [currentOption, setCurrentOption] = useState<OptionAccount|null>(null);
  const projectKey = useRouteMatch<{[key: string]: string}>('/portfolio/:key').params.key;
  const project = projectList.find((proj) => proj.key === projectKey);
  const optionsList = projectOptionsData.find((pOption) => pOption.project.key === projectKey).options;
  return (
    <div className="portfolio-wrapper">
      {<PortfolioSnippet project={project} />}
      {<PortfolioHeader />}
      {optionsList.map((option) => {
        return (
          <PortfolioRow
            optionAccount={option}
            exerciseButtonCallback={() => {
              setOpenModal(true);
              setCurrentOption(option);
            }}
          ></PortfolioRow>
        );
      })}
      <ExerciseModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        project={projectList[0]}
        optionsAccount={currentOption}
      ></ExerciseModal>
    </div>
  );
};

export default Portfolio;
