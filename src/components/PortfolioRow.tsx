import "../styles/Portfolio.scss";
import React from "react";
import classNames from "classnames";

import { OptionAccount } from "../types";
import { calculateStrikeFromOptionAccount } from "../lib/utils";
import { LockIcon } from "./Images/icons/lock-icon";

const PortfolioRow: React.FC<{
  optionAccount: OptionAccount;
  exerciseButtonCallback: () => void;
}> = ({ optionAccount, exerciseButtonCallback }) => {
  return (
    <div
      key={optionAccount.tokenAccount.address.toString()}
      className="portfolio-row-wrapper"
    >
      <div className={classNames("exercise", "row-section")}>
        {optionAccount.optionMarket.expired ? (
          <div className="expired-exercise">
            {LockIcon}
            <div>Expired</div>
          </div>
        ) : (
          <button className="exercise-button" onClick={exerciseButtonCallback}>
            Exercise
          </button>
        )}
      </div>
      <div
        className={classNames("expiration", "row-section", {
          expired: optionAccount.optionMarket.expired,
        })}
      >
        {optionAccount.optionMarket.expirationUnixTimestamp.toString()}
      </div>
      <div className={classNames("price", "row-section")}>
        {calculateStrikeFromOptionAccount(optionAccount).toString()}
      </div>
      <div className={classNames("amount", "row-section")}>
        {optionAccount.tokenAccount.amount.toString()}
      </div>

      <div className={classNames("mint", "row-section")}>
        {optionAccount.optionMarket.optionMint.toString()}
      </div>
    </div>
  );
};

export default PortfolioRow;
