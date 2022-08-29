import { Button, CircularProgress } from "@mui/material";
import { ReactEventHandler } from "react";

export const FusionButton: React.FC<{
  onClick: ReactEventHandler;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}> = ({ onClick, title, disabled = false, loading = false }) => {
  return (
    <Button
      sx={{
        background: (theme) =>
          disabled
            ? `${theme.palette.primary.main}55`
            : theme.palette.secondary.dark,
        borderRadius: "8px",
        width: "100%",
        height: "53px",
        color: "white",
        "&:hover": {
          background: (theme) => `${theme.palette.secondary.dark}d3`,
        },
      }}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? <CircularProgress /> : title}
    </Button>
  );
};
