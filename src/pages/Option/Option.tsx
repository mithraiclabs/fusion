import React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { ExercisedOptionProvider } from "../../context/ExercisedOptionContext";
import { ExerciseFlowRouter } from "./ExerciseFlowRouter";

export const Option: React.VFC = () => {
  return (
    <PageWrapper>
      <ExercisedOptionProvider>
        <ExerciseFlowRouter />
      </ExercisedOptionProvider>
    </PageWrapper>
  );
};
