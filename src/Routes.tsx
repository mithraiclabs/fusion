import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import Home from "./pages/Home";
import { useHydrateState } from "./hooks/useHydrateState";
import Recover from "./pages/Recover/Recover";
import { Option } from "./pages/Option";
import { BuilderContainer } from "./components/Builder";
import { ClaimContainer } from "./components/Claimer/ClaimContainer";
import { Writer } from "./pages/Recover/Writer";

export const Routes: React.VFC = () => {
  useHydrateState();
  return (
    <Switch>
      <Route path="/option/:key" element={<Option />} />
      <Route path="/writer/:key" element={<Writer />} />
      <Route path="/airdrop" element={<BuilderContainer />} />
      <Route path="/claim/:jsonLink/:airdropId" element={<ClaimContainer />} />
      <Route path="/claim" element={<ClaimContainer />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Switch>
  );
};
