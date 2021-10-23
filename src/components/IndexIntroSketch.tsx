import React from 'react';
import {
  ConnectWalletButton
} from '@gokiprotocol/walletkit';
import {
  useConnectedWallet, useSolana
} from '@saberhq/use-solana';
import styles from '../styles/IndexIntroSketch.module.scss';
import PsyChart from './PsyChart';

const IndexIntro = () => {
  const wallet = useConnectedWallet();
  console.log('wallet', wallet?.connected);
  // First Explorations
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
        "label": "Hey Yo Eh",
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
  return (
    <div className={styles["index-intro"]}>
      <section>
        <sup>Why PsyOptions Management?</sup>
        <h1>Token value. Simplified</h1>
        <div>
          PsyOptions Management helps teams and communities and investors 
          manage their token distribution, valuations, investments, and token rewards.
        </div>
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
          <button>Read our docs</button>
        </div>
      </section>
      <figure>
        <PsyChart data={data} />
      </figure>
    </div>
  )
};

export default IndexIntro;
