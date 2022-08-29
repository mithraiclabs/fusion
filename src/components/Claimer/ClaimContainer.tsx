import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import Home from "../../pages/Home";
import { claimStage } from "../../recoil/util";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ClaimSuccess } from "./ClaimSuccess";
import { ClaimForm } from "./ClaimForm";
import { ClaimCodeInput } from "./ClaimCodeInput";

export const ClaimContainer: React.VFC = () => {
  const [_claimStage, setClaimStage] = useRecoilState(claimStage);

  if (_claimStage === 0) return <Home />;
  return (
    <Box>
      <Stack direction={"row"} marginTop={2}>
        {
          <Button
            onClick={() => {
              setClaimStage((prev) => prev - 1);
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
      {_claimStage === 2 && <ClaimCodeInput />}
      {_claimStage === 3 && <ClaimSuccess />}
    </Box>
  );
};
