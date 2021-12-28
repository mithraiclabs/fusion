
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

  const [popupVisible, setPopupVisible] = useState<boolean>(false)

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
  return (

    <nav className={styles_header.header}>
      <div className="box"></div>
        {/*style="background: linear-gradient(90deg, rgb(221, 62, 118) -0.83%, rgb(29, 77, 201) 100%);"*/}
        <div className="MuiBox-root-1 jss346">

          <div className="button-container"></div>
            <button className="logo-button" > PsyOptions Logo</button>
            
            <button className="markets-button" > Markets</button>
            
            <button className="portfolio-button" > Portfolio</button>
            
            <button className="wallet-button" > Wallet</button>
            
            <button className="docs-button" > Docs</button>
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
              <button id='disconnectButton' onClick={() => {
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
