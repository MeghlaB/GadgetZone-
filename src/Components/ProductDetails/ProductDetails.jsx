import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
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
  console.log(user)

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

  const handleCart = async () => {
    if (!user) {
      toast.error("Please login to Add to cart");

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
            const res = await axiosPublic.post('/cart', cartItems);
            if (res.data.insertedId) {
                toast.success("Product added to cart!");
            } else {
                toast.error("Failed to add to cart.");
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        }
  };

  if (isLoading)
    return (
      <div className="text-center mt-32 text-xl font-semibold">Loading...</div>
    );
  if (isError)
    return (
      <div className="text-center mt-32 text-red-500">
        Error loading product
      </div>
    );

  return (
    <div className="mt-28 max-w-6xl mx-auto px-4 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product?.image}
            alt={product?.model}
            className="rounded-xl shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold text-primary">
            {product?.title}
          </h1>

          {/* <div className="my-4">
                        <p><span className="font-semibold">Display:</span> {product?.display}</p>
                        <p><span className="font-semibold">Ports:</span> {product?.ports}</p>
                        <p><span className="font-semibold">Features:</span> {product?.features}</p>
                    </div> */}

          <div className="mt-4 space-y-2">
            <div className="flex gap-2">
              <p className="border btn text-gray-900 text-sm rounded-2xl">
                Brand : {product.brand}
              </p>
              {product?.product_code ? (
                <p className="border btn text-gray-900 text-sm rounded-2xl">
                  Product Code : {product?.product_code}
                </p>
              ) : (
                ""
              )}
            </div>
            <p className="text-xl font-bold text-green-600">
              Discount Price: ৳{product?.price}
            </p>
            <p className="line-through text-gray-400">
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
                  <p className="text-gray-600 pb-1">{feat}</p>
                ))}
              </div>
            </div>
          </div>

          <Link to={`/checkout/checkoders/${product._id}`}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary mt-6"
            >
              Buy Now
            </motion.button>
          </Link>
          <motion.button
          onClick={handleCart}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary mt-6 ml-4"
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
        <p className="text-lg font-semibold text-red-500 mb-2">
          Discount Offer Ends In
        </p>
        <div className="flex justify-center gap-4 text-xl font-bold">
          <div className="bg-neutral text-white rounded-xl px-4 py-2">
            <span>00</span>
            <p className="text-sm">Days</p>
          </div>
          <div className="bg-neutral text-white rounded-xl px-4 py-2">
            <span>07</span>
            <p className="text-sm">Hours</p>
          </div>
          <div className="bg-neutral text-white rounded-xl px-4 py-2">
            <span>29</span>
            <p className="text-sm">Minutes</p>
          </div>
          <div className="bg-neutral text-white rounded-xl px-4 py-2">
            <span>12</span>
            <p className="text-sm">Seconds</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
