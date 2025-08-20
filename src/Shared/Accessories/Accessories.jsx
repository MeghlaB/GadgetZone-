// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import { Link } from "react-router-dom";
// import { 
//   FaFilter, 
//   FaMoneyBillWave, 
//   FaSearchDollar, 
//   FaShoppingCart, 
//   FaEye,
//   FaStar,
//   FaRegStar,
//   FaHeart,
//   FaShippingFast
// } from "react-icons/fa";

// function Accessories() {
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

//   // Price range state
//   const [priceRange, setPriceRange] = useState({
//     min: 0,
//     max: 500000,
//   });

//   // Filter only accessories
//   const accessories = products.filter((product) => product.category === "Accessories");

//   // Handle price inputs
//   const handlePriceChange = (e, type) => {
//     const value = Number(e.target.value);
//     setPriceRange((prev) => ({
//       ...prev,
//       [type]: value,
//     }));
//   };

//   // Filtered accessories according to price range
//   const filteredData = accessories.filter((item) => {
//     const priceNumber = Number(item.price.toString().replace(/,/g, ""));
//     return priceNumber >= priceRange.min && priceNumber <= priceRange.max;
//   });

//   // Generate random rating (for demo purposes)
//   const getRandomRating = () => {
//     return (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
//   };

//   // Generate random review count (for demo purposes)
//   const getRandomReviews = () => {
//     return Math.floor(Math.random() * 100) + 15;
//   };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//         <div className="relative w-16 h-16">
//           <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
//           <div className="absolute flex items-center justify-center bg-white rounded-full shadow-md inset-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-6 h-6 text-blue-600 animate-pulse"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 4v16m8-8H4m4-6h.01M16 6h.01M16 18h.01M8 18h.01"
//               />
//             </svg>
//           </div>
//         </div>
//         <p className="mt-4 font-medium text-gray-700 animate-pulse">
//           Powering up your gadgets...
//         </p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//         <div className="p-4 bg-red-100 rounded-full shadow-md">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-12 h-12 text-red-600 animate-bounce"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 3v2m0 14v2m6-6h2m-14 0H4m12.364-7.364l1.414 1.414M6.222 17.778l1.414 1.414m0-12.728L6.222 6.222m10.142 10.142l-1.414 1.414"
//             />
//           </svg>
//         </div>
//         <h2 className="mt-4 text-xl font-bold text-red-600">
//           Oops! Something went wrong.
//         </h2>
//         <p className="max-w-sm mt-2 text-center text-gray-600">
//           We couldn't load your products right now.
//           Please check your internet connection or try again.
//         </p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-5 py-2 mt-6 font-medium text-white transition-colors bg-red-600 rounded-lg shadow hover:bg-red-700"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 bg-gray-50 mt-28">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-10 text-center">
//           <h1 className="mb-3 text-4xl font-bold text-gray-900">Premium Accessories</h1>
//           <p className="max-w-2xl mx-auto text-gray-600">
//             Discover our curated collection of high-quality tech accessories to enhance your digital lifestyle
//           </p>
//         </div>
        
//         {/* Price Range Filter */}
//         <div className="p-6 mb-10 bg-white border border-gray-100 shadow-sm rounded-xl">
//           <div className="flex items-center mb-4">
//             <FaFilter className="mr-3 text-lg text-teal-600" />
//             <h2 className="text-xl font-semibold text-gray-800">Filter by Price</h2>
//           </div>
          
//           <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
//             <div className="flex flex-col">
//               <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
//                 <FaMoneyBillWave className="mr-2 text-green-600" />
//                 Minimum Price (৳)
//               </label>
//               <input
//                 type="number"
//                 value={priceRange.min}
//                 onChange={(e) => handlePriceChange(e, "min")}
//                 className="px-4 py-3 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 min={0}
//                 max={priceRange.max}
//               />
//             </div>
            
//             <div className="flex flex-col">
//               <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
//                 <FaSearchDollar className="mr-2 text-blue-600" />
//                 Maximum Price (৳)
//               </label>
//               <input
//                 type="number"
//                 value={priceRange.max}
//                 onChange={(e) => handlePriceChange(e, "max")}
//                 className="px-4 py-3 transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 min={priceRange.min}
//                 max={500000}
//               />
//             </div>
            
//             <div className="flex flex-col justify-end">
//               <div className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-50">
//                 <span className="text-sm font-medium text-gray-700">
//                   Showing {filteredData.length} of {accessories.length} products
//                 </span>
//               </div>
//             </div>
//           </div>
          
