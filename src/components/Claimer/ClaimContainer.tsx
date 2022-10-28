import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState, useSetRecoilState } from "recoil";
import { claimStage, selectedWindowAtom } from "../../recoil/util";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ClaimSuccess } from "./ClaimSuccess";
import { AirDropBalance } from "./AirDropBalance";

export const ClaimContainer: React.VFC = () => {
  const [_claimStage, setClaimStage] = useRecoilState(claimStage);
  const setSelectedWindow = useSetRecoilState(selectedWindowAtom);

  return (
    <Box>
      <Stack direction={"row"} marginTop={2}>
        {
          <Button
            onClick={() => {
              if (_claimStage > 2) {
                setClaimStage((prev) => prev - 1);
              } else {
                setSelectedWindow("Home");
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
      {_claimStage === 2 && <AirDropBalance />}
      {_claimStage === 3 && <ClaimSuccess />}
    </Box>
  );
};
