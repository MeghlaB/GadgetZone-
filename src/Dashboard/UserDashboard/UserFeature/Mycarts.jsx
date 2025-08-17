
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

const Mycarts = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, isError, data: carts = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://gadget-zone-server-kappa.vercel.app/carts?email=${user?.email}`
      );
      return res.data;
    },
  });


  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`https://gadget-zone-server-kappa.vercel.app/carts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });

  const totalPrice = carts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://gadget-zone-server-ashy.vercel.app/deleteCart/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              Swal.fire("Deleted!", "Item has been deleted.", "success");
              // Update UI after deletion, e.g., remove from cart state
              setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
            } else {
              Swal.fire("Failed!", data.message || "Failed to delete item.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };


  const handleQuantityChange = async (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    await axios.patch(`https://gadget-zone-server-kappa.vercel.app/carts/${item._id}`, {
      quantity: newQuantity,
    });
    queryClient.invalidateQueries(["carts"]);
  };



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
    <section className="max-w-6xl px-4 py-6 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center">My Shopping Cart</h2>

      {carts.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center text-gray-500">
          <FaShoppingCart size={48} className="mb-4" />
          <p className="text-lg">Your cart is empty.</p>
          <Link
            to="/"
            className="px-5 py-2 mt-6 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 md:col-span-2">
            {carts.map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-center justify-between p-4 bg-white border rounded-lg shadow-sm md:flex-row"
              >
                <div className="flex items-center w-full gap-4 md:w-2/3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-20 h-20 border rounded-md"
                  />
                  <div>
                    <Link to={`/product/${item.productId}`}><h3 className="font-semibold text-blue-500 text-md">{item.title}</h3></Link>
                    <p className="text-sm text-gray-500">৳ {item.price} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end w-full gap-2 mt-4 md:mt-0 md:w-auto">
                  <p className="font-semibold text-gray-800 text-md">
                    ৳ {item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove from cart"
                  >
                    <MdDelete size={25} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="sticky p-5 bg-gray-100 rounded-lg shadow-md top-24 h-fit">
            <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Total Items</span>
              <span>{carts.length}</span>
            </div>
            <div className="flex justify-between pt-4 text-xl font-semibold border-t">
              <span>Total Price</span>
              <span className="text-green-600">৳ {totalPrice}</span>
            </div>
            <Link
              to={`/checkout/checkoders/${carts[0]._id}`}
              className="block w-full py-2 mt-6 text-center text-white transition bg-green-600 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Mycarts;
