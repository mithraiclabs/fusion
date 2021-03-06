import React from "react";
import { Project } from "../types";
import "../styles/ProjectOverview.scss";
import { DiscordIcon } from "./Images/icons/discord-icon";
import { TwitterIcon } from "./Images/icons/twitter-3-logo-svg-vector";
import { InternetIcon } from "./Images/icons/internet-icon";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenPricesMap } from "../recoil";

const ProjectOverview: React.FC<{
  project: Project;
}> = ({ project }) => {
  const navigate = useNavigate();
  const tokenPrice = useRecoilValue(tokenPricesMap(project.mintAddress));
  return (
    <div className="project-card">
      <button
        onClick={() => {
          navigate(`/project/${project.mintAddress}`);
        }}
        className="project-name"
      >
        {project.name}
      </button>
      <div className="card-content">
        <div className="card-left">
          <div className="logo-wrapper">
            <img
              className="project-logo"
              src={project.logo}
              alt={`${project.name} Logo`}
            ></img>
          </div>
          <div className="card-description">
            {project.description.split(".")[0]}
          </div>
        </div>
        <div className="card-right">
          <div className={classNames("project-symbol", "right-text")}>
            {project.symbol}
          </div>
          <div className={classNames("project-value", "right-text")}>
            {tokenPrice ? `$${tokenPrice?.toFixed(2)}` : null}
          </div>
          <div className="card-socials">
            <a className="twitter-icon" href={project.twitter} target="_blank">
              {TwitterIcon}
            </a>
            <a className="discord-icon" href={project.discord} target="_blank">
              {DiscordIcon}
            </a>
            <a className="internet-icon" href={project.website} target="_blank">
              {InternetIcon}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
