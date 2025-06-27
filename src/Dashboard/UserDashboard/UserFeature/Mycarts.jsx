import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

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
  console.log(carts)

  if (isLoading)
    return <span className="loading loading-spinner text-neutral"></span>;
  if (isError)
    return <p className="text-red-500">Something went wrong: {error.message}</p>;

  const totalPrice = carts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="max-w-6xl px-4 py-6 mx-auto">
      <h2 className="mb-6 text-xl font-bold text-center md:text-3xl">
        My Cart Items
      </h2>

      <div className="overflow-x-auto border rounded-lg shadow-sm border-base-content/10 bg-base-100">
        <table className="table w-full text-sm md:text-base">
          <thead className="text-gray-700 bg-gray-100">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="w-10 h-10 md:w-12 md:h-12 mask mask-squircle">
                    <img src={item.image} alt={item.title} className="object-cover" />
                  </div>
                </td>
                <td>{item.title}</td>
                <td>৳ {item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button>
                    <MdDelete color="red" size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {carts.length === 0 && (
          <p className="py-4 text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {carts.length > 0 && (
        <div className="flex flex-col items-center gap-4 mt-6 md:flex-row md:justify-between">
          <p className="text-lg font-semibold text-gray-700">
            Total Price: <span className="text-green-600">৳ {totalPrice}</span>
          </p>
          <Link
            to={`/checkout/checkoders/${carts[0]._id}`}
            className="px-6 py-2 text-sm font-medium text-white transition bg-green-600 rounded-md hover:bg-green-700"
          >
            Buy Now
          </Link>
        </div>
      )}
    </section>
  );
};

export default Mycarts;