//           {/* Price Range Slider */}
//           <div className="mt-6">
//             <label className="block mb-3 text-sm font-medium text-gray-700">
//               Price Range: ৳{priceRange.min.toLocaleString()} - ৳{priceRange.max.toLocaleString()}
//             </label>
//             <div className="relative pt-1">
//               <input
//                 type="range"
//                 min="0"
//                 max="500000"
//                 value={priceRange.max}
//                 onChange={(e) => setPriceRange(prev => ({
//                   ...prev,
//                   max: Number(e.target.value)
//                 }))}
//                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb:bg-teal-600 range-thumb:border-0 range-thumb:h-4 range-thumb:w-4 range-thumb:rounded-full"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div>
//           {filteredData.length === 0 ? (
//             <div className="p-12 text-center bg-white border border-gray-100 shadow-sm rounded-xl">
//               <svg
//                 className="w-20 h-20 mx-auto mb-4 text-gray-300"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 ></path>
//               </svg>
//               <h3 className="mt-4 text-xl font-medium text-gray-900">No accessories found</h3>
//               <p className="mt-2 mb-6 text-gray-500">
//                 Try adjusting your price range to see more products.
//               </p>
//               <button 
//                 onClick={() => setPriceRange({ min: 0, max: 500000 })}
//                 className="px-6 py-2 text-white transition-colors bg-teal-600 rounded-lg hover:bg-teal-700"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {filteredData.map((item) => {
//                 const rating = getRandomRating();
//                 const reviewCount = getRandomReviews();
//                 const stars = Array.from({ length: 5 }, (_, index) => (
//                   <span key={index}>
//                     {index < Math.floor(rating) ? (
//                       <FaStar className="inline text-sm text-yellow-400" />
//                     ) : (
//                       <FaRegStar className="inline text-sm text-yellow-400" />
//                     )}
//                   </span>
//                 ));

//                 return (
//                   <div
//                     key={item._id}
//                     className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-xl hover:shadow-lg hover:-translate-y-1"
//                   >
//                     {/* Product Image */}
//                     <div className="relative overflow-hidden">
//                       <img
//                         src={item.image || "https://via.placeholder.com/300"}
//                         alt={item.title}
//                         className="object-cover w-full transition-transform duration-500 h-60 group-hover:scale-105"
//                       />
                      
//                       {/* Badges */}
//                       <div className="absolute top-3 left-3">
//                         <span className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
//                           SALE
//                         </span>
//                       </div>
                      
//                       {/* Action Buttons */}
//                       <div className="absolute flex flex-col space-y-2 transition-opacity duration-300 opacity-0 top-3 right-3 group-hover:opacity-100">
//                         <button className="p-2 transition-colors bg-white rounded-full shadow-md hover:bg-gray-50">
//                           <FaHeart className="text-gray-600 hover:text-red-500" />
//                         </button>
//                         <button className="p-2 transition-colors bg-white rounded-full shadow-md hover:bg-gray-50">
//                           <FaEye className="text-gray-600 hover:text-blue-500" />
//                         </button>
//                       </div>
                      
//                       {/* Quick Add to Cart */}
//                       <div className="absolute bottom-0 left-0 right-0 p-3 text-white transition-transform duration-300 transform translate-y-full bg-black bg-opacity-70 group-hover:translate-y-0">
//                         <button className="flex items-center justify-center w-full py-2 transition-colors bg-teal-600 rounded-lg hover:bg-teal-700">
//                           <FaShoppingCart className="mr-2" />
//                           Add to Cart
//                         </button>
//                       </div>
//                     </div>

//                     {/* Product Info */}
//                     <div className="p-5">
//                       {/* Category */}
//                       <div className="flex items-center justify-between mb-3">
//                         <span className="px-2 py-1 text-xs font-medium text-teal-600 rounded bg-teal-50">
//                           {item.category}
//                         </span>
//                         <div className="flex items-center">
//                           <FaShippingFast className="mr-1 text-sm text-green-500" />
//                           <span className="text-xs text-gray-500">Free Shipping</span>
//                         </div>
//                       </div>

//                       {/* Title */}
//                       <h3 className="mb-2 font-semibold text-gray-900 line-clamp-2 h-14">
//                         {item.title}
//                       </h3>

//                       {/* Description */}
//                       <p className="h-10 mb-4 text-sm text-gray-600 line-clamp-2">
//                         {item.description || "Premium quality accessory for your devices"}
//                       </p>

