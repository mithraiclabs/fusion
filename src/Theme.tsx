import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createTheme({
  palette: {
    text: {
      primary: "#777777",
    },
  },
  typography: {},
  overrides: {
    MuiButtonBase: {
      root: {
        color: "#F2F4F6 !important",
        backgroundColor: "#3E3E3E !important",
        borderRadius: "50px !important",
        // @ts-ignore
        textTransform: "none !important",
      },
    },
  },
});
interface IThemeProps {
  children: any;
}
export default function Theme(props: IThemeProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
