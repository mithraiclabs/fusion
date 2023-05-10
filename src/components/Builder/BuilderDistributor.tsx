import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FusionButton } from "../FusionButton";
import { useCreateDistributor } from "../../hooks/distributors/useCreateDistributor";
import {
  airDropStage,
  airDropTokenAmount,
  distributorAddress,
  projectInfo,
} from "../../recoil/util";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getCurrentMintBalance } from "../../recoil/wallet/selectors";
import { useLoadSplTokens } from "../../hooks/wallet";
import { decDiv } from "../../lib/utils";
import { useState } from "react";

export const BuilderDistributor: React.VFC = () => {
  useLoadSplTokens();
  const [load, setLoad] = useState(false);
  const distribute = useCreateDistributor();
  const setAirDropStage = useSetRecoilState(airDropStage);
  const setDistributorAddress = useSetRecoilState(distributorAddress);
  const _projectInfo = useRecoilValue(projectInfo);
  const airdropTokenAmount = useRecoilValue(airDropTokenAmount);
  const airdropOptionAmount = decDiv(
    airdropTokenAmount,
    _projectInfo?.underlyingPerContract ?? 1
  );
  const optionMintBalance = useRecoilValue(getCurrentMintBalance);

  return (
    <Box>
      <Typography marginBottom={"24px"}>
        {" "}
        Options minted successfully, you can now distribute the airdrop!
      </Typography>

      {load && <SplTokenReloader />}
      {!!optionMintBalance ? (
        <>
          <Typography fontSize={"16px"} variant={"body2"}>
            {optionMintBalance} option tokens available to distribute;{" "}
          </Typography>
          <Typography fontSize={"16px"} marginY={"24px"}>
            Click below to create the option airdrop and send it the minted
            options <br />
          </Typography>
        </>
      ) : (
        <></>
      )}
      {optionMintBalance < airdropOptionAmount && (
        <FusionButton
          title="Reload Balance"
          onClick={() => {
            setLoad(true);
            setTimeout(() => {
              setLoad(false);
            }, 3000);
          }}
        />
      )}
      <FusionButton
        title="Create airdrop and fund it with minted options"
        disabled={optionMintBalance < airdropOptionAmount}
        onClick={async () => {
          const { distributorAddress } = await distribute();
          if (distributorAddress) {
            setDistributorAddress(distributorAddress);
            setAirDropStage(7);
          }
        }}
      />
    </Box>
  );
};

export const SplTokenReloader: React.VFC = () => {
  useLoadSplTokens();
  return null;
};
