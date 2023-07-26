import {createTheme} from "@mui/material";

declare module "@mui/material/styles" {
  // extending theme module of material ui
  interface Theme {
    primaryAppBar: {
      height: number
    }
  }
  interface ThemeOptions {
    primaryAppBar: {
      height: number
    }
  }
}

export const createMuiTheme = () =>{
  let theme = createTheme(
    {primaryAppBar : {
      height: 50,
      }
    }
  )

  return theme
}

export default createMuiTheme