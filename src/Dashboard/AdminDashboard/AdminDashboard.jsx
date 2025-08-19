import {
  BarChart2,
  BookImageIcon,
  Boxes,
  Home,
  User,
  UserPlus,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { MdInventory } from 'react-icons/md';
import { FaUsers } from "react-icons/fa";
import { RiImageEditFill } from "react-icons/ri";
import { IoImages } from "react-icons/io5";

function AdminDashboard() {
  return (
    <aside className="w-full h-full px-4 py-6 text-white bg-gray-800">
      <div className="mb-10 text-2xl font-bold">Admin</div>

      <div className="flex flex-col gap-2 pb-4">
        <Link to="/dashboard/adminhome" className="flex items-center gap-3 hover:text-gray-300">
          <Home size={20} />
          Admin Home
        </Link>

        <Link to="/dashboard/allproduct" className="flex items-center gap-3 hover:text-gray-300">
          <MdInventory size={20} />
          All Products
        </Link>
        <Link to="/dashboard/allproduct" className="flex items-center gap-3 hover:text-gray-300">
          <MdInventory size={20} />
          Orders
        </Link>
        <Link to="/dashboard/addproduct" className="flex items-center gap-3 hover:text-gray-300">
          <FaCartPlus size={20} />
          Add Products
        </Link>
        <Link to="/dashboard/users" className="flex items-center gap-3 hover:text-gray-300">
          <FaUsers size={20} />
          Manage users
        </Link>
        <Link to="/dashboard/addbannerimg" className="flex items-center gap-3 hover:text-gray-300">
          <RiImageEditFill size={20} />
          Add Banner Image
        </Link>
        <Link to="/" className="relative flex items-center gap-3 hover:text-gray-301 ">
          <Home size={20} />
          Go Home
        </Link>
      </div>


    </aside>
  );
}

export default AdminDashboard;
