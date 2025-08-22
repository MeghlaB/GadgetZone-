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
  FaShoppingCart,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaBoxOpen,
  FaEdit,
  FaSort,
  FaSortUp,
  FaSortDown
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
  const [editingOrder, setEditingOrder] = useState(null);
  const ordersPerPage = 10;

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://gadgetzone-server.onrender.com/orders");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
    //   console.log(data)
      setOrders(data);
      setTotalOrders(data.length);
      setTotalPages(Math.ceil(data.length / ordersPerPage));
      
      // Calculate stats
      calculateStats(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire("Error!", "Failed to load orders.", "error");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics from orders data
  const calculateStats = (ordersData) => {
    const totalOrders = ordersData.length;
    const paidOrders = ordersData.filter(order => order.paidStatus).length;
    const unpaidOrders = totalOrders - paidOrders;
    const totalRevenue = ordersData
      .filter(order => order.paidStatus)
      .reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    
    setStats({
      totalOrders,
      paidOrders,
      unpaidOrders,
      totalRevenue: totalRevenue.toFixed(2)
    });
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => 
        (order._id && order._id.toLowerCase().includes(term)) ||
        (order.customerName && order.customerName.toLowerCase().includes(term)) ||
        (order.customerEmail && order.customerEmail.toLowerCase().includes(term)) ||
        (order.productName && order.productName.toLowerCase().includes(term)) ||
        (order.transactionId && order.transactionId.toLowerCase().includes(term))
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(order => 
        statusFilter === "paid" ? order.paidStatus : !order.paidStatus
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        // Handle nested properties
        const aValue = sortConfig.key.includes('.') 
          ? sortConfig.key.split('.').reduce((obj, key) => obj && obj[key], a)
          : a[sortConfig.key];
        
        const bValue = sortConfig.key.includes('.') 
          ? sortConfig.key.split('.').reduce((obj, key) => obj && obj[key], b)
          : b[sortConfig.key];
        
        // Compare values
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    
    // Update total count
    setTotalOrders(result.length);
    setTotalPages(Math.ceil(result.length / ordersPerPage));
    
    return result;
  }, [orders, searchTerm, statusFilter, sortConfig]);

  // Get current page orders
  const currentOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return filteredAndSortedOrders.slice(startIndex, startIndex + ordersPerPage);
  }, [filteredAndSortedOrders, currentPage]);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`https://gadgetzone-server.onrender.com/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paidStatus: newStatus }),
      });
      
      if (response.ok) {
        // Update local state
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, paidStatus: newStatus } : order
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
          const response = await fetch(`https://gadgetzone-server.onrender.com/orders/${orderId}`, { 
            method: "DELETE" 
          });
          
          if (response.ok) {
            // Update local state
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
      title: `Order Details - ${order._id}`,
      html: `
        <div class="text-left">
          <div class="mb-4 p-3 bg-gray-100 rounded-lg">
            <h3 class="font-bold text-lg mb-2">Customer Information</h3>
            <p><strong>Name:</strong> ${order.customerName || "N/A"}</p>
            <p><strong>Email:</strong> ${order.customerEmail || "N/A"}</p>
            <p><strong>Phone:</strong> ${order.phone || "N/A"}</p>
          </div>
          
          <div class="mb-4 p-3 bg-gray-100 rounded-lg">
            <h3 class="font-bold text-lg mb-2">Product Information</h3>
            <p><strong>Product:</strong> ${order.product.category || "N/A"}</p>
            <p><strong>Quantity:</strong> ${order.quantity || "N/A"}</p>
            <p><strong>Total Price:</strong> ৳${order.totalPrice || "N/A"}</p>
          </div>
          
          <div class="mb-4 p-3 bg-gray-100 rounded-lg">
            <h3 class="font-bold text-lg mb-2">Shipping Address</h3>
            <p><strong>Street:</strong> ${order.shippingAddress?.street || "N/A"}</p>
            <p><strong>City:</strong> ${order.shippingAddress?.city || "N/A"}</p>
            <p><strong>Country:</strong> ${order.shippingAddress?.country || "N/A"}</p>
          </div>
          
          <div class="p-3 bg-gray-100 rounded-lg">
            <h3 class="font-bold text-lg mb-2">Order Information</h3>
            <p><strong>Transaction ID:</strong> ${order.tranjectionId || "N/A"}</p>
            <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString() || "N/A"}</p>
            <p><strong>Status:</strong> <span class="${order.paidStatus ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}">${order.paidStatus ? "Paid" : "Unpaid"}</span></p>
          </div>
        </div>
      `,
      confirmButtonColor: "#3085d6",
      width: "600px",
    });
  };

  // Render sort icon
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="ml-1 opacity-50" size={12} />;
    if (sortConfig.direction === "ascending") return <FaSortUp className="ml-1" size={12} />;
    return <FaSortDown className="ml-1" size={12} />;
  };

  // Pagination controls
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Get displayed pages for pagination
  const getDisplayedPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }
    
    rangeWithDots.push(...range);
    
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }
    
    return rangeWithDots;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaShoppingCart className="text-blue-600" size={20} />
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
              <FaMoneyBillWave className="text-purple-600" size={20} />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-800">৳{stats.totalRevenue}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders by ID, customer, product, or transaction ID..."
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
              {totalOrders} orders found
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  onClick={() => handleSort("_id")} 
                  className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase cursor-pointer sm:px-6"
                >
                  <div className="flex items-center">
                    Order ID {renderSortIcon("_id")}
                  </div>
                </th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase sm:px-6">
                  Customer
                </th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase sm:px-6">
                  Product
                </th>
                <th 
                  onClick={() => handleSort("totalPrice")} 
                  className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase cursor-pointer sm:px-6"
                >
                  <div className="flex items-center">
                    Amount {renderSortIcon("totalPrice")}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort("paidStatus")} 
                  className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase cursor-pointer sm:px-6"
                >
                  <div className="flex items-center">
                    Status {renderSortIcon("paidStatus")}
                  </div>
                </th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase sm:px-6">
                  Date
                </th>
                <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase sm:px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center sm:px-6">
                    <div className="flex flex-col items-center justify-center">
                      <FaBoxOpen className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-gray-500">No orders found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                      <div className="text-sm font-medium text-gray-900">
                        {order._id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.transactionId || "No transaction ID"}
                      </div>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customerName || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customerEmail || "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <div className="text-sm font-medium text-gray-900">
                        {order.product.category|| "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        Qty: {order.quantity || "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                      <div className="text-sm font-medium text-gray-900">
                        ৳{order.totalPrice || "0.00"}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.paidStatus 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.paidStatus ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap sm:px-6">
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap sm:px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => viewOrderDetails(order)}
                          className="p-2 text-blue-600 rounded-full hover:text-blue-900 hover:bg-blue-100"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order._id, !order.paidStatus)}
                          className={`p-2 rounded-full ${
                            order.paidStatus
                              ? "text-red-600 hover:text-red-900 hover:bg-red-100"
                              : "text-green-600 hover:text-green-900 hover:bg-green-100"
                          }`}
                          title={order.paidStatus ? "Mark as Unpaid" : "Mark as Paid"}
                        >
                          {order.paidStatus ? <FaTimes /> : <FaCheck />}
                        </button>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="p-2 text-red-600 rounded-full hover:text-red-900 hover:bg-red-100"
                          title="Delete Order"
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
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * ordersPerPage + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(currentPage * ordersPerPage, totalOrders)}
              </span> of{" "}
              <span className="font-medium">{totalOrders}</span> results
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <FaChevronLeft className="inline-block mr-1" /> Previous
              </button>
              
              {getDisplayedPages().map((page, idx) =>
                page === "..." ? (
                  <span key={idx} className="px-3 py-1 text-sm font-medium text-gray-700">
                    ...
                  </span>
                ) : (
                  <button
                    key={idx}
                    onClick={() => paginate(page)}
                    className={`px-3 py-1 text-sm font-medium border rounded-md ${
                      page === currentPage
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                Next <FaChevronRight className="inline-block ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;