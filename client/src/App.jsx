import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomeLayout, ErrorPage, Admin, Exposition } from "./pages/index.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Exposition /> }
      ],
    },
    {
      path: "/adm",
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Admin /> }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
