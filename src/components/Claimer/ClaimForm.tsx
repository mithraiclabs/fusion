import { List, ListItemButton, ListItemText } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { claimStage, recipientJson } from "../../recoil/util";
import { listStyle } from "../Builder/styles";
import { FusionPaper } from "../FusionPaper";
import test1data from "../../fusion-data/test1.json";
import test2data from "../../fusion-data/test2.json";
import { useEffect, useState } from "react";
import { FusionButton } from "../FusionButton";

const jsonArr = [test1data, test2data];

export const ClaimForm: React.FC = () => {
  const setClaimStage = useSetRecoilState(claimStage);
  const [recipientJSON, setRecipientJSON] = useRecoilState(recipientJson);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (!selectedIndex && recipientJSON) {
      const selected = jsonArr.findIndex((j) => j.name === recipientJSON.name);
      setSelectedIndex(selected);
    }
  }, [recipientJSON, selectedIndex]);

  return (
    <FusionPaper
      header="Airdrop claim"
      title="Select the airdrop"
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
            setClaimStage((prev) => prev + 1);
            setRecipientJSON(jsonArr[selectedIndex]);
          }
        }}
      />
    </FusionPaper>
  );
};
