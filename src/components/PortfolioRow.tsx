import "../styles/Portfolio.scss";
import React from "react";
import classNames from "classnames";

import { displayStrikePrice, displayExpirationDate } from "../lib/utils";
import { LockIcon } from "./Images/icons/lock-icon";
import { useRecoilValue } from "recoil";
import { optionMarketFamily, tokenAccountsMap } from "../recoil";

const PortfolioRow: React.FC<{
  tokenAccountKey: string;
  optionMarketKey: string;
  exerciseButtonCallback: () => void;
}> = ({ tokenAccountKey, optionMarketKey, exerciseButtonCallback }) => {
  const tokenAccount = useRecoilValue(tokenAccountsMap(tokenAccountKey));
  const optionMarket = useRecoilValue(optionMarketFamily(optionMarketKey));
  if (!optionMarket || !tokenAccount) {
    return null;
  }
  return (
    <div key={tokenAccount.key.toString()} className="portfolio-row-wrapper">
      <div className={classNames("exercise", "row-section")}>
        {optionMarket.expired ? (
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
          expired: optionMarket.expired,
        })}
      >
        {displayExpirationDate(optionMarket)}
      </div>
      <div className={classNames("price", "row-section")}>
        {displayStrikePrice(optionMarket).toString()}
      </div>
      <div className={classNames("amount", "row-section")}>
        {tokenAccount.amount.toString()}
      </div>
    </div>
  );
};

export default PortfolioRow;
