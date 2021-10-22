import React from 'react';
import styles from '../styles/IndexIntroSketch.module.scss';
import stylesGlobal from '../styles/globals.module.scss';
import PsyChart from './PsyChart';

const IndexIntro = () => {
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
        <h1>Equity. Simplified</h1>
        <div>
          PsyOptions Management helps teams and communities and investors 
          manage their token distribution, valuations, investments, and equity plans.
        </div>
        <div className={stylesGlobal["psy-button-group"]}>
          <button>Connect Wallet</button>
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
