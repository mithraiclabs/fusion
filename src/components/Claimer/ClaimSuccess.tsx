import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useLoadSplTokens } from "../../hooks/wallet";
import { claimStage } from "../../recoil/util";
import { FusionButton } from "../FusionButton";
import { FusionPaper } from "../FusionPaper";

export const ClaimSuccess: React.FC = () => {
  useLoadSplTokens();
  const setClaimStage = useSetRecoilState(claimStage);
  const navigate = useNavigate();

  return (
    <FusionPaper header="Success" title="Airdrop Claimed">
      <FusionButton
        title="Go Home"
        onClick={() => {
          setClaimStage(1);
          navigate("/");
        }}
      />
    </FusionPaper>
  );
};
