import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { OptionAccounts, Project } from "../types";
import OptionOverview from "./OptionOverview";

const ProjectOverview: React.FC<{
  project: Project;
  optionAccounts: OptionAccounts[];
}> = ({ project, optionAccounts }) => {
  return (
    <Card variant="outlined">
      <CardHeader title={project.name} />
      <CardContent>
        Options Held:
        {optionAccounts.map((x, index) => (
          <OptionOverview
            key={index.toString()}
            project={project}
            optionAccounts={x}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectOverview;
