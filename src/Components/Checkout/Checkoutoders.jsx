import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaUser, FaMapMarkerAlt, FaPhone, FaMoneyBillWave, FaLock, FaEnvelope, FaCalendarAlt, FaHashtag } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const CheckoutOrders = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
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

  // Watch quantity to update total price - moved after useQuery
  const quantity = watch("quantity", 1);
  const totalPrice = product?.price ? (product.price * quantity).toFixed(2) : 0;

  const onSubmit = async (data) => {
    setSubmitting(true);
    data.productId = id;
    data.price = totalPrice; // Use calculated total price
    data.orderDate = new Date().toISOString(); // Add current date
    
    fetch('https://gadgetzone-server.onrender.com/order', {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((result) => {
        window.location.replace(result.url);
      })
      .catch((error) => {
        console.error("Payment error:", error);
        setSubmitting(false);
      });
  };

  // Loading animation component
  const LoadingAnimation = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute flex items-center justify-center bg-white rounded-full shadow-md inset-2">
          <FaShoppingCart className="w-6 h-6 text-blue-600 animate-pulse" />
        </div>
      </div>
      <p className="mt-4 font-medium text-gray-700 animate-pulse">Loading product details...</p>
    </div>
  );

  if (isLoading) return <LoadingAnimation />;
  if (isError) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 text-center bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-red-600">Error loading product</h2>
        <p className="mb-4 text-gray-600">Sorry, we couldn't load the product details. Please try again.</p>
        <Link to="/" className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 pb-12 bg-gray-50 md:mt-10 pt-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to={`/product/${id}`} 
            className="inline-flex items-center mb-4 text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="mr-2" />
            Back to Product
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          <p className="mt-2 text-gray-600">Complete your purchase securely</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Product Summary */}
          <div className="lg:w-2/5">
            <div className="sticky p-6 bg-white shadow-md rounded-xl top-32">
              <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-800">
                <FaShoppingCart className="mr-2 text-green-600" />
                Order Summary
              </h2>
              
              <div className="flex items-center p-4 mb-6 space-x-4 rounded-lg bg-gray-50">
                <img 
                  src={product?.image} 
                  alt={product?.name} 
                  className="object-contain w-20 h-20 rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 line-clamp-2">{product?.name}</h3>
                  <p className="text-lg font-bold text-green-600">৳{Number(product?.price).toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-4 space-y-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">৳{Number(product?.price).toLocaleString()}</span>
                </div>
                
                {/* Quantity Field in Summary */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Quantity</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <input
                      {...register("quantity", { 
                        required: "Quantity is required",
                        min: { value: 1, message: "Minimum quantity is 1" },
                        max: { value: 10, message: "Maximum quantity is 10" },
                        valueAsNumber: true
                      })}
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="1"
                      className="w-16 py-1 text-center border-0 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between pt-3 text-lg font-bold border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-green-700">৳{Number(totalPrice).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center mt-6 text-sm text-gray-500">
                <FaLock className="mr-2 text-green-600" />
                <span>Your payment is secure and encrypted</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-md rounded-xl md:p-8" noValidate>
              <h2 className="flex items-center mb-6 text-xl font-semibold text-gray-800">
                <FaUser className="mr-2 text-blue-600" />
                Customer Information
              </h2>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Full Name *</label>
                  <div className="relative">
                    <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      {...register("name", { 
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters"
                        }
                      })}
                      placeholder="Enter your full name"
                      className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Email Address *</label>
                  <div className="relative">
                    <FaEnvelope className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Street Address *</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        {...register("street", { 
                          required: "Street address is required"
                        })}
                        placeholder="Street address"
                        className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">City *</label>
                    <input
                      {...register("city", { 
                        required: "City is required"
                      })}
                      placeholder="City"
                      className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Postal Code</label>
                    <div className="relative">
                      <FaHashtag className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        {...register("postalCode")}
                        placeholder="Postal code"
                        className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Country *</label>
                    <input
                      {...register("country", { 
                        required: "Country is required"
                      })}
                      placeholder="Country"
                      className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>}
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number *</label>
                  <div className="relative">
                    <FaPhone className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      {...register("phone", { 
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9+]{11,15}$/,
                          message: "Please enter a valid phone number"
                        }
                      })}
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                </div>

                {/* Order Date (Hidden but included in form) */}
                <input
                  {...register("orderDate")}
                  type="hidden"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-4 font-semibold text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center ${
                    submitting 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <FaMoneyBillWave className="mr-2" />
                      Pay ৳{Number(totalPrice).toLocaleString()}
                    </>
                  )}
                </button>
              </div>

              <p className="mt-6 text-sm text-center text-gray-500">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrders;