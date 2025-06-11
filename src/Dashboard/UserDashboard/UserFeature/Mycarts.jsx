import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";

const Mycarts = () => {
  const { user } = useContext(AuthContext);

  const {
    isLoading,
    error,
    isError,
    data: carts = [],
  } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !!user?.email, // এখানে ছিল ভুল: !user?.email → ঠিক করে দিয়েছি
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

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Cart Items</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
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
                <td> {item.status}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {carts.length === 0 && (
          <p className="text-center py-4">Your cart is empty.</p>
        )}
      </div>
    </section>
  );
};

export default Mycarts;
