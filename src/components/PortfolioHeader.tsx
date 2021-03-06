import "../styles/Portfolio.scss";
import React from "react";
import classNames from "classnames";

const PortfolioHeader: React.FC = () => {
  return (
    <div className="portfolio-header">
      <div className={classNames("exercise", "header-section")}>Exercise</div>
      <div className={classNames("expiration", "header-section")}>
        Expiration Date
      </div>
      <div className={classNames("price", "header-section")}>Strike Price</div>
      <div className={classNames("amount", "header-section")}>Amount Held</div>
    </div>
  );
};

export default PortfolioHeader;
