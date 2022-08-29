import { List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { airDropStage, recipientJson } from "../../recoil/util";
import { FusionButton } from "../FusionButton";
import { FusionPaper } from "../FusionPaper";
import test1data from "../../fusion-data/test1.json";
import test2data from "../../fusion-data/test2.json";
import { listStyle } from "./styles";

const jsonArr = [test1data, test2data];

export const DistributionListUpload: React.VFC = () => {
  const setAirDropStage = useSetRecoilState(airDropStage);
  const setRecipientJSON = useSetRecoilState(recipientJson);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <FusionPaper
      header="Formatting and uploading the distribution file (beta)"
      title="Select the recipient list"
      divisor={true}
    >
      <List sx={listStyle}>
        {jsonArr.map(({ name }, index) => (
          <ListItemButton
            key={index}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemText primary={name} />
          </ListItemButton>
        ))}
      </List>
      <FusionButton
        title="next"
        disabled={selectedIndex === null}
        onClick={() => {
          if (selectedIndex !== null) {
            setAirDropStage((prev) => prev + 1);
            setRecipientJSON(jsonArr[selectedIndex]);
          }
        }}
      />
    </FusionPaper>
  );
};
