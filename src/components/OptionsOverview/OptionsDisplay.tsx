import {
  Box,
  CircularProgress,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useLoadSplTokens } from "../../hooks/wallet";
import {
  selectOwnedProjectOptionKeys,
  useLoadPsyAmericanOptions,
} from "../../recoil";
import { SMALL_SCREEN_WIDTH } from "../../Theme";
import { OptionCardWithAction } from "./OptionCard";

const loadingContainerStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
};

export const OptionsDisplay: React.VFC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const ownedProjectOptions = useRecoilValue(selectOwnedProjectOptionKeys);
  const load = useLoadPsyAmericanOptions();
  const { width } = useWindowDimensions();
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
        <OptionCardWithAction
          key={ownedOptionKey.optionMarketKey}
          projectKey={projectKey}
          optionMetaKey={ownedOptionKey.optionMarketKey}
          tokenAccountKey={ownedOptionKey.tokenAccountKey}
          type={"Exercise"}
          isMobile={width < SMALL_SCREEN_WIDTH}
        />
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
          {optionCards.length ? (
            <Typography variant="h4">Exercisable</Typography>
          ) : null}
          {optionCards}
        </>
      )}
    </Box>
  );
};
