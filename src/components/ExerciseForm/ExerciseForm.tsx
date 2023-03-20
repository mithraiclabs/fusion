import { Box, Typography } from "@mui/material";
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
import { mapNetworkTypes } from "../../lib/utils";
import { Navigate, useNavigate } from "react-router-dom";
import { useBurnTokens } from "../../hooks/wallet/useBurnTokens";
import { FusionButton } from "../FusionButton";
import { NumberInput } from "../NumberInput";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";

export const ExerciseForm: React.VFC<{ optionMarketKey: string }> = ({
  optionMarketKey,
}) => {
  const [loading, setLoading] = useState(false);
  const network = useRecoilValue(networkAtom);
  const tokens = useNetworkTokens();
  // Load the OptionMarket data from the option market key
  const optionMeta = useRecoilValue(optionMarketFamily(optionMarketKey));
  const exerciseOptions = useExerciseOptions(optionMeta);
  const navigate = useNavigate();
  // Load the user's option token account with the data

  const optionTokenAccount = useRecoilValue(
    tokenAccountsMap(optionMeta?.optionMint?.toString() ?? "")
  );
  const [amountToExercise, setAmountToExercise] = useState(
    Number(optionTokenAccount?.amount ?? 0)
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
    projectList[mapNetworkTypes(network.key)][underlyingTokenMint.toString()] ??
    tokens[underlyingTokenMint.toString()];
  if (!project) {
    throw new Error(`Could not find project with key ${underlyingTokenMint}`);
  }
  const optionTokens = Number(optionTokenAccount?.amount ?? 0);
  if (optionMeta.expired) {
    return (
      <Box>
        <Box>
          <Typography
            sx={{
              fontSize: 25,
              fontWeight: 500,
            }}
          >
            Option Expired
          </Typography>

          {!!optionTokens && (
            <FusionButton
              onClick={async () => {
                setLoading(true);
                if (await burn(optionTokens)) {
                  setLoading(false);
                  navigate("/");
                }
                setLoading(false);
              }}
              title="Collect Rent"
              loading={loading}
            />
          )}
        </Box>
      </Box>
    );
  }
  return (
    <Box mx={"auto"} width={"632px"} marginBottom={2}>
      <NumberInput
        number={amountToExercise.toString()}
        setNumber={(e: any) => {
          setAmountToExercise(Number(e));
        }}
        max={Number(optionTokenAccount.amount)}
        setMax={() => setAmountToExercise(Number(optionTokenAccount.amount))}
        sx={{
          width: "100%",
          marginBottom: 2,
        }}
      />
      <FusionButton
        onClick={async () => {
          setLoading(true);
          if (await exerciseOptions({ amount: new BN(amountToExercise) })) {
            setLoading(false);
          }
          setLoading(false);
        }}
        title="Exercise"
        loading={loading}
      />
    </Box>
  );
};
