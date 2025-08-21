import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutOrders = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();
  const [submitting, setSubmitting] = useState(false);

  const { isLoading, isError, data: product = {} } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      return res.data[0];
    },
    enabled: !!id,
  });

  const onSubmit = async (data) => {
  //  console.log(data)
   data.productId=id;
   fetch('https://gadgetzone-server.onrender.com/order',{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify(data)
   })
   .then((res)=>res.json())
   .then((result)=>{
    window.location.replace(result.url)
    // console.log(result)
   })
  };

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (isError) return <div className="flex items-center justify-center h-screen">Error loading product</div>;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50">
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg md:flex-row">
        {/* Product Info */}
        <section className="flex flex-col items-center justify-center p-10 space-y-5 bg-gray-100 border-r border-gray-200 md:w-1/2">
          <img src={product?.image} alt={product?.name} className="object-contain rounded-md" />
          <h2 className="text-2xl font-semibold text-gray-900">{product?.name}</h2>
          <p className="text-xl font-bold text-gray-800">${product?.price}</p>
          <p className="max-w-xs text-sm leading-relaxed text-center text-gray-600">{product?.description}</p>
        </section>

        {/* Payment Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center p-10 space-y-4 md:w-1/2" noValidate>
          <h3 className="mb-4 text-xl font-semibold text-center text-gray-800">Payment Details</h3>

          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className="px-4 py-3 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            {...register("price", { required: true })}
            placeholder="Price"
            readOnly
            value={product?.price}
            className="px-4 py-3 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
          />

          <input
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className="px-4 py-3 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

          <input
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Phone Number"
            type="tel"
            className="px-4 py-3 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 font-semibold text-white transition bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {submitting ? "Processing..." : "Buy Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutOrders;
