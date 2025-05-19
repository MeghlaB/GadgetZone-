import { useContext, useState } from 'react';
import { FaSearch, FaUser, FaGift, FaBolt } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { MdLogout } from "react-icons/md";
import { useRef, useEffect } from 'react';
import { MdDashboard } from "react-icons/md";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext)
  const navigate = useNavigate()

  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Desktop', path: '/desktop' },
    { name: 'Laptop', path: '/laptop' },
    { name: 'Component', path: '/component' },
    { name: 'Monitor', path: '/monitor' },
    { name: 'UPS', path: '/ups' },
    { name: 'Phone', path: '/phone' },
    { name: 'Tablet', path: '/tablet' },
    { name: 'Office Equipment', path: '/office-equipment' },
    { name: 'Camera', path: '/camera' },
    { name: 'Security', path: '/security' },
    { name: 'Networking', path: '/networking' },
    { name: 'Software', path: '/software' },
    { name: 'Server & Storage', path: '/server-storage' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'Gadget', path: '/gadget' },
    { name: 'Gaming', path: '/gaming' },
    { name: 'TV', path: '/tv' },
    { name: 'Appliance', path: '/appliance' },

  ];


  return (
    <div className="w-full fixed z-50 top-0">
      {/* Top Bar */}
      <div className="bg-[#071c2b] text-white px-4 py-2 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link to='/' className="flex items-center gap-2">
          <img className='h-8 md:h-10 rounded-lg ' src="https://i.ibb.co/7Jp64HMt/Whats-App-Image-2025-05-19-at-01-03-05-a47959b3.jpg" />
        </Link>

        {/* Search Bar - Desktop */}
        <div className="flex-1 mx-4 hidden md:flex">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-l-md outline-none text-black"
          />
          <button className="bg-white text-black px-4 rounded-r-md">
            <FaSearch />
          </button>
        </div>

        {/* Icons */}

        <div className="flex items-center gap-4">
          {
            user ? (
              <div className='flex items-center gap-4'>
                {/* Profile Picture */}
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-8 h-8 rounded-full hidden md:block"
                />

                {/* Dashboard & Logout - Desktop only */}
                <Link to={'/dashboard'} className="hidden md:flex items-center gap-1">
                  <FaGift />
                  <span className="text-sm">Dashboard</span>
                </Link>

                <div className="hidden md:flex items-center gap-1">
                  <FaBolt />
                  <span className="text-sm">Happy Hour</span>
                </div>

                <Link onClick={logOut} className="hidden md:flex items-center gap-1">
                  <MdLogout />
                  <span className="text-sm">LogOut</span>
                </Link>
              </div>
            ) : (
              <div className='flex items-center gap-4'>
                <div className="hidden md:flex items-center gap-1">
                  <FaBolt />
                  <span className="text-sm">Happy Hour</span>
                </div>

                {/* Login Button Between PC Builder and Menu */}
                <Link to={'/account/login'} className=" md:block bg-gradient-to-r from-green-500 to-blue-500 px-4 py-1 rounded-md text-sm font-semibold text-white">
                  Login
                </Link>
              </div>
            )
          }

          {/* PC Builder Button */}
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 rounded-md text-sm font-semibold">
            PC Builder
          </button>

          {/* Mobile Profile Dropdown */}
          {
            user &&
            <div className="relative md:hidden" ref={profileRef}>
              <img
                src={user.photoURL}
                alt="profile"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              {
                showDropdown && (
                  <div className="absolute right-0 mt-2 w-32 text-black bg-white shadow-md rounded-md py-2 z-50">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-200">
                      <div className='flex items-center gap-1'>
                        <MdDashboard />
                        <p>Dashboard</p>
                      </div>
                    </Link>
                    <button onClick={logOut} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">
                      <div className='flex items-center gap-1'>
                        <MdLogout />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )
              }
            </div>
          }

          {/* Mobile Menu Icon */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl">
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
        />
        <button className="bg-blue-500 text-white px-3 py-2 rounded-md">
          <FaSearch />
        </button>
      </div>

      {/* Sticky Categories */}
      <div className={`bg-white py-2 w-full mx-auto px-6 overflow-x-auto whitespace-nowrap flex flex-col md:flex-row gap-2 md:gap-4 ${menuOpen ? 'block' : 'hidden'} md:flex`}>
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
