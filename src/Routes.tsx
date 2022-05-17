import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Home from "./pages/Home";
import { useHydrateState } from "./hooks/useHydrateState";
import { Option } from "./pages/Option";

export const Routes: React.VFC = () => {
  useHydrateState();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/option/:key" element={<Option />} />
        <Route path="/" element={<Home />} />
      </Switch>
    </BrowserRouter>
  );
};
