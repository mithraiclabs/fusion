import { Box, Stack, Typography } from "@mui/material";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMintOptions } from "../../hooks/psyAmerican/useMintOptions";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";
import { decDiv, decMultiply, decSub } from "../../lib/utils";
import {
  airDropStage,
  airDropTokenAmount,
  optionMarketKeyForMinting,
  projectInfo,
} from "../../recoil/util";
import { getCurrentMintBalance } from "../../recoil/wallet/selectors";
import { ConnectWalletButton } from "../ConnectWalletButton";
import { FusionButton } from "../FusionButton";

export const OptionMinting: React.VFC = () => {
  const setAirDropStage = useSetRecoilState(airDropStage);
  const mint = useMintOptions();
  const wallet = useAnchorWallet();
  const optionKey = useRecoilValue(optionMarketKeyForMinting);
  const _projectInfo = useRecoilValue(projectInfo);
  const tokens = useNetworkTokens();
  const underlyingToken = tokens[_projectInfo?.underlyingAssetMint ?? ""];
  const quoteToken = tokens[_projectInfo?.quoteAssetMint ?? ""];
  const airdropTokenAmount = useRecoilValue(airDropTokenAmount);
  const optionMintBalance = useRecoilValue(getCurrentMintBalance);
  const [minting, setMinting] = useState(false);
  const underlyingUsedForAlreadyMintedOptions = decMultiply(
    optionMintBalance,
    _projectInfo?.underlyingPerContract ?? 0
  );
  const contractQty = decSub(
    decDiv(airdropTokenAmount, _projectInfo?.underlyingPerContract ?? 1),
    optionMintBalance
  );

  const underlyingNeeded = decSub(
    airdropTokenAmount,
    underlyingUsedForAlreadyMintedOptions
  );

  if (!optionKey) throw new Error("Option Market Key not found");

  if (!wallet) {
    return (
      <Box>
        <Typography fontSize={"14px"} fontWeight={400} align="center">
          One last step before starting your Fusion airdrop. Please connect your
          wallet in the top right hand corner in order to sign and send the
          createdistributor Transaction.
        </Typography>
        <ConnectWalletButton />
      </Box>
    );
  }
  return (
    <Box marginRight={"24px"}>
      <Typography marginBottom={"16px"}>
        Time to mint your options! Confirm the details below one last time to
        start minting your options. Note: If this option has never been minted
        before you'll need to approve <b>2</b> transactions (1 for creating the
        option market and 1 for minting the options)
      </Typography>
      <Typography variant="h4" my={"8px"}>
        Summary
      </Typography>
      {contractQty > 0 ? (
        <Box>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <Typography color={"black"}>Minting option contract</Typography>
              <Typography color={"black"}>Contract qty. & pricing</Typography>
              <Typography color={"black"}>
                Contract expiration (GMT +8)
              </Typography>
            </Box>
            <Box textAlign={"right"} gap={"6px"}>
              <Typography variant="body2">
                {contractQty} {underlyingToken.name} option contract
                {contractQty > 1 && "s"}
              </Typography>
              <Typography variant="body2">
                {contractQty}x[{_projectInfo?.underlyingPerContract}{" "}
                {underlyingToken?.symbol ?? ""} for{" "}
                {_projectInfo?.quotePerContract} {quoteToken?.symbol ?? ""}]
              </Typography>
              <Typography variant="body2">
                {" "}
                {new Date(_projectInfo?.expiration ?? 0).toUTCString()}
              </Typography>
            </Box>
          </Stack>

          <Typography align="right" variant="h5" marginTop={2}>
            amount you need to provide from your wallet
          </Typography>
          <Typography align="right" variant="h3">
            {underlyingNeeded} {underlyingToken.symbol}
          </Typography>
        </Box>
      ) : (
        <Typography>
          You already have suffiecient option tokens for this airdrop in your
          wallet
        </Typography>
      )}
      <FusionButton
        title={underlyingNeeded > 0 ? "Mint Options" : "continue"}
        loading={minting}
        onClick={async () => {
          if (underlyingNeeded > 0) {
            setMinting(true);
            const mintingDone = await mint(contractQty);
            if (airdropTokenAmount >= optionMintBalance && mintingDone) {
              setTimeout(() => {
                setMinting(false);
              }, 3000);

              setTimeout(() => {
                setAirDropStage(6);
              }, 4000);
            } else {
              setMinting(false);
            }
          } else {
            setAirDropStage(6);
          }
        }}
      />
    </Box>
  );
};
