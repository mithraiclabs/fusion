
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
import styles from '../styles/Wallet.module.scss';
import LogoImg from './psyoptions-logo-light.png';

//const drawerWidth = 240;
const Wallet = () => {
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

  //const [openModal, setOpenModal] = useState(false)
  const [popupVisible, setPopupVisible] = useState<boolean>(false)


  //https://www.youtube.com/watch?v=IF6k0uZuypA
  function togglePopup() {
    setPopupVisible(!popupVisible)
  }


  return (
    <nav className={styles.wallet}><>
      <div className={styles["wallet-container"]}>
      {wallet?.connected ? (
          <>
          <h1>WALLET INFO</h1>
            <ul className={styles["wallet-info"]}>
              <li><strong>Wallet Address</strong> {wallet?.publicKey?.toString()}</li>
              <li><strong>Provider</strong> {walletProviderInfo?.name}</li>
              <li><strong>Network  </strong> {network}</li>
              <li><strong>Balance  </strong> {typeof balance === 'number' ? `${(balance / LAMPORTS_PER_SOL).toLocaleString()} SOL` : '--'}</li>
              <li> <button id='disconnect-button' onClick={() => {
                      disconnect();
                    }}>Disconnect Wallet</button>
              </li>
            </ul>
          </>
        ) : (
          <ul className="wallet-info">
            <li><div className='psy-button-group'> <ConnectWalletButton /></div></li>
          </ul>
        )}
      </div>
        
      </>
      
    </nav>
  );
};

export default Wallet;
