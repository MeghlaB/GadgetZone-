import { useCallback, useContext, useState, useRef, useEffect } from "react";
import { FaSearch, FaUser, FaBolt } from "react-icons/fa";
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

  // search handler 
  const handleSearch = () => {
    if (searchItem.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchItem)}`);
      setSearchItem(""); 
    }
  };



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
  const handleSearch = () => {
    const q = searchTerm.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setMenuOpen(false); // close mobile menu if open
  };

  const categories = [
    { name: "Home", path: "/" },
    { name: "Desktop", path: "/desktop" },
    { name: "Laptop", path: "/laptop" },
    { name: "Component", path: "/component" },
    { name: "Monitor", path: "/monitor" },
    { name: "UPS", path: "/ups" },
    { name: "Phone", path: "/phone" },
    { name: "Tablet", path: "/tablet" },
    { name: "Office Equipment", path: "/office-equipment" },
    { name: "Camera", path: "/camera" },
    { name: "Security", path: "/security" },
    { name: "Networking", path: "/networking" },
    { name: "Software", path: "/software" },
    { name: "Server & Storage", path: "/server-storage" },
    { name: "Accessories", path: "/accessories" },
    { name: "Gadget", path: "/gadget" },
    { name: "Gaming", path: "/gaming" },
    { name: "TV", path: "/tv" },
    { name: "Appliance", path: "/appliance" },
  ];

  return (
    <div className="w-full fixed z-50 top-0">
      {/* Top Bar */}
      <div className="bg-[#071c2b] text-white px-4 py-2 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            className="h-8 md:h-10 rounded-lg"
            src="https://i.ibb.co/7Jp64HMt/Whats-App-Image-2025-05-19-at-01-03-05-a47959b3.jpg"
          />
        </Link>

        {/* Search Bar - Desktop */}
        <div className="flex-1 mx-4 hidden md:flex">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-l-md outline-none text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button

            className="bg-white text-black px-4 rounded-r-md"
            onClick={handleSearch}

            onClick={handleSearch}
            className="px-4 text-black bg-white rounded-r-md"

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
                className="w-8 h-8 rounded-full hidden md:block"
              />

              {/* Dashboard */}
              <Link
                to={getDashboardLink()}
                className="hidden md:flex items-center gap-1"
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
              <div className="hidden md:flex items-center gap-1">
                <FaBolt />
                <span className="text-sm">Happy Hour</span>
              </div>

              {/* Logout */}
              <Link
                onClick={logOut}
                className="hidden md:flex items-center gap-1"
              >
                <MdLogout />
                <span className="text-sm">LogOut</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1">
                <FaBolt />
                <span className="text-sm">Happy Hour</span>
              </div>
              <Link
                to={"/account/login"}
                className="md:block bg-gradient-to-r from-green-500 to-blue-500 px-4 py-1 rounded-md text-sm font-semibold text-white"
              >
                Login
              </Link>
            </div>
          )}

          {/* PC Builder Button */}
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 rounded-md text-sm font-semibold">
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
                <div className="absolute right-0 mt-2 w-32 text-black bg-white shadow-md rounded-md py-2 z-50">
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
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
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
            className="md:hidden text-xl"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden flex px-4 py-2 items-center gap-2 bg-gray-100">
        <input
          type="text"
          placeholder="Search"

          className="w-full px-3 py-2 rounded-md border"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-md"
          onClick={handleSearch}

          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleSearch}
          className="px-3 py-2 text-white bg-blue-500 rounded-md"

        >
          <FaSearch />
        </button>
      </div>

      {/* Sticky Categories */}
      <div
        className={`bg-white py-2 w-full mx-auto px-6 overflow-x-auto whitespace-nowrap flex flex-col md:flex-row gap-2 md:gap-4 ${
          menuOpen ? "block" : "hidden"
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
