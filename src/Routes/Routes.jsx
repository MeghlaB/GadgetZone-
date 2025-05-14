import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',

      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  }, 
  {
    path: '/register', 
    element: <Register></Register>
  }
]);