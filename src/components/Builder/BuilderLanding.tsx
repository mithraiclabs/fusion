import { Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { airDropStage } from "../../recoil/util";
import { FusionButton } from "../FusionButton";
import { FusionPaper } from "../FusionPaper";

export const BuilderLanding: React.VFC = () => {
  const setAirDropStage = useSetRecoilState(airDropStage);
  return (
    <FusionPaper
      title=" Please Gather your Airdrop Addresses"
      header="Welcome !"
      divisor={true}
    >
      <Typography>
        Off the Fusion platform, the token issuing team must figure out what
        addresses they’d like to airdrop to and how much each address should
        receive.
      </Typography>
      <FusionButton
        title="next"
        onClick={() => {
          setAirDropStage((prev) => prev + 1);
        }}
      />
    </FusionPaper>
  );
};
