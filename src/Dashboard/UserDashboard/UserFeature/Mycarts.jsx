import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const Mycarts = () => {
  const { user } = useContext(AuthContext);

  const {
    isLoading,
    error,
    isError,
    data: carts = [],
  } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/carts?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading)
    return <span className="loading loading-spinner text-neutral"></span>;
  if (isError)
    return <p className="text-red-500">Something went wrong: {error.message}</p>;

  const totalPrice = carts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Cart Items</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={item.image} alt={item.title} />
                  </div>
                </td>
                <td>{item.title}</td>
                <td>৳ {item.price}</td>
                <td>{item.status}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {carts.length === 0 && (
          <p className="text-center py-4">Your cart is empty.</p>
        )}
      </div>

    
      {carts.length > 0 && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-lg font-semibold text-gray-700">
            Total Price: <span className="text-green-600">৳ {totalPrice}</span>
          </p>
          <Link
            to={`/checkout/checkoders/${carts[0]._id}`} 
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
          >
            Buy Now
          </Link>
        </div>
      )}
    </section>
  );
};

export default Mycarts;
