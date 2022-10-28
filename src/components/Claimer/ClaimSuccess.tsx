import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSetRecoilState } from "recoil";
import { useLoadSplTokens } from "../../hooks/wallet";
import { claimStage, selectedWindowAtom } from "../../recoil/util";
import { PAPER_COLOR } from "../../Theme";
import { FusionButton } from "../FusionButton";

export const ClaimSuccess: React.FC = () => {
  useLoadSplTokens();
  const setClaimStage = useSetRecoilState(claimStage);
  const setSelectedWindow = useSetRecoilState(selectedWindowAtom);

  return (
    <Box
      sx={{
        background: PAPER_COLOR,
        borderRadius: "6px",
        padding: "24px 16px",
      }}
    >
      <Typography fontSize={65} align={"center"}>
        🎉
      </Typography>
      <Typography align={"center"} marginBottom={"24px"}>
        Airdrop successfully claimed
      </Typography>
      <FusionButton
        title="return to dashboard"
        onClick={() => {
          setClaimStage(1);
          setSelectedWindow("Home");
        }}
      />
    </Box>
  );
};
