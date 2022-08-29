import { Avatar, Typography } from "@mui/material";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";
import {
  airDropStage,
  airDropTokenAmount,
  projectInfo,
  recipientJson,
} from "../../recoil/util";
import { FusionButton } from "../FusionButton";
import { FusionPaper } from "../FusionPaper";
import { Hr } from "../Hr";
import { NumberInput } from "../NumberInput";

export const ContractQuantity: React.VFC = () => {
  const [_airDropTokenAmount, setAirDropTokenAmount] =
    useRecoilState(airDropTokenAmount);
  const [actualContracts, setActualContracts] = useState(
    _airDropTokenAmount.toString()
  );
  const tokens = Object.values(useNetworkTokens());
  const setAirDropStage = useSetRecoilState(airDropStage);
  const airDropInfo = useRecoilValue(projectInfo);
  const underlyingToken = tokens.find(
    (t) => t.address === airDropInfo?.underlyingAssetMint
  );
  const jsonData = useRecoilValue(recipientJson);
  const totalContracts = jsonData?.recipientList.reduce(function (acc, obj) {
    return acc + Number(obj.amount);
  }, 0) as number;
  const totalTokens = airDropInfo?.underlyingPerContract! * totalContracts;
  const { name, symbol, logoURI } = underlyingToken!;
  return (
    <>
      <FusionPaper border={true}>
        <Avatar
          src={logoURI}
          sx={{
            width: "100px",
            height: "100px",
            alignContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "25px",
          }}
        />
        <Typography fontSize={"32px"} fontWeight={500} align="center">
          {name} Options airdrop
        </Typography>
        <Hr />
        <Typography fontSize={"16px"} fontWeight={400} align="center" my={3}>
          Total number of underlying tokens need to distribute to all
          recipients:
        </Typography>
        <Typography
          color={"#777777"}
          fontSize={"34px"}
          fontWeight={600}
          align="center"
        >
          {totalTokens} {symbol}
        </Typography>
      </FusionPaper>
      <NumberInput
        number={actualContracts}
        setMax={() => {
          setActualContracts(totalTokens.toString());
        }}
        setNumber={(e: any) => {
          setActualContracts(e);
        }}
        currency={symbol}
        max={totalTokens}
        sx={{
          marginY: 2,
          border: (theme) => `2px solid ${theme.palette.secondary.dark}}`,
          borderRadius: "6px",
        }}
      />
      <FusionButton
        title="Confirm Token Amount"
        disabled={!actualContracts}
        onClick={() => {
          setAirDropStage((prev) => prev + 1);
          setAirDropTokenAmount(Number(actualContracts));
        }}
      />
    </>
  );
};
