import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/UseAxiosPublic";
import { motion } from "framer-motion";
import { MdOutlineShoppingCart } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";

const ProductDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    isError,
    isLoading,
    data: product = {},
  } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      return res.data[0];
    },
    enabled: !!id,
  });

  const handleBuyNow = () => {
    if (!user) {
      toast.warning("Please login to proceed with purchase");
      return;
    }
    navigate(`/checkout/checkoders/${product?._id}`);
  };

  const handleCart = async () => {
    if (!user) {
      toast.warning("Please login to add to cart");
      return;
    }

    const cartItems = {
      productId: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      userEmail: user.email,
      status: "pending",
      quantity: 1,
    };

    try {
      const res = await axiosPublic.post("/cart", cartItems);
      const data = res.data;

      if (data.acknowledged) {
        toast.success("Product added to cart!");
      } else if (data.message === "Product already in cart") {
        toast.warning("This product is already in your cart.");
      } else {
        toast.error(data.message || "Failed to add to cart.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          We couldn’t load your products right now. Please check your internet
          connection or try again.
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
    <div className="max-w-6xl px-4 py-5 mx-auto mt-28">
      <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product?.image}
            alt={product?.model}
            className="shadow-lg rounded-xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-bold md:text-2xl lg:text-3xl text-primary">
            {product?.title}
          </h1>

          <div className="mt-4 space-y-2">
            <div className="flex gap-2">
              <p className="text-sm text-gray-900 border btn rounded-2xl">
                Brand : {product.brand}
              </p>
              {product?.product_code ? (
                <p className="text-sm text-gray-900 border btn rounded-2xl">
                  Product Code : {product?.product_code}
                </p>
              ) : (
                ""
              )}
            </div>
            <p className="text-xl font-bold text-green-600">
              Discount Price: ৳{product?.price}
            </p>
            <p className="text-gray-400 line-through">
              Old Price: ৳{product?.regular_price}
            </p>
            <p className="text-lg">
              Regular Price:{" "}
              <span className="font-semibold text-neutral">
                ৳{product?.regular_price}
              </span>
            </p>
            <p className="text-sm text-success">
              Status:{" "}
              {product.status == "In Stock" ? (
                <span className="">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
            {/* <p className="text-sm text-gray-400">Product Code: {product?.productCode}</p> */}
            <div>
              <h1 className="text-xl">Key Feature</h1>
              <div>
                {product.key_features.map((feat) => (
                  <p className="pb-1 text-gray-600">{feat}</p>
                ))}
              </div>
            </div>
          </div>

          <motion.button
            onClick={handleBuyNow}
            whileTap={{ scale: 0.95 }}
            className="mt-6 btn btn-primary"
          >
            Buy Now
          </motion.button>

          <motion.button
            onClick={handleCart}
            whileTap={{ scale: 0.95 }}
            className="mt-6 ml-4 btn btn-primary"
          >
            <MdOutlineShoppingCart size={20} />
            Add to cart
          </motion.button>
        </motion.div>
      </div>
      {/* Countdown Timer Section */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="mb-2 text-lg font-semibold text-red-500">
          Discount Offer Ends In
        </p>
        <div className="flex justify-center gap-4 text-xl font-bold">
          <div className="px-4 py-2 text-white bg-neutral rounded-xl">
            <span>{timeLeft.days}</span>
            <p className="text-sm">Days</p>
          </div>
          <div className="px-4 py-2 text-white bg-neutral rounded-xl">
            <span>{timeLeft.hours}</span>
            <p className="text-sm">Hours</p>
          </div>
          <div className="px-4 py-2 text-white bg-neutral rounded-xl">
            <span>{timeLeft.minutes}</span>
            <p className="text-sm">Minutes</p>
          </div>
          <div className="px-4 py-2 text-white bg-neutral rounded-xl">
            <span>{timeLeft.seconds}</span>
            <p className="text-sm">Seconds</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
