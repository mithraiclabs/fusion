import { Box, Typography } from "@mui/material";
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
      <>
        <FusionPaper border={true} title={"Connect wallet"} divisor={true}>
          <Typography fontSize={"14px"} fontWeight={400} align="center">
            One last step before starting your Fusion airdrop. Please connect
            your wallet in the top right hand corner in order to sign and send
            the createdistributor Transaction.
          </Typography>
        </FusionPaper>
        <ConnectWalletButton />
      </>
    );
  }
  return (
    <>
      <FusionPaper border={true}>
        {contractQty > 0 ? (
          <>
            <Typography
              fontSize={"16px"}
              fontWeight={400}
              align="center"
              marginBottom={"25px"}
            >
              Click below to mint {contractQty} {underlyingToken.name} option
              contract{contractQty !== 1 ? "s" : ""}
            </Typography>
            <Typography align="center" marginBottom={"25px"}>
              {contractQty}x[{_projectInfo?.underlyingPerContract}{" "}
              {underlyingToken.symbol} for {_projectInfo?.quotePerContract}{" "}
              {quoteToken.symbol} @{" "}
              {new Date(_projectInfo?.expiration ?? 0).toUTCString()}]
            </Typography>
            <Typography align="center">
              Wallet balance needed: {underlyingNeeded} {underlyingToken.symbol}
            </Typography>
          </>
        ) : (
          <Typography>
            You already have suffiecient option tokens for this airdrop in your
            wallet
          </Typography>
        )}
      </FusionPaper>
      <Box my={2}></Box>
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
    </>
  );
};
