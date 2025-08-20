// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import { Link } from "react-router-dom";

// function Tablet() {
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
//     storage: "",
//     ram: "",
//     screenSize: "",
//     connectivity: "",
//   });

//   const [priceRange, setPriceRange] = useState({
//     min: 0,
//     max: 500000,
//   });

//   // Extract tablet specs from key_features array
//   const extractSpecs = (keyFeatures) => {
//     let storage = "";
//     let ram = "";
//     let screenSize = "";
//     let connectivity = "";

//     keyFeatures.forEach((feature) => {
//       const lower = feature.toLowerCase();

//       if (lower.includes("storage") || lower.includes("gb") || lower.includes("tb")) {
//         const storageMatch = feature.match(/\d+\s*(GB|TB)/i);
//         if (storageMatch) storage = storageMatch[0];
//       }

//       if (lower.includes("ram")) {
//         const ramMatch = feature.match(/\d+\s*GB\s*RAM/i) || feature.match(/\d+\s*RAM/i);
//         if (ramMatch) ram = ramMatch[0];
//       }

//       if (lower.includes("inch") || lower.includes('"') || lower.includes("display")) {
//         const sizeMatch = feature.match(/\d+(\.\d+)?\s*(inch|")/i);
//         if (sizeMatch) screenSize = sizeMatch[0];
//       }

//       if (lower.includes("wifi") || lower.includes("cellular") || lower.includes("lte") || lower.includes("5g")) {
//         if (lower.includes("wifi")) {
//           connectivity = "Wi-Fi";
//         } else if (lower.includes("cellular") || lower.includes("lte") || lower.includes("5g")) {
//           connectivity = "Cellular";
//         }

//         if (lower.includes("+") && lower.includes("wifi") && (lower.includes("cellular") || lower.includes("lte") || lower.includes("5g"))) {
//           connectivity = "Wi-Fi + Cellular";
//         }
//       }
//     });

//     return { storage, ram, screenSize, connectivity };
//   };

//   // Filter only tablets
//   const tabletData = products.filter((product) => product.category === "Tablet");

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

//   // Filtered tablets according to filters
//   const filteredData = tabletData.filter((tablet) => {
//     const priceNumber = Number(tablet.price.toString().replace(/,/g, ""));
//     const { storage, ram, screenSize, connectivity } = extractSpecs(tablet.key_features || []);

//     return (
//       (!filters.storage || storage.includes(filters.storage)) &&
//       (!filters.ram || ram.includes(filters.ram)) &&
//       (!filters.screenSize || screenSize.includes(filters.screenSize)) &&
//       (!filters.connectivity || connectivity === filters.connectivity) &&
//       priceNumber >= priceRange.min &&
//       priceNumber <= priceRange.max
//     );
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="w-16 h-16 border-t-4 border-blue-500 border-opacity-75 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-xl text-red-500">Error loading products. Please try again later.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen px-4 py-8 mt-20 bg-gray-50 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">Tablet Catalog</h1>

//         <div className="flex flex-col gap-8 md:flex-row">
//           {/* Filter Sidebar */}
//           <div className="w-full p-6 bg-white rounded-lg shadow-md md:w-1/4 h-fit">
//             <h2 className="pb-2 mb-6 text-xl font-semibold text-gray-800 border-b">Filters</h2>

