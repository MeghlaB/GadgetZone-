import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Desktop from "../Shared/Desktop/Desktop";
import Laptop from "../Shared/Laptop/Laptop";
import Component from "../Shared/Component/Component";
import Monitor from "../Shared/Monitor/Monitor";
import UPS from "../Shared/UPS/UPS";
import Phone from "../Shared/Phone/Phone";
import Tablet from "../Shared/Tablet/Tablet";
import OfficeEqupment from "../Shared/Office_Equpement/OfficeEqupment";
import Camera from "../Shared/Camera/Camera";
import Sequrity from "../Shared/Sequrity/Sequrity";
import Networking from "../Shared/Networking/Networking";
import Tv from "../Shared/Tv/Tv";
import Gamming from "../Shared/Gamming/Gamming";
import Software from "../Shared/Software/Software";
import Gadget from "../Shared/Gadget/Gadget";
import Dashboard from "../Dashboard/Dashboard";
import AdminHome from "../Dashboard/AdminDashboard/AdminFeauter/AdminHome";
import AddProduct from "../Dashboard/AdminDashboard/AdminFeauter/AddProduct";
import PrivateRoutes from "./PrivateRoutes";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import ErrorPage from "../Components/ErrorPage.jsx/ErrorPage";
import EditProduct from "../Dashboard/AdminDashboard/AdminFeauter/EditProduct";
import Accessories from "../Shared/Accessories/Accessories";
import AllProduct from "../Dashboard/AdminDashboard/AdminFeauter/AllProduct";
import SellerDashboard from "../Dashboard/SellerDashboard/SellerDashboard";
import SellerHome from "../Dashboard/SellerDashboard/SellerFeature/SellerHome";
import Checkoutoders from "../Components/Checkout/Checkoutoders";
import PaymentSucces from "../Components/PaymentSucces/PaymentSucces";
import UserHome from "../Dashboard/UserDashboard/UserFeature/UserHome";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,

      },
      {
        path: "account/login",
        element: <Login></Login>,
      },
      {
        path: "account/register",
        element: <Register></Register>,
      },
      // submenu category
      {
        path: "/desktop",
        element: <Desktop />,
      },
      {
        path: "/laptop",
        element: <Laptop />,
      },
      {
        path: "/component",
        element: <Component />,
      },
      {
        path: "/monitor",
        element: <Monitor />,
      },
      {
        path: "/ups",
        element: <UPS />,
      },
      {
        path: "/phone",
        element: <Phone />,
      },
      {
        path: "/tablet",
        element: <Tablet />,
      },
      {
        path: "/office-equipment",
        element: <OfficeEqupment />,
      },
      {
        path: "/camera",
        element: <Camera />,
      },
      {
        path: "/security",
        element: <Sequrity />,
      },
      {
        path: "/networking",
        element: <Networking />,
      },
      {
        path: "/tv",
        element: <Tv />,
      },
      {
        path: "/gaming",
        element: <Gamming />,
      },
      {
        path: "/software",
        element: <Software />,
      },
      {
        path: "/gadget",
        element: <Gadget />,
      },
      {
        path:'/accessories',
        element:<Accessories/>
      }
      ,
      {
        path:'/product/:id',
        element:<ProductDetails/>
      },
      {
        path:'/checkout/checkoders/:id',
        element:<Checkoutoders/>
      },
      {
        path:'/payment/success/:tranId',
        element:<PaymentSucces/>
      }
    ],
  },
  {
    path: "/dashboard",
    element:
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ,
    children: [
      // admin dashboard
      {
        path: "adminhome",
        element: <AdminHome />,
        loader: ()=> fetch('http://localhost:5000/products')
      },
      {
        path: "allproduct",
        element: <AllProduct></AllProduct>,
        loader: ()=> fetch('http://localhost:5000/products')
      },
      {
        path: "addproduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "editproduct",
        element: <EditProduct></EditProduct>
      },


      // seleer dashboard
      {
        path: 'sellerhome', 
        element: <SellerHome></SellerHome>
      },
      // user dashboard
      {
        path:'user-home',
        element:<UserHome/>
      }
    ],

  }, 
  {
    path:'*', 
    element: <ErrorPage></ErrorPage>
  }
]);
