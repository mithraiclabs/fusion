import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Hr } from "./Hr";
import { BORDER_COLOR } from "../Theme";

export const overviewStyles = {
  container: {
    marginTop: 3.25,
    background: "#FFFFFF",
    borderRadius: "10px",
    border: `1px solid ${BORDER_COLOR}`,
  },
  top: {
    height: "4em",
    display: "flex",
    alignItems: "center",
    paddingLeft: "50px",
  },
  bottom: {
    padding: "10px 50px 30px 50px",
  },
  header: {
    marginTop: 3.25,
  },
};

export const FusionPaper: React.FC<{
  title?: string;
  divisor?: boolean;
  header?: string;
  border?: boolean;
  borderColor?: string;
}> = ({ children, title, divisor, header, border, borderColor }) => {
  const { width } = useWindowDimensions();
  return (
    <Box
      sx={{
        maxWidth: `${
          width > 1300
            ? (width * 2.8) / 6
            : width < 950
            ? width * 0.95
            : (width * 2) / 3
        }px`,
        minWidth: `${
          width > 1300
            ? (width * 2.8) / 6
            : width < 950
            ? width * 0.95
            : (width * 2) / 3
        }px`,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography sx={overviewStyles.header} variant="h1" component="h1">
        {header}
      </Typography>
      <Box
        sx={{
          ...overviewStyles.container,
          border: (theme) =>
            border
              ? `2px solid ${borderColor ?? theme.palette.secondary.dark}}`
              : "none",
        }}
      >
        <Box sx={overviewStyles.top}>
          <Typography variant="h2" component="h2" fontWeight={500}>
            {title}
          </Typography>
        </Box>
        {divisor && <Hr />}
        <Box sx={overviewStyles.bottom}>{children}</Box>
      </Box>
    </Box>
  );
};
