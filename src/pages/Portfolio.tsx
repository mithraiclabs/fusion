
import {
    useConnectedWallet
  } from '@saberhq/use-solana';
  import { Link } from 'react-router-dom';
  import styles_app from '../styles/app.module.scss';
  import React from 'react';
  import PortfolioRow from '../components/PortfolioRow';
  import optionAccountsData from '../content/OptionAccountsData';
  
  // import NewOrEdit from '../components/NewOrEdit';
  import styles from '../styles/Treasury.module.scss';
  
  const Portfolio = () => {
    const wallet = useConnectedWallet();
    return (
      <div className={styles.treasury}>
        {optionAccountsData.map((option) => {
            return <PortfolioRow optionAccount={option}></PortfolioRow>
        })}
      </div>
    )
  }
  
  export default Portfolio;
  