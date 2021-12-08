import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { MintInfoWithKey, OptionAccounts, Project } from "../types";
import OptionOverview from "./OptionOverview";

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
    <Card variant="outlined">
      <CardHeader title={project.name} />
      <CardContent>
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
