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
import './styles/app.global.scss';
import styles from './styles/app.module.scss';
import HeaderNav from './components/HeaderNav';
import Contributor from './pages/Contributor';
import ContributorNew from './pages/ContributorNew';
import ContributorEdit from './pages/ContributorEdit';
import Home from './pages/Home';
import Treasury from './pages/Treasury';
import TreasuryNew from './pages/TreasuryNew';
import TreasuryEdit from './pages/TreasuryEdit';
import Portfolio from './pages/Portfolio';

const ConnectWallet = () => (<>Connect Wallet <ConnectWalletButton /></>);
const DisconnectWallet = () => (<>Disconnect Wallet</>);

ReactDOM.render(
  <React.StrictMode >
    <WalletKitProvider 
      defaultNetwork='devnet'
      app={{
        name: 'PsyOptions Management'
      }}
      >
      <div className={styles.app}>
        <Router>
        <HeaderNav />
          <main className={styles.main}>
            <section className={styles.section}>
              <Switch>
                <Route exact path='/contributor' component={Contributor} />
                <Route exact path='/contributor/edit/:publicKey' component={ContributorEdit} />
                <Route exact path='/contributor/new' component={ContributorNew} />
                <Route path='/portfolio/:key' component={Portfolio} />
                <Route exact path='/treasury' component={Treasury} />
                <Route exact path='/treasury/edit/:publicKey' component={TreasuryEdit} />
                <Route exact path='/treasury/new' component={TreasuryNew} />
                <Route path='/' component={Home} />
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
