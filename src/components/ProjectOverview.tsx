import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { MintInfoWithKey, OptionAccounts, Project } from "../types";
import OptionOverview from "./OptionOverview";
import styles from "../styles/OptionOverview.module.scss";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiPaper-root": {
      borderRadius: "10px",
      boxShadow: "0px 0px 10px 2px rgba(160,232,252);",
      borderColor: "rgb(160,232,252)",
      backgroundColor: "rgb(30, 30, 30)",
      borderWidth: "2px",
      width: "500px",
      maxWidth: "800px",
      minWidth: "300px"
      //https://stackoverflow.com/questions/55059681/material-ui-responsive-based-on-element-size
    },
    "& .MuiCard-root": {
      backgroundColor: "rgb(30, 30, 30)",
      borderColor: "rgb(160,100,100)",
      borderWidth: "200px",
    },
    "& .MuiCard-outlined": {
      backgroundColor: "rgb(30, 30, 30)",
      borderColor: "rgb(160,100,100)",
      borderWidth: "200px",
    }
  }
}));


const ProjectOverview: React.FC<{
  project: Project;
  optionAccounts: OptionAccounts[];
  mintInfos: Record<string, MintInfoWithKey>;
}> = ({
  project,
  optionAccounts,
  mintInfos
}) => {
    //const classes = useStyles();
    return (
      <Card className={styles.card} style={{backgroundColor: "rgb(16, 16, 22)", boxShadow: " 0px 0px 10px 3px rgb(201,76, 119)"}}>
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
