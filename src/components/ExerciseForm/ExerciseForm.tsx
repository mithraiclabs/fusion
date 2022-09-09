import { Box, Button, Input, SxProps, Theme, Typography } from "@mui/material";
import { BN } from "@project-serum/anchor";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import projectList from "../../projects/projectList";
import { useExerciseOptions } from "../../hooks/psyAmerican/useExerciseOptions";
import {
  networkAtom,
  optionMarketFamily,
  tokenAccountsMap,
} from "../../recoil";
import { DEFAULT_TEXT_COLOR } from "../../Theme";
import { mapNetworkTypes } from "../../lib/utils";
import { Navigate, useNavigate } from "react-router-dom";
import { useBurnTokens } from "../../hooks/wallet/useBurnTokens";

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
    "&:hover": {
      color: "gray",
      backgroundColor: "lightblue",
    },
  },
};

export const ExerciseForm: React.VFC<{ optionMarketKey: string }> = ({
  optionMarketKey,
}) => {
  const [amountToExercise, setAmountToExercise] = useState(0);
  const network = useRecoilValue(networkAtom);
  // Load the OptionMarket data from the option market key
  const optionMeta = useRecoilValue(optionMarketFamily(optionMarketKey));
  const exerciseOptions = useExerciseOptions(optionMeta);
  const navigate = useNavigate();
  // Load the user's option token account with the data

  const optionTokenAccount = useRecoilValue(
    tokenAccountsMap(optionMeta?.optionMint?.toString() ?? "")
  );

  const burn = useBurnTokens(optionMeta?.optionMint);
  if (!optionMeta) {
    console.log("no option meta");

    return <Navigate to={"/"} />;
    // throw new Error(`Could not find OptionMarket with key ${optionMarketKey}`);
  }
  if (!optionTokenAccount) {
    throw new Error(
      `Could not find tokenAccount with key ${optionMeta.optionMint.toString()}`
    );
  }

  const underlyingTokenMint = optionMeta.underlyingAssetMint;
  // Load the project information from the token min
  const project =
    projectList[mapNetworkTypes(network.key)][underlyingTokenMint.toString()];
  if (!project) {
    throw new Error(`Could not find project with key ${underlyingTokenMint}`);
  }
  const optionTokens = Number(optionTokenAccount?.amount ?? 0);

  if (optionMeta.expired) {
    return (
      <Box>
        <Box
          sx={{
            ...styles.inputContainer,
            ...{ borderColor: project.primaryColor || DEFAULT_TEXT_COLOR },
          }}
        >
          <Typography
            sx={{
              fontSize: 25,
              fontWeight: 500,
            }}
          >
            Option Expired
          </Typography>

          {!!optionTokens && (
            // case where you hold only option tokens [expired]
            <Button
              sx={{
                ...styles.exerciseButton,
                ...{
                  backgroundColor: project.primaryColor || DEFAULT_TEXT_COLOR,
                },
              }}
              onClick={async () => {
                if (await burn(optionTokens)) navigate("/");
              }}
            >
              Collect Rent
            </Button>
          )}
        </Box>
      </Box>
    );
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
          ...{
            backgroundColor: project.primaryColor || DEFAULT_TEXT_COLOR,
          },
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
