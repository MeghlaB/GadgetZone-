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

function AdminDashboard() {
  return (
    <aside className="h-full w-full bg-gray-800 text-white px-4 py-6">
      <div className="text-2xl font-bold mb-10">Admin</div>

      <div className="pb-4">
        <Link to="/dashboard/adminhome" className="flex items-center gap-3 hover:text-gray-300">
          <Home size={20} />
          Admin Home
        </Link>
      </div>

     
    </aside>
  );
}

export default AdminDashboard;
