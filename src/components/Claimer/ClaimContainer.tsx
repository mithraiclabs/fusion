import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { claimStageAtom, selectedWindowAtom } from "../../recoil/util";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ClaimSuccess } from "./ClaimSuccess";
import { AirDropBalance } from "./AirDropBalance";

export const ClaimContainer: React.VFC = () => {
  const claimStage = useRecoilValue(claimStageAtom);
  const setSelectedWindow = useSetRecoilState(selectedWindowAtom);

  return (
    <Box>
      <Stack direction={"row"} marginTop={2}>
        {
          <Button
            onClick={() => {
              setSelectedWindow("Home");
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
      {claimStage === 2 && <AirDropBalance />}
      {claimStage === 3 && <ClaimSuccess />}
    </Box>
  );
};
