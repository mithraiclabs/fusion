import React from "react";
import { Project } from "../types";
import "../styles/ProjectOverview.scss";
import { DiscordIcon } from "./Images/icons/discord-icon";
import { TwitterIcon } from "./Images/icons/twitter-3-logo-svg-vector";
import { InternetIcon } from "./Images/icons/internet-icon";
import classNames from "classnames";
import { withRouter, RouteComponentProps } from "react-router-dom";

const ProjectOverview: React.FC<{
  project: Project;
} & RouteComponentProps> = ({ project, history }) => {
  return (
    <div className="project-card">
      <button onClick={() => {history.push(`/portfolio/${project.key}`)}} className="project-name">
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
          <div className={classNames("project-symbol", 'right-text')}>{project.symbol}</div>
          <div className={classNames("project-value", 'right-text')}>$10.75</div>
          <div className="card-socials">
            <a className="twitter-icon" href={project.twitter} target="_blank" >
              {TwitterIcon}
            </a>
            <a className="discord-icon" href={project.discord} target="_blank" >
              {DiscordIcon}
            </a>
            <a className="internet-icon" href={project.website} target="_blank" >
              {InternetIcon}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProjectOverview);
