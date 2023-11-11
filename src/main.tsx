import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuRoute from "./routes/MenuRoute.tsx";
import CartRoute from "./routes/CartRoute.tsx";
import InformationRoute from "./routes/InformationRoute.tsx";
import LoginRoute from "./routes/LoginRoute.tsx";
import ProductDetailsRoute from "./routes/ProductDetailsRoute.tsx";
import ErrorRoute from "./routes/ErrorRoute.tsx";
import LandingPage from "./components/LandingPage.tsx";
import RecOrderRoute from "./routes/RecOrderRoute.tsx";
import CurrOrderRoute from "./routes/CurrOrderRoute.tsx";
import DoneOrderRoute from "./routes/DoneOrderRoute.tsx";
import { RecoilRoot } from "recoil";
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,

    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "menu",
        element: <MenuRoute />,
      },
      {
        path: "menu/:id",
        element: <ProductDetailsRoute />,
      },
      {
        path: "cart",
        element: <CartRoute />,
      },
      {
        path: "information",
        element: <InformationRoute />,
      },
      {
        path: "login",
        element: <LoginRoute />,
      },
      {
        path: "recieved",
        element: <RecOrderRoute />
      },
      {
        path: "current",
        element: <CurrOrderRoute />
      },
      {
        path: "done",
        element: <DoneOrderRoute />
      },
    ],

    errorElement: <ErrorRoute />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
