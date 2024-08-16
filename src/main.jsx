import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home/Home.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AfterSignIn from "./Components/Private/AfterSignIn.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "./Components/Products/Products.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/signin",
                element: (
                    <AfterSignIn>
                        <SignIn></SignIn>
                    </AfterSignIn>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AfterSignIn>
                        <SignUp></SignUp>
                    </AfterSignIn>
                ),
            },
            {
                path: "/products",
                element: <Products></Products>,
            },
        ],
    },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <AuthProvider>
                    <div>
                        <RouterProvider router={router} />
                        <ToastContainer />
                    </div>
                </AuthProvider>
            </HelmetProvider>
        </QueryClientProvider>
    </StrictMode>
);
