// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import { Link } from "react-router-dom";

// function Monitor() {
//   const axiosPublic = useAxiosPublic();

//   const {
//     isLoading,
//     isError,
//     data: products = [],
//   } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/products");
//       return res.data;
//     },
//   });

//   // Filter states
//   const [filters, setFilters] = useState({
//     processor: "",
//     ram: "",
//     ssd: "",
//   });

//   const [priceRange, setPriceRange] = useState({
//     min: 0,
//     max: 500000,
//   });

//   // Extract processor, RAM, SSD info from key_features array
//   const extractSpecs = (keyFeatures) => {
//     let processor = "";
//     let ram = "";
//     let ssd = "";

//     keyFeatures.forEach((feature) => {
//       const lower = feature.toLowerCase();

//       if (lower.includes("processor")) {
//         // Extract after "Processor: "
//         processor = feature.replace(/processor:\s*/i, "").trim();
//         // Optionally trim to main name like "Ryzen 7"
//         if (processor.toLowerCase().includes("ryzen")) {
//           const match = processor.match(/ryzen \d+/i);
//           if (match) processor = match[0];
//         } else if (processor.toLowerCase().includes("core i")) {
//           const match = processor.match(/core i\d+/i);
//           if (match) processor = match[0];
//         } else if (processor.toLowerCase().includes("snapdragon")) {
//           const match = processor.match(/snapdragon \w+ ?\w*/i);
//           if (match) processor = match[0];
//         }
//       }

//       if (lower.includes("ram")) {
//         // RAM usually like "RAM: 16GB DDR5 6400MHz; Storage: 1TB SSD"
//         // Split by semicolon or comma
//         const parts = feature.split(/[;,]/);
//         parts.forEach((part) => {
//           if (part.toLowerCase().includes("ram")) {
//             const ramMatch = part.match(/\d+GB/i);
//             if (ramMatch) ram = ramMatch[0];
//           }
//           if (
//             part.toLowerCase().includes("storage") ||
//             part.toLowerCase().includes("ssd")
//           ) {
//             const ssdMatch = part.match(/\d+TB|\d+GB/i);
//             if (ssdMatch) ssd = ssdMatch[0];
//           }
//         });
//       }

//       // In case Storage/SSD info is in a separate string and ssd not found yet
//       if ((lower.includes("storage") || lower.includes("ssd")) && !ssd) {
//         const ssdMatch = feature.match(/\d+TB|\d+GB/i);
//         if (ssdMatch) ssd = ssdMatch[0];
//       }
//     });

//     return { processor, ram, ssd };
//   };

//   // Filter only laptops
//   const LaptopData = products.filter((product) => product.category === "Monitor");

//   // Handle checkbox filter change
//   const handleChange = (type, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [type]: prev[type] === value ? "" : value,
//     }));
//   };

//   // Handle price inputs
//   const handlePriceChange = (e, type) => {
//     const value = Number(e.target.value);
//     setPriceRange((prev) => ({
//       ...prev,
//       [type]: value,
//     }));
//   };

//   // Filtered laptops according to filters
//   const filteredData = LaptopData.filter((pc) => {
//     const priceNumber = Number(pc.price.toString().replace(/,/g, ""));

//     const { processor, ram, ssd } = extractSpecs(pc.key_features || []);

//     return (
//       (!filters.processor || processor.toLowerCase().includes(filters.processor.toLowerCase())) &&
//       (!filters.ram || ram === filters.ram) &&
//       (!filters.ssd || ssd === filters.ssd) &&
//       priceNumber >= priceRange.min &&
//       priceNumber <= priceRange.max
//     );
//   });

//   if (isLoading) {
//     return (
//       <p className="mt-10 text-center text-blue-500">Loading products...</p>
//     );
//   }

