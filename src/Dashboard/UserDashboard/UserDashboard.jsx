import {
  BookIcon,
  Home,
  CalendarCheck2,
} from "lucide-react";
import React from "react";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <aside className="h-screen w-full bg-gray-800 text-white px-4 py-6 flex flex-col justify-between">
      {/* Top section */}
      <div>
        <div className="text-2xl font-bold mb-10">User Dashboard</div>

        <nav className="space-y-4">
          <Link
            to="/dashboard/my-appoinments"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <BookIcon size={20} />
            My Appointments
          </Link>

          <Link
            to="/dashboard/quick-booking"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <CalendarCheck2 size={20} />
            Quick Booking
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
        <Link
          to="/"
          className="flex items-center gap-3 hover:text-gray-300"
        >
          <Home size={20} />
          Home
        </Link>
      </div>
    </aside>
  );
}

export default UserDashboard;
