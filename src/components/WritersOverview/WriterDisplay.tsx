import { Box, CircularProgress, SxProps, Theme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useLoadSplTokens } from "../../hooks/wallet";
import {
  selectOwnedProjectWriterKeys,
  useLoadPsyAmericanOptions,
} from "../../recoil";
import { OptionCard } from "../OptionsOverview/OptionCard";
import { WriterInfo } from "./WriterInfo";

const loadingContainerStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
};

export const WriterDisplay: React.VFC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const ownedProjectWriters = useRecoilValue(selectOwnedProjectWriterKeys);
  const load = useLoadPsyAmericanOptions();
  useLoadSplTokens();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await load();
      setIsLoading(false);
    })();
  }, [load]);

  if (isLoading) {
    return (
      <Box sx={loadingContainerStyles}>
        <CircularProgress />
      </Box>
    );
  }
  // Display the individual options
  const writerCards = Object.keys(ownedProjectWriters)
    .map((projectKey) => {
      const ownedWriterKeys = ownedProjectWriters[projectKey];
      return ownedWriterKeys.map((ownedWriterKey) => (
        <OptionCard
          key={ownedWriterKey.optionMarketKey}
          projectKey={projectKey}
        >
          <WriterInfo
            projectKey={projectKey}
            optionMetaKey={ownedWriterKey.optionMarketKey}
            tokenAccountKey={ownedWriterKey.tokenAccountKey}
          />
        </OptionCard>
      ));
    })
    .flat();
  return <Box>{writerCards}</Box>;
};
