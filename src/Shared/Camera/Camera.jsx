import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

function Camera() {
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

  // Sorting state
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter states
  const [filters, setFilters] = useState({
    brand: "",
    resolution: "",
    type: "",
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 500000,
  });

  // Extract camera specs from key_features array
  const extractSpecs = (keyFeatures) => {
    let brand = "";
    let resolution = "";
    let type = "";

    keyFeatures.forEach((feature) => {
      const lower = feature.toLowerCase();

      if (lower.includes("brand") || lower.includes("make")) {
        // Extract brand information
        if (lower.includes("canon")) brand = "Canon";
        else if (lower.includes("nikon")) brand = "Nikon";
        else if (lower.includes("sony")) brand = "Sony";
        else if (lower.includes("fujifilm")) brand = "Fujifilm";
        else if (lower.includes("panasonic")) brand = "Panasonic";
        else if (lower.includes("olympus")) brand = "Olympus";
        else if (lower.includes("gopro")) brand = "GoPro";
      }

      if (lower.includes("resolution") || lower.includes("mp") || lower.includes("megapixel")) {
        const resolutionMatch = feature.match(/\d+\s*MP|\d+\s*mp|\d+\s*megapixel/i);
        if (resolutionMatch) resolution = resolutionMatch[0];
      }

      if (lower.includes("type") || lower.includes("dslr") || lower.includes("mirrorless") || 
          lower.includes("point") || lower.includes("action")) {
        if (lower.includes("dslr")) type = "DSLR";
        else if (lower.includes("mirrorless")) type = "Mirrorless";
        else if (lower.includes("point") && lower.includes("shoot")) type = "Point & Shoot";
        else if (lower.includes("action")) type = "Action Camera";
      }
    });

    return { brand, resolution, type };
  };

  // Filter only cameras
  const cameraData = products.filter((product) => product.category === "Camera");

  // Handle checkbox filter change
  const handleChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  // Handle price inputs
  const handlePriceChange = (e, type) => {
    const value = Number(e.target.value);
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Filtered cameras according to filters
  const filteredData = cameraData.filter((camera) => {
    const priceNumber = Number(camera.price.toString().replace(/,/g, ""));
    const { brand, resolution, type } = extractSpecs(camera.key_features || []);

    return (
      (!filters.brand || brand === filters.brand) &&
      (!filters.resolution || resolution === filters.resolution) &&
      (!filters.type || type === filters.type) &&
      priceNumber >= priceRange.min &&
      priceNumber <= priceRange.max
    );
  });

  // Sort by price
  const sortedData = [...filteredData].sort((a, b) => {
    const priceA = Number(a.price.toString().replace(/,/g, ""));
    const priceB = Number(b.price.toString().replace(/,/g, ""));
    return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
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

  return (
    <div className="min-h-screen px-4 py-8 mt-20 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">Camera Catalog</h1>
        
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Filter Sidebar */}
          <div className="w-full p-6 bg-white rounded-lg shadow-md md:w-1/4 h-fit">
            <h2 className="pb-2 mb-6 text-xl font-semibold text-gray-800 border-b">Filters</h2>
            
            {/* Sorting */}
            <div className="mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Sort By</h4>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
            
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

            {/* Brand */}
            <div className="mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Brand</h4>
              <div className="space-y-2">
                {["Canon", "Nikon", "Sony", "Fujifilm", "Panasonic", "GoPro"].map((item) => (
                  <div key={item} className="flex items-center">
                    <input
                      id={`brand-${item}`}
                      type="checkbox"
                      checked={filters.brand === item}
                      onChange={() => handleChange("brand", item)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`brand-${item}`} className="ml-2 text-gray-700">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution */}
            <div className="mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Resolution</h4>
              <div className="space-y-2">
                {["12MP", "16MP", "20MP", "24MP", "30MP", "40MP+"].map((item) => (
                  <div key={item} className="flex items-center">
                    <input
                      id={`resolution-${item}`}
                      type="checkbox"
                      checked={filters.resolution === item}
                      onChange={() => handleChange("resolution", item)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`resolution-${item}`} className="ml-2 text-gray-700">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Camera Type</h4>
              <div className="space-y-2">
                {["DSLR", "Mirrorless", "Point & Shoot", "Action Camera"].map((item) => (
                  <div key={item} className="flex items-center">
                    <input
                      id={`type-${item}`}
                      type="checkbox"
                      checked={filters.type === item}
                      onChange={() => handleChange("type", item)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`type-${item}`} className="ml-2 text-gray-700">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => {
                setFilters({ brand: "", resolution: "", type: "" });
                setPriceRange({ min: 0, max: 500000 });
                setSortOrder("asc");
              }}
              className="w-full px-4 py-2 text-gray-800 transition duration-200 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>

          {/* Products */}
          <div className="w-full md:w-3/4">
            {sortedData.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-lg shadow-md">
                <h3 className="mb-2 text-xl font-medium text-gray-700">No Cameras Found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedData.map((camera) => {
                  const { brand, resolution, type } = extractSpecs(camera.key_features || []);
                  return (
                    <Link 
                      to={`/product/${camera._id}`}
                      key={camera._id}
                      className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={camera.image || "https://via.placeholder.com/300"}
                          alt={camera.title}
                          className="object-contain w-full h-full p-4"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-1">{camera.title}</h2>
                        <div className="mb-3 space-y-1 text-sm text-gray-600">
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">Brand:</span> 
                            {brand || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">Resolution:</span> 
                            {resolution || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">Type:</span> 
                            {type || "N/A"}
                          </p>
                        </div>
                        <p className="text-xl font-bold text-red-600">
                          {Number(camera.price).toLocaleString()} ৳
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

export default Camera;