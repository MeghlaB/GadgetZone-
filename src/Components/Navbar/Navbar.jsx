import { useCallback, useContext, useState, useRef, useEffect } from "react";
import { FaSearch, FaBolt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { MdLogout } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import userAdmin from "../../Hooks/userAdmin";
import userSeller from "../../Hooks/userSeller";
import { ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";

const Navbar = () => {
  const axiosPublic = useAxiosPublic();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin] = userAdmin();
  const [isseller] = userSeller();

  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef();

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get cart data
  const { data: cartItems } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/carts?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Get dashboard link based on role
  const getDashboardLink = useCallback(() => {
    if (isAdmin) {
      return "/dashboard/adminhome";
    }
    if (isseller) {
      return "/dashboard/sellerhome";
    }
    return "/dashboard/user-home";
  }, [isAdmin, isseller]);

  // Search handler
  // const handleSearch = () => {
  //   const q = searchTerm.trim();
  //   if (!q) return;

  //   // Navigate to search page
  //   navigate(`/search?q=${encodeURIComponent(q)}`);

  //   // Reset search term & close menu
  //   setSearchTerm("");
  //   setMenuOpen(false);
  // };
  const handleSearch = () => {
    const q = searchTerm.trim();

    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchTerm("");
    setMenuOpen(false);
  };

  const categories = [
    { name: "Home", path: "/" },
    { name: "Desktop", path: "/desktop" },
    { name: "Laptop", path: "/laptop" },
    { name: "Monitor", path: "/monitor" },
    { name: "UPS", path: "/ups" },
    { name: "Phone", path: "/phone" },
    { name: "Tablet", path: "/tablet" },
    { name: "Camera", path: "/camera" },
    { name: "Server & Storage", path: "/server-storage" },
    { name: "Accessories", path: "/accessories" },
    { name: "Gadget", path: "/gadget" },
    { name: "Gaming", path: "/gaming" },
    { name: "TV", path: "/tv" },
  ];

  return (
    <div className="fixed top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-[#071c2b] text-white px-4 py-2 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            className="h-8 rounded-lg md:h-10"
            src="https://i.ibb.co/7Jp64HMt/Whats-App-Image-2025-05-19-at-01-03-05-a47959b3.jpg"
            alt="Logo"
          />
        </Link>

        {/* Search Bar - Desktop */}
        <div className="flex-1 hidden mx-4 md:flex">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 text-black outline-none rounded-l-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="px-4 text-black bg-white rounded-r-md"
            onClick={handleSearch}
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Profile Picture */}
              <img
                src={user.photoURL}
                alt="profile"
                className="hidden w-8 h-8 rounded-full md:block"
              />

              {/* Dashboard */}
              <Link
                to={getDashboardLink()}
                className="items-center hidden gap-1 md:flex"
              >
                <LuLayoutDashboard />
                <span className="text-sm">Dashboard</span>
              </Link>

              {/* Cart */}
              <Link to="/dashboard/my-carts" className="relative inline-block">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
                  {cartItems?.length || 0}
                </span>
              </Link>

              {/* Happy Hour */}
              <div className="items-center hidden gap-1 md:flex">
                <FaBolt />
                <span className="text-sm">Happy Hour</span>
              </div>

              {/* Logout */}
              <button
                onClick={logOut}
                className="items-center hidden gap-1 md:flex"
              >
                <MdLogout />
                <span className="text-sm">LogOut</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="items-center hidden gap-1 md:flex">
                <FaBolt />
                <span className="text-sm">Happy Hour</span>
              </div>
              <Link
                to={"/account/login"}
                className="px-4 py-1 text-sm font-semibold text-white rounded-md md:block bg-gradient-to-r from-green-500 to-blue-500"
              >
                Login
              </Link>
            </div>
          )}

          {/* PC Builder Button */}
          <button className="px-4 py-1 text-sm font-semibold rounded-md bg-gradient-to-r from-blue-500 to-purple-500">
            PC Builder
          </button>

          {/* Mobile Profile Dropdown */}
          {user && (
            <div className="relative md:hidden" ref={profileRef}>
              <img
                src={user.photoURL}
                alt="profile"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              {showDropdown && (
                <div className="absolute right-0 z-50 w-32 py-2 mt-2 text-black bg-white rounded-md shadow-md">
                  <Link
                    to={getDashboardLink()}
                    className="block px-4 py-2 text-sm hover:bg-gray-200"
                  >
                    <div className="flex items-center gap-1">
                      <LuLayoutDashboard />
                      <p>Dashboard</p>
                    </div>
                  </Link>
                  <button
                    onClick={logOut}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-200"
                  >
                    <div className="flex items-center gap-1">
                      <MdLogout />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 md:hidden">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="px-3 py-2 text-white bg-blue-500 rounded-md"
          onClick={handleSearch}
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </div>

      {/* Sticky Categories */}
      <div
        className={`bg-white py-2 w-full mx-auto px-6 overflow-x-auto whitespace-nowrap flex flex-col md:flex-row gap-2 md:gap-4 ${menuOpen ? "block" : "hidden"
          } md:flex`}
      >
        {categories.map((cat, index) => (
          <Link
            to={cat.path}
            key={index}
            className="text-sm font-medium hover:text-purple-600 whitespace-nowrap"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
