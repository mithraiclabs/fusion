import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { MintInfoWithKey, OptionAccounts, Project } from "../types";
import OptionOverview from "./OptionOverview";
import styles from "../styles/OptionOverview.module.scss";

const ProjectOverview: React.FC<{
  project: Project;
  optionAccounts: OptionAccounts[];
  mintInfos: Record<string, MintInfoWithKey>;
}> = ({
  project,
  optionAccounts,
  mintInfos
}) => {
  return (
    <Card className ={styles["card"]} variant="outlined">
      <CardHeader className = {styles["header"]} title={project.name}  style={{color : "rgb(0,0,0)", fontFamily: "Goldman, serif"}}/>
      <CardContent  style={{}}>
        Options Held:
        {optionAccounts.map((x, index) => (
          <OptionOverview
            key={index.toString()}
            project={project}
            optionAccounts={x}
            mintInfos={mintInfos}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectOverview;
