import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        root: {
          background: "#070707",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#ffb900",
      light: "#ffda74",
      dark: "#f5b914",
    },
    secondary: {
      main: "#0046ff",
    },
  },
});

export default theme;
