import { createTheme, ThemeProvider } from "@mui/material";

export const MAX_PAGE_WIDTH = 1400;
export const HEADER_TEXT_COLOR = "#000000";
export const DEFAULT_TEXT_COLOR = "#777777";
export const BORDER_COLOR = "#E6E6E6";
export const SUCCESS_GREEN = "#3AB67A";
export const PAPER_COLOR = "#EDEDED";
export const DEFAULT_BG = "#E2E2DE";

const theme = createTheme({
  spacing: 8,
  palette: {
    text: {
      primary: DEFAULT_TEXT_COLOR,
      secondary: "#454545",
    },
    background: {
      default: DEFAULT_BG,
      paper: PAPER_COLOR,
    },
    secondary: {
      main: "#3CC88D",
      light: BORDER_COLOR,
      dark: "#D6FF85",
    },
  },
  typography: {
    fontFamily: "Inter",
    h1: {
      color: HEADER_TEXT_COLOR,
      fontSize: "30px",
      fontWeight: 600,
      letterSpacing: "-0.03rem",
    },
    h2: {
      color: HEADER_TEXT_COLOR,
      fontSize: "16px",
      fontWeight: 600,
      letterSpacing: "0.03rem",
      lineHeight: "24px",
      textTransform: "uppercase",
    },
    h3: {
      color: "#000000",
      fontSize: "32px",
      fontWeight: 600,
      letterSpacing: "0.25px",
      lineHeight: "123.5%",
      fontStyle: "normal",
    },
    h4: {
      color: "#000000",
      fontSize: "24px",
      lineHeight: "29px",
      letterSpacing: "0.25px",
      fontWeight: 500,
      fontStyle: "normal",
    },
    h5: {
      color: "#000000",
      fontSize: "12px",
      lineHeight: "115%",
      letterSpacing: "0.25px",
      textTransform: "uppercase",
      fontWeight: 700,
    },
    body1: {
      fontSize: "16px",
      fontWeight: 500,
      letterSpacing: "0.15px",
      lineHeight: "125%",
      color: "#454545",
      fontStyle: "normal",
    },
    body2: {
      fontSize: "16px",
      fontWeight: 700,
      color: "#000000",
      letterSpacing: "0.15px",
      lineHeight: "125%",
      fontStyle: "normal",
    },
  },
});
interface IThemeProps {
  children: any;
}
export default function Theme(props: IThemeProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
