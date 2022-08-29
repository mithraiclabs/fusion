import { createStyles } from "@mui/material";

export const listStyle = createStyles((theme: any) => ({
  "& .MuiListItemButton-root": {
    borderRadius: "8px",
  },
  // selected and (selected + hover) states
  "&& .Mui-selected, && .Mui-selected:hover": {
    bgcolor: `${theme.palette.primary.main}cc`,
    "&, & .MuiListItemIcon-root": {
      color: "white",
    },
  },
  // hover states
  "& .MuiListItemButton-root:hover": {
    bgcolor: `${theme.palette.primary.main}50`,

    "&, & .MuiListItemIcon-root": {
      color: "white",
    },
  },
}));
