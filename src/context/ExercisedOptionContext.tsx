import { OptionMarket } from "@mithraic-labs/psy-american";
import React, { createContext, useContext, useState } from "react";

type ExercisedOptionParams = { optionMarket?: OptionMarket; show: boolean };

export const ExercisedOptionContext = createContext<{
  exercisedOptionParams: ExercisedOptionParams;
  setExercisedOptionParams: React.Dispatch<
    React.SetStateAction<ExercisedOptionParams>
  >;
}>({
  exercisedOptionParams: {
    show: false,
  },
  setExercisedOptionParams: () => {},
});

export const ExercisedOptionProvider: React.FC = ({ children }) => {
  const [exercisedOptionParams, setExercisedOptionParams] =
    useState<ExercisedOptionParams>({
      show: false,
    });

  return (
    <ExercisedOptionContext.Provider
      value={{ exercisedOptionParams, setExercisedOptionParams }}
    >
      {children}
    </ExercisedOptionContext.Provider>
  );
};

export const useSetExercisedOption = () => {
  const exercisedOptionContext = useContext(ExercisedOptionContext);

  return exercisedOptionContext.setExercisedOptionParams;
};

export const useExercisedOption = () => {
  const exercisedOptionContext = useContext(ExercisedOptionContext);

  return exercisedOptionContext.exercisedOptionParams;
};
