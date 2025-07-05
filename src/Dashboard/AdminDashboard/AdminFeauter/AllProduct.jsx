import React, { useContext, useState } from "react";
import {
  FaBox,
  FaUser,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaBars,
} from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

function AllProduct() {

  const loadedProducts = useLoaderData()

  const [products, setProduct] = useState(loadedProducts)
  const { user } = useContext(AuthContext)

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

  return (
    <div data-theme="dark" className="min-h-screen drawer lg:drawer-open">
      {/* Drawer Toggle for Mobile */}
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        {/* Navbar */}
        <div className="w-full navbar bg-base-200 ">

          <div className="flex-1">
            <h2 className="text-xl font-bold">ORYON Admin</h2>
          </div>
          <div className="flex-none">
            <div className="avatar">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 space-y-6">
          {/* Cards */}

          {/* Product Table */}
          <div className="overflow-x-auto rounded-lg shadow bg-base-200">
            <table className="table w-full table-zebra">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Added</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, idx) => (
                  <tr key={p._id}>
                    <td>
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded" />
                    </td>
                    <td>{p.title}</td>
                    <td>{p.price}</td>
                    <td>{p.status == 'In Stock' ? "True" : "False"}</td>
                    <td>{p?.time}</td>
                    <td className="flex flex-wrap justify-center gap-2">
                      <Link to={`/product/${p._id}`} className="btn btn-sm btn-info"><FaEye /></Link>
                      <Link to='/dashboard/editproduct' className="btn btn-sm btn-warning"><FaEdit /></Link>
                      <button onClick={() => handleDeleteProduct(p._id)} className="btn btn-sm btn-error"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Sidebar */}
      {/* <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <aside className="w-64 p-4 bg-base-200">
          <h2 className="mb-6 text-2xl font-bold text-primary">ORYON</h2>
          <ul className="menu">
            <li><a><FaBox /> Products</a></li>
            <li><a><FaShoppingCart /> Orders</a></li>
            <li><a><FaUser /> Users</a></li>
            <li><a><FaCog /> Settings</a></li>
            <li className="text-red-500"><a><FaSignOutAlt /> Logout</a></li>
          </ul>
        </aside>
      </div> */}
    </div>
  );
}

export default AllProduct;
