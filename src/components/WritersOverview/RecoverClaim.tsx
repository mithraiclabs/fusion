import { FusionButton } from "../FusionButton";
import { FusionPaper } from "../FusionPaper";
import { NumberInput } from "../NumberInput";

import { Project } from "../../types";

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
}> = ({
  type,
  project,
  max,
  amountToBurn,
  amountToReceive,
  setAmountToBurn,
  onClick,
}) => {
  return (
    <FusionPaper
      divisor={true}
      border={true}
      header={header(type)}
      title={title(type)}
      borderColor={project.primaryColor}
    >
      <NumberInput
        number={String(amountToBurn)}
        setMax={() => setAmountToBurn(max.toString())}
        setNumber={(e: any) => {
          setAmountToBurn(e);
        }}
        max={max}
        sx={{
          marginY: 2,
          border: `2px solid ${project.primaryColor}`,
          borderRadius: "6px",
        }}
      />
      <FusionButton
        color={project.primaryColor}
        onClick={onClick}
        disabled={!amountToBurn}
        title={`+${amountToReceive} ${project.symbol}`}
      />
    </FusionPaper>
  );
};
