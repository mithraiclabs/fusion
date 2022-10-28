import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";
import { decDiv, decSub } from "../../lib/utils";
import {
  airDropStage,
  airDropTokenAmount,
  projectInfo,
} from "../../recoil/util";
import {
  getCurrentMintBalance,
  getUnderlyingNeededForWholeAirdrop,
} from "../../recoil/wallet/selectors";
import { FusionButton } from "../FusionButton";
import { NumberInput } from "../NumberInput";

export const ContractQuantity: React.VFC = () => {
  const setAirDropStage = useSetRecoilState(airDropStage);
  const airDropInfo = useRecoilValue(projectInfo);
  const fullAirdropUnderlyingQty = useRecoilValue(
    getUnderlyingNeededForWholeAirdrop
  );
  const setAirDropTokenAmount = useSetRecoilState(airDropTokenAmount);
  const [underlyingToUse, setUnderlyingToUse] = useState(
    fullAirdropUnderlyingQty.toString()
  );

  const optionMintBalance = useRecoilValue(getCurrentMintBalance);
  const _projectInfo = useRecoilValue(projectInfo);
  const tokens = Object.values(useNetworkTokens());
  const underlyingToken = tokens.find(
    (t) => t.address === airDropInfo?.underlyingAssetMint
  );
  const quoteToken = tokens.find(
    (t) => t.address === airDropInfo?.quoteAssetMint
  );
  const contractQty = decSub(
    decDiv(Number(underlyingToUse), _projectInfo?.underlyingPerContract ?? 1),
    optionMintBalance
  );
  return (
    <>
      <Box marginRight={"24px"}>
        <Typography marginBottom={"16px"}>
          Confirm the details below once you’ve confirmed the amount of
          underlying you would like to distribute.
        </Typography>
        <Typography variant="h4" my={"8px"}>
          Summary
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Typography color={"black"}>Contract qty. & pricing</Typography>
            <Typography color={"black"}>
              Contract expiration (GMT +8)
            </Typography>
          </Box>
          <Box textAlign={"right"}>
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
        <Typography fontSize={"16px"} fontWeight={400} align="center" my={3}>
          Total number of underlying tokens need to distribute to all
          recipients:
        </Typography>
        <Typography
          color={"#777777"}
          fontSize={"24px"}
          fontWeight={600}
          align="center"
        >
          {fullAirdropUnderlyingQty} {underlyingToken?.symbol ?? ""}
        </Typography>
      </Box>
      <Box marginRight={"24px"} my={"24px"}>
        <NumberInput
          number={underlyingToUse}
          setMax={() => {
            setUnderlyingToUse(fullAirdropUnderlyingQty.toString());
          }}
          setNumber={(e: any) => {
            setUnderlyingToUse(e);
          }}
          currency={underlyingToken?.symbol ?? ""}
          max={fullAirdropUnderlyingQty}
          sx={{
            border: (theme) => `2px solid ${theme.palette.secondary.dark}}`,
            borderRadius: "6px",
          }}
        />
      </Box>
      <FusionButton
        title="Confirm Token Amount"
        disabled={!underlyingToUse}
        onClick={() => {
          setAirDropStage(5);
          setAirDropTokenAmount(Number(underlyingToUse));
        }}
      />
    </>
  );
};
