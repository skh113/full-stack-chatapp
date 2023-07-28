import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  // extending theme module of material ui
  interface Theme {
    primaryAppBar: {
      height: number;
      borderBottom: string;
    };

    primaryDraw: {
      width: number;
      closedWidth: number;
    };

    secondaryDraw: {
      width: number;
      borderBottom: string;
    };
  }
  interface ThemeOptions {
    primaryAppBar: {
      height: number;
      borderBottom: string;
    };

    primaryDraw: {
      width: number;
      closedWidth: number;
    };

    secondaryDraw: {
      width: number;
      borderBottom: string;
    };
  }
}

const defaultWidth = 240;
const defaultBorderBottom = "3px solid";

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
      borderBottom: defaultBorderBottom,
    },

    primaryDraw: {
      width: defaultWidth,
      closedWidth: 70,
    },

    secondaryDraw: {
      width: defaultWidth,
      borderBottom: defaultBorderBottom,
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
