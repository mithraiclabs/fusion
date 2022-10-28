import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export const FusionTabs = styled(Tabs)({
  borderBottom: "none",
  "& .MuiTabs-indicator": {
    display: "none",
  },
  maxHeight: "22px",
});

interface StyledTabProps {
  label: string;
}

export const FusionTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  textTransform: "uppercase",
  minWidth: 0,
  maxHeight: "22px !important",
  borderRadius: "5px",
  marginX: "2px",
  padding: "2px 16px 2px 16px",
  "&:hover": {
    background: "rgba(69, 69, 69, 0.5)",
    color: "white",
  },
  "&.Mui-selected": {
    color: theme.palette.secondary.dark,
    background: "black",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
  "&.MuiButtonBase-root.MuiTab-root": {
    maxHeight: "22px",
    minHeight: "22px",
    paddingX: "0px",
  },
}));
