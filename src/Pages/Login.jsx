// Login.jsx
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { signIn, GoogleLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed");
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

    await axios.post("http://localhost:5000/users", userInfo); 

    toast.success("Logged in with Google");
    navigate("/");
  } catch (error) {
    toast.error("Google login failed");
  }
};

  return (
    <div>
    {/* left side er route */}
    <div>

    </div>
      <div className="mx-auto w-full max-w-md  bg-white p-10 shadow-lg my-28">
        <h1 className="text-xl ">Account Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-2 text-sm text-zinc-800">
            <label htmlFor="email" className="block font-medium">
              Email*
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full rounded-md border px-3 py-2 focus:ring-1 focus:outline-none"
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2 text-sm text-zinc-800">
            <label htmlFor="password" className="block font-medium">
              Password*
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full rounded-md border px-3 py-2 focus:ring-1 focus:outline-none"
            />
            {errors.password && (
              <span className="text-red-600">Password is required</span>
            )}
          </div>

          <input
            type="submit"
            value={loading ? "Logging in..." : "Login"}
            disabled={loading}
            className={`w-full rounded-md bg-teal-600 hover:bg-teal-700 px-4 py-2 text-white transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </form>

        <p className="text-center text-sm text-zinc-800">
          Don’t have an account?{" "}
          <Link to="/account/register" className="font-semibold underline">
            Register
          </Link>
        </p>

        <div className="my-8 flex items-center">
          <hr className="flex-1 border-gray-400" />
          <div className="mx-4 text-gray-400">OR</div>
          <hr className="flex-1 border-gray-400" />
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleSign}
            aria-label="Log in with Google"
            className="rounded-full p-3 border hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="h-5 w-5"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
            </svg>
          </button>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar
        />
      </div>
    </div>
  );
}

export default Login;
