import { useConnectedWallet } from "@saberhq/use-solana";
import { Link } from "react-router-dom";
import "../styles/Portfolio.scss";
import React from "react";
import classNames from "classnames";

import { OptionAccounts } from "../types";
import tokenData from "../content/TokenAccountData";
import { formatStrikeAsStringFromOptionAccount } from "../lib/utils";

const PortfolioRow: React.FC<{ optionAccount: OptionAccounts, exerciseButtonCallback: () => void }> = ({
  optionAccount,
  exerciseButtonCallback
}) => {
  return (
    <div
      key={optionAccount.tokenAccount.address.toString()}
      className="portfolio-row-wrapper"
    >
      <div className={classNames("exercise", "row-section")}>
        <button
          className="exercise-button"
          onClick={exerciseButtonCallback}
        >
          Exercise
        </button>
      </div>
      <div className={classNames("expiration", "row-section")}>
        {optionAccount.optionMarket.expired ? "Yes" : "No"}
        {optionAccount.optionMarket.expirationUnixTimestamp.toString()}
      </div>
      <div className={classNames("price", "row-section")}>
        {formatStrikeAsStringFromOptionAccount(optionAccount)}
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
