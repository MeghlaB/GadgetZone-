
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import React, { useContext } from "react";
// import { AuthContext } from "../../../Provider/AuthProvider";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { MdDelete } from "react-icons/md";
// import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
// import Swal from "sweetalert2";

// const Mycarts = () => {
//   const { user } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   const { isLoading, error, isError, data: carts = [] } = useQuery({
//     queryKey: ["carts", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axios.get(
//         `https://gadgetzone-server.onrender.com/carts?email=${user?.email}`
//       );
//       return res.data;
//     },
//   });


//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       await axios.delete(`https://gadgetzone-server.onrender.com/carts/${id}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["carts"]);
//     },
//   });

//   const totalPrice = carts.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`https://gadget-zone-server-ashy.vercel.app/deleteCart/${id}`, {
//           method: "DELETE",
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.acknowledged) {
//               Swal.fire("Deleted!", "Item has been deleted.", "success");
//               // Update UI after deletion, e.g., remove from cart state
//               setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
//             } else {
//               Swal.fire("Failed!", data.message || "Failed to delete item.", "error");
//             }
//           })
//           .catch(() => {
//             Swal.fire("Error!", "Something went wrong.", "error");
//           });
//       }
//     });
//   };


//   const handleQuantityChange = async (item, delta) => {
//     const newQuantity = item.quantity + delta;
//     if (newQuantity < 1) return;

//     await axios.patch(`https://gadgetzone-server.onrender.com/carts/${item._id}`, {
//       quantity: newQuantity,
//     });
//     queryClient.invalidateQueries(["carts"]);
//   };



//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//         {/* Outer ring */}
//         <div className="relative w-16 h-16">
//           <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>

//           {/* Inner circuit icon */}
//           <div className="absolute flex items-center justify-center bg-white rounded-full shadow-md inset-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-6 h-6 text-blue-600 animate-pulse"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               {/* Circuit board icon */}
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 4v16m8-8H4m4-6h.01M16 6h.01M16 18h.01M8 18h.01"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Loading text */}
//         <p className="mt-4 font-medium text-gray-700 animate-pulse">
//           Powering up your gadgets...
//         </p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//         {/* Error Icon */}
//         <div className="p-4 bg-red-100 rounded-full shadow-md">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-12 h-12 text-red-600 animate-bounce"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             {/* Broken plug icon (electronics theme) */}
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 3v2m0 14v2m6-6h2m-14 0H4m12.364-7.364l1.414 1.414M6.222 17.778l1.414 1.414m0-12.728L6.222 6.222m10.142 10.142l-1.414 1.414"
//             />
//           </svg>
//         </div>

//         {/* Error Message */}
//         <h2 className="mt-4 text-xl font-bold text-red-600">
//           Oops! Something went wrong.
//         </h2>
//         <p className="max-w-sm mt-2 text-center text-gray-600">
//           We couldn’t load your products right now.
//           Please check your internet connection or try again.
//         </p>

//         {/* Retry Button */}
//         <button
//           onClick={() => window.location.reload()}
//           className="px-5 py-2 mt-6 font-medium text-white bg-red-600 rounded-lg shadow hover:bg-red-700"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }


//   return (
//     <section className="max-w-6xl px-4 py-6 mx-auto">
//       <h2 className="mb-6 text-3xl font-bold text-center">My Shopping Cart</h2>

//       {carts.length === 0 ? (
//         <div className="flex flex-col items-center py-20 text-center text-gray-500">
//           <FaShoppingCart size={48} className="mb-4" />
//           <p className="text-lg">Your cart is empty.</p>
//           <Link
//             to="/"
//             className="px-5 py-2 mt-6 text-white transition bg-blue-600 rounded hover:bg-blue-700"
//           >
//             Shop Now
//           </Link>
//         </div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-3">
//           {/* Cart Items */}
//           <div className="space-y-4 md:col-span-2">
//             {carts.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex flex-col items-center justify-between p-4 bg-white border rounded-lg shadow-sm md:flex-row"
//               >
//                 <div className="flex items-center w-full gap-4 md:w-2/3">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="object-cover w-20 h-20 border rounded-md"
//                   />
//                   <div>
//                     <Link to={`/product/${item.productId}`}><h3 className="font-semibold text-blue-500 text-md">{item.title}</h3></Link>
//                     <p className="text-sm text-gray-500">৳ {item.price} each</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <button
//                         onClick={() => handleQuantityChange(item, -1)}
//                         className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                       >
//                         <FaMinus size={12} />
//                       </button>
//                       <span className="px-3">{item.quantity}</span>
//                       <button
//                         onClick={() => handleQuantityChange(item, 1)}
//                         className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                       >
//                         <FaPlus size={12} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end w-full gap-2 mt-4 md:mt-0 md:w-auto">
//                   <p className="font-semibold text-gray-800 text-md">
//                     ৳ {item.price * item.quantity}
//                   </p>
//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className="text-red-500 hover:text-red-700"
//                     title="Remove from cart"
//                   >
//                     <MdDelete size={25} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Checkout Summary */}
//           <div className="sticky p-5 bg-gray-100 rounded-lg shadow-md top-24 h-fit">
//             <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
//             <div className="flex justify-between mb-2 text-gray-700">
//               <span>Total Items</span>
//               <span>{carts.length}</span>
//             </div>
//             <div className="flex justify-between pt-4 text-xl font-semibold border-t">
//               <span>Total Price</span>
//               <span className="text-green-600">৳ {totalPrice}</span>
//             </div>
//             <Link
//               to={`/checkout/checkoders/${carts[0]._id}`}
//               className="block w-full py-2 mt-6 text-center text-white transition bg-green-600 rounded hover:bg-green-700"
//             >
//               Proceed to Checkout
//             </Link>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Mycarts;

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../../Provider/AuthProvider";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { 
//   MdDelete, 
//   MdShoppingCart, 
//   MdArrowBack, 
//   MdErrorOutline,
//   MdRemoveShoppingCart 
// } from "react-icons/md";
// import { 
//   FaShoppingCart,
//   FaCheckCircle,
//   FaExclamationTriangle
// } from "react-icons/fa";
// import { RiLoader2Line } from "react-icons/ri";
// import Swal from "sweetalert2";

// const Mycarts = () => {
//   const { user } = useContext(AuthContext);
//   const queryClient = useQueryClient();
//   const [deletingId, setDeletingId] = useState(null);

//   const { isLoading, error, isError, data: carts = [] } = useQuery({
//     queryKey: ["carts", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axios.get(
//         `https://gadgetzone-server.onrender.com/carts?email=${user?.email}`
//       );
//       return res.data;
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       setDeletingId(id);
//       await axios.delete(`https://gadgetzone-server.onrender.com/carts/${id}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["carts"]);
//       setDeletingId(null);
//       Swal.fire({
//         title: "Deleted!",
//         text: "Item has been removed from your cart.",
//         icon: "success",
//         timer: 2000,
//         showConfirmButton: false
//       });
//     },
//     onError: (error) => {
//       setDeletingId(null);
//       Swal.fire({
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to delete item. Please try again.",
//         icon: "error",
//         confirmButtonText: "OK"
//       });
//     }
//   });

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Remove Item?",
//       text: "This item will be removed from your cart.",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, remove it",
//       cancelButtonText: "Cancel"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteMutation.mutate(id);
//       }
//     });
//   };

//   const totalPrice = carts.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const totalItems = carts.reduce(
//     (acc, item) => acc + item.quantity,
//     0
//   );

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
//         <div className="relative w-20 h-20 mb-6">
//           <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
//           <div className="absolute flex items-center justify-center inset-2">
//             <RiLoader2Line className="w-8 h-8 text-blue-600 animate-pulse" />
//           </div>
//         </div>
//         <p className="text-lg font-medium text-gray-700 animate-pulse">
//           Loading your cart...
//         </p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
//         <div className="p-4 mb-6 bg-red-100 rounded-full shadow-md">
//           <MdErrorOutline className="w-12 h-12 text-red-600" />
//         </div>
//         <h2 className="mb-2 text-2xl font-bold text-red-600">
//           Oops! Something went wrong.
//         </h2>
//         <p className="max-w-md mb-6 text-center text-gray-600">
//           {error.response?.data?.message || "We couldn't load your cart. Please check your connection and try again."}
//         </p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-6 py-3 font-medium text-white transition-colors bg-red-600 rounded-lg shadow hover:bg-red-700"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <section className="max-w-6xl px-4 py-8 mx-auto">
//       <div className="flex items-center mb-2">
//         <Link 
//           to="/"
//           className="flex items-center text-blue-600 transition-colors hover:text-blue-800"
//         >
//           <MdArrowBack className="mr-1" /> Continue Shopping
//         </Link>
//       </div>

//       <h2 className="mb-8 text-3xl font-bold text-gray-800">My Shopping Cart</h2>

//       {carts.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg shadow-sm">
//           <MdRemoveShoppingCart className="w-16 h-16 mb-4 text-gray-400" />
//           <h3 className="mb-2 text-xl font-semibold text-gray-700">Your cart is empty</h3>
//           <p className="mb-6 text-gray-500">Looks like you haven't added any items to your cart yet.</p>
//           <Link
//             to="/"
//             className="flex items-center px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             <FaShoppingCart className="mr-2" /> Start Shopping
//           </Link>
//         </div>
//       ) : (
//         <div className="grid gap-8 md:grid-cols-3">
//           {/* Cart Items */}
//           <div className="space-y-4 md:col-span-2">
//             {carts.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex flex-col p-6 transition-all bg-white border rounded-lg shadow-sm hover:shadow-md"
//               >
//                 <div className="flex flex-col items-start gap-6 sm:flex-row">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="object-cover w-full h-48 border rounded-md sm:w-24 sm:h-24"
//                   />
//                   <div className="flex-1 w-full">
//                     <Link 
//                       to={`/product/${item.productId}`}
//                       className="text-lg font-semibold text-gray-800 transition-colors hover:text-blue-600"
//                     >
//                       {item.title}
//                     </Link>
//                     <p className="mt-1 text-gray-600">৳ {item.price.toLocaleString()} each</p>

//                     {/* Mobile layout - price and remove button under product title */}
//                     <div className="flex flex-col mt-4 space-y-3 sm:hidden">
//                       <div className="flex items-center justify-between">
//                         <span className="font-medium text-gray-700">Total:</span>
//                         <span className="text-lg font-semibold text-gray-800">
//                           ৳ {(item.price * item.quantity).toLocaleString()}
//                         </span>
//                       </div>
//                       <button
//                         onClick={() => handleDelete(item._id)}
//                         disabled={deletingId === item._id}
//                         className="flex items-center justify-center py-2 text-red-500 transition-colors border border-red-200 rounded-md hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {deletingId === item._id ? (
//                           <RiLoader2Line className="mr-1 animate-spin" />
//                         ) : (
//                           <MdDelete className="mr-1" />
//                         )}
//                         Remove Item
//                       </button>
//                     </div>

//                     {/* Desktop layout - price and remove button on the right */}
//                     <div className="items-center justify-between hidden mt-4 sm:flex">
//                       <div className="flex items-center gap-3">
//                         <span className="font-medium text-gray-700">Quantity: {item.quantity}</span>
//                       </div>

//                       <div className="flex flex-col items-end">
//                         <p className="text-lg font-semibold text-gray-800">
//                           ৳ {(item.price * item.quantity).toLocaleString()}
//                         </p>
//                         <button
//                           onClick={() => handleDelete(item._id)}
//                           disabled={deletingId === item._id}
//                           className="flex items-center mt-2 text-red-500 transition-colors hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                           title="Remove from cart"
//                         >
//                           {deletingId === item._id ? (
//                             <RiLoader2Line className="mr-1 animate-spin" />
//                           ) : (
//                             <MdDelete className="mr-1" />
//                           )}
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="sticky p-6 bg-white border rounded-lg shadow-md top-24 h-fit">
//             <h3 className="pb-3 mb-5 text-xl font-semibold text-gray-800 border-b">Order Summary</h3>

//             <div className="mb-4 space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Items ({totalItems})</span>
//                 <span className="text-gray-800">৳ {totalPrice.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Shipping</span>
//                 <span className="text-green-600">Free</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Tax</span>
//                 <span className="text-gray-800">৳ {(totalPrice * 0.05).toLocaleString()}</span>
//               </div>
//             </div>

//             <div className="flex justify-between pt-4 text-xl font-semibold border-t">
//               <span>Total</span>
//               <span className="text-green-600">৳ {(totalPrice * 1.05).toLocaleString()}</span>
//             </div>

//             <div className="mt-6 space-y-3">
//               <Link
//                 to={`/checkout/checkoders/${carts[0]._id}`}
//                 className="flex items-center justify-center block w-full py-3 text-center text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
//               >
//                 <FaCheckCircle className="mr-2" /> Proceed to Checkout
//               </Link>

//               <Link
//                 to="/"
//                 className="block w-full py-2 text-center text-blue-600 transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
//               >
//                 Continue Shopping
//               </Link>
//             </div>

//             <div className="p-3 mt-5 text-sm text-blue-700 rounded-lg bg-blue-50">
//               <FaExclamationTriangle className="inline mr-1" />
//               Free delivery for orders over ৳ 5000
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Mycarts;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  MdDelete, 
  MdArrowBack, 
  MdErrorOutline,
  MdRemoveShoppingCart,
  MdAdd,
  MdRemove
} from "react-icons/md";
import { 
  FaShoppingCart,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import Swal from "sweetalert2";

const Mycarts = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);

  const { isLoading, error, isError, data: carts = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://gadgetzone-server.onrender.com/carts?email=${user?.email}`
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      setDeletingId(id);
      await axios.delete(`https://gadgetzone-server.onrender.com/carts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
      setDeletingId(null);
      Swal.fire({
        title: "Deleted!",
        text: "Item has been removed from your cart.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });
    },
    onError: (error) => {
      setDeletingId(null);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete item. Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove Item?",
      text: "This item will be removed from your cart.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const totalPrice = carts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = carts.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute flex items-center justify-center inset-2">
            <RiLoader2Line className="w-8 h-8 text-indigo-600 animate-pulse" />
          </div>
        </div>
        <p className="text-lg font-medium text-gray-700 animate-pulse">
          Loading your cart...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
        <div className="p-4 mb-6 bg-red-100 rounded-full shadow-md">
          <MdErrorOutline className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-red-600">
          Oops! Something went wrong.
        </h2>
        <p className="max-w-md mb-6 text-center text-gray-600">
          {error.response?.data?.message || "We couldn't load your cart. Please check your connection and try again."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 font-medium text-white transition-colors bg-red-600 rounded-lg shadow hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col mb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link 
              to="/"
              className="inline-flex items-center mb-4 text-indigo-600 transition-colors hover:text-indigo-800 md:mb-0"
            >
              <MdArrowBack className="mr-2" /> Back to Shopping
            </Link>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="mt-1 text-gray-500">{carts.length} item{carts.length !== 1 ? 's' : ''} in your cart</p>
          </div>
          
          {carts.length > 0 && (
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">Total</p>
              <p className="text-2xl font-bold text-indigo-600">৳ {(totalPrice * 1.05).toLocaleString()}</p>
            </div>
          )}
        </div>

        {carts.length === 0 ? (
          <div className="max-w-md p-8 mx-auto text-center bg-white shadow-sm rounded-xl">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-indigo-100 rounded-full">
              <MdRemoveShoppingCart className="w-12 h-12 text-indigo-500" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Your cart is empty</h3>
            <p className="mb-6 text-gray-500">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              <FaShoppingCart className="mr-2" /> Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {carts.map((item) => (
                <div key={item._id} className="overflow-hidden bg-white shadow-sm rounded-xl">
                  <div className="flex flex-col p-6 sm:flex-row">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-contain w-full h-48 border rounded-lg sm:w-40 sm:h-40"
                      />
                    </div>
                    
                    <div className="flex-1 mt-4 sm:mt-0 sm:ml-6">
                      <Link 
                        to={`/product/${item.productId}`}
                        className="text-lg font-medium text-gray-900 transition-colors hover:text-indigo-600 line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      {/* <p className="mt-1 text-gray-500">৳ {item.price.toLocaleString()} each</p> */}
                      
                      <div className="flex items-center mt-4">
                        {/* <div className="flex items-center border rounded-md">
                          <button className="p-2 text-gray-500 hover:text-indigo-600">
                            <MdRemove className="w-5 h-5" />
                          </button>
                          <span className="px-4 py-1 font-medium text-gray-900">{item.quantity}</span>
                          <button className="p-2 text-gray-500 hover:text-indigo-600">
                            <MdAdd className="w-5 h-5" />
                          </button>
                        </div> */}
                        
                        <div className="flex items-center ml-auto">
                          <p className="mr-4 text-lg font-semibold text-gray-900">
                            ৳ {(item.price * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => handleDelete(item._id)}
                            disabled={deletingId === item._id}
                            className="p-2 text-red-500 transition-colors rounded-full hover:bg-red-50 disabled:opacity-50"
                            title="Remove from cart"
                          >
                            {deletingId === item._id ? (
                              <RiLoader2Line className="w-5 h-5 animate-spin" />
                            ) : (
                              <MdDelete className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky p-6 bg-white shadow-sm rounded-xl top-24">
                <h3 className="pb-4 mb-6 text-xl font-semibold text-gray-900 border-b">Order Summary</h3>
                
                <div className="mb-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="text-gray-900">৳ {totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">৳ {(totalPrice * 0.05).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4 text-lg font-semibold border-t">
                  <span>Total</span>
                  <span className="text-indigo-600">৳ {(totalPrice * 1.05).toLocaleString()}</span>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Link
                    to={`/checkout/checkoders/${carts[0]._id}`}
                    className="flex items-center justify-center w-full py-3 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    <FaCheckCircle className="mr-2" /> Proceed to Checkout
                  </Link>
                  
                  <Link
                    to="/"
                    className="flex items-center justify-center w-full py-2.5 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
                
                <div className="flex items-start p-3 mt-6 text-sm text-indigo-700 rounded-lg bg-indigo-50">
                  <FaExclamationTriangle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Free delivery for orders over ৳ 5000</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mycarts;