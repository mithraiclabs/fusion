import React from "react";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import projectList from "../content/projectList";
import { optionMarketFamily, tokenAccountsMap } from "../recoil";

export const Option: React.VFC = () => {
  const optionMarketKey = useMatch("/option/:key")?.params?.key || "";
  // Load the OptionMarket data from the option market key
  const optionMeta = useRecoilValue(optionMarketFamily(optionMarketKey));
  if (!optionMeta) {
    throw new Error(`Could not find OptionMarket with key ${optionMarketKey}`);
  }
  const underlyingTokenMint = optionMeta.underlyingAssetMint;
  // Load the user's token account with the data
  const tokenAccount = useRecoilValue(
    tokenAccountsMap(underlyingTokenMint.toString())
  );
  // Load the project information from the token min
  const project = projectList[underlyingTokenMint.toString()];

  // TODO: Add Back to airdrop component
  // TODO: Add OptionInfoHeader component
  // TODO: Add TokenTransferBreakdown component
  // TODO: Add detailed option view component
  // TODO: Add exercise form (amount input & Exercise button)
  return <PageWrapper>{project.name}</PageWrapper>;
};
