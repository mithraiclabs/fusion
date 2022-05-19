import { Box, Link, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import projectList from "../../content/projectList";
import { optionMarketFamily, tokenAccountsMap } from "../../recoil";
import { OptionCard } from "../OptionsOverview/OptionCard";
import { SimpleInstrinsicBreakdown } from "./SimpleIntrinsicBreakdown";

// TODO: Add OptionInfoHeader component
// TODO: Add TokenTransferBreakdown component
// TODO: Add detailed option view component
// TODO: Add exercise form (amount input & Exercise button)

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
  // Load the OptionMarket data from the option market key
  const optionMeta = useRecoilValue(optionMarketFamily(optionMarketKey));
  if (!optionMeta) {
    throw new Error(`Could not find OptionMarket with key ${optionMarketKey}`);
  }
  const underlyingTokenMint = optionMeta.underlyingAssetMint;
  // Load the project information from the token min
  const project = projectList[underlyingTokenMint.toString()];
  if (!project) {
    throw new Error(`Could not find project with key ${underlyingTokenMint}`);
  }

  // Load the user's option token account with the data
  const optionTokenAccount = useRecoilValue(
    tokenAccountsMap(optionMeta.optionMint.toString())
  );
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
            SLND options rewards are American style. They can be exercised to
            buy the underlying SLND token at the strike price until expiry
          </Typography>
          <Link href="#" sx={styles.learnMore}>
            <Typography variant="body1" component="p" sx={styles.learnMore}>
              Learn more
            </Typography>
          </Link>
        </Box>
      </OptionCard>

      <SimpleInstrinsicBreakdown
        optionMeta={optionMeta}
        optionTokenAccount={optionTokenAccount}
        project={project}
      />
    </Box>
  );
};
