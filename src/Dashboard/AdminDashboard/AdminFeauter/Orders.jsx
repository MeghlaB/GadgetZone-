import React, { useState, useEffect, useMemo } from "react";
import {
  FaEye,
  FaCheck,
  FaTimes,
  FaTrash,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaChartBar,
} from "react-icons/fa";
import Swal from "sweetalert2";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [stats, setStats] = useState(null);
  const ordersPerPage = 40;

  // Fetch orders
  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      let url = `https://gadgetzone-server.onrender.com/orderss?page=${page}&limit=${ordersPerPage}`;
      if (statusFilter !== "all") url += `&status=${statusFilter}`;
      if (searchTerm) url += `&search=${searchTerm}`;

      const response = await fetch(url);
      const data = await response.json();

      setOrders(data.orders || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalOrders(data.pagination?.totalOrders || 0);
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire("Error!", "Failed to load orders.", "error");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch("https://gadgetzone-server.onrender.com/orders-stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Fetch orders on page, filter, search change (debounced)
  useEffect(() => {
    const handler = setTimeout(() => fetchOrders(currentPage), 500);
    return () => clearTimeout(handler);
  }, [currentPage, searchTerm, statusFilter]);

  // Fetch stats only once
  useEffect(() => {
    fetchStats();
  }, []);

  // Safe string conversion
  const safeToString = (value, fallback = "") => (value == null ? fallback : String(value));

  // Sorting handler
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") direction = "descending";
    setSortConfig({ key, direction });
  };

  const sortedOrders = useMemo(() => {
    let result = [...orders];
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue, bValue;

        if (sortConfig.key.includes(".")) {
          const keys = sortConfig.key.split(".");
          aValue = a[keys[0]]?.[keys[1]] ?? "";
          bValue = b[keys[0]]?.[keys[1]] ?? "";
        } else {
          aValue = a[sortConfig.key] ?? "";
          bValue = b[sortConfig.key] ?? "";
        }

        if (sortConfig.key === "product.price") {
          aValue = parseFloat(aValue) || 0;
          bValue = parseFloat(bValue) || 0;
        } else if (sortConfig.key === "paidStatus") {
          aValue = aValue ? 1 : 0;
          bValue = bValue ? 1 : 0;
        } else {
          aValue = safeToString(aValue);
          bValue = safeToString(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [orders, sortConfig]);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`https://gadgetzone-server.onrender.com/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paidStatus: newStatus }),
      });
      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(orders.map((order) => (order._id === orderId ? updatedOrder : order)));
        fetchStats();
        Swal.fire("Success!", `Order marked as ${newStatus ? "paid" : "unpaid"}.`, "success");
      } else throw new Error("Failed to update order");
    } catch (error) {
      console.error("Error updating order:", error);
      Swal.fire("Error!", "Failed to update order status.", "error");
    }
  };

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
          const response = await fetch(`https://gadgetzone-server.onrender.com/orders/${orderId}`, { method: "DELETE" });
          if (response.ok) {
            setOrders(orders.filter((order) => order._id !== orderId));
            fetchStats();
            Swal.fire("Deleted!", "Order has been deleted.", "success");
          } else throw new Error("Failed to delete order");
        } catch (error) {
          console.error("Error deleting order:", error);
          Swal.fire("Error!", "Failed to delete order.", "error");
        }
      }
    });
  };

  const viewOrderDetails = (order) => {
    Swal.fire({
      title: `Order Details - ${order._id || "N/A"}`,
      html: `
        <div class="text-left">
          <div class="mb-3">
            <strong>Product:</strong> ${order.product?.title || "N/A"}<br>
            <strong>Category:</strong> ${order.product?.category || "N/A"}<br>
            <strong>Price:</strong> ৳${order.product?.price || "N/A"}<br>
            <strong>Quantity:</strong> ${order.product?.quantity || "N/A"}
          </div>
          <div class="mb-3">
            <strong>Transaction ID:</strong> ${order.transjectionId || "N/A"}<br>
            <strong>Payment Status:</strong> ${
              order.paidStatus
                ? '<span class="text-green-600 font-bold">Paid</span>'
                : '<span class="text-red-600 font-bold">Unpaid</span>'
            }
          </div>
          <div>
            <strong>Key Features:</strong>
            <ul class="list-disc pl-5 mt-1">
              ${(order.product?.key_features || []).map((f) => `<li>${f}</li>`).join("") ||
                "<li>No features listed</li>"}
            </ul>
          </div>
        </div>
      `,
      confirmButtonColor: "#3085d6",
      width: "600px",
    });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaFilter className="ml-1 opacity-50" size={12} />;
    if (sortConfig.direction === "ascending") return <FaFilter className="ml-1 transform rotate-180" size={12} />;
    return <FaFilter className="ml-1" size={12} />;
  };

  const getDisplayedPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const delta = 2,
      range = [],
      rangeWithDots = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) range.push(i);
    if (currentPage - delta > 2) rangeWithDots.push(1, "...");
    else rangeWithDots.push(1);
    rangeWithDots.push(...range);
    if (currentPage + delta < totalPages - 1) rangeWithDots.push("...", totalPages);
    else if (totalPages > 1) rangeWithDots.push(totalPages);
    return rangeWithDots;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
      {/* Header & Stats */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>

      {stats && (
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaChartBar className="text-blue-600" size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <FaCheck className="text-green-600" size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Paid Orders</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.paidOrders}</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <FaTimes className="text-red-600" size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Unpaid Orders</h3>
              <p className="text-2xl font-bold text-gray-800">{stats.unpaidOrders}</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <FaChartBar className="text-purple-600" size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-800">৳{stats.totalRevenue}</p>
            </div>
          </div>
        </div>
      )}

      {/* Table & Filters */}
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
            <div className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-md">{totalOrders} orders found</div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th onClick={() => handleSort("_id")} className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase cursor-pointer sm:px-6">
                  <div className="flex items-center">Order ID {renderSortIcon("_id")}</div>
                </th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase sm:px-6">Product</th>
                <th onClick={() => handleSort("product.price")} className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase cursor-pointer sm:px-6">
                  <div className="flex items-center">Price {renderSortIcon("product.price")}</div>
                </th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase sm:px-6">Quantity</th>
                <th onClick={() => handleSort("paidStatus")} className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase cursor-pointer sm:px-6">
                  <div className="flex items-center">Status {renderSortIcon("paidStatus")}</div>
                </th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase sm:px-6">Transaction ID</th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center sm:px-6">
                    No orders found
                  </td>
                </tr>
              ) : (
                sortedOrders.map((order) => (
                  <tr key={order._id || Math.random()} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">{order._id || "N/A"}</td>
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="object-cover w-10 h-10 rounded-md"
                            src={order.product?.image || "https://via.placeholder.com/40?text=No+Image"}
                            alt={order.product?.title || "Product"}
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/40?text=Image";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{order.product?.title || "Unknown Product"}</div>
                          <div className="text-sm text-gray-500">{order.product?.category || "N/A"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">৳{order.product?.price || "N/A"}</td>
                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">{order.product?.quantity || "N/A"}</td>
                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.paidStatus ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.paidStatus ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.transjectionId || "N/A"}</td>
                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap sm:px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => viewOrderDetails(order)}
                          className="p-1 text-blue-600 rounded-full hover:text-blue-900 hover:bg-blue-100"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order._id, !order.paidStatus)}
                          className="p-1 text-green-600 rounded-full hover:text-green-900 hover:bg-green-100"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="p-1 text-red-600 rounded-full hover:text-red-900 hover:bg-red-100"
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

        {/* Pagination */}
        <div className="flex items-center justify-center px-4 py-3 mt-4 space-x-2 bg-gray-50 border-t border-gray-200">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <FaChevronLeft className="inline-block mr-1" /> Prev
          </button>

          {getDisplayedPages().map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-2 py-1 text-sm font-medium text-gray-700">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => paginate(page)}
                className={`px-3 py-1 text-sm font-medium border rounded-md ${
                  page === currentPage
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            Next <FaChevronRight className="inline-block ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orders;
