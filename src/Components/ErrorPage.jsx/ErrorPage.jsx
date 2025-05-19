import React from "react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md text-center p-8 bg-white rounded-lg shadow-lg"
      >
        <div className="text-error text-9xl font-extrabold mb-4 animate-pulse">
          404
        </div>
        <h1 className="text-3xl font-bold mb-2">Oops! Page Not Found</h1>
        <p className="mb-6 text-gray-600">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => window.history.back()}
          className="btn btn-error btn-outline btn-lg"
        >
          Go Back
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
