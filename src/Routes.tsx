import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Home from "./pages/Home";
import { useHydrateState } from "./hooks/useHydrateState";

export const Routes: React.VFC = () => {
  useHydrateState();
  return (
    <Switch>
      <Route path="*" element={<Home />} />
    </Switch>
  );
};
