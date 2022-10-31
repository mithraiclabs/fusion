import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import { airDropStage } from "../../recoil/util";
import { BuilderLanding } from "./BuilderLanding";
import { ContractQuantity } from "./ContractQuantity";
import { DistributionListUpload } from "./DistributionListUpload";
import { ProjectInfoForm } from "./ProjectInfoForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BuilderDistributor } from "./BuilderDistributor";
import { OptionMinting } from "./OptionMinting";
import { AirdropSuccess } from "./AirdropSuccess";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DESKTOP_PAPER_WIDTH, PAPER_COLOR } from "../../Theme";

export const Stage: React.FC<{
  title: string;
  lastCompleted: number;
  order: number;
}> = ({ title, lastCompleted, order }) => {
  const [_airDropStage, setAirDropStage] = useRecoilState(airDropStage);
  const completed = lastCompleted >= order;
  let isCurrent = _airDropStage === order;
  return (
    <Box
      onClick={() => completed && setAirDropStage(order)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: DESKTOP_PAPER_WIDTH,
        cursor: "default",
        background: PAPER_COLOR,
        marginBottom: isCurrent ? "0px" : "16px",
        height: "66px",
        borderRadius: "6px",
        paddingBottom: "none",
        "&:hover": {
          background: completed && !isCurrent ? "#F4F4F4" : undefined,
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: completed ? "#3AB67A" : "#AFAFAF",
          textAlign: "center",
          paddingLeft: "24px",
          paddingTop: "24px",
          letterSpacing: "0.25px",
          ...(isCurrent && {
            color: "black",
          }),
        }}
        textTransform={"uppercase"}
        lineHeight={"18.4px"}
      >
        {title}
      </Typography>
    </Box>
  );
};

export const BuilderContainer: React.VFC = () => {
  const [_airDropStage, setAirDropStage] = useRecoilState(airDropStage);
  const navigate = useNavigate();
  const [lastCompleted, setLastCompleted] = useState(0);
  useEffect(() => {
    if (_airDropStage > 1)
      setLastCompleted(Math.max(lastCompleted, _airDropStage - 1));
  }, [lastCompleted, _airDropStage]);

  return (
    <Box>
      <Stack direction={"row"} marginTop={2}>
        {_airDropStage > 1 && (
          <Button
            onClick={() => {
              if (_airDropStage > 1) {
                setAirDropStage((prev) => prev - 1);
              } else {
                navigate("/");
                setAirDropStage(1);
              }
            }}
            sx={{
              color: "#000000DE",
            }}
          >
            <ArrowBackIcon />
            &nbsp;
            <Typography fontWeight={500} fontSize={15}>
              Back
            </Typography>
          </Button>
        )}
      </Stack>
      {_airDropStage < 7 && (
        <>
          <Stage
            title="step 1 - Gathering your airdrop addresses"
            lastCompleted={lastCompleted}
            order={1}
          />
          {_airDropStage === 1 && (
            <Box sx={boxStyle}>
              <BuilderLanding />
            </Box>
          )}

          <Stage
            title="step 2 - your recipients"
            lastCompleted={lastCompleted}
            order={2}
          />
          {_airDropStage === 2 && (
            <Box sx={boxStyle}>
              <DistributionListUpload />
            </Box>
          )}

          <Stage
            title="step 3 - airdrop details"
            lastCompleted={lastCompleted}
            order={3}
          />
          {_airDropStage === 3 && (
            <Box sx={boxStyle}>
              <ProjectInfoForm />
            </Box>
          )}

          <Stage
            title="step 4 - token confirmation"
            lastCompleted={lastCompleted}
            order={4}
          />
          {_airDropStage === 4 && (
            <Box sx={boxStyle}>
              <ContractQuantity />
            </Box>
          )}
          <Stage
            title="step 5 - minting OPTIONS"
            lastCompleted={lastCompleted}
            order={5}
          />
          {_airDropStage === 5 && (
            <Box sx={boxStyle}>
              <OptionMinting />
            </Box>
          )}

          <Stage
            title="step 6 - creating airdrop"
            lastCompleted={lastCompleted}
            order={6}
          />
          {_airDropStage === 6 && (
            <Box sx={boxStyle}>
              <BuilderDistributor />
            </Box>
          )}
        </>
      )}
      {_airDropStage === 7 && <AirdropSuccess />}
    </Box>
  );
};

const boxStyle = {
  background: PAPER_COLOR,
  marginTop: "0px",
  marginBottom: "24px",
  paddingLeft: "24px",
  paddingBottom: "24px",
  borderRadius: "0px 0px 6px 6px",
};
