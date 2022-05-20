import { Divider, SxProps, Theme } from "@mui/material";
import React from "react";
import { BORDER_COLOR } from "../Theme";

const styles = {
  root: {
    color: BORDER_COLOR,
    height: 2,
    fill: BORDER_COLOR,
    background: BORDER_COLOR,
    border: "none",
    borderColor: BORDER_COLOR,
  },
};

export const Hr: React.FC<{ sx?: SxProps<Theme> }> = ({ children, sx }) => {
  return <Divider sx={{ ...styles.root, ...sx }}>{children}</Divider>;
};
