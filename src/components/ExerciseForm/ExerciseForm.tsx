import {
  Box,
  Button,
  Input,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { BN } from "@project-serum/anchor";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import projectList from "../../content/projectList";
import { useExerciseOptions } from "../../hooks/psyAmerican/useExerciseOptions";
import { optionMarketFamily, tokenAccountsMap } from "../../recoil";
import { DEFAULT_TEXT_COLOR } from "../../Theme";

const styles: Record<string, SxProps<Theme>> = {
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FBFBFB",
    border: "1px solid",
    borderRadius: "10px",
    my: 3,
    px: 3,
    py: 2,
  },
  input: {
    fontSize: "1.3em",
    border: "none",
    outline: "none",
    width: "100%",
    "&::before": {
      border: "none !important",
      transition: "none !important",
    },
    "&::after": {
      border: "none !important",
      transition: "none !important",
    },
  },
  maxButton: {
    p: 2,
    background: DEFAULT_TEXT_COLOR,
    color: "white",
    borderRadius: 50,
    fontWeight: "bold",
    width: "113px",
    height: "45px",
    "&:hover": {
      color: DEFAULT_TEXT_COLOR,
    },
  },
  exerciseButton: {
    py: 2,
    mb: 5,
    width: "100%",
    background: DEFAULT_TEXT_COLOR,
    color: "white",
    textTransform: "none",
  },
};

export const ExerciseForm: React.VFC<{ optionMarketKey: string }> = ({
  optionMarketKey,
}) => {
  const [amountToExercise, setAmountToExercise] = useState(0);
  // Load the OptionMarket data from the option market key
  const optionMeta = useRecoilValue(optionMarketFamily(optionMarketKey));
  const exerciseOptions = useExerciseOptions(optionMeta);
  // Load the user's option token account with the data
  const optionTokenAccount = useRecoilValue(
    tokenAccountsMap(optionMeta?.optionMint?.toString() ?? "")
  );
  if (!optionMeta) {
    throw new Error(`Could not find OptionMarket with key ${optionMarketKey}`);
  }
  if (!optionTokenAccount) {
    throw new Error(
      `Could not find tokenAccount with key ${optionMeta.optionMint.toString()}`
    );
  }

  const underlyingTokenMint = optionMeta.underlyingAssetMint;
  // Load the project information from the token min
  const project = projectList[underlyingTokenMint.toString()];
  if (!project) {
    throw new Error(`Could not find project with key ${underlyingTokenMint}`);
  }
  return (
    <Box>
      <Box
        sx={{
          ...styles.inputContainer,
          ...{ borderColor: project.primaryColor || DEFAULT_TEXT_COLOR },
        }}
      >
        <Input
          sx={styles.input}
          id="exercise-amount"
          type="number"
          inputProps={{ min: 0, max: optionTokenAccount.amount, step: 1 }}
          onChange={(e) => setAmountToExercise(parseInt(e.target.value))}
          value={amountToExercise}
        />
        <Button
          sx={styles.maxButton}
          onClick={() => setAmountToExercise(Number(optionTokenAccount.amount))}
        >
          MAX
        </Button>
      </Box>
      <Button
        sx={{
          ...styles.exerciseButton,
          ...{ backgroundColor: project.primaryColor || DEFAULT_TEXT_COLOR },
        }}
        onClick={() => {
          exerciseOptions({ amount: new BN(amountToExercise) });
        }}
      >
        <Typography variant="h4" color="white">
          Exercise
        </Typography>
      </Button>
    </Box>
  );
};
