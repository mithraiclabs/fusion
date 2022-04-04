import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import styles from "./styles/app.module.scss";
import Home from "./pages/Home";
import Project from "./pages/Project";
import { useHydrateState } from "./hooks/useHydrateState";

export const Routes: React.VFC = () => {
  useHydrateState();
  return (
    <BrowserRouter>
      <main className={styles.main}>
        <section className={styles.section}>
          <Switch>
            <Route path="/project/:key" element={<Project />} />
            <Route path="/" element={<Home />} />
          </Switch>
        </section>
      </main>
    </BrowserRouter>
  );
};
