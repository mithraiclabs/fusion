import {
  Box,
  CircularProgress,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useLoadSplTokens } from "../../hooks/wallet";
import {
  selectOwnedProjectOptionKeys,
  useLoadPsyAmericanOptions,
} from "../../recoil";
import { OptionCard } from "./OptionCard";
import { OptionInfo } from "./OptionInfo";

const loadingContainerStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
};

export const OptionsDisplay: React.VFC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const ownedProjectOptions = useRecoilValue(selectOwnedProjectOptionKeys);
  const load = useLoadPsyAmericanOptions();
  useLoadSplTokens();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await load();
      setIsLoading(false);
    })();
  }, [load]);

  // Display the individual options
  const optionCards = Object.keys(ownedProjectOptions)
    .map((projectKey) => {
      const ownedOptionKeys = ownedProjectOptions[projectKey];
      return ownedOptionKeys.map((ownedOptionKey) => (
        <OptionCard
          key={ownedOptionKey.optionMarketKey}
          projectKey={projectKey}
        >
          <OptionInfo
            projectKey={projectKey}
            optionMetaKey={ownedOptionKey.optionMarketKey}
            tokenAccountKey={ownedOptionKey.tokenAccountKey}
          />
        </OptionCard>
      ));
    })
    .flat();
  return (
    <Box>
      {isLoading ? (
        <Box sx={loadingContainerStyles}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4">Exercisable</Typography>
          {optionCards}
        </>
      )}
    </Box>
  );
};
