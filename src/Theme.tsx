import { createTheme, ThemeProvider } from "@mui/material";

export const MAX_PAGE_WIDTH = 1400;
const HEADER_TEXT_COLOR = "#222222";
export const DEFAULT_TEXT_COLOR = "#777777";
export const BORDER_COLOR = "#E6E6E6";

const theme = createTheme({
  spacing: 8,
  palette: {
    text: {
      primary: DEFAULT_TEXT_COLOR,
    },
    background: {
      default: "#F2F4F6",
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
      fontSize: "18px",
      fontWeight: 600,
      letterSpacing: "-0.03rem",
    },
    h3: {
      color: HEADER_TEXT_COLOR,
      fontSize: "2em",
      fontWeight: 600,
      letterSpacing: "-0.03rem",
    },
    h4: {
      color: HEADER_TEXT_COLOR,
      fontSize: "1.3em",
      fontWeight: 600,
      letterSpacing: "-0.03rem",
    },
    h5: {
      color: HEADER_TEXT_COLOR,
      fontSize: "1.2em",
      fontWeight: 600,
    },
    body1: {
      fontSize: "14px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      color: "#222222",
    },
  },
});
interface IThemeProps {
  children: any;
}
export default function Theme(props: IThemeProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
