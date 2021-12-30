
import React, { useCallback, useEffect, useState } from 'react';
import {
  ConnectWalletButton
} from '@gokiprotocol/walletkit';
import {
  useConnectedWallet, useSolana
} from '@saberhq/use-solana';
import {
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import styles_header from '../styles/Header.module.scss';

const Header = () => {
  const {
    walletProviderInfo,
    disconnect,
    providerMut,
    network
  } = useSolana();
  const wallet = useConnectedWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const refetchSOL = useCallback(async () => {
    if (wallet && providerMut) {
      setBalance(await providerMut.connection.getBalance(wallet.publicKey));
    }
  }, [providerMut, wallet]);
  useEffect(() => {
    void refetchSOL();
  }, [refetchSOL]);

  const [openModal, setOpenModal] = useState(false)
  const [popupVisible, setPopupVisible] = useState<boolean>(false)


  //https://www.youtube.com/watch?v=IF6k0uZuypA
  function togglePopup() {
    setPopupVisible(!popupVisible)
  }

  /*
    <div className='psy-button-group'>
    <button onClick={() => {
     void disconnect();
    }}>Disconnect Wallet</button>
    </div> 
  */

  /*
    style={{  
              backgroundImage: "url('./PsyOpsLogo')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
  */
  return (
    <nav className={styles_header.header}>
      <div className="box"></div>
        {/*style="background: linear-gradient(90deg, rgb(221, 62, 118) -0.83%, rgb(29, 77, 201) 100%);"*/}
        <div className="MuiBox-root-1 jss346">

          <div className="button-container"></div>
            <button className="logo-button" onClick={() => {
                window.open("https://trade.psyoptions.io/#/");
              }}> PsyOptions Logo</button>
            <button className="markets-button" onClick={() => {
                //do something
              }}> Markets</button>
            <button className="portfolio-button" onClick={() => {
                //do something
              }}> Portfolio</button>
            <button className="wallet-button" onClick={() => {
                setOpenModal(true);
              }}> Wallet</button>
            <button className="docs-button" onClick={() => {
                window.open("https://docs.psyoptions.io/");
              }}> Docs</button>
          </div>
      <>
        {wallet?.connected ? (
          <>
            <ul className="wallet-info">
              <li><strong>Wallet</strong> {wallet?.publicKey?.toString()}</li>
              <li><strong>Provider</strong> {walletProviderInfo?.name}</li>
              <li><strong>Network</strong> {network}</li>
              <li><strong>Balance</strong> {typeof balance === 'number' ? `${(balance / LAMPORTS_PER_SOL).toLocaleString()} SOL` : '--'}</li>
            </ul>
            <div className='psy-button-group'>
              <button id='disconnect-button' onClick={() => {
                disconnect();
              }}>Disconnect Wallet</button>
            </div>
          </>
        ) : (
          <div className='psy-button-group'>
            <ConnectWalletButton />

          </div>
        )}
      </>
      
    </nav>
  );
};

export default Header;
