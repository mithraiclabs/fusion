import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './styles/app.global.scss';
import styles from './styles/app.module.scss';
import HeaderNav from './components/HeaderNav';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import { PsyWalletProvider } from './components/WalletProvider';

ReactDOM.render(
  <React.StrictMode >
    <PsyWalletProvider>
      <div className={styles.app}>
        <Router>
        <HeaderNav />
          <main className={styles.main}>
            <section className={styles.section}>
              <Switch>
                <Route path='/portfolio/:key' component={Portfolio} />
                <Route path='/' component={Home} />
              </Switch>
            </section>
          </main>
        </Router>
      </div>
    </PsyWalletProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