//             {/* Price Range */}
//             <div className="mb-6">
//               <h4 className="mb-3 font-medium text-gray-700">Price Range (৳)</h4>
//               <div className="flex flex-col space-y-3">
//                 <div className="flex items-center">
//                   <input
//                     type="number"
//                     value={priceRange.min}
//                     onChange={(e) => handlePriceChange(e, "min")}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     min={0}
//                     placeholder="Min"
//                   />
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     type="number"
//                     value={priceRange.max}
//                     onChange={(e) => handlePriceChange(e, "max")}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     min={0}
//                     placeholder="Max"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Storage */}
//             <div className="mb-6">
//               <h4 className="mb-3 font-medium text-gray-700">Storage</h4>
//               <div className="space-y-2">
//                 {["64GB", "128GB", "256GB", "512GB", "1TB"].map((item) => (
//                   <div key={item} className="flex items-center">
//                     <input
//                       id={`storage-${item}`}
//                       type="checkbox"
//                       checked={filters.storage === item}
//                       onChange={() => handleChange("storage", item)}
//                       className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                     />
//                     <label htmlFor={`storage-${item}`} className="ml-2 text-gray-700">
//                       {item}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RAM */}
//             <div className="mb-6">
//               <h4 className="mb-3 font-medium text-gray-700">RAM</h4>
//               <div className="space-y-2">
//                 {["4GB", "6GB", "8GB", "12GB", "16GB"].map((item) => (
//                   <div key={item} className="flex items-center">
//                     <input
//                       id={`ram-${item}`}
//                       type="checkbox"
//                       checked={filters.ram === item}
//                       onChange={() => handleChange("ram", item)}
//                       className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                     />
//                     <label htmlFor={`ram-${item}`} className="ml-2 text-gray-700">
//                       {item}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Screen Size */}
//             <div className="mb-6">
//               <h4 className="mb-3 font-medium text-gray-700">Screen Size</h4>
//               <div className="space-y-2">
//                 {["8 inch", "10 inch", "11 inch", "12.9 inch", "13 inch"].map((item) => (
//                   <div key={item} className="flex items-center">
//                     <input
//                       id={`screenSize-${item}`}
//                       type="checkbox"
//                       checked={filters.screenSize === item}
//                       onChange={() => handleChange("screenSize", item)}
//                       className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                     />
//                     <label htmlFor={`screenSize-${item}`} className="ml-2 text-gray-700">
//                       {item}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Connectivity */}
//             <div className="mb-6">
//               <h4 className="mb-3 font-medium text-gray-700">Connectivity</h4>
//               <div className="space-y-2">
//                 {["Wi-Fi", "Cellular", "Wi-Fi + Cellular"].map((item) => (
//                   <div key={item} className="flex items-center">
//                     <input
//                       id={`connectivity-${item}`}
//                       type="checkbox"
//                       checked={filters.connectivity === item}
//                       onChange={() => handleChange("connectivity", item)}
//                       className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                     />
//                     <label htmlFor={`connectivity-${item}`} className="ml-2 text-gray-700">
//                       {item}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <button
//               onClick={() => {
//                 setFilters({ storage: "", ram: "", screenSize: "", connectivity: "" });
//                 setPriceRange({ min: 0, max: 500000 });
//               }}
//               className="w-full px-4 py-2 text-gray-800 transition duration-200 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               Clear Filters
//             </button>
//           </div>

//           {/* Products */}
//           <div className="w-full md:w-3/4">
//             {filteredData.length === 0 ? (
//               <div className="p-8 text-center bg-white rounded-lg shadow-md">
//                 <h3 className="mb-2 text-xl font-medium text-gray-700">No Tablets Found</h3>
//                 <p className="text-gray-500">Try adjusting your filters to see more results.</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                 {filteredData.map((tablet) => {
//                   const { storage, ram, screenSize, connectivity } = extractSpecs(tablet.key_features || []);
//                   return (
//                     <Link
//                       to={`/product/${tablet._id}`}
//                       key={tablet._id}
//                       className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
//                     >
//                       <div className="relative h-48 overflow-hidden">
//                         <img
//                           src={tablet.image || "https://via.placeholder.com/300"}
//                           alt={tablet.title}
//                           className="object-contain w-full h-full p-4"
//                         />
//                       </div>
//                       <div className="p-4">
//                         <h2 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-1">{tablet.title}</h2>
//                         <div className="mb-3 space-y-1 text-sm text-gray-600">
//                           <p className="flex items-center">
//                             <span className="mr-1 font-medium">Storage:</span>
//                             {storage || "N/A"}
//                           </p>
//                           <p className="flex items-center">
//                             <span className="mr-1 font-medium">RAM:</span>
//                             {ram || "N/A"}
//                           </p>
//                           <p className="flex items-center">
//                             <span className="mr-1 font-medium">Screen Size:</span>
//                             {screenSize || "N/A"}
//                           </p>
//                           <p className="flex items-center">
//                             <span className="mr-1 font-medium">Connectivity:</span>
//                             {connectivity || "N/A"}
//                           </p>
//                         </div>
//                         <p className="text-xl font-bold text-red-600">
//                           {Number(tablet.price).toLocaleString()} ৳
//                         </p>
//                         <button className="w-full px-4 py-2 mt-4 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700">
//                           View Details
//                         </button>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Tablet;
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

