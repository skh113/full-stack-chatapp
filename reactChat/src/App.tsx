import Home from "./pages/Home.tsx";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    // loader: rootLoader,
  },
])


const App: React.FC = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
