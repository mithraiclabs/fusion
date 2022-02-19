
import {
    useConnectedWallet
  } from '@saberhq/use-solana';
  import { Link } from 'react-router-dom';
  import styles_app from '../styles/app.module.scss';
  import React from 'react';
  import PortfolioRow from '../components/PortfolioRow';
  import PortfolioHeader from '../components/PortfolioHeader';
  import optionAccountsData from '../content/OptionAccountsData';
  import projectList from '../content/projectList';
  import ExerciseModal from '../components/ExerciseModal';
  import { useState } from 'react';
  import PortfolioSnippet from '../components/PortfolioSnippet';
  
  import '../styles/Portfolio.scss';
  
  const Portfolio = () => {
    // const wallet = useConnectedWallet();
    const [openModal, setOpenModal] = useState(false);
    return (
      <div className='portfolio-wrapper'>
        {<PortfolioSnippet project={projectList[0]}/>}
        {<PortfolioHeader/>}
        {optionAccountsData.map((option) => {
            return <PortfolioRow optionAccount={option} exerciseButtonCallback={() => {setOpenModal(true)}}></PortfolioRow>
        })}
        <ExerciseModal open={openModal} onClose={() => {setOpenModal(false)}} project={projectList[0]} optionsAccount={optionAccountsData[0]}></ExerciseModal>
      </div>
    )
  }
  
  export default Portfolio;
  