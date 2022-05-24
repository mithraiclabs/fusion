import React, { useState } from "react";
import "../styles/ProjectOverview.scss";
import "../styles/Portfolio.scss";
import { displayStrikePrice } from "../lib/utils";
import { Card, Button, CardHeader, Modal, TextField } from "@mui/material";
import { useRecoilValue } from "recoil";
import { optionMarketFamily, tokenAccountsMap } from "../recoil";

const ExerciseModal: React.FC<{
  tokenAccountKey: string;
  optionMarketKey: string;
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose, tokenAccountKey, optionMarketKey }) => {
  const [exerciseAmount, setExerciseAmount] = useState(0);
  const [disableExerice, setDisableExercise] = useState(false);
  const tokenAccount = useRecoilValue(tokenAccountsMap(tokenAccountKey));
  const optionMarket = useRecoilValue(optionMarketFamily(optionMarketKey));

  if (!tokenAccount) {
    throw new Error(`Error finding tokenAccount with key ${tokenAccountKey}`);
  }
  if (!optionMarket) {
    throw new Error(`Error finding optionMarket with key ${optionMarketKey}`);
  }

  return (
    <Modal open={open} onClose={onClose} className="exercise-modal" style={{}}>
      <Card>
        <CardHeader title={"Exercise Option"} />
        <div className="modal-row">
          <div>Amount Available:</div>
          <div>{tokenAccount.amount.toString()}</div>
        </div>
        <div className="modal-row">
          <div>Strike Price:</div>
          <div>{displayStrikePrice(optionMarket).toString()}</div>
        </div>
        <div className="modal-row">
          <div>Gains from Exercising:</div>
          <div>
            {!disableExerice &&
            displayStrikePrice(optionMarket).toString() !== "0"
              ? "TODO"
              : "Invalid"}
          </div>
        </div>
        <div className="modal-row">
          <TextField
            type={"number"}
            label="Amount to exercise"
            value={exerciseAmount}
            inputProps={{
              step: "1",
            }}
            onChange={(e) =>
              setExerciseAmount(Math.abs(parseFloat(e.target.value)))
            }
          />
        </div>
        <div className="buttons-wrapper">
          <Button
            onClick={() => {
              onClose();
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log("exercising");
            }}
            color="primary"
            disabled={disableExerice}
          >
            Exercise
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default ExerciseModal;
