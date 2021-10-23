import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {
  WalletKitProvider,
  ConnectWalletButton
} from '@gokiprotocol/walletkit';
import reportWebVitals from './reportWebVitals';
import './styles/globals.scss';
import styles from './styles/app.module.scss';
import HeaderNav from './components/HeaderNav';
import Home from './pages/Home';
const ConnectWallet = () => (<>Connect Wallet <ConnectWalletButton /></>);
const DisconnectWallet = () => (<>Disconnect Wallet</>);

ReactDOM.render(
  <React.StrictMode>
    <WalletKitProvider
      defaultNetwork='devnet'
      app={{
        name: 'PsyOptions Management'
      }}>
      <div className={styles.app}>
        <HeaderNav />
        <Router>
          <main className={styles.main}>
            <section className={styles.section}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path={['/connect','/login','/signin']} component={ConnectWallet} />
                <Route exact path={['/disconnect','/logout','/signout']} component={DisconnectWallet} />
              </Switch>
            </section>
          </main>
        </Router>
      </div>
    </WalletKitProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
