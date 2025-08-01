import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

function AllUsers() {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDeleteUser = (_id) => {
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
                fetch(`https://gadget-zone-server-kappa.vercel.app/users/${_id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "User has been deleted.", "success");
                            setUsers((prevUsers) => prevUsers.filter((u) => u._id !== _id));
                        }
                    });
            }
        });
    };

    return (
        <div className="flex flex-col items-center min-h-screen px-2 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-8 bg-gray-50">
            <h1 className="mb-4 text-xl font-extrabold text-center text-gray-900 xs:text-2xl sm:text-3xl lg:text-4xl">
                All Users
            </h1>

            <div className="w-full max-w-[96rem] bg-white rounded-lg shadow-xl overflow-hidden">
                {/* Card layout for small screens */}
                <div className="md:hidden">
                    {users.length === 0 ? (
                        <div className="p-4 text-sm text-center text-gray-500 xs:text-base">
                            No users found.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <div key={user._id} className="p-3 xs:p-4">
                                    <div className="flex items-center space-x-3 xs:space-x-4">
                                        <img
                                            src={user.photo}
                                            alt={user.name}
                                            className="flex-shrink-0 object-cover w-10 h-10 border-2 border-gray-300 rounded-full shadow-sm xs:w-12 xs:h-12"
                                            loading="lazy"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate xs:text-base">
                                                {index + 1}. {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate xs:text-sm">
                                                {user.email}
                                            </p>
                                            <div className="flex items-center mt-1 space-x-2">
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-xs xs:text-sm font-semibold ${
                                                        user.role === "admin"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-green-100 text-green-800"
                                                    }`}
                                                >
                                                    {user.role}
                                                </span>
                                                <span className="text-xs text-gray-500 capitalize xs:text-sm">
                                                    {user.status}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="p-2 text-red-600 transition-all duration-200 rounded-full hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                            title="Delete User"
                                            aria-label={`Delete user ${user.name}`}
                                        >
                                            <FaTrash className="w-4 h-4 xs:w-5 xs:h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Table layout for medium and larger screens */}
                <div className="hidden w-full overflow-x-auto md:block">
                    <table className="min-w-full text-sm border-collapse">
                        <thead className="text-xs font-semibold tracking-wider text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6">#</th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6">Photo</th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6">Name</th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6">Email</th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6">Role</th>
                                <th className="px-3 py-2 sm:px-4 sm:py-3 md:px-6">Status</th>
                                <th className="px-3 py-2 text-center sm:px-4 sm:py-3 md:px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="transition-colors duration-200 border-t border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6">
                                        <img
                                            src={user.photo}
                                            alt={user.name}
                                            className="object-cover w-8 h-8 border-2 border-gray-300 rounded-full shadow-sm sm:w-10 sm:h-10 md:w-12 md:h-12"
                                            loading="lazy"
                                        />
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 font-medium text-gray-800 whitespace-nowrap truncate max-w-[150px] sm:max-w-[200px]">
                                        {user.name}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 text-gray-600 whitespace-nowrap truncate max-w-[150px] sm:max-w-[250px]">
                                        {user.email}
                                    </td>
                                    <td className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                                                user.role === "admin"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-gray-600 capitalize sm:px-4 sm:py-3 md:px-6 whitespace-nowrap">
                                        {user.status}
                                    </td>
                                    <td className="px-3 py-2 text-center sm:px-4 sm:py-3 md:px-6">
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="p-2 text-red-600 transition-all duration-200 rounded-full hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                            title="Delete User"
                                            aria-label={`Delete user ${user.name}`}
                                        >
                                            <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && (
                        <div className="p-6 text-sm text-center text-gray-500 sm:text-base">
                            No users found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllUsers;