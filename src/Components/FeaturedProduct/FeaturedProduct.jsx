import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
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
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });





  // useEffect(() => {
  //   fetch("/FeaturedProduct.json")
  //     .then((res) => {
        
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setProducts(data);
  //     })
     
  // }, []);

  return (
    <div className="my-10 w-11/12 mx-auto relative top-16">
      <h1 className="text-lg text-center md:text-2xl font-bold">
        Featured Products
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Get Your Desired Product from Featured Products!
      </p>

      { Products.length === 0 ? (
        <p className="text-center text-gray-500">Loading products…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          { Products.map((product, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Save Badge */}
              <div className="absolute top-3 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-md z-10">
                Save: {product.save_amount}৳ ({product.discount})
              </div>

              {/* Product Image */}
              <Link to={`/product/${product.id}`}>
                <div className="p-4 flex justify-center items-center h-40">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain max-h-full"
                  />
                </div>

                {/* Product Title */}
                <div className="px-4 pb-4 text-center">
                  <h2 className="text-sm font-semibold text-gray-800 mb-2">
                    {product.title}
                  </h2>

                  {/* Price Section */}
                  <div className="text-red-600 font-bold text-lg">
                    {product.price}৳{" "}
                    <span className="line-through text-sm text-gray-500 ml-2">
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
