import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function FeaturedProduct() {
  const axiosPublic = useAxiosPublic()


  const {
    isLoading,
    error,
    isError,
    data: Products = [],
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("https://gadget-zone-server-kappa.vercel.app/products");
      return res.data;
    },
  });
  console.log(Products)

  return (
    <div className="relative w-11/12 mx-auto my-10 top-16">
      <h1 className="text-lg font-bold text-center md:text-2xl">
        Featured Products
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Get Your Desired Product from Featured Products!
      </p>

      {Products.length === 0 ? (
        <p className="text-center text-gray-500">Loading products…</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {Products.map((product, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-2xl"
            >
              {/* Save Badge */}
              <div className="absolute z-10 px-2 py-1 text-xs text-white bg-purple-600 rounded-md top-3 left-2">
                Save: {product.save_amount}৳ ({product.discount})
              </div>

              {/* Product Image */}
              <Link to={`/product/${product._id}`}>
                <div className="flex items-center justify-center h-40 p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain max-h-full"
                  />
                </div>

                {/* Product Title */}
                <div className="px-4 pb-4 text-center">
                  <h2 className="mb-2 text-sm font-semibold text-gray-800">
                    {product.title}
                  </h2>

                  {/* Price Section */}
                  <div className="text-lg font-bold text-red-600">
                    {product.price}৳{" "}
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {product.previous_price}৳
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedProduct;
