import { useConnectedWallet } from "@saberhq/use-solana";
import { Link } from "react-router-dom";
import "../styles/Portfolio.scss";
import React from "react";
import classNames from 'classnames';

const PortfolioHeader: React.FC = () => {
  return (
    <div className="portfolio-header">
      <div className={classNames("address", "header-section")}>Address</div>
      <div className={classNames("expired", "header-section")}>Expired?</div>
      <div className={classNames("expiration", "header-section")}>Expiration Date</div>
      <div className={classNames("price", "header-section")}>Total Price</div>
      <div className={classNames("amount", "header-section")}>Delegated Amount</div>
      <div className={classNames("delegator", "header-section")}> Delegator</div>
      <div className={classNames("exercise", "header-section")}>Exercise</div>
    </div>
  );
};

export default PortfolioHeader;
