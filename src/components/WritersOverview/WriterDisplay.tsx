import { Box, CircularProgress, SxProps, Theme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useLoadSplTokens } from "../../hooks/wallet";
import {
  selectOwnedProjectWriterKeys,
  useLoadPsyAmericanOptions,
} from "../../recoil";
import { OptionCardWithAction } from "../OptionsOverview/OptionCard";

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
  const writerCards = Object.entries(ownedProjectWriters)
    .map(([projectKey, ownedWriterKeys]) => {
      return ownedWriterKeys.map((ownedWriterKey) => (
        <OptionCardWithAction
          key={ownedWriterKey.optionMarketKey}
          projectKey={projectKey}
          optionMetaKey={ownedWriterKey.optionMarketKey}
          tokenAccountKey={ownedWriterKey.tokenAccountKey}
          type={"Recover"}
        />
      ));
    })
    .flat();
  return <Box>{writerCards}</Box>;
};