//   if (isError) {
//     return (
//       <p className="mt-10 text-center text-red-500">Error loading products.</p>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 bg-gray-100 mt-28">
//       <h1 className="mb-6 text-2xl font-bold text-center">Monitor Catalog</h1>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
//         {/* Filter Sidebar */}
//         <div className="p-4 space-y-6 bg-white rounded shadow-md">
//           {/* Price Range */}
//           <div>
//             <h4 className="mb-2 font-bold">Price Range (৳)</h4>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 value={priceRange.min}
//                 onChange={(e) => handlePriceChange(e, "min")}
//                 className="w-full px-2 py-1 border rounded"
//                 min={0}
//               />
//               <span>to</span>
//               <input
//                 type="number"
//                 value={priceRange.max}
//                 onChange={(e) => handlePriceChange(e, "max")}
//                 className="w-full px-2 py-1 border rounded"
//                 min={0}
//               />
//             </div>
//           </div>

//           {/* Processor */}
//           <div>
//             <h4 className="mb-2 font-bold">Processor</h4>
//             {["Ryzen 5", "Ryzen 7", "Core i3", "Snapdragon X Plus"].map((item) => (
//               <div key={item}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={filters.processor === item}
//                     onChange={() => handleChange("processor", item)}
//                   />
//                   <span className="ml-2">{item}</span>
//                 </label>
//               </div>
//             ))}
//           </div>

//           {/* RAM */}
//           <div>
//             <h4 className="mb-2 font-bold">RAM</h4>
//             {["8GB", "16GB"].map((item) => (
//               <div key={item}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={filters.ram === item}
//                     onChange={() => handleChange("ram", item)}
//                   />
//                   <span className="ml-2">{item}</span>
//                 </label>
//               </div>
//             ))}
//           </div>

