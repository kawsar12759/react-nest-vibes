import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root/Root";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Reviews from "../pages/Reviews/Reviews";
import Blogs from "../pages/Blogs/Blogs";
import BlogDetails from "../pages/Blogs/BlogDetails";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path:'/',
          element:<Home></Home>,
          loader:()=>fetch('/properties.json')
        },
        {
          path:'/property/:id',
          element:<PrivateRoute><PropertyDetails></PropertyDetails></PrivateRoute>,
          loader:()=>fetch('/properties.json')
        },
        {
          path:'/about',
          element:<About></About>
        },
        {
          path:'/blogs',
          element:<PrivateRoute><Blogs></Blogs></PrivateRoute>
        },
        {
          path:'/blogs/:id',
          element:<PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>,
          loader:()=>fetch('/blogs.json')
        },
        {
          path:'/reviews',
          element:<Reviews></Reviews>
        },
        {
          path:'/updateprofile',
          element:<PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
        },
        {
          path:'/signin',
          element:<SignIn></SignIn>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        }
      ]
    },
  ]);

  export default router;