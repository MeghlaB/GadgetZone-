import React, { useContext, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

function AllProduct() {
  const loadedProducts = useLoaderData();
  const [products, setProduct] = useState(loadedProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://gadgetzone-server.onrender.com/products/${_id}`, {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
            <p className="text-sm text-gray-500">Manage your product inventory</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full ring-2 ring-blue-500 ring-offset-2">
                <img src={user?.photoURL} alt="admin" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats and Controls */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <div className="p-5 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600">{products.length}</div>
            <div className="text-sm font-medium text-gray-500">Total Products</div>
          </div>
          
          <div className="p-5 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-green-600">
              {products.filter(p => p.status === "In Stock").length}
            </div>
            <div className="text-sm font-medium text-gray-500">In Stock</div>
          </div>
          
          <div className="p-5 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-red-600">
              {products.filter(p => p.status !== "In Stock").length}
            </div>
            <div className="text-sm font-medium text-gray-500">Out of Stock</div>
          </div>
          
          <div className="p-5 bg-white rounded-lg shadow-sm">
            <Link
              to="/dashboard/addproduct"
              className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <FaPlus className="mr-2" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-5 mb-6 bg-white rounded-lg shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products by name or category..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Kitchen</option>
              </select>
              
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Status</option>
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="grid grid-cols-1 gap-4 mb-6 lg:hidden">
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-lg shadow-sm">
              <div className="mb-2 text-gray-400">
                <FaSearch className="mx-auto text-3xl" />
              </div>
              <p className="font-medium text-gray-600">No products found</p>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p._id}
                className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="object-cover w-16 h-16 rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{p.title}</h3>
                    <p className="text-sm text-gray-500">{p.category}</p>
                    <p className="font-medium text-blue-600">৳{p.price}</p>
                    <div className="flex items-center mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.status === "In Stock"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.status}
                      </span>
                      <span className="ml-3 text-xs text-gray-500">
                        Qty: {p.quantity}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">{p?.date} • {p?.time}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Link
                    to={`/product/${p._id}`}
                    className="p-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
                    title="View"
                  >
                    <FaEye />
                  </Link>
                  <Link
                    to="/dashboard/editproduct"
                    className="p-2 text-yellow-600 bg-yellow-100 rounded-lg hover:bg-yellow-200"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(p._id)}
                    className="p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="overflow-hidden bg-white rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Product</th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Category</th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Price</th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Added</th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center">
                      <div className="mb-2 text-gray-400">
                        <FaSearch className="mx-auto text-3xl" />
                      </div>
                      <p className="font-medium text-gray-600">No products found</p>
                      <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="object-cover w-10 h-10 rounded-md"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{p.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{p.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-600">৳{p.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold leading-5 rounded-full ${
                            p.status === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {p.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <div>{p?.date}</div>
                        <div className="text-xs text-gray-400">{p?.time}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/product/${p._id}`}
                            className="p-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
                            title="View"
                          >
                            <FaEye />
                          </Link>
                          <Link
                            to="/dashboard/editproduct"
                            className="p-2 text-yellow-600 bg-yellow-100 rounded-lg hover:bg-yellow-200"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(p._id)}
                            className="p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AllProduct;