import React, { useState } from "react";
import { MintInfoWithKey, OptionAccounts, Project } from "../types";
import OptionOverview from "./OptionOverview";
import "../styles/ProjectOverview.scss";
import classNames from "classnames";
import { Modal } from "@material-ui/core";
import "../styles/Portfolio.scss";
import { calculateStrikeFromOptionAccount } from "../lib/utils";
import { BN } from "@project-serum/anchor";

const ExerciseModal: React.FC<{
  project: Project;
  optionsAccount: OptionAccounts;
  open: boolean;
  onClose: () => void;
}> = ({ project, open, onClose, optionsAccount }) => {
  const [exerciseAmount, setExerciseAmount] = useState("0.0");
  const [disableExerice, setDisableExercise] = useState(false);
  if (optionsAccount === null) {
    return <></>;
  }
  return (
    <Modal open={open} onClose={onClose} className="exercise-modal" style={{}}>
      <div className="modal-body">
        <div className="modal-header">Exercise Option</div>
        <div className="modal-row">
          <div>Amount Available:</div>
          <div>{optionsAccount.tokenAccount.amount.toString()}</div>
        </div>
        <div className="modal-row">
          <div>Token Value:</div>
          <div>$10.75</div>
        </div>
        <div className="modal-row">
          <div>Strike Price:</div>
          <div>
            {calculateStrikeFromOptionAccount(optionsAccount).toString()}
          </div>
        </div>
        <div className="modal-row">
          <div>Gains from Exercising:</div>
          <div>
            { !disableExerice
              ? new BN(parseFloat(exerciseAmount) * 10.75)
                  .div(calculateStrikeFromOptionAccount(optionsAccount))
                  .toString()
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
                desiredExerciseAmount.indexOf(".") !== desiredExerciseAmount.length - 1 &&
                new BN(parseFloat(desiredExerciseAmount)).lte(
                  optionsAccount.tokenAccount.amount
                )
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
