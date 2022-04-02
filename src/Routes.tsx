import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import styles from './styles/app.module.scss';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';

export const Routes: React.VFC = () => {
  return (
    <BrowserRouter>
      <main className={styles.main}>
        <section className={styles.section}>
          <Switch>
            <Route path="/portfolio/:key" element={<Portfolio />} />
            <Route path="/" element={<Home />} />
          </Switch>
        </section>
      </main>
    </BrowserRouter>
  );
};
