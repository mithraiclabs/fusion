import { Avatar, Box, Link, Typography } from "@mui/material";
import React from "react";
import { Navigate, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useExercisedOption } from "../../context/ExercisedOptionContext";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";
import { mapNetworkTypes } from "../../lib/utils";
import { AfterExercise } from "../../pages/Option/AfterExercise";
import projectList from "../../projects/projectList";
import {
  networkAtom,
  optionMarketFamily,
  tokenAccountsMap,
} from "../../recoil";
import { ExerciseForm } from "../ExerciseForm";
import { LinkOut } from "../Images/icons/LinkOut";
import { DetailedBreakdown } from "./DetailedBreakdown";
import { SimpleInstrinsicBreakdown } from "./SimpleIntrinsicBreakdown";

export const OptionBreakdown: React.VFC = () => {
  const optionMarketKey = useMatch("/option/:key")?.params?.key || "";
  const network = useRecoilValue(networkAtom);
  const tokens = useNetworkTokens();
  const exercisedOptionParams = useExercisedOption();
  // Load the OptionMarket data from the option market key
  const optionMeta = useRecoilValue(optionMarketFamily(optionMarketKey));
  // Load the user's option token account with the data
  const optionTokenAccount = useRecoilValue(
    tokenAccountsMap(optionMeta?.optionMint?.toString() ?? "")
  );
  if (!optionMeta) {
    return <Navigate to={"/"} />;
  }
  const underlyingTokenMint = optionMeta.underlyingAssetMint;
  // Load the project information from the token min
  const project =
    projectList[mapNetworkTypes(network.key)][underlyingTokenMint.toString()];
  const token = tokens[underlyingTokenMint.toString()];
  if (!project && !token) {
    throw new Error(`Could not find project with key ${underlyingTokenMint}`);
  }
  if (!optionTokenAccount) {
    throw new Error(
      `Could not find tokenAccount with key ${optionMeta.optionMint.toString()}`
    );
  }
  return (
    <Box>
      <Typography variant="h3">Exercise your option</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          marginTop: 4,
          marginBottom: 3,
        }}
      >
        <Avatar
          src={project?.logo ?? token?.logoURI}
          sx={{
            height: "32px",
            width: "32px",
          }}
        />
        <Typography variant="h4">{project?.name ?? token?.name}</Typography>
      </Box>
      <Typography variant="body1" marginBottom={3}>
        {project?.symbol ?? token?.symbol} options rewards are American style.
        They can be exercised to buy the underlying{" "}
        {project?.symbol ?? token?.symbol} token at the strike price until
        expiry
      </Typography>
      {!!project?.website && (
        <Box marginBottom={3}>
          <Link
            href={project?.website}
            rel="noopener"
            target="_blank"
            variant="body1"
            color="textPrimary"
          >
            <Typography variant="body2">
              Learn More <LinkOut size={1.05} color={"black"} />
            </Typography>
          </Link>
        </Box>
      )}

      {optionMeta.expired ? (
        <ExerciseForm optionMarketKey={optionMeta.key.toString()} />
      ) : (
        <>
          {exercisedOptionParams.show ? (
            <AfterExercise />
          ) : (
            <>
              <SimpleInstrinsicBreakdown
                optionMeta={optionMeta}
                optionTokenAccount={optionTokenAccount}
                project={project ?? token}
              />

              <DetailedBreakdown
                optionMeta={optionMeta}
                optionTokenAccount={optionTokenAccount}
                project={project ?? token}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
};
