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

function SellerDashboard() {
  return (
    <aside className="h-full w-full bg-gray-800 text-white px-4 py-6">
      <div className="text-2xl font-bold mb-10">Admin</div>

      <div className="pb-4 flex flex-col gap-2">
        <Link to="/dashboard/sellerhome" className="flex items-center gap-3 hover:text-gray-300">
          <Home size={20} />
          Seller Home
        </Link>
        <Link to="/dashboard/addproduct" className="flex items-center gap-3 hover:text-gray-300">
          <FaCartPlus size={20} />
           All Products
        </Link>
        <Link to="/dashboard/allproduct" className="flex items-center gap-3 hover:text-gray-300">
           <MdInventory size={20} />
          User Management
        </Link>
      </div>

     
    </aside>
  );
}

export default SellerDashboard;
