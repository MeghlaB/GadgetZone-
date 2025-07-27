import { BookIcon, Home, CalendarCheck2 } from "lucide-react";
import React from "react";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";

function UserDashboard() {
  let hello = 2; 
  
  return (
    <aside className="flex flex-col justify-between w-full h-screen px-4 py-6 text-white bg-gray-800">
      {/* Top section */}
      <div>
        <div className="mb-10 text-2xl font-bold">User Dashboard</div>

        <nav className="space-y-4">
          <Link
            to="/dashboard/user-home"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <BookIcon size={25} />
            <p className="text-[15px]">User Home</p>
          </Link>

          <Link
            to="/dashboard/my-carts"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <CalendarCheck2 size={25} />
            <p className="text-[15px]">My Carts</p>
          </Link>

          <Link
            to="/dashboard/user-profile"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <ImProfile size={25} />
            <p className="text-[15px]">My profile</p>
          </Link>
        </nav>
      </div>

      {/* Bottom Home link */}
      <div className="pt-10">
        <Link to="/" className="flex items-center gap-3 hover:text-gray-300">
          <Home size={20} />
          Home
        </Link>
      </div>
    </aside>
  );
}

export default UserDashboard;
