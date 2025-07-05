import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { signIn, GoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  setLoading(true);
  try {
    await signIn(data.email, data.password);
    toast.success("Logged in successfully!");
    setTimeout(() => navigate("/"), 1000);
  } catch (error) {
    console.error("Login Error:", error);
    const errorCode = error.code;

    if (errorCode === "auth/user-not-found") {
      toast.error("No user found with this email");
    } else if (errorCode === "auth/wrong-password") {
      toast.error("Incorrect password");
    } else {
      toast.error("Login failed");
    }
  } finally {
    setLoading(false);
  }
};

  const handleGoogleSign = async () => {
    try {
      const result = await GoogleLogin();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "user",
        status: "active",
      };

      // Check if user already exists before posting
      await axios.post("https://gadget-zone-server-kappa.vercel.app/users", userInfo);

      toast.success("Logged in with Google");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md bg-white p-10 shadow-lg my-28 rounded-lg">
      <h1 className="text-xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block font-medium">Email*</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-teal-500"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block font-medium">Password*</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-teal-500"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Register link */}
      <p className="text-sm mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link to="/account/register" className="text-blue-600 underline">Register</Link>
      </p>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <hr className="flex-1 border-gray-300" />
        <span className="px-2 text-gray-500">OR</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Google Login */}
      <div className="flex justify-center">
        <button
          onClick={handleGoogleSign}
          className="flex items-center gap-2 border px-4 py-2 rounded-full hover:bg-gray-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-5 w-5">
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" fill="#4285F4" />
          </svg>
          <span>Login with Google</span>
        </button>
      </div>

      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </div>
  );
}

export default Login;
