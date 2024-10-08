import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      border: "#616161",
      li:"#e1e1e1",
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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      secondary: "#1c1c1c",
      border: "#ffffff",
      li:"gray",
    },
    secondary: {
      main: "#1c1c1c",
    },
  },
  typography: {
    fontFamily: "Inter",
    fontWeightRegular: 350,
  },
});

export { lightTheme, darkTheme };
