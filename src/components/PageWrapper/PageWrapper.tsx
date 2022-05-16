import { Paper } from "@material-ui/core";
import React from "react";
import { Navbar } from "../Navbar";

const PageWrapper: React.FC<{}> = ({ children }) => {
  return (
    <Paper>
      <Navbar></Navbar>
      {children}
    </Paper>
  );
};

export default PageWrapper;
