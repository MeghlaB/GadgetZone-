// Register.jsx
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ImageBB
const image_hosting_key = import.meta.env.VITE_IMAGEHOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

function Register() {
  const { createUser, updateUserprofile, GoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Upload image to ImageBB
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const res = await axios.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const photoURL = res.data.data.display_url;

        // Create user
        const result = await createUser(data.email, data.password);
        const loggedUser = result.user;
        console.log("User registered:", loggedUser);

        // Update profile
        await updateUserprofile(data.name, photoURL);

        // Notify success
        toast.success("Account created successfully!");
        reset();
        navigate("/");
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSign = async () => {
    try {
      const res = await GoogleLogin();
      console.log(res.user);
      toast.success("Logged in with Google");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md  bg-white p-10 shadow-lg my-28">
      <h1 className="text-xl space-y-2">Register Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="space-y-2 text-sm text-zinc-800">
          <label htmlFor="name" className="block font-medium">
            Name*
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            {...register("name", { required: true })}
            className="w-full rounded-md border px-3 py-2 focus:ring-1 focus:outline-none"
          />
          {errors.name && <span className="text-red-600">Name is required</span>}
        </div>

        {/* Photo */}
        <div className="space-y-2 text-sm text-zinc-800">
          <label htmlFor="photo" className="block font-medium">
            Photo*
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            {...register("photo", { required: true })}
            className="w-full rounded-md border px-3 py-2 focus:ring-1 focus:outline-none"
          />
          {errors.photo && <span className="text-red-600">Photo is required</span>}
        </div>

        {/* Email */}
        <div className="space-y-2 text-sm text-zinc-800">
          <label htmlFor="email" className="block font-medium">
            Email*
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            {...register("email", { required: true })}
            className="w-full rounded-md border px-3 py-2 focus:ring-1 focus:outline-none"
          />
          {errors.email && <span className="text-red-600">Email is required</span>}
        </div>

        {/* Password */}
        <div className="space-y-2 text-sm text-zinc-800">
          <label htmlFor="password" className="block font-medium">
            Password*
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W)(?!.* )/,
            })}
            className="w-full rounded-md border px-3 py-2 focus:ring-1 focus:outline-none"
          />
          {errors.password?.type === "required" && (
            <span className="text-red-600">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-600">Password must be at least 6 characters</span>
          )}
          {errors.password?.type === "maxLength" && (
            <span className="text-red-600">Password must be less than 20 characters</span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-600">
              Password must contain 1 uppercase, 1 lowercase, 1 number, no spaces/special chars
            </span>
          )}
        </div>

        <input
          type="submit"
          value={loading ? "Signing Up..." : "Sign Up"}
          disabled={loading}
          className={`w-full rounded-md bg-teal-600 hover:bg-teal-700 px-4 py-2 text-white transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </form>

      <p className="text-center text-sm text-zinc-800">
        Already have an account?{' '}
        <Link to="/account/login" className="font-semibold underline">
          Sign In
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
          {/* Google SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-5 w-5">
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
          </svg>
        </button>
      </div>

      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </div>
  );
}

export default Register;
