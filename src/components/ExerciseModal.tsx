import React, { useState } from "react";
import "../styles/ProjectOverview.scss";
import { Modal } from "@material-ui/core";
import "../styles/Portfolio.scss";
import { displayStrikePrice } from "../lib/utils";
import { BN } from "@project-serum/anchor";
import { useRecoilValue } from "recoil";
import { optionMarketFamily, tokenAccountsMap } from "../recoil";

const ExerciseModal: React.FC<{
  tokenAccountKey: string;
  optionMarketKey: string;
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose, tokenAccountKey, optionMarketKey }) => {
  const [exerciseAmount, setExerciseAmount] = useState("0.0");
  const [disableExerice, setDisableExercise] = useState(false);
  const tokenAccount = useRecoilValue(tokenAccountsMap(tokenAccountKey));
  if (!tokenAccount) {
    throw new Error(`Error finding tokenAccount with key ${tokenAccountKey}`);
  }
  const optionMarket = useRecoilValue(optionMarketFamily(optionMarketKey));
  if (!optionMarket) {
    throw new Error(`Error finding optionMarket with key ${optionMarketKey}`);
  }

  return (
    <Modal open={open} onClose={onClose} className="exercise-modal" style={{}}>
      <div className="modal-body">
        <div className="modal-header">Exercise Option</div>
        <div className="modal-row">
          <div>Amount Available:</div>
          <div>{tokenAccount.amount.toString()}</div>
        </div>
        <div className="modal-row">
          <div>Token Value:</div>
          <div>$10.75</div>
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
          <div>Amount Exercising:</div>
          <input
            className="exercise-input"
            type="string"
            value={exerciseAmount}
            onChange={(e) => {
              const desiredExerciseAmount = e.target.value;
              setExerciseAmount(desiredExerciseAmount);
              if (
                !isNaN(Number(desiredExerciseAmount)) &&
                desiredExerciseAmount.indexOf(".") !==
                  desiredExerciseAmount.length - 1 &&
                parseFloat(desiredExerciseAmount) <= tokenAccount.amount
              ) {
                setDisableExercise(false);
              } else {
                setDisableExercise(true);
              }
            }}
          ></input>
        </div>
        <div className="buttons-wrapper">
          <button
            className="cancel-button"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            className="confirm-exercise-button"
            onClick={() => {
              console.log("exercising");
            }}
            disabled={disableExerice}
          >
            Exercise
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExerciseModal;
