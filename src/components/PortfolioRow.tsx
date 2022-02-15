import { useConnectedWallet } from "@saberhq/use-solana";
import { Link } from "react-router-dom";
import "../styles/Portfolio.scss";
import React from "react";
import classNames from "classnames";

import { OptionAccounts } from "../types";
import tokenData from "../content/TokenAccountData";

const PortfolioRow: React.FC<{ optionAccount: OptionAccounts }> = ({
  optionAccount,
}) => {
  return (
    <div
      key={optionAccount.tokenAccount.address.toString()}
      className="portfolio-row-wrapper"
    >
      <div className={classNames("address", "row-section")}>
        {optionAccount.tokenAccount.address.toString()}
      </div>
      <div className={classNames("expired", "row-section")}>
        {optionAccount.optionMarket.expired ? "Yes" : "No"}
      </div>
      <div className={classNames("expiration", "row-section")}>
        {optionAccount.optionMarket.expirationUnixTimestamp.toString()}
      </div>
      <div className={classNames("price", "row-section")}>1239810294</div>
      <div className={classNames("amount", "row-section")}>
        {optionAccount.tokenAccount.amount.toString()}
      </div>
      <div className={classNames("delegator", "row-section")}>
        {optionAccount.tokenAccount.delegate.toString()}
      </div>
      <div className={classNames("exercise", "row-section")}> 
        <button
        className="exercise-button"
          onClick={() => {
            console.log("exercise: ", optionAccount.tokenAccount.address);
          }}
        >
          Exercise
        </button>
      </div>
    </div>
  );
};

export default PortfolioRow;
