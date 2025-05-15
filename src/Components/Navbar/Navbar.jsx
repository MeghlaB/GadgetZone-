
import { useState } from 'react';
import { FaSearch, FaUser, FaGift, FaBolt } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    'Desktop', 'Laptop', 'Component', 'Monitor', 'UPS', 'Phone',
    'Tablet', 'Office Equipment', 'Camera', 'Security', 'Networking',
    'Software', 'Server & Storage', 'Accessories', 'Gadget', 'Gaming', 'TV', 'Appliance'
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
          <div className="hidden md:flex items-center gap-1">
            <FaGift />
            <span className="text-sm">Offers</span>
          </div>
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
      <div className="bg-white px-4 py-2 shadow-md sticky top-0 z-40">
        <div className={`overflow-x-auto whitespace-nowrap flex flex-col md:flex-row gap-2 md:gap-4 ${menuOpen ? 'block' : 'hidden'} md:flex`}>
          {categories.map((cat, index) => (
            <a
              href="#"
              key={index}
              className="text-sm font-medium hover:text-blue-500 whitespace-nowrap"
            >
              {cat}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
