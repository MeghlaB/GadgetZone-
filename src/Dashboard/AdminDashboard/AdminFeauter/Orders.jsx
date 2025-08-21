import React, { useState, useEffect } from "react";
import { FaEye, FaCheck, FaTimes, FaTrash, FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 40;

    // Fetch orders from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:5000/orders");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setOrders(Array.isArray(data) ? data : []);
                setFilteredOrders(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching orders:", error);
                Swal.fire("Error!", "Failed to load orders.", "error");
                setOrders([]);
                setFilteredOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Safe value access with fallbacks
    const safeToString = (value, fallback = '') => {
        if (value === null || value === undefined) return fallback;
        return String(value);
    };

    // Handle sorting
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Apply sorting and filtering
    useEffect(() => {
        let result = [...orders];

        // Apply search filter with safe value access
        if (searchTerm) {
            const searchTermLower = searchTerm.toLowerCase();
            result = result.filter(order => {
                const productTitle = safeToString(order.product?.title).toLowerCase();
                const orderId = safeToString(order._id).toLowerCase();
                const transactionId = safeToString(order.transjectionId).toLowerCase();

                return (
                    productTitle.includes(searchTermLower) ||
                    orderId.includes(searchTermLower) ||
                    transactionId.includes(searchTermLower)
                );
            });
        }

        // Apply status filter
        if (statusFilter !== "all") {
            result = result.filter(order => {
                if (statusFilter === "paid") return order.paidStatus === true;
                if (statusFilter === "unpaid") return order.paidStatus === false;
                return true;
            });
        }

        // Apply sorting with safe value access
        if (sortConfig.key) {
            result.sort((a, b) => {
                let aValue, bValue;

                if (sortConfig.key.includes('.')) {
                    // Handle nested properties like 'product.price'
                    const keys = sortConfig.key.split('.');
                    aValue = a[keys[0]]?.[keys[1]] || '';
                    bValue = b[keys[0]]?.[keys[1]] || '';
                } else {
                    aValue = a[sortConfig.key] || '';
                    bValue = b[sortConfig.key] || '';
                }

                // Convert to string for consistent comparison
                aValue = safeToString(aValue);
                bValue = safeToString(bValue);

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredOrders(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [orders, searchTerm, statusFilter, sortConfig]);

    // Get current orders for pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Update order status
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ paidStatus: newStatus }),
            });

            if (response.ok) {
                const updatedOrder = await response.json();
                setOrders(orders.map(order =>
                    order._id === orderId ? updatedOrder : order
                ));
                Swal.fire("Success!", `Order marked as ${newStatus ? "paid" : "unpaid"}.`, "success");
            } else {
                throw new Error("Failed to update order");
            }
        } catch (error) {
            console.error("Error updating order:", error);
            Swal.fire("Error!", "Failed to update order status.", "error");
        }
    };

    // Delete order
    const deleteOrder = (orderId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        setOrders(orders.filter(order => order._id !== orderId));
                        Swal.fire("Deleted!", "Order has been deleted.", "success");
                    } else {
                        throw new Error("Failed to delete order");
                    }
                } catch (error) {
                    console.error("Error deleting order:", error);
                    Swal.fire("Error!", "Failed to delete order.", "error");
                }
            }
        });
    };

    // View order details
    const viewOrderDetails = (order) => {
        Swal.fire({
            title: `Order Details - ${order._id || 'N/A'}`,
            html: `
        <div class="text-left">
          <div class="mb-3">
            <strong>Product:</strong> ${order.product?.title || 'N/A'}<br>
            <strong>Category:</strong> ${order.product?.category || 'N/A'}<br>
            <strong>Price:</strong> ₹${order.product?.price || 'N/A'}<br>
            <strong>Quantity:</strong> ${order.product?.quantity || 'N/A'}
          </div>
          <div class="mb-3">
            <strong>Transaction ID:</strong> ${order.transjectionId || 'N/A'}<br>
            <strong>Payment Status:</strong> ${order.paidStatus ?
                    '<span class="text-green-600 font-bold">Paid</span>' :
                    '<span class="text-red-600 font-bold">Unpaid</span>'}
          </div>
          <div>
            <strong>Key Features:</strong>
            <ul class="list-disc pl-5 mt-1">
              ${(order.product?.key_features || []).map(feature => `<li>${feature}</li>`).join('') || '<li>No features listed</li>'}
            </ul>
          </div>
        </div>
      `,
            confirmButtonColor: "#3085d6",
            width: '600px'
        });
    };

    // Render sort icon
    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaFilter className="ml-1 opacity-50" size={12} />;
        if (sortConfig.direction === 'ascending') return <FaFilter className="ml-1 transform rotate-180" size={12} />;
        return <FaFilter className="ml-1" size={12} />;
    };

    // Generate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Display limited page numbers with ellipsis
    const getDisplayedPages = () => {
        if (totalPages <= 7) {
            return pageNumbers;
        }

        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
                <p className="text-gray-600">Manage and track customer orders</p>
            </div>

            <div className="overflow-hidden bg-white rounded-lg shadow-md">
                {/* Filters and Search */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by product, order ID, or transaction ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center">
                                <label htmlFor="status-filter" className="mr-2 text-sm font-medium text-gray-700">
                                    Status:
                                </label>
                                <select
                                    id="status-filter"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All</option>
                                    <option value="paid">Paid</option>
                                    <option value="unpaid">Unpaid</option>
                                </select>
                            </div>

                            <div className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md">
                                {filteredOrders.length} orders found
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer sm:px-6"
                                    onClick={() => handleSort('_id')}
                                >
                                    <div className="flex items-center">
                                        Order ID
                                        {renderSortIcon('_id')}
                                    </div>
                                </th>
                                <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                                    Product
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer sm:px-6"
                                    onClick={() => handleSort('product.price')}
                                >
                                    <div className="flex items-center">
                                        Price
                                        {renderSortIcon('product.price')}
                                    </div>
                                </th>
                                <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                                    Quantity
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer sm:px-6"
                                    onClick={() => handleSort('paidStatus')}
                                >
                                    <div className="flex items-center">
                                        Status
                                        {renderSortIcon('paidStatus')}
                                    </div>
                                </th>
                                <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                                    Transaction ID
                                </th>
                                <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-4 py-4 text-center sm:px-6">
                                        <div className="flex flex-col items-center justify-center py-8">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                            </svg>
                                            <p className="mt-4 text-gray-500">No orders found</p>
                                            {searchTerm && (
                                                <button
                                                    onClick={() => setSearchTerm("")}
                                                    className="mt-2 text-blue-600 hover:text-blue-800"
                                                >
                                                    Clear search
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentOrders.map((order) => (
                                    <tr key={order._id || Math.random()} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                            <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-[150px]">
                                                {order._id || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="object-cover w-10 h-10 rounded-md"
                                                        src={order.product?.image || "https://via.placeholder.com/40?text=No+Image"}
                                                        alt={order.product?.title || 'Product'}
                                                        onError={(e) => {
                                                            e.target.src = "https://via.placeholder.com/40?text=Image";
                                                        }}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-[200px]">
                                                        {order.product?.title || 'Unknown Product'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{order.product?.category || 'N/A'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                            <div className="text-sm text-gray-900">₹{order.product?.price || 'N/A'}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                            <div className="text-sm text-gray-900">{order.product?.quantity || 'N/A'}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.paidStatus
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {order.paidStatus ? "Paid" : "Unpaid"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[100px] sm:max-w-[150px]">
                                            {order.transjectionId || 'N/A'}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap sm:px-6">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => viewOrderDetails(order)}
                                                    className="p-1 text-blue-600 rounded-full hover:text-blue-900 hover:bg-blue-50"
                                                    title="View Details"
                                                >
                                                    <FaEye size={16} />
                                                </button>
                                                {!order.paidStatus && (
                                                    <button
                                                        onClick={() => updateOrderStatus(order._id, true)}
                                                        className="p-1 text-green-600 rounded-full hover:text-green-900 hover:bg-green-50"
                                                        title="Mark as Paid"
                                                    >
                                                        <FaCheck size={16} />
                                                    </button>
                                                )}
                                                {order.paidStatus && (
                                                    <button
                                                        onClick={() => updateOrderStatus(order._id, false)}
                                                        className="p-1 text-yellow-600 rounded-full hover:text-yellow-900 hover:bg-yellow-50"
                                                        title="Mark as Unpaid"
                                                    >
                                                        <FaTimes size={16} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteOrder(order._id)}
                                                    className="p-1 text-red-600 rounded-full hover:text-red-900 hover:bg-red-50"
                                                    title="Delete Order"
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredOrders.length > ordersPerPage && (
                    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 sm:px-6">
                        <div className="flex flex-col items-center justify-between space-y-3 sm:flex-row sm:space-y-0">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{" "}
                                <span className="font-medium">
                                    {Math.min(indexOfLastOrder, filteredOrders.length)}
                                </span>{" "}
                                of <span className="font-medium">{filteredOrders.length}</span> results
                            </div>

                            <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    <span className="sr-only">Previous</span>
                                    <FaChevronLeft className="w-4 h-4" aria-hidden="true" />
                                </button>

                                {getDisplayedPages().map((pageNumber, index) => (
                                    <React.Fragment key={index}>
                                        {pageNumber === '...' ? (
                                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                                                ...
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => paginate(pageNumber)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNumber
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        )}
                                    </React.Fragment>
                                ))}

                                <button
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    <span className="sr-only">Next</span>
                                    <FaChevronRight className="w-4 h-4" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;