function Tablet() {
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
    storage: "",
    ram: "",
    screenSize: "",
    connectivity: "",
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 500000,
  });

  // State for dropdown visibility
  const [openDropdown, setOpenDropdown] = useState(null);

  // Extract tablet specs from key_features array
  const extractSpecs = (keyFeatures) => {
    let storage = "";
    let ram = "";
    let screenSize = "";
    let connectivity = "";

    keyFeatures.forEach((feature) => {
      const lower = feature.toLowerCase();

      if (lower.includes("storage") || lower.includes("gb") || lower.includes("tb")) {
        const storageMatch = feature.match(/\d+\s*(GB|TB)/i);
        if (storageMatch) storage = storageMatch[0];
      }

      if (lower.includes("ram")) {
        const ramMatch = feature.match(/\d+\s*GB\s*RAM/i) || feature.match(/\d+\s*RAM/i);
        if (ramMatch) ram = ramMatch[0];
      }

      if (lower.includes("inch") || lower.includes('"') || lower.includes("display")) {
        const sizeMatch = feature.match(/\d+(\.\d+)?\s*(inch|")/i);
        if (sizeMatch) screenSize = sizeMatch[0];
      }

      if (lower.includes("wifi") || lower.includes("cellular") || lower.includes("lte") || lower.includes("5g")) {
        if (lower.includes("wifi")) {
          connectivity = "Wi-Fi";
        } else if (lower.includes("cellular") || lower.includes("lte") || lower.includes("5g")) {
          connectivity = "Cellular";
        }
        
        if (lower.includes("+") && lower.includes("wifi") && (lower.includes("cellular") || lower.includes("lte") || lower.includes("5g"))) {
          connectivity = "Wi-Fi + Cellular";
        }
      }
    });

    return { storage, ram, screenSize, connectivity };
  };

  // Filter only tablets
  const tabletData = products.filter((product) => product.category === "Tablet");

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

  // Filtered tablets according to filters
  const filteredData = tabletData.filter((tablet) => {
    const priceNumber = Number(tablet.price.toString().replace(/,/g, ""));
    const { storage, ram, screenSize, connectivity } = extractSpecs(tablet.key_features || []);

    return (
      (!filters.storage || storage.includes(filters.storage)) &&
      (!filters.ram || ram.includes(filters.ram)) &&
      (!filters.screenSize || screenSize.includes(filters.screenSize)) &&
      (!filters.connectivity || connectivity === filters.connectivity) &&
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
    storage: ["64GB", "128GB", "256GB", "512GB", "1TB"],
    ram: ["4GB", "6GB", "8GB", "12GB", "16GB"],
    screenSize: ["8 inch", "10 inch", "11 inch", "12.9 inch", "13 inch"],
    connectivity: ["Wi-Fi", "Cellular", "Wi-Fi + Cellular"]
  };

  return (
    <div className="min-h-screen px-4 py-8 mt-20 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-900">Tablet Catalog</h1>
        
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

            {/* Storage Dropdown */}
            <div className="relative mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Storage</h4>
              <button
                onClick={() => toggleDropdown("storage")}
                className="flex items-center justify-between w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{filters.storage || "Select storage"}</span>
                <svg className={`h-5 w-5 transform transition-transform ${openDropdown === "storage" ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openDropdown === "storage" && (
                <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                  {filterOptions.storage.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleFilterChange("storage", item)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filters.storage === item ? "bg-blue-100 text-blue-800" : ""}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RAM Dropdown */}
            <div className="relative mb-6">
              <h4 className="mb-3 font-medium text-gray-700">RAM</h4>
              <button
                onClick={() => toggleDropdown("ram")}
                className="flex items-center justify-between w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{filters.ram || "Select RAM"}</span>
                <svg className={`h-5 w-5 transform transition-transform ${openDropdown === "ram" ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openDropdown === "ram" && (
                <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                  {filterOptions.ram.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleFilterChange("ram", item)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filters.ram === item ? "bg-blue-100 text-blue-800" : ""}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Screen Size Dropdown */}
            <div className="relative mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Screen Size</h4>
              <button
                onClick={() => toggleDropdown("screenSize")}
                className="flex items-center justify-between w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{filters.screenSize || "Select screen size"}</span>
                <svg className={`h-5 w-5 transform transition-transform ${openDropdown === "screenSize" ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openDropdown === "screenSize" && (
                <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                  {filterOptions.screenSize.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleFilterChange("screenSize", item)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filters.screenSize === item ? "bg-blue-100 text-blue-800" : ""}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Connectivity Dropdown */}
            <div className="relative mb-6">
              <h4 className="mb-3 font-medium text-gray-700">Connectivity</h4>
              <button
                onClick={() => toggleDropdown("connectivity")}
                className="flex items-center justify-between w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>{filters.connectivity || "Select connectivity"}</span>
                <svg className={`h-5 w-5 transform transition-transform ${openDropdown === "connectivity" ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openDropdown === "connectivity" && (
                <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                  {filterOptions.connectivity.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleFilterChange("connectivity", item)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filters.connectivity === item ? "bg-blue-100 text-blue-800" : ""}`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => {
                setFilters({ storage: "", ram: "", screenSize: "", connectivity: "" });
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
                <h3 className="mb-2 text-xl font-medium text-gray-700">No Tablets Found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((tablet) => {
                  const { storage, ram, screenSize, connectivity } = extractSpecs(tablet.key_features || []);
                  return (
                    <Link 
                      to={`/product/${tablet._id}`}
                      key={tablet._id}
                      className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={tablet.image || "https://via.placeholder.com/300"}
                          alt={tablet.title}
                          className="object-contain w-full h-full p-4"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-1">{tablet.title}</h2>
                        <div className="mb-3 space-y-1 text-sm text-gray-600">
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">Storage:</span> 
                            {storage || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">RAM:</span> 
                            {ram || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">Screen Size:</span> 
                            {screenSize || "N/A"}
                          </p>
                          <p className="flex items-center">
                            <span className="mr-1 font-medium">Connectivity:</span> 
                            {connectivity || "N/A"}
                          </p>
                        </div>
                        <p className="text-xl font-bold text-red-600">
                          {Number(tablet.price).toLocaleString()} ৳
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

export default Tablet;