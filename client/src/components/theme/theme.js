import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      border: "#616161",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter",
    fontWeightRegular: 350,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      border: "#ffffff",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "Inter",
    fontWeightRegular: 350,
  },
});
