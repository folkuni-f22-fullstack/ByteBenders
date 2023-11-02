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

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

        children: [
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
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
