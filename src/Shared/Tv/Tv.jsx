import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

function TV() {
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

  // Filter states
  const [filters, setFilters] = useState({
    size: "",
    resolution: "",
    displayType: "",
    smartTv: "",
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 500000,
  });

  // State for dropdown visibility
  const [openDropdown, setOpenDropdown] = useState(null);

  // Extract TV specs from key_features array
  const extractSpecs = (keyFeatures) => {
    let size = "";
    let resolution = "";
    let displayType = "";
    let smartTv = "";

    keyFeatures.forEach((feature) => {
      const lower = feature.toLowerCase();

      if (lower.includes("inch") || lower.includes('"')) {
        const sizeMatch = feature.match(/\d+(\.\d+)?\s*(inch|")/i);
        if (sizeMatch) size = sizeMatch[0];
      }

      if (lower.includes("resolution") || lower.includes("p") || lower.includes("hd") || lower.includes("uhd") || lower.includes("4k") || lower.includes("8k")) {
        if (lower.includes("1080") || lower.includes("full hd") || lower.includes("fhd")) {
          resolution = "1080p (Full HD)";
        } else if (lower.includes("1440") || lower.includes("qhd") || lower.includes("2k")) {
          resolution = "1440p (QHD)";
        } else if (lower.includes("2160") || lower.includes("4k") || lower.includes("uhd")) {
          resolution = "2160p (4K UHD)";
        } else if (lower.includes("4320") || lower.includes("8k")) {
          resolution = "4320p (8K)";
        } else if (lower.includes("720") || lower.includes("hd")) {
          resolution = "720p (HD)";
        }
      }

      if (lower.includes("led") || lower.includes("oled") || lower.includes("qled") || lower.includes("microled") || lower.includes("plasma") || lower.includes("lcd")) {
        if (lower.includes("oled")) {
          displayType = "OLED";
        } else if (lower.includes("qled")) {
          displayType = "QLED";
        } else if (lower.includes("microled")) {
          displayType = "MicroLED";
        } else if (lower.includes("plasma")) {
          displayType = "Plasma";
        } else if (lower.includes("led")) {
          displayType = "LED";
        } else if (lower.includes("lcd")) {
          displayType = "LCD";
        }
      }

      if (lower.includes("smart") || lower.includes("android") || lower.includes("webos") || lower.includes("tizen")) {
        smartTv = "Smart TV";
        if (lower.includes("android")) {
          smartTv = "Android TV";
        } else if (lower.includes("webos")) {
          smartTv = "webOS TV";
        } else if (lower.includes("tizen")) {
          smartTv = "Tizen TV";
        }
      }
    });

    return { size, resolution, displayType, smartTv };
  };

  // Filter only TVs
  const tvData = products.filter((product) => product.category === "TV");

  // Handle dropdown filter change
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
    setOpenDropdown(null); // Close dropdown after selection
  };

  // Handle price inputs
  const handlePriceChange = (e, type) => {
    const value = Number(e.target.value);
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Toggle dropdown
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Filtered TVs according to filters
  const filteredData = tvData.filter((tv) => {
    const priceNumber = Number(tv.price.toString().replace(/,/g, ""));
    const { size, resolution, displayType, smartTv } = extractSpecs(tv.key_features || []);

    return (
      (!filters.size || size.includes(filters.size)) &&
      (!filters.resolution || resolution === filters.resolution) &&
      (!filters.displayType || displayType === filters.displayType) &&
      (!filters.smartTv || smartTv === filters.smartTv) &&
      priceNumber >= priceRange.min &&
      priceNumber <= priceRange.max
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-opacity-75 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">Error loading products. Please try again later.</p>
      </div>
    );
  }

  // Filter options
  const filterOptions = {
    size: ["32 inch", "40 inch", "43 inch", "50 inch", "55 inch", "65 inch", "75 inch", "85 inch", "98 inch"],
    resolution: ["720p (HD)", "1080p (Full HD)", "1440p (QHD)", "2160p (4K UHD)", "4320p (8K)"],
    displayType: ["LED", "OLED", "QLED", "MicroLED", "LCD", "Plasma"],
    smartTv: ["Smart TV", "Android TV", "webOS TV", "Tizen TV"]
  };

  return (
    <div className="min-h-screen px-4 py-8 mt-20 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">TV Catalog</h1>
        
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Filter Sidebar */}
          <div className="w-full p-6 bg-white rounded-lg shadow-md md:w-1/4 h-fit">
            <h2 className="pb-2 mb-6 text-xl font-semibold text-gray-800 border-b">Filters</h2>
            
            {/* Price Range */}
            <div className="mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Price Range (৳)</h4>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange(e, "min")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={0}
                    placeholder="Min"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange(e, "max")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={0}
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Size Dropdown */}
            <div className="relative mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Size</h4>
              <button
                onClick={() => toggleDropdown("size")}
                className="flex items-center justify-between w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{filters.size || "Select size"}</span>
                <svg className={`h-5 w-5 transform transition-transform ${openDropdown === "size" ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openDropdown === "size" && (
                <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                  {filterOptions.size.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleFilterChange("size", item)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filters.size === item ? "bg-blue-100 text-blue-800" : ""}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resolution Dropdown */}
            <div className="relative mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Resolution</h4>
              <button
                onClick={() => toggleDropdown("resolution")}
                className="flex items-center justify-between w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{filters.resolution || "Select resolution"}</span>
                <svg className={`h-5 w-5 transform transition-transform ${openDropdown === "resolution" ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openDropdown === "resolution" && (
                <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                  {filterOptions.resolution.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleFilterChange("resolution", item)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filters.resolution === item ? "bg-blue-100 text-blue-800" : ""}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Display Type Dropdown */}
            <div className="relative mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Display Type</h4>
              <button
                onClick={() => toggleDropdown("displayType")}
                className="flex items-center justify-between w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{filters.displayType || "Select display type"}</span>
                <svg className={`h-5 w-5 transform transition-transform ${openDropdown === "displayType" ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openDropdown === "displayType" && (
                <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                  {filterOptions.displayType.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleFilterChange("displayType", item)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filters.displayType === item ? "bg-blue-100 text-blue-800" : ""}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Smart TV Dropdown */}
            <div className="relative mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Smart TV</h4>
              <button
                onClick={() => toggleDropdown("smartTv")}
                className="flex items-center justify-between w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{filters.smartTv || "Select smart TV type"}</span>
                <svg className={`h-5 w-5 transform transition-transform ${openDropdown === "smartTv" ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="CurrentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openDropdown === "smartTv" && (
                <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                  {filterOptions.smartTv.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleFilterChange("smartTv", item)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filters.smartTv === item ? "bg-blue-100 text-blue-800" : ""}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => {
                setFilters({ size: "", resolution: "", displayType: "", smartTv: "" });
                setPriceRange({ min: 0, max: 500000 });
              }}
              className="w-full px-4 py-2 text-gray-800 transition duration-200 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>

          {/* Products */}
          <div className="w-full md:w-3/4">
            {filteredData.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-lg shadow-md">
                <h3 className="mb-2 text-xl font-medium text-gray-700">No TVs Found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((tv) => {
                  const { size, resolution, displayType, smartTv } = extractSpecs(tv.key_features || []);
                  return (
                    <Link 
                      to={`/product/${tv._id}`}
                      key={tv._id}
                      className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={tv.image || "https://via.placeholder.com/300"}
                          alt={tv.title}
                          className="object-contain w-full h-full p-4"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-1">{tv.title}</h2>
                        <div className="mb-3 space-y-1 text-sm text-gray-600">
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">Size:</span> 
                            {size || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">Resolution:</span> 
                            {resolution || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">Display Type:</span> 
                            {displayType || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">Smart TV:</span> 
                            {smartTv || "N/A"}
                          </p>
                        </div>
                        <p className="text-xl font-bold text-red-600">
                          {Number(tv.price).toLocaleString()} ৳
                        </p>
                        <button className="w-full px-4 py-2 mt-4 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700">
                          View Details
                        </button>
                      </div>
                    </Link>
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

export default TV;