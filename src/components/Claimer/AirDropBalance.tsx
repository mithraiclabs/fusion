import { Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useClaimAirdrop } from "../../hooks/useClaimAirdrop";
import { airdropBalance, claimStage, recipientJson } from "../../recoil/util";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { FusionButton } from "../FusionButton";
import { FusionPaper } from "../FusionPaper";

export const AirDropBalance: React.FC = () => {
  const claim = useClaimAirdrop();
  const balance = useRecoilValue(airdropBalance);
  const navigate = useNavigate();
  const setClaimStage = useSetRecoilState(claimStage);
  const selectedJSON = useRecoilValue(recipientJson);
  const { publicKey } = useWallet();
  if (!publicKey) return <ConnectWalletButton />;
  const claimableQty = Number(
    selectedJSON?.recipientList.find((r) => {
      return r.recipient === publicKey.toString();
    })?.amount ?? "0"
  );
  if (!balance || !claimableQty)
    return (
      <FusionPaper
        title={
          claimableQty
            ? "Sorry, all the option contracts have been claimed :("
            : "Sorry, looks like your wallet is not included in this airdrop :("
        }
      >
        <FusionButton
          onClick={() => {
            navigate("/");
          }}
          title={"Go Back Home"}
        />
      </FusionPaper>
    );
  return (
    <FusionPaper
      border={true}
      title={`${balance} option contract${
        balance > 1 ? "s" : ""
      } remaining in this airdrop`}
      divisor={true}
    >
      <Typography my={2}>
        If you haven't already, you should be able to claim {claimableQty}{" "}
        option contract{claimableQty > 1 ? "s" : ""}
      </Typography>

      <FusionButton
        onClick={async () => {
          const success = await claim();
          if (success) {
            setClaimStage(3);
          } else {
          }
        }}
        title={"claim"}
      />
    </FusionPaper>
  );
};
