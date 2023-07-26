import Home from "./pages/Home.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "@mui/material";
import createMuiTheme from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const App: React.FC = () => {
  const theme = createMuiTheme();

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
