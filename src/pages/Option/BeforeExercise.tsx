import React from "react";
import { Link, SxProps, Theme } from "@mui/material";
import { useMatch, useNavigate } from "react-router-dom";
import { ExerciseForm } from "../../components/ExerciseForm";
import { BackArrow } from "../../components/Images/icons/BackArrow";
import { OptionBreakdown } from "../../components/OptionBreakdown";

const styles: Record<string, SxProps<Theme>> = {
  backLink: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
    textDecoration: "none",
    my: 50 / 8,
  },
};

export const BeforeExercise: React.VFC = () => {
  const navigate = useNavigate();
  const optionMarketKey = useMatch("/option/:key")?.params?.key || "";

  return (
    <>
      <Link
        color="textPrimary"
        sx={styles.backLink}
        onClick={() => {
          navigate("/");
        }}
      >
        <BackArrow />
        &nbsp; Back to Airdrops
      </Link>
      <OptionBreakdown />
      <ExerciseForm optionMarketKey={optionMarketKey} />
    </>
  );
};
