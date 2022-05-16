import { makeStyles } from "@material-ui/core";
import React from "react";
import { BORDER_COLOR } from "../Theme";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      color: BORDER_COLOR,
      height: 2,
      fill: BORDER_COLOR,
      background: BORDER_COLOR,
      border: "none",
      borderColor: BORDER_COLOR,
    },
  };
});

export const Hr: React.FC<{}> = ({ children, ...props }) => {
  const classes = useStyles();
  return <hr className={classes.root}>{children}</hr>;
};