//                       {/* Rating */}
//                       <div className="flex items-center mb-4">
//                         <div className="flex mr-2">
//                           {stars}
//                         </div>
//                         <span className="text-sm text-gray-600">
//                           ({rating}) • {reviewCount} reviews
//                         </span>
//                       </div>

//                       {/* Price and Action */}
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <span className="text-2xl font-bold text-gray-900">
//                             ৳{Number(item.price).toLocaleString()}
//                           </span>
//                           {item.originalPrice && (
//                             <span className="ml-2 text-sm text-gray-500 line-through">
//                               ৳{Number(item.originalPrice).toLocaleString()}
//                             </span>
//                           )}
//                         </div>
                        
//                         <Link
//                           to={`/product/${item._id}`}
//                           className="px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
//                         >
//                           View Details
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Accessories;

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
  FaChevronUp
} from "react-icons/fa";

function Accessories() {
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

  // Filter only accessories
  const accessories = products.filter((product) => product.category === "Accessories");

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

  // Filtered and sorted accessories
  const filteredData = accessories
    .filter((item) => {
      const priceNumber = Number(item.price.toString().replace(/,/g, ""));
      return priceNumber >= priceRange.min && priceNumber <= priceRange.max;
    })
    .sort((a, b) => {
      const priceA = Number(a.price.toString().replace(/,/g, ""));
      const priceB = Number(b.price.toString().replace(/,/g, ""));
      
      switch (sortOption) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "discount":
          const discountA = a.discount ? parseInt(a.discount) : 0;
          const discountB = b.discount ? parseInt(b.discount) : 0;
          return discountB - discountA;
        default:
          return 0;
      }
    });

  // Extract key features for display
  const extractKeyFeatures = (keyFeatures) => {
    if (!keyFeatures || !Array.isArray(keyFeatures)) return [];
    
    return keyFeatures.slice(0, 3); // Show only first 3 features
  };

  // Calculate discount percentage if not provided
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute flex items-center justify-center bg-white rounded-full shadow-md inset-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-blue-600 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4m4-6h.01M16 6h.01M16 18h.01M8 18h.01"
              />
            </svg>
          </div>
        </div>
        <p className="mt-4 font-medium text-gray-700 animate-pulse">
          Powering up your gadgets...
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
          We couldn't load your products right now.
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
          <h1 className="mb-3 text-4xl font-bold text-gray-900">Premium Accessories</h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover our curated collection of high-quality tech accessories to enhance your digital lifestyle
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-xl font-semibold text-gray-800">Accessories</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 text-white bg-teal-600 rounded-lg"
          >
            <FaFilter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar - Sorting & Filters (Visible on md+ or when toggled on mobile) */}
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
                    { value: "price-high", label: "Price: High to Low" },
                    { value: "discount", label: "Best Discount" }
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

              {/* Results Count */}
              <div className="p-3 text-sm text-center rounded-lg bg-gray-50">
                <span className="font-medium text-gray-700">
                  {filteredData.length} of {accessories.length} products
                </span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Mobile Sort Options (visible only on mobile) */}
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
                <option value="discount">Best Discount</option>
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
                <h3 className="mt-4 text-xl font-medium text-gray-900">No accessories found</h3>
                <p className="mt-2 mb-6 text-gray-500">
                  Try adjusting your price range to see more products.
                </p>
                <button 
                  onClick={() => setPriceRange({ min: 0, max: 500000 })}
                  className="px-6 py-2 text-white transition-colors bg-teal-600 rounded-lg hover:bg-teal-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((item) => {
                  const discount = calculateDiscount(item);
                  const keyFeatures = extractKeyFeatures(item.key_features);

                  return (
                    <div
                      key={item._id}
                      className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-lg group hover:shadow-lg hover:-translate-y-1"
                    >
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image || "https://via.placeholder.com/300"}
                          alt={item.title}
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
                        <Link to={`/product/${item._id}`}>
                          <h3 className="mb-2 text-sm font-semibold text-gray-800 line-clamp-2 hover:text-teal-600">
                            {item.title}
                          </h3>
                        </Link>

                        {/* Key Features */}
                        {keyFeatures.length > 0 && (
                          <div className="mb-3">
                            <ul className="text-xs text-gray-600">
                              {keyFeatures.map((feature, index) => (
                                <li key={index} className="mb-1">• {feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-gray-900">
                              ৳{Number(item.price).toLocaleString()}
                            </span>
                            {item.previous_price && (
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                ৳{Number(item.previous_price).toLocaleString()}
                              </span>
                            )}
                          </div>
                          
                          <Link
                            to={`/product/${item._id}`}
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

export default Accessories;