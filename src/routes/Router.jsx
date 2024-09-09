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

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
          path:'/',
          element:<Home></Home>,
          loader:()=>fetch('/properties.json')
        },
        {
          path:'/property/:id',
          element:<PropertyDetails></PropertyDetails>,
          loader:()=>fetch('/properties.json')
        },
        {
          path:'/about',
          element:<About></About>
        },
        {
          path:'/blogs',
          element:<Blogs></Blogs>
        },
        {
          path:'/blogs/:id',
          element:<BlogDetails></BlogDetails>,
          loader:()=>fetch('/blogs.json')
        },
        {
          path:'/reviews',
          element:<Reviews></Reviews>
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