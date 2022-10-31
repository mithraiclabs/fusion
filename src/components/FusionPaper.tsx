import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Hr } from "./Hr";
import { BORDER_COLOR, DESKTOP_PAPER_WIDTH, PAPER_COLOR } from "../Theme";

export const overviewStyles = {
  container: {
    marginTop: 3.25,
    background: PAPER_COLOR,
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
    textAlign: "center",
  },
};

export const FusionPaper: React.FC<{
  title?: string;
  divisor?: boolean;
  header?: string;
  border?: boolean;
  borderColor?: string;
}> = ({ children, title, divisor, header, border, borderColor }) => {
  return (
    <Box
      sx={{
        width: DESKTOP_PAPER_WIDTH,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography sx={overviewStyles.header} variant="h4" component="h4">
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
