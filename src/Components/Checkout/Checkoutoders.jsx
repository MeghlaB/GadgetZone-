import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useParams } from "react-router-dom";

const CheckoutOrders = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const {
    isLoading,
    isError,
    data: product = {},
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      
      return res.data[0];
    },
    enabled: !!id,
  });

  const onSubmit = (data) => {
  
    data.productID = id;
    fetch("https://gadget-zone-server-kappa.vercel.app/oders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),

    }).then(res => res.json())
      .then(result => {
        window.location.replace(result.url)
        
      })

  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-600">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-600">
        Error loading product.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 mt-10 gray-50">
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
        {/* Product Info */}
        <section className="flex flex-col items-center justify-center p-10 space-y-5 bg-gray-100 border-r border-gray-200 md:w-1/2">
          <img
            src={product?.image}
            alt={product?.name}
            className="object-contain rounded-md "
          />
          <h2 className="text-2xl font-semibold text-gray-900">
            {product?.name}
          </h2>
          <p className="text-xl font-bold text-gray-800">${product?.price}</p>
          <p className="text-xl font-bold text-gray-800">{product?.title}</p>
          <p className="max-w-xs text-sm leading-relaxed text-center text-gray-600">
            {product?.description}
          </p>
        </section>

        {/* Payment Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center p-10 space-y-6 md:w-1/2"
          noValidate
        >
          <h3 className="mb-4 text-xl font-semibold text-center text-gray-800">
            Payment Details
          </h3>

          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="px-4 py-3 text-gray-800 placeholder-gray-400 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <input
            {...register("price", { required: true })}
            placeholder="price"
            className="px-4 py-3 text-gray-800 placeholder-gray-400 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={product?.price}
          />
          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className="px-4 py-3 text-gray-800 placeholder-gray-400 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            type="tel"
            className="px-4 py-3 text-gray-800 placeholder-gray-400 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
          >
            Buy Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutOrders;
