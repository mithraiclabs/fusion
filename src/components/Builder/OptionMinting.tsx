import { Box, Typography } from "@mui/material";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMintOptions } from "../../hooks/psyAmerican/useMintOptions";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";
import {
  airDropStage,
  airDropTokenAmount,
  optionMarketKeyForMinting,
  projectInfo,
} from "../../recoil/util";
import { getCurrentMintBalance } from "../../recoil/wallet/selectors";
import { FusionButton } from "../FusionButton";
import { FusionPaper } from "../FusionPaper";

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
  const underlyingNeeded =
    airdropTokenAmount -
    optionMintBalance * (_projectInfo?.underlyingPerContract ?? 0);
  const optionsToMintQty =
    airdropTokenAmount / (_projectInfo?.underlyingPerContract ?? 1) -
    optionMintBalance;
  if (!optionKey) throw new Error("Option Market Key not found");

  if (!wallet) {
    return (
      <>
        <FusionPaper border={true} title={"Connect wallet"} divisor={true}>
          <Typography fontSize={"14px"} fontWeight={400} align="center">
            One last step before starting your Fusion airdrop. Please connect
            your wallet in the top right hand corner in order to sign and send
            the createdistributor Transaction.
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
    <>
      <FusionPaper border={true}>
        <Typography fontSize={"24px"} fontWeight={500} align="center">
          Congratulations, Wallet connection completed.
        </Typography>
        <Typography
          fontSize={"16px"}
          fontWeight={400}
          align="center"
          marginBottom={"25px"}
        >
          Click below to mint{" "}
          {airdropTokenAmount / (_projectInfo?.underlyingPerContract ?? 1) -
            optionMintBalance}{" "}
          {underlyingToken.name} option contracts [
          {_projectInfo?.underlyingPerContract} {underlyingToken.symbol} for{" "}
          {_projectInfo?.quotePerContract} {quoteToken.symbol} @{" "}
          {new Date(_projectInfo?.expiration ?? 0).toUTCString()}]
        </Typography>
        <Typography>
          Wallet balance needed: {underlyingNeeded} {underlyingToken.symbol}
        </Typography>
      </FusionPaper>
      <Box my={2}></Box>
      <FusionButton
        title={"Mint Options"}
        loading={minting}
        onClick={async () => {
          if (underlyingNeeded) {
            setMinting(true);
            const mintingDone = await mint(optionsToMintQty);
            if (airdropTokenAmount >= optionMintBalance && mintingDone) {
              setTimeout(() => {
                setMinting(false);
              }, 3000);

              setTimeout(() => {
                setAirDropStage((prev) => prev + 1);
              }, 4000);
            } else {
              setMinting(false);
            }
          } else {
            setAirDropStage((prev) => prev + 1);
          }
        }}
      />
    </>
  );
};
