import React from "react";
import { useExercisedOption } from "../../context/ExercisedOptionContext";
import { AfterExercise } from "./AfterExercise";
import { BeforeExercise } from "./BeforeExercise";

export const ExerciseFlowRouter: React.VFC = () => {
  const exercisedOptionParams = useExercisedOption();

  return exercisedOptionParams.show ? <AfterExercise /> : <BeforeExercise />;
};
