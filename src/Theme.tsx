import { createTheme, ThemeProvider } from "@mui/material";

export const MAX_PAGE_WIDTH = 1400;
const HEADER_TEXT_COLOR = "#222222";
const DEFAULT_TEXT_COLOR = "#777777";
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
      fontSize: "3.65em",
      fontWeight: 600,
      letterSpacing: "-0.03em",
    },
    h3: {
      color: HEADER_TEXT_COLOR,
      fontSize: "2em",
      fontWeight: 600,
      letterSpacing: "-0.03em",
    },
    h5: {
      color: HEADER_TEXT_COLOR,
      fontSize: "1.2em",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1.3em",
      fontWeight: 400,
    },
  },
});
interface IThemeProps {
  children: any;
}
export default function Theme(props: IThemeProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
