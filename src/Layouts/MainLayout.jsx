import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  const noHeaderFooter =
    location.pathname.includes("account/login") ||
    location.pathname.includes("account/register");
    console.log(noHeaderFooter)
  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
