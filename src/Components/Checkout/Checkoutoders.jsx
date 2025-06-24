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
      console.log(res.data[0]);
      return res.data[0];
    },
    enabled: !!id,
  });

  const onSubmit = (data) => {
    console.log("✅ Payment Data:", data);
    data.productID = id;
    fetch("http://localhost:5000/oders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
      
    }).then(res=> res.json())
    .then(result=>{
      window.location.replace(result.url)
      console.log(result)
    })
    
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-medium text-lg">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-semibold text-lg">
        Error loading product.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Product Info */}
        <section className="md:w-1/2 p-10 bg-gray-100 flex flex-col items-center justify-center space-y-5 border-r border-gray-200">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-36 h-36 object-contain rounded-md border border-gray-300"
          />
          <h2 className="text-2xl font-semibold text-gray-900">
            {product?.name}
          </h2>
          <p className="text-xl font-bold text-gray-800">${product?.price}</p>
          <p className="text-xl font-bold text-gray-800">{product?.title}</p>
          <p className="text-gray-600 text-center text-sm leading-relaxed max-w-xs">
            {product?.description}
          </p>
        </section>

        {/* Payment Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-1/2 p-10 flex flex-col justify-center space-y-6"
          noValidate
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Payment Details
          </h3>

          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="border border-gray-300 rounded-md px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <select
            {...register("currency", { required: true })}
            className="border border-gray-300 rounded-md px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            defaultValue=""
          >
            <option value="" disabled>
              Select Currency
            </option>
            <option value="BDT">BDT</option>
            <option value="USD">USD</option>
          </select>
          <input
            {...register("price", { required: true })}
            placeholder="price"
            className="border border-gray-300 rounded-md px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className="border border-gray-300 rounded-md px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            type="tel"
            className="border border-gray-300 rounded-md px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-sm transition"
          >
           Buy Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutOrders;
