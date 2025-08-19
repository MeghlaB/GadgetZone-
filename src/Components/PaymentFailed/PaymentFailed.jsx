import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

function PaymentFailed() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          দুঃখিত, আপনার পেমেন্টটি সফল হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন বা
          অন্য কোনো পেমেন্ট পদ্ধতি ব্যবহার করুন।
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/checkout"
            className="px-5 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="px-5 py-2 border border-gray-300 rounded-xl shadow hover:bg-gray-100 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailed;
