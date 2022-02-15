
import {
    useConnectedWallet
  } from '@saberhq/use-solana';
  import { Link } from 'react-router-dom';
  import styles_app from '../styles/app.module.scss';
  import React from 'react';
  import PortfolioRow from '../components/PortfolioRow';
  import PortfolioHeader from '../components/PortfolioHeader';
  import optionAccountsData from '../content/OptionAccountsData';
  
  import '../styles/Portfolio.scss';
  
  const Portfolio = () => {
    const wallet = useConnectedWallet();
    return (
      <div className='portfolio-wrapper'>
        {<PortfolioHeader/>}
        {optionAccountsData.map((option) => {
            return <PortfolioRow optionAccount={option}></PortfolioRow>
        })}
      </div>
    )
  }
  
  export default Portfolio;
  