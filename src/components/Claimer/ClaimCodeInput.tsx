import { FilledInput, FormControl, Typography } from "@mui/material";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useClaimAirdrop } from "../../hooks/useClaimAirdrop";
import { airdropAddress, claimStage } from "../../recoil/util";
import { FusionButton } from "../FusionButton";
import { FusionPaper } from "../FusionPaper";

export const ClaimCodeInput: React.FC = () => {
  const claim = useClaimAirdrop();
  const wallet = useWallet();
  const [claimAddress, setClaimAddress] = useRecoilState(airdropAddress);
  const setClaimStage = useSetRecoilState(claimStage);
  if (!wallet.publicKey) {
    return (
      <>
        <FusionPaper border={true} title={"Connect wallet"} divisor={true}>
          <Typography fontSize={"14px"} fontWeight={400} align="center">
            Please connect your wallet in order to claim airdrop
          </Typography>
        </FusionPaper>
        <WalletMultiButton
          sx={{
            background: (theme) => theme.palette.secondary.dark,
            borderRadius: "8px",
            width: "100%",
            height: "53px",
            color: "white",
            marginTop: "25px",
            "&:hover": {
              background: (theme) => `${theme.palette.secondary.dark}d3`,
            },
          }}
        >
          Connect Wallet
        </WalletMultiButton>
      </>
    );
  }
  return (
    <FusionPaper
      border={true}
      title={"Enter the Fusion Airdrop id"}
      divisor={true}
    >
      <FormControl sx={{ width: "100%", my: 2 }} variant="filled">
        <FilledInput
          value={claimAddress ?? ""}
          onChange={(event) => {
            setClaimAddress(event.target.value);
          }}
          placeholder={"FUSION AIRDROP ID"}
        />
      </FormControl>
      <FusionButton
        onClick={async () => {
          const success = await claim();
          if (success) {
            setClaimStage((prev) => prev + 1);
          } else {
          }
        }}
        title={"claim"}
      />
    </FusionPaper>
  );
};
