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
    fetch("https://gadgetzone-server.onrender.com/oders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),

    }).then(res => res.json())
      .then(result => {
        window.location.replace(result.url)

      })

  };

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-600">
  //       Loading...
  //     </div>
  //   );
  // }
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
