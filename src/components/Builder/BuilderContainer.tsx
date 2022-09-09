import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import { airDropStage } from "../../recoil/util";
import { BuilderLanding } from "./BuilderLanding";
import { ContractQuantity } from "./ContractQuantity";
import { DistributionListUpload } from "./DistributionListUpload";
import { ProjectInfoForm } from "./ProjectInfoForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BuilderDistributor } from "./BuilderDistributor";
import { OptionMinting } from "./OptionMinting";
import { AirdropSuccess } from "./AirdropSuccess";
import { useNavigate } from "react-router-dom";

export const BuilderContainer: React.VFC = () => {
  const [_airDropStage, setAirDropStage] = useRecoilState(airDropStage);
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction={"row"} marginTop={2}>
        {
          <Button
            onClick={() => {
              if (_airDropStage > 1) {
                setAirDropStage((prev) => prev - 1);
              } else {
                navigate("/");
                setAirDropStage(1);
              }
            }}
            sx={{
              color: "#000000DE",
            }}
          >
            <ArrowBackIcon />
            &nbsp;
            <Typography fontWeight={500} fontSize={15}>
              Back
            </Typography>
          </Button>
        }
      </Stack>
      {_airDropStage === 1 && <BuilderLanding />}
      {_airDropStage === 2 && <DistributionListUpload />}
      {_airDropStage === 3 && <ProjectInfoForm />}
      {_airDropStage === 4 && <ContractQuantity />}
      {_airDropStage === 5 && <OptionMinting />}
      {_airDropStage === 6 && <BuilderDistributor />}
      {_airDropStage === 7 && <AirdropSuccess />}
    </Box>
  );
};
