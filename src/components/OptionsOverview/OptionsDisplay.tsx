import { Box } from "@mui/system";
import React from "react";
import { useRecoilValue } from "recoil";
import { selectOwnedProjectOptionKeys } from "../../recoil";
import { OptionCard } from "./OptionCard";
import { OptionInfo } from "./OptionInfo";

export const OptionsDisplay: React.VFC = () => {
  const ownedProjectOptions = useRecoilValue(selectOwnedProjectOptionKeys);

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
  return <Box>{optionCards}</Box>;
};
