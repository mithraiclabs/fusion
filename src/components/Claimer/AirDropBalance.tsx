import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useClaimAirdrop } from "../../hooks/useClaimAirdrop";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";
import {
  airdropBalance,
  claimStageAtom,
  recipientJson,
  selectedClaim,
} from "../../recoil/util";
import { PAPER_COLOR } from "../../Theme";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { FusionButton } from "../FusionButton";

export const AirDropBalance: React.FC = () => {
  const claim = useClaimAirdrop();
  const balance = useRecoilValue(airdropBalance);
  const navigate = useNavigate();
  const tokens = useNetworkTokens();
  const setClaimStage = useSetRecoilState(claimStageAtom);
  const selectedJSON = useRecoilValue(recipientJson);
  const _selectedClaim = useRecoilValue(selectedClaim);
  const { publicKey } = useWallet();
  if (!publicKey) return <ConnectWalletButton />;
  const claimableQty = Number(
    selectedJSON?.recipientList.find((r) => {
      return r.recipient === publicKey.toString();
    })?.amount ?? "0"
  );

  if (!balance || !claimableQty || !_selectedClaim)
    return (
      <Box sx={boxStyle}>
        <Typography variant="h4" marginBottom={2}>
          {claimableQty
            ? "Sorry, all the option contracts have been claimed :("
            : "Sorry, looks like your wallet is not included in this airdrop :("}
        </Typography>
        <FusionButton
          onClick={() => {
            navigate("/");
          }}
          title={"Go Back Home"}
        />
      </Box>
    );

  return (
    <Box>
      <Box sx={{ ...boxStyle, textAlign: "center" }}>
        <Typography variant="h3">{balance}</Typography>
        <Typography variant="h5">{`option contract${
          balance > 1 ? "s" : ""
        } remaining in this airdrop`}</Typography>
      </Box>
      <Box sx={boxStyle}>
        <Stack direction={"row"} justifyContent={"left"}>
          <Avatar src={tokens[_selectedClaim.underlyingAssetMint].logoURI} />
          <Box>
            <Typography variant="h5" mx={2}>
              {tokens[_selectedClaim.underlyingAssetMint].name}
            </Typography>

            <Typography variant="h4" mx={2}>
              {_selectedClaim.optionName}
            </Typography>
          </Box>
        </Stack>
        <Typography my={2} variant={"body2"}>
          Description : {_selectedClaim.description}
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography py={1}>
            If you haven't already, you should be able to claim{" "}
            {Math.min(claimableQty, balance)} contract
            {Math.min(claimableQty, balance) > 1 ? "s" : ""}
          </Typography>
          <FusionButton
            onClick={async () => {
              const success = await claim();
              if (success) {
                setClaimStage(3);
              }
            }}
            title={"claim"}
          />
        </Stack>
      </Box>
    </Box>
  );
};

const boxStyle = {
  padding: "24px",
  background: PAPER_COLOR,
  borderRadius: "6px",
  marginTop: "16px",
};
