import { Box, Link, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ExerciseSuccess } from "../../components/ExerciseSuccess";
import projectList from "../../projects/projectList";
import { useResetExercisedOption } from "../../context/ExercisedOptionContext";
import { useRecoilValue } from "recoil";
import { networkAtom } from "../../recoil";
import { mapNetworkTypes } from "../../lib/utils";

const styles: Record<string, SxProps<Theme>> = {
  container: {
    maxWidth: "1097px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    my: 10,
    borderRadius: "10px",
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
  const project =
    projectList[mapNetworkTypes(network.key)][
      "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp"
    ];
  return (
    <Box sx={styles.container}>
      <ExerciseSuccess project={project} />

      <Link
        sx={styles.backToDashboard}
        onClick={() => {
          resetExercisedData();
          navigate("/");
        }}
      >
        <Typography color="textPrimary">Back to dashboard</Typography>
      </Link>
    </Box>
  );
};
