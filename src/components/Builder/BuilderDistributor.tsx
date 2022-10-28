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

export const BuilderDistributor: React.VFC = () => {
  useLoadSplTokens();
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
      {!!optionMintBalance ? (
        <>
          <Typography fontSize={"16px"} variant={"body2"}>
            {optionMintBalance} option tokens available to distribute;{" "}
          </Typography>
          <Typography fontSize={"16px"} marginY={"24px"}>
            Click below to create the option airdrop and send it the minted
            options <br />
            (2 transactions)
          </Typography>
        </>
      ) : (
        <></>
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
