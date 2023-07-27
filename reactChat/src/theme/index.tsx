import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  // extending theme module of material ui
  interface Theme {
    primaryAppBar: {
      height: number;
    };
  }
  interface ThemeOptions {
    primaryAppBar: {
      height: number;
    };
  }
}

const createMuiTheme = () => {
  let theme = createTheme({
    typography: {
      fontFamily: [
        "REM",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },

    primaryAppBar: {
      height: 50,
    },

    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};

export default createMuiTheme;
