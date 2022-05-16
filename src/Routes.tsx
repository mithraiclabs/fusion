import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Home from "./pages/Home";
import { useHydrateState } from "./hooks/useHydrateState";

export const Routes: React.VFC = () => {
  useHydrateState();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
      </Switch>
    </BrowserRouter>
  );
};
