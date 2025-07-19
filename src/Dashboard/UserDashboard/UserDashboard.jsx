import { BookIcon, Home, CalendarCheck2 } from "lucide-react";
import React from "react";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";

function UserDashboard() {
  let hello = 2; 
  const helloworld = 5; 
  const helloworld2 = 6; 
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
            <BookIcon size={20} />
            user home
          </Link>

          <Link
            to="/dashboard/my-carts"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <CalendarCheck2 size={20} />
            My-Carts
          </Link>

          <Link
            to="/dashboard/user-profile"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <ImProfile size={20} />
            User Profile
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
