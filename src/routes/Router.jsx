import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../layout/Root/Root";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

// Route-level code splitting: each page's module loads on first visit.
const page = (loader) => () => loader().then((m) => ({ Component: m.default }));
const privatePage = (loader) => () =>
    loader().then((m) => {
        const Page = m.default;
        return { Component: () => <PrivateRoute><Page /></PrivateRoute> };
    });

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "properties", lazy: page(() => import("../pages/Properties/Properties")) },
            { path: "property/:id", lazy: page(() => import("../pages/PropertyDetails/PropertyDetails")) },
            { path: "about", lazy: page(() => import("../pages/About/About")) },
            { path: "blogs", lazy: page(() => import("../pages/Blogs/Blogs")) },
            { path: "blogs/:id", lazy: page(() => import("../pages/Blogs/BlogDetails")) },
            { path: "reviews", lazy: page(() => import("../pages/Reviews/Reviews")) },
            { path: "signin", lazy: page(() => import("../pages/SignIn/SignIn")) },
            { path: "signup", lazy: page(() => import("../pages/SignUp/SignUp")) },
            { path: "listings/new", lazy: privatePage(() => import("../pages/ListingForm/ListingForm")) },
            { path: "listings/:id/edit", lazy: privatePage(() => import("../pages/ListingForm/ListingForm")) },
            {
                path: "dashboard",
                lazy: privatePage(() => import("../pages/Dashboard/DashboardLayout")),
                children: [
                    { index: true, lazy: page(() => import("../pages/Dashboard/Overview")) },
                    { path: "listings", lazy: page(() => import("../pages/Dashboard/MyListings")) },
                    { path: "saved", lazy: page(() => import("../pages/Dashboard/Saved")) },
                    { path: "tours", lazy: page(() => import("../pages/Dashboard/Tours")) },
                    { path: "profile", lazy: page(() => import("../pages/Dashboard/Profile")) },
                ],
            },
            // Old URL kept working for anyone with it bookmarked.
            { path: "updateprofile", element: <Navigate to="/dashboard/profile" replace /> },
        ],
    },
]);

export default router;