//           {/* SSD */}
//           <div>
//             <h4 className="mb-2 font-bold">SSD</h4>
//             {["256GB", "512GB", "1TB"].map((item) => (
//               <div key={item}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={filters.ssd === item}
//                     onChange={() => handleChange("ssd", item)}
//                   />
//                   <span className="ml-2">{item}</span>
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Products */}
//         <div className="md:col-span-3">
//           {filteredData.length === 0 ? (
//             <p className="font-semibold text-center text-red-500">
//               No Laptops found with selected filters.
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               {filteredData.map((pc) => {
//                 const { processor, ram, ssd } = extractSpecs(pc.key_features || []);
//                 return (
//                   <Link to={`/product/${pc._id}`}
//                     key={pc._id}
//                     className="p-4 bg-white border rounded-lg shadow-md"
//                   >
//                     <img
//                       src={pc.image || "https://via.placeholder.com/150"}
//                       alt={pc.title}
//                       className="object-cover w-full h-40 rounded"
//                     />
//                     <h2 className="mt-2 font-semibold">{pc.title}</h2>
//                     <p className="text-sm text-gray-600">
//                       Processor: {processor || "N/A"}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       RAM: {ram || "N/A"} | SSD: {ssd || "N/A"}
//                     </p>
//                     <p className="mt-2 font-bold text-red-600">
//                       {Number(pc.price).toLocaleString()} ৳
//                     </p>
//                   </Link>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Monitor;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

function Monitor() {
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
    refreshRate: "",
    panelType: "",
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 500000,
  });

  // Extract monitor specs from key_features array
  const extractSpecs = (keyFeatures) => {
    let size = "";
    let resolution = "";
    let refreshRate = "";
    let panelType = "";

    keyFeatures.forEach((feature) => {
      const lower = feature.toLowerCase();

      if (lower.includes("inch") || lower.includes('"')) {
        const sizeMatch = feature.match(/\d+(\.\d+)?\s*(inch|")/i);
        if (sizeMatch) size = sizeMatch[0];
      }

      if (lower.includes("resolution") || lower.includes("p")) {
        if (lower.includes("1080") || lower.includes("full hd") || lower.includes("fhd")) {
          resolution = "1080p (Full HD)";
        } else if (lower.includes("1440") || lower.includes("qhd") || lower.includes("2k")) {
          resolution = "1440p (QHD)";
        } else if (lower.includes("2160") || lower.includes("4k") || lower.includes("uhd")) {
          resolution = "2160p (4K UHD)";
        } else if (lower.includes("3840")) {
          resolution = "3840p (4K)";
        }
      }

      if (lower.includes("hz") || lower.includes("refresh")) {
        const refreshMatch = feature.match(/\d+\s*Hz/i);
        if (refreshMatch) refreshRate = refreshMatch[0];
      }

      if (lower.includes("ips")) {
        panelType = "IPS";
      } else if (lower.includes("va")) {
        panelType = "VA";
      } else if (lower.includes("tn")) {
        panelType = "TN";
      } else if (lower.includes("oled")) {
        panelType = "OLED";
      }
    });

    return { size, resolution, refreshRate, panelType };
  };

  // Filter only monitors
  const monitorData = products.filter((product) => product.category === "Monitor");

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

  // Filtered monitors according to filters
  const filteredData = monitorData.filter((monitor) => {
    const priceNumber = Number(monitor.price.toString().replace(/,/g, ""));
    const { size, resolution, refreshRate, panelType } = extractSpecs(monitor.key_features || []);

    return (
      (!filters.size || size.includes(filters.size)) &&
      (!filters.resolution || resolution === filters.resolution) &&
      (!filters.refreshRate || refreshRate === filters.refreshRate) &&
      (!filters.panelType || panelType === filters.panelType) &&
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

  return (
    <div className="min-h-screen px-4 py-8 mt-20 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">Monitor Catalog</h1>
        
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

            {/* Size */}
            <div className="mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Size</h4>
              <div className="space-y-2">
                {["24 inch", "27 inch", "32 inch", "34 inch", "38 inch+"].map((item) => (
                  <div key={item} className="flex items-center">
                    <input
                      id={`size-${item}`}
                      type="checkbox"
                      checked={filters.size === item}
                      onChange={() => handleChange("size", item)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`size-${item}`} className="ml-2 text-gray-700">
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
                {["1080p (Full HD)", "1440p (QHD)", "2160p (4K UHD)", "3840p (4K)"].map((item) => (
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

            {/* Refresh Rate */}
            <div className="mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Refresh Rate</h4>
              <div className="space-y-2">
                {["60Hz", "75Hz", "120Hz", "144Hz", "165Hz", "240Hz", "360Hz"].map((item) => (
                  <div key={item} className="flex items-center">
                    <input
                      id={`refreshRate-${item}`}
                      type="checkbox"
                      checked={filters.refreshRate === item}
                      onChange={() => handleChange("refreshRate", item)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`refreshRate-${item}`} className="ml-2 text-gray-700">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel Type */}
            <div className="mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Panel Type</h4>
              <div className="space-y-2">
                {["IPS", "VA", "TN", "OLED"].map((item) => (
                  <div key={item} className="flex items-center">
                    <input
                      id={`panelType-${item}`}
                      type="checkbox"
                      checked={filters.panelType === item}
                      onChange={() => handleChange("panelType", item)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`panelType-${item}`} className="ml-2 text-gray-700">
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => {
                setFilters({ size: "", resolution: "", refreshRate: "", panelType: "" });
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
                <h3 className="mb-2 text-xl font-medium text-gray-700">No Monitors Found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((monitor) => {
                  const { size, resolution, refreshRate, panelType } = extractSpecs(monitor.key_features || []);
                  return (
                    <Link 
                      to={`/product/${monitor._id}`}
                      key={monitor._id}
                      className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={monitor.image || "https://via.placeholder.com/300"}
                          alt={monitor.title}
                          className="object-contain w-full h-full p-4"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-1">{monitor.title}</h2>
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
                            <span className="mr-1 font-medium">Refresh Rate:</span> 
                            {refreshRate || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">Panel Type:</span> 
                            {panelType || "N/A"}
                          </p>
                        </div>
                        <p className="text-xl font-bold text-red-600">
                          {Number(monitor.price).toLocaleString()} ৳
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

export default Monitor;