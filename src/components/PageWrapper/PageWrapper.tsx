import { Box } from "@material-ui/core";
import React from "react";
import { Navbar } from "../Navbar";

const PageWrapper: React.FC<{}> = ({ children }) => {
  return (
    <Box>
      <Navbar></Navbar>
      {children}
    </Box>
  );
};

export default PageWrapper;
