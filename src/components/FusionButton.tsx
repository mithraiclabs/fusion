import { Button, CircularProgress, useTheme } from "@mui/material";
import { Theme } from "@mui/system";
import { ReactEventHandler } from "react";

const hoverStyle = (type: "dark" | "light" | "transparent", theme: Theme) => {
  switch (type) {
    case "dark":
      return {
        background: theme.palette.secondary.dark,
        color: "black",
      };
    case "light":
      return {
        background: "rgba(69, 69, 69, 0.5)",
        color: "white",
      };
    case "transparent":
      return {
        background: "rgba(69, 69, 69, 0.24)",
        color: theme.palette.text.secondary,
      };
  }
};

const buttonStyle = (type: "dark" | "light" | "transparent", theme: Theme) => {
  switch (type) {
    case "dark":
      return {
        background: "black",
        color: theme.palette.secondary.dark,
      };
    case "light":
      return {
        background: theme.palette.text.secondary,
        color: "white",
      };
    case "transparent":
      return {
        background: "none",
        color: theme.palette.text.secondary,
      };
  }
};

export const FusionButton: React.FC<{
  onClick: ReactEventHandler;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  type?: "dark" | "light" | "transparent";
  icon?: JSX.Element;
}> = ({
  onClick,
  title,
  disabled = false,
  loading = false,
  type = "dark",
  icon,
}) => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "4px 16px",
        gap: "8px",
        alignSelf: "flex-end",
        height: "32px",
        borderRadius: "20px",
        flex: "none",
        order: 3,
        flexGrow: 0,
        ...buttonStyle(type, theme),
        "&:hover": hoverStyle(type, theme),
        "&:disabled": {
          ...buttonStyle(type, theme),
          opacity: 0.58,
        },
      }}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {!!icon && icon}
      {loading ? <CircularProgress size={"15px"} color={"secondary"} /> : title}
    </Button>
  );
};
