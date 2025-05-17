
import { useState } from 'react';
import { FaSearch, FaUser, FaGift, FaBolt } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="flex items-center gap-2">
          <img src="GadgetZone Logo - Gradient Design without Text.png" alt="Star Tech Logo" className="h-10" />
        </div>

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
          <Link to={'/dashboard'} className="hidden md:flex items-center gap-1">
            <FaGift />
            <span className="text-sm">Dashboard</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <FaBolt />
            <span className="text-sm">Happy Hour</span>
          </div>
          <Link to={'/account/login'} className="hidden md:flex items-center gap-1">
            <FaUser />
            <span className="text-sm">Account</span>
          </Link>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 rounded-md text-sm font-semibold">
            PC Builder
          </button>

          {/* Mobile menu toggle */}
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
      className="text-sm font-medium hover:text-blue-500 whitespace-nowrap"
    >
      {cat.name}
    </Link>
  ))}
</div>

    </div>
  );
};

export default Navbar;
