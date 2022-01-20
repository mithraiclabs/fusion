import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { MintInfoWithKey, OptionAccounts, Project } from "../types";
import OptionOverview from "./OptionOverview";
import styles from "../styles/OptionOverview.module.scss";

const ProjectOverview: React.FC<{
  project: Project;
  optionAccounts: OptionAccounts[];
  mintInfos: Record<string, MintInfoWithKey>;
}> = ({ project, optionAccounts, mintInfos }) => {
  //const classes = useStyles();
  return (
    <Card
      className={styles.card}
      style={{
        backgroundColor: "rgb(16, 16, 22)",
        boxShadow: " 0px 0px 10px 3px rgb(201,76, 119)",
      }}
    >
      <CardHeader className={styles.header} />
      <CardContent className={styles.cardContent}>
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
