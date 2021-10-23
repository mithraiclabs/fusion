
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
import styles from '../styles/app.module.scss';

const Header = () => {
  // First Explorations
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
  return (
    <nav className={styles.header}>
      <>
        {wallet?.connected ? (
          <>
            <div className='psy-button-group'>
              <button onClick={() => {
                void disconnect();
              }}>Disconnect Wallet</button>
            </div>
            <ul>
              <li><strong>Wallet:</strong> {wallet?.publicKey?.toString()}</li>
              <li><strong>Provider:</strong> {walletProviderInfo?.name}</li>
              <li><strong>Network:</strong> {network}</li>
              <li><strong>Balance:</strong> {typeof balance === 'number' ? `${(balance / LAMPORTS_PER_SOL).toLocaleString()} SOL` : '--'}</li>
            </ul>
          </>
        ) : (
          <div className='psy-button-group'>
            <ConnectWalletButton />
          </div>
        )}
      </>
    </nav>
  )
};
export default Header;
