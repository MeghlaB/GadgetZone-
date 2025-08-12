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

  // Filter states
  const [filters, setFilters] = useState({
    processor: "",
    ram: "",
    ssd: "",
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 500000,
  });

  // Extract processor, RAM, SSD info from key_features array
  const extractSpecs = (keyFeatures) => {
    let processor = "";
    let ram = "";
    let ssd = "";

    keyFeatures.forEach((feature) => {
      const lower = feature.toLowerCase();

      if (lower.includes("processor")) {
        // Extract after "Processor: "
        processor = feature.replace(/processor:\s*/i, "").trim();
        // Optionally trim to main name like "Ryzen 7"
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
        // RAM usually like "RAM: 16GB DDR5 6400MHz; Storage: 1TB SSD"
        // Split by semicolon or comma
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

      // In case Storage/SSD info is in a separate string and ssd not found yet
      if ((lower.includes("storage") || lower.includes("ssd")) && !ssd) {
        const ssdMatch = feature.match(/\d+TB|\d+GB/i);
        if (ssdMatch) ssd = ssdMatch[0];
      }
    });

    return { processor, ram, ssd };
  };

  // Filter only laptops
  const desktopPCs = products.filter((product) => product.category === "Camera");

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

  // Filtered laptops according to filters
  const filteredData = desktopPCs.filter((pc) => {
    const priceNumber = Number(pc.price.toString().replace(/,/g, ""));

    const { processor, ram, ssd } = extractSpecs(pc.key_features || []);

    return (
      (!filters.processor || processor.toLowerCase().includes(filters.processor.toLowerCase())) &&
      (!filters.ram || ram === filters.ram) &&
      (!filters.ssd || ssd === filters.ssd) &&
      priceNumber >= priceRange.min &&
      priceNumber <= priceRange.max
    );
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        {/* Outer ring */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>

          {/* Inner circuit icon */}
          <div className="absolute flex items-center justify-center bg-white rounded-full shadow-md inset-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-blue-600 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Circuit board icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4m4-6h.01M16 6h.01M16 18h.01M8 18h.01"
              />
            </svg>
          </div>
        </div>

        {/* Loading text */}
        <p className="mt-4 font-medium text-gray-700 animate-pulse">
          Powering up your gadgets...
        </p>
      </div>
    );
  }


  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        {/* Error Icon */}
        <div className="p-4 bg-red-100 rounded-full shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-red-600 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Broken plug icon (electronics theme) */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2m0 14v2m6-6h2m-14 0H4m12.364-7.364l1.414 1.414M6.222 17.778l1.414 1.414m0-12.728L6.222 6.222m10.142 10.142l-1.414 1.414"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="mt-4 text-xl font-bold text-red-600">
          Oops! Something went wrong.
        </h2>
        <p className="max-w-sm mt-2 text-center text-gray-600">
          We couldn’t load your products right now.
          Please check your internet connection or try again.
        </p>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 mt-6 font-medium text-white bg-red-600 rounded-lg shadow hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen p-4 bg-gray-100 mt-28">
      <h1 className="mb-6 text-2xl font-bold text-center">💻 Camera Catalog</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filter Sidebar */}
        <div className="p-4 space-y-6 bg-white rounded shadow-md">
          {/* Price Range */}
          <div>
            <h4 className="mb-2 font-bold">Price Range (৳)</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceChange(e, "min")}
                className="w-full px-2 py-1 border rounded"
                min={0}
              />
              <span>to</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceChange(e, "max")}
                className="w-full px-2 py-1 border rounded"
                min={0}
              />
            </div>
          </div>

          {/* Processor */}
          <div>
            <h4 className="mb-2 font-bold">Processor</h4>
            {["Ryzen 5", "Ryzen 7", "Core i3", "Snapdragon X Plus"].map((item) => (
              <div key={item}>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.processor === item}
                    onChange={() => handleChange("processor", item)}
                  />
                  <span className="ml-2">{item}</span>
                </label>
              </div>
            ))}
          </div>

          {/* RAM */}
          <div>
            <h4 className="mb-2 font-bold">RAM</h4>
            {["8GB", "16GB"].map((item) => (
              <div key={item}>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.ram === item}
                    onChange={() => handleChange("ram", item)}
                  />
                  <span className="ml-2">{item}</span>
                </label>
              </div>
            ))}
          </div>

          {/* SSD */}
          <div>
            <h4 className="mb-2 font-bold">SSD</h4>
            {["256GB", "512GB", "1TB"].map((item) => (
              <div key={item}>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.ssd === item}
                    onChange={() => handleChange("ssd", item)}
                  />
                  <span className="ml-2">{item}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="md:col-span-3">
          {filteredData.length === 0 ? (
            <p className="font-semibold text-center text-red-500">
              No Laptops found with selected filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredData.map((pc) => {
                const { processor, ram, ssd } = extractSpecs(pc.key_features || []);
                return (
                  <Link to={`/product/${pc._id}`}
                    key={pc._id}
                    className="p-4 bg-white border rounded-lg shadow-md"
                  >
                    <img
                      src={pc.image || "https://via.placeholder.com/150"}
                      alt={pc.title}
                      className="object-cover w-full h-40 rounded"
                    />
                    <h2 className="mt-2 font-semibold">{pc.title}</h2>
                    <p className="text-sm text-gray-600">
                      Processor: {processor || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      RAM: {ram || "N/A"} | SSD: {ssd || "N/A"}
                    </p>
                    <p className="mt-2 font-bold text-red-600">
                      {Number(pc.price).toLocaleString()} ৳
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Camera;
