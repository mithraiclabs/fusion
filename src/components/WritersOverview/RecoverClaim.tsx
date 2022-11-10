import { FusionButton } from "../FusionButton";
import { NumberInput } from "../NumberInput";
import { Project } from "../../types";
import { BORDER_RADIUS_2 } from "../../Theme";
import { Box, Typography } from "@mui/material";
import { boxStyle } from "../Builder";

type RecoveryType = "BurnForQuote" | "BurnForUnderlying" | "ClosePosition";

const header = (type: RecoveryType) => {
  switch (type) {
    case "BurnForQuote":
      return "Claim quote assets from writer tokens";
    case "BurnForUnderlying":
      return "Claim underlying assets from writer tokens";
    case "ClosePosition":
    default:
      return "Claim underlying assets by burning option/writer token pairs";
  }
};

const title = (type: RecoveryType) => {
  switch (type) {
    case "BurnForQuote":
      return "Set quantity of writer tokens to burn for quote assets";
    case "BurnForUnderlying":
      return "Set quantity of writer tokens to burn for underlying assets";
    case "ClosePosition":
    default:
      return "Set quantity of contracts to close";
  }
};

export const RecoverClaim: React.FC<{
  type: RecoveryType;
  project: Project;
  max: number;
  amountToBurn: string;
  amountToReceive: number;
  setAmountToBurn: React.Dispatch<React.SetStateAction<string>>;
  onClick: React.ReactEventHandler<Element>;
  quoteSymbol?: string;
}> = ({
  type,
  project,
  max,
  amountToBurn,
  amountToReceive,
  quoteSymbol,
  setAmountToBurn,
  onClick,
}) => {
  return (
    <Box sx={boxStyle}>
      <Typography variant="h4">{header(type)}</Typography>
      <Typography variant="body2">{title(type)}</Typography>
      <NumberInput
        number={String(amountToBurn)}
        setMax={() => setAmountToBurn(max.toString())}
        setNumber={(e: any) => {
          setAmountToBurn(e);
        }}
        max={max}
        sx={{
          marginY: 2,
          borderRadius: BORDER_RADIUS_2,
        }}
      />
      <FusionButton
        color={project.primaryColor}
        onClick={onClick}
        disabled={!amountToBurn}
        title={`+${amountToReceive} ${
          type === "BurnForQuote" ? quoteSymbol : project.symbol
        }`}
      />
    </Box>
  );
};
