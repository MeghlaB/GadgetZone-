import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { 
  FaFilter, 
  FaMoneyBillWave, 
  FaSearchDollar, 
  FaShoppingCart, 
  FaEye,
  FaStar,
  FaRegStar,
  FaHeart,
  FaShippingFast,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaMicrochip,
  FaMemory,
  FaHdd
} from "react-icons/fa";

function Desktop() {
  const axiosPublic = useAxiosPublic();

  const {
    isLoading,
    isError,
    data: products = [],
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  // Price range state
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 500000,
  });

  // Sort option state
  const [sortOption, setSortOption] = useState("featured");
  
  // Mobile filter visibility
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    processor: "",
    ram: "",
    ssd: "",
  });

  // Filter only desktops
  const desktopPCs = products.filter((product) => product.category === "Desktop");

  // Extract processor, RAM, SSD info from key_features array
  const extractSpecs = (keyFeatures) => {
    let processor = "";
    let ram = "";
    let ssd = "";

    if (!keyFeatures || !Array.isArray(keyFeatures)) {
      return { processor, ram, ssd };
    }

    keyFeatures.forEach((feature) => {
      const lower = feature.toLowerCase();

      if (lower.includes("processor")) {
        processor = feature.replace(/processor:\s*/i, "").trim();
        if (processor.toLowerCase().includes("ryzen")) {
          const match = processor.match(/ryzen \d+/i);
          if (match) processor = match[0];
        } else if (processor.toLowerCase().includes("core i")) {
          const match = processor.match(/core i\d+/i);
          if (match) processor = match[0];
        } else if (processor.toLowerCase().includes("snapdragon")) {
          const match = processor.match(/snapdragon \w+ ?\w*/i);
          if (match) processor = match[0];
        }
      }

      if (lower.includes("ram")) {
        const parts = feature.split(/[;,]/);
        parts.forEach((part) => {
          if (part.toLowerCase().includes("ram")) {
            const ramMatch = part.match(/\d+GB/i);
            if (ramMatch) ram = ramMatch[0];
          }
          if (
            part.toLowerCase().includes("storage") ||
            part.toLowerCase().includes("ssd")
          ) {
            const ssdMatch = part.match(/\d+TB|\d+GB/i);
            if (ssdMatch) ssd = ssdMatch[0];
          }
        });
      }

      if ((lower.includes("storage") || lower.includes("ssd")) && !ssd) {
        const ssdMatch = feature.match(/\d+TB|\d+GB/i);
        if (ssdMatch) ssd = ssdMatch[0];
      }
    });

    return { processor, ram, ssd };
  };

  // Handle price inputs
  const handlePriceChange = (e, type) => {
    const value = Number(e.target.value);
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Handle checkbox filter change
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  // Filtered and sorted desktops
  const filteredData = desktopPCs
    .filter((pc) => {
      const priceNumber = Number(pc.price.toString().replace(/,/g, ""));
      const { processor, ram, ssd } = extractSpecs(pc.key_features || []);

      return (
        (!filters.processor || processor.toLowerCase().includes(filters.processor.toLowerCase())) &&
        (!filters.ram || ram === filters.ram) &&
        (!filters.ssd || ssd === filters.ssd) &&
        priceNumber >= priceRange.min &&
        priceNumber <= priceRange.max
      );
    })
    .sort((a, b) => {
      const priceA = Number(a.price.toString().replace(/,/g, ""));
      const priceB = Number(b.price.toString().replace(/,/g, ""));
      
      switch (sortOption) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "featured":
        default:
          return 0;
      }
    });

  // Calculate discount percentage if available
  const calculateDiscount = (product) => {
    if (product.discount) return product.discount;
    
    if (product.previous_price && product.price) {
      const currentPrice = Number(product.price.toString().replace(/,/g, ""));
      const previousPrice = Number(product.previous_price.toString().replace(/,/g, ""));
      
      if (previousPrice > currentPrice) {
        const discount = Math.round(((previousPrice - currentPrice) / previousPrice) * 100);
        return `${discount}% OFF`;
      }
    }
    
    return null;
  };

  // Get unique processors, RAM, and SSD options
  const getUniqueOptions = () => {
    const processors = new Set();
    const rams = new Set();
    const ssds = new Set();

    desktopPCs.forEach(pc => {
      const { processor, ram, ssd } = extractSpecs(pc.key_features || []);
      if (processor) processors.add(processor);
      if (ram) rams.add(ram);
      if (ssd) ssds.add(ssd);
    });

    return {
      processors: Array.from(processors).sort(),
      rams: Array.from(rams).sort((a, b) => {
        const numA = parseInt(a);
        const numB = parseInt(b);
        return numA - numB;
      }),
      ssds: Array.from(ssds).sort((a, b) => {
        const numA = parseInt(a);
        const numB = parseInt(b);
        return numA - numB;
      })
    };
  };

  const { processors, rams, ssds } = getUniqueOptions();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute flex items-center justify-center bg-white rounded-full shadow-md inset-2">
            <FaMicrochip className="text-blue-600 animate-pulse" />
          </div>
        </div>
        <p className="mt-4 font-medium text-gray-700 animate-pulse">
          Loading desktop configurations...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="p-4 bg-red-100 rounded-full shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-red-600 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2m0 14v2m6-6h2m-14 0H4m12.364-7.364l1.414 1.414M6.222 17.778l1.414 1.414m0-12.728L6.222 6.222m10.142 10.142l-1.414 1.414"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-red-600">
          Oops! Something went wrong.
        </h2>
        <p className="max-w-sm mt-2 text-center text-gray-600">
          We couldn't load desktop products right now.
          Please check your internet connection or try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 mt-6 font-medium text-white transition-colors bg-red-600 rounded-lg shadow hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 mt-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">High-Performance Desktops</h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover our powerful desktop computers built for gaming, productivity, and creative work
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-xl font-semibold text-gray-800">Desktop PCs</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 text-white bg-teal-600 rounded-lg"
          >
            <FaFilter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar - Sorting & Filters */}
          <div className={`lg:w-1/4 lg:pr-6 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="p-5 mb-6 bg-white border border-gray-100 shadow-sm rounded-xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-800">Sort & Filter</h2>
                <button 
                  onClick={() => setShowFilters(false)} 
                  className="p-1 text-gray-500 lg:hidden hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <h3 className="mb-3 font-medium text-gray-700">Sort By</h3>
                <div className="space-y-2">
                  {[
                    { value: "featured", label: "Featured" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" }
                  ].map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`sort-${option.value}`}
                        name="sortOption"
                        checked={sortOption === option.value}
                        onChange={() => handleSortChange(option.value)}
                        className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                      />
                      <label htmlFor={`sort-${option.value}`} className="ml-2 text-sm text-gray-700">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="mb-3 font-medium text-gray-700">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-600">Min Price (৳)</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange(e, "min")}
                      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      min={0}
                      max={priceRange.max}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-600">Max Price (৳)</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange(e, "max")}
                      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      min={priceRange.min}
                      max={500000}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({
                      ...prev,
                      max: Number(e.target.value)
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb:bg-teal-600"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>0৳</span>
                    <span>{priceRange.max.toLocaleString()}৳</span>
                  </div>
                </div>
              </div>

              {/* Processor Filter */}
              <div className="mb-6">
                <h3 className="mb-3 font-medium text-gray-700">Processor</h3>
                <div className="space-y-2">
                  {processors.map((processor) => (
                    <div key={processor} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`processor-${processor}`}
                        checked={filters.processor === processor}
                        onChange={() => handleFilterChange("processor", processor)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label htmlFor={`processor-${processor}`} className="ml-2 text-sm text-gray-700">
                        {processor}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* RAM Filter */}
              <div className="mb-6">
                <h3 className="mb-3 font-medium text-gray-700">RAM</h3>
                <div className="space-y-2">
                  {rams.map((ram) => (
                    <div key={ram} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`ram-${ram}`}
                        checked={filters.ram === ram}
                        onChange={() => handleFilterChange("ram", ram)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label htmlFor={`ram-${ram}`} className="ml-2 text-sm text-gray-700">
                        {ram}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* SSD Filter */}
              <div className="mb-6">
                <h3 className="mb-3 font-medium text-gray-700">Storage</h3>
                <div className="space-y-2">
                  {ssds.map((ssd) => (
                    <div key={ssd} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`ssd-${ssd}`}
                        checked={filters.ssd === ssd}
                        onChange={() => handleFilterChange("ssd", ssd)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label htmlFor={`ssd-${ssd}`} className="ml-2 text-sm text-gray-700">
                        {ssd}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="p-3 text-sm text-center rounded-lg bg-gray-50">
                <span className="font-medium text-gray-700">
                  {filteredData.length} of {desktopPCs.length} products
                </span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Mobile Sort Options */}
            <div className="p-4 mb-6 bg-white border border-gray-100 shadow-sm rounded-xl lg:hidden">
              <h3 className="mb-2 text-sm font-medium text-gray-700">Sort By</h3>
              <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredData.length === 0 ? (
              <div className="p-12 text-center bg-white border border-gray-100 shadow-sm rounded-xl">
                <svg
                  className="w-20 h-20 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-900">No desktops found</h3>
                <p className="mt-2 mb-6 text-gray-500">
                  Try adjusting your filters to see more products.
                </p>
                <button 
                  onClick={() => {
                    setPriceRange({ min: 0, max: 500000 });
                    setFilters({ processor: "", ram: "", ssd: "" });
                  }}
                  className="px-6 py-2 text-white transition-colors bg-teal-600 rounded-lg hover:bg-teal-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((pc) => {
                  const { processor, ram, ssd } = extractSpecs(pc.key_features || []);
                  const discount = calculateDiscount(pc);

                  return (
                    <div
                      key={pc._id}
                      className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-lg group hover:shadow-lg hover:-translate-y-1"
                    >
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={pc.image || "https://via.placeholder.com/300"}
                          alt={pc.title}
                          className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Discount Badge */}
                        {discount && (
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded">
                              {discount}
                            </span>
                          </div>
                        )}
                        
                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3">
                          <button className="p-2 mb-2 transition-colors bg-white rounded-full shadow-md hover:bg-red-50">
                            <FaHeart className="text-gray-500 hover:text-red-500" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        {/* Title */}
                        <Link to={`/product/${pc._id}`}>
                          <h3 className="mb-2 text-sm font-semibold text-gray-800 line-clamp-2 hover:text-teal-600">
                            {pc.title}
                          </h3>
                        </Link>

                        {/* Specifications */}
                        <div className="mb-3 space-y-1 text-xs text-gray-600">
                          {processor && (
                            <div className="flex items-center">
                              <FaMicrochip className="mr-1 text-teal-600" />
                              <span>{processor}</span>
                            </div>
                          )}
                          {ram && (
                            <div className="flex items-center">
                              <FaMemory className="mr-1 text-teal-600" />
                              <span>{ram} RAM</span>
                            </div>
                          )}
                          {ssd && (
                            <div className="flex items-center">
                              <FaHdd className="mr-1 text-teal-600" />
                              <span>{ssd} SSD</span>
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-gray-900">
                              ৳{Number(pc.price).toLocaleString()}
                            </span>
                            {pc.previous_price && (
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                ৳{Number(pc.previous_price).toLocaleString()}
                              </span>
                            )}
                          </div>
                          
                          <Link
                            to={`/product/${pc._id}`}
                            className="px-3 py-1 text-xs font-medium text-white transition-colors bg-teal-600 rounded hover:bg-teal-700"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desktop;