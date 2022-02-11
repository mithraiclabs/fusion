import {
    useConnectedWallet
  } from '@saberhq/use-solana';
  import { Link } from 'react-router-dom';
  import styles_app from '../styles/app.module.scss';
  import React from 'react';

import { OptionAccounts } from "../types";

const PortfolioRow: React.FC<{optionAccount: OptionAccounts}> = ({optionAccount}) => {
    return <div>{optionAccount.tokenAccount.address.toString()}</div>;
}

export default PortfolioRow;