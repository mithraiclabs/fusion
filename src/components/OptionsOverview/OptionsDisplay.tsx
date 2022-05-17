import { Box } from "@mui/system";
import React from "react";
import { useRecoilValue } from "recoil";
import { selectOwnedProjectOptionKeys } from "../../recoil";
import { OptionCard } from "./OptionCard";

export const OptionsDisplay: React.VFC = () => {
  const ownedProjectOptions = useRecoilValue(selectOwnedProjectOptionKeys);

  // TODO: Display the individual options
  const optionCards = Object.keys(ownedProjectOptions)
    .map((projectKey) => {
      const ownedOptionKeys = ownedProjectOptions[projectKey];
      return ownedOptionKeys.map((ownedOptionKey) => (
        <OptionCard
          key={ownedOptionKey.optionMarketKey}
          projectKey={projectKey}
          optionMetaKey={ownedOptionKey.optionMarketKey}
          tokenAccountKey={ownedOptionKey.tokenAccountKey}
        />
      ));
    })
    .flat();
  return <Box>{optionCards}</Box>;
};
