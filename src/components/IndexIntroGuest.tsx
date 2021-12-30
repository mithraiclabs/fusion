import React from 'react';
import {
  ConnectWalletButton
} from '@gokiprotocol/walletkit';
import {
  useConnectedWallet, useSolana
} from '@saberhq/use-solana';
import styles from '../styles/IndexIntroGuest.module.scss';
import PsyChart from './PsyChart';
//import OptionOverview from './OptionOverview';
//import OverviewCard from './OverviewCard';
//import { Card } from '@material-ui/core';

const IndexIntroGuest = () => {
  const wallet = useConnectedWallet();
  const {
    disconnect
  } = useSolana();
  const data = {
    labels: [
      "Lorem",
      "Ipsum",
      "Dolor"
     ],
    datasets: [
      {
        "data": [21, 19, 2],
        backgroundColor: [
          '#8BEAFF',
          '#cf3f7c',
          '#fff'
        ] ,
        borderColor: [
          'white'
        ],
        borderWidth: 3
      }
    ]
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true
  };
  return (
    <div className={styles["index-intro-guest"]}>
      <section>
        <sup className='title'> Why PsyOptions Management?</sup>
        <h1>Token value. Simplified.</h1>
        <div className='description'>
          PsyOptions Management helps teams, communities, and investors 
          manage their token distribution, valuations, investments, and token rewards.
        </div>
        <nav>
          <div className='psy-button-group'>
            {
              wallet?.connected ? (
                <div className='psy-button-group'>
                  <button onClick={() => {
                    disconnect();
                  }}>Disconnect Wallet</button>
                </div>
              ) : (
                <ConnectWalletButton />
              )
            }
            <button className=''>Read our docs</button>
          </div>
        </nav>
      </section>
      
      <figure>
        <PsyChart data={data} options={options} />
        
      </figure>
    </div>
  )
};

export default IndexIntroGuest;
