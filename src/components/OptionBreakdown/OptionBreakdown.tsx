import { Box, Link, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { Navigate, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { mapNetworkTypes } from "../../lib/utils";
import projectList from "../../projects/projectList";
import {
  networkAtom,
  optionMarketFamily,
  tokenAccountsMap,
} from "../../recoil";
import { OptionCard } from "../OptionsOverview/OptionCard";
import { DetailedBreakdown } from "./DetailedBreakdown";
import { SimpleInstrinsicBreakdown } from "./SimpleIntrinsicBreakdown";

const styles: Record<string, SxProps<Theme>> = {
  optionCardBody: {
    px: 3,
    py: 2,
  },
  learnMore: {
    fontWeight: 600,
    textDecoration: "none !important",
    color: "text.primary",
    cursor: "pointer",
    mt: 1.5,
  },
};

export const OptionBreakdown: React.VFC = () => {
  const optionMarketKey = useMatch("/option/:key")?.params?.key || "";
  const network = useRecoilValue(networkAtom);
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
  if (!project) {
    throw new Error(`Could not find project with key ${underlyingTokenMint}`);
  }
  if (!optionTokenAccount) {
    throw new Error(
      `Could not find tokenAccount with key ${optionMeta.optionMint.toString()}`
    );
  }
  return (
    <Box>
      <OptionCard projectKey={project.mintAddress}>
        <Box sx={styles.optionCardBody}>
          <Typography variant="body1" component="p">
            {project.symbol} options rewards are American style. They can be
            exercised to buy the underlying {project.symbol} token at the strike
            price until expiry
          </Typography>
          <Link href="#" sx={styles.learnMore}>
            <Typography variant="body1" component="p" sx={styles.learnMore}>
              Learn more
            </Typography>
          </Link>
        </Box>
      </OptionCard>
      {optionMeta.expired ? (
        <></>
      ) : (
        <>
          <SimpleInstrinsicBreakdown
            optionMeta={optionMeta}
            optionTokenAccount={optionTokenAccount}
            project={project}
          />

          <DetailedBreakdown
            optionMeta={optionMeta}
            optionTokenAccount={optionTokenAccount}
            project={project}
          />
        </>
      )}
    </Box>
  );
};
