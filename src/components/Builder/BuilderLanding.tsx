import { Box, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { airDropStage } from "../../recoil/util";
import { FusionButton } from "../FusionButton";

export const BuilderLanding: React.VFC = () => {
  const setAirDropStage = useSetRecoilState(airDropStage);
  return (
    <Box>
      <Typography marginBottom={2}>
        Off the Fusion platform, the token issuing team must figure out what
        addresses they’d like to airdrop to and how much each address should
        receive.
      </Typography>
      <FusionButton
        title="next: distribution list"
        onClick={() => setAirDropStage((prev) => prev + 1)}
      />
    </Box>
  );
};
