import { Box, Link, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ExerciseSuccess } from "../../components/ExerciseSuccess";
import projectList from "../../projects/projectList";
import {
  useExercisedOption,
  useResetExercisedOption,
} from "../../context/ExercisedOptionContext";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { networkAtom } from "../../recoil";
import { mapNetworkTypes } from "../../lib/utils";
import { selectedWindowAtom } from "../../recoil/util";
import { BORDER_RADIUS_2 } from "../../Theme";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    maxWidth: "1097px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    my: 4,
    borderRadius: BORDER_RADIUS_2,
    marginRight: "auto",
    marginLeft: "auto",
  },
  backToDashboard: {
    color: "tet.primary",
    cursor: "pointer",
    my: 2,
    textDecoration: "none",
  },
};

export const AfterExercise: React.VFC = () => {
  const navigate = useNavigate();
  const network = useRecoilValue(networkAtom);
  const resetExercisedData = useResetExercisedOption();
  const setWindow = useSetRecoilState(selectedWindowAtom);
  const tokens = useNetworkTokens();
  const exercisedInfo = useExercisedOption();
  const project =
    projectList[mapNetworkTypes(network.key)][
      exercisedInfo.optionMarket?.underlyingAssetMint.toString() ?? ""
    ] ??
    tokens[exercisedInfo.optionMarket?.underlyingAssetMint.toString() ?? ""];
  return (
    <Box sx={styles.container}>
      <ExerciseSuccess project={project} />

      <Link
        sx={styles.backToDashboard}
        onClick={() => {
          resetExercisedData();
          setWindow("Home");
          navigate("/");
        }}
      >
        <Typography color="textPrimary">Back to dashboard</Typography>
      </Link>
    </Box>
  );
};
