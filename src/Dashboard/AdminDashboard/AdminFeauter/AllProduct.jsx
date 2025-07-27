import React, { useContext, useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

function AllProduct() {
  const loadedProducts = useLoaderData();
  const [products, setProduct] = useState(loadedProducts);
  const { user } = useContext(AuthContext);

  const handleDeleteProduct = (_id) => {
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
        fetch(`https://gadget-zone-server-kappa.vercel.app/products/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Product has been deleted.", "success");
              const remaining = products.filter((p) => p._id !== _id);
              setProduct(remaining);
            }
          });
      }
    });
  };
  
  console.log(products)
  return (
    <div data-theme="dark" className="min-h-screen bg-base-100">
      {/* Navbar */}
      <div className="px-4 shadow navbar bg-base-200 md:px-8">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-blue-500 md:text-2xl">ORYON Admin Panel</h2>
        </div>
        <div className="flex-none">
          <div className="avatar">
            <div className="rounded-full w-9 md:w-10 ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} alt="admin" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 md:p-8">

      {/* Total products  */}
        <div>
          <h1 className="my-4 text-xl">Total Products = {products.length} </h1>
        </div>
        
        {/* Responsive Card Grid for Small Devices */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {products.map((p) => (
            <div
              key={p._id}
              className="flex flex-col gap-2 p-4 rounded-lg shadow bg-base-200"
            >
              <div className="flex items-center gap-4">
                <img
                  src={p.image}
                  alt={p.title}
                  className="object-cover w-16 h-16 rounded"
                />
                <div>
                  <h3 className="font-semibold text-blue-400">{p.title}</h3>
                  <p className="text-sm text-gray-400">${p.price}</p>
                  <p className="text-sm">
                    Quantity: <span className="text-sm">{p.quantity}</span>
                  </p>
                  <span
                    className={`inline-block px-2 py-1 mt-1 rounded text-xs font-medium ${
                      p.status === "In Stock"
                        ? "bg-green-500 text-green-900"
                        : "bg-red-300 text-red-900"
                    }`}
                  >
                    {p.status}
                  </span>
                  <p className="mt-1 text-xs text-gray-400">{p?.time}</p>
                  <p className="mt-1 text-xs text-gray-400">{p?.date}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Link
                  to={`/product/${p._id}`}
                  className="btn btn-sm btn-info"
                  title="View"
                >
                  <FaEye />
                </Link>
                <Link
                  to="/dashboard/editproduct"
                  className="btn btn-sm btn-warning"
                  title="Edit"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDeleteProduct(p._id)}
                  className="btn btn-sm btn-error"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Table View for Large Devices */}
        <div className="hidden mt-8 overflow-x-auto lg:block">
          <table className="table w-full text-sm shadow md:text-base bg-base-200 rounded-xl">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Date & Time</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="object-cover w-12 h-12 rounded"
                    />
                  </td>
                  <td className="font-semibold text-blue-400">{p.title}</td>
                  <td>৳{p.price}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.status === "In Stock"
                          ? "bg-green-600 text-white"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="text-sm">{p.quantity}</td>
                  <td className="text-sm ">{p?.date}</td>
                  <td className="text-sm">{p.time}</td>
                  <td>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Link
                        to={`/product/${p._id}`}
                        className="btn btn-sm btn-info"
                        title="View"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to="/dashboard/editproduct"
                        className="btn btn-sm btn-warning"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        className="btn btn-sm btn-error"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="py-6 text-center text-gray-400">No products found.</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AllProduct;
