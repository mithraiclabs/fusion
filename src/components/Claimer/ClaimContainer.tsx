import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import Home from "../../pages/Home";
import { claimStage } from "../../recoil/util";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ClaimSuccess } from "./ClaimSuccess";
import { ClaimForm } from "./ClaimForm";
import { AirDropBalance } from "./AirDropBalance";
import { useNavigate } from "react-router-dom";

export const ClaimContainer: React.VFC = () => {
  const [_claimStage, setClaimStage] = useRecoilState(claimStage);
  const navigate = useNavigate();

  if (_claimStage === 0) return <Home />;
  return (
    <Box>
      <Stack direction={"row"} marginTop={2}>
        {
          <Button
            onClick={() => {
              if (_claimStage > 1) {
                setClaimStage((prev) => prev - 1);
              } else {
                navigate("/");
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
      {_claimStage === 1 && <ClaimForm />}
      {_claimStage === 2 && <AirDropBalance />}
      {_claimStage === 3 && <ClaimSuccess />}
    </Box>
  );
};
