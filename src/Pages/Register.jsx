import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const image_hosting_key = import.meta.env.VITE_IMAGEHOSTING; // ✅ .env file এ রাখতে হবে
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

function Register() {
  const { createUser, updateUserprofile, GoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // 1. Upload image to imgBB
      const imageFile = data.photo[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(image_hosting_api, formData);
      const photoURL = imgRes.data.data.display_url;

      // 2. Create Firebase user
      const result = await createUser(data.email, data.password);

      // 3. Update Firebase user profile
      await updateUserprofile(data.name, photoURL);

      // 4. Save user info to database
      const userInfo = {
        name: data.name,
        email: data.email,
        photo: photoURL,
        role: "user",
        status: "active",
      };

      const dbRes = await axios.post("https://gadgetzone-server.onrender.com/users", userInfo);

      if (dbRes.data.insertedId || dbRes.data.acknowledged) {
        toast.success("Account created successfully!");
        reset();
        navigate("/");
      } else {
        toast.error("User creation failed in database");
      }

    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Registration failed";
      toast.error(msg);
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

      await axios.post("https://gadgetzone-server.onrender.com/users", userInfo);

      toast.success("Logged in with Google");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="w-full max-w-md p-10 mx-auto bg-white shadow-lg my-28">
      <h1 className="mb-6 text-xl font-bold text-center">Register Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="space-y-1 text-sm">
          <label htmlFor="name" className="block font-medium">Name*</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>

        {/* Photo (File Upload) */}
        <div className="space-y-1 text-sm">
          <label htmlFor="photo" className="block font-medium">Photo*</label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            {...register("photo", { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.photo && <span className="text-red-500">Photo is required</span>}
        </div>

        {/* Email */}
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block font-medium">Email*</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>

        {/* Password */}
        <div className="relative space-y-1 text-sm">
          <label htmlFor="password" className="block font-medium">Password*</label>
          <input
            id="password"
            type={showPassword ? 'text': 'password'}
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W)(?!.* )/,
            })}
            className="w-full px-3 py-2 border rounded"
          />
          {/* Eye Icon */}
          <div
            className="absolute text-[18px] cursor-pointer text--gray-500 text top-8 right-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          {errors.password?.type === "required" && <span className="text-red-500">Password is required</span>}
          {errors.password?.type === "minLength" && <span className="text-red-500">Minimum 6 characters</span>}
          {errors.password?.type === "maxLength" && <span className="text-red-500">Maximum 20 characters</span>}
          {errors.password?.type === "pattern" && (
            <span className="text-red-500">
              Must include uppercase, lowercase, number, no special char or space
            </span>
          )}
        </div>

        {/* Submit Button */}
        <input
          type="submit"
          value={loading ? "Signing Up..." : "Sign Up"}
          disabled={loading}
          className={`w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </form>

      {/* Already have account */}
      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/account/login" className="text-blue-600 underline">Sign In</Link>
      </p>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-1 border-gray-300" />
        <span className="px-2 text-gray-500">OR</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Google Sign-in */}
      <div className="flex justify-center">
        <button
          onClick={handleGoogleSign}
          className="p-3 border rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5">
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
          </svg>
        </button>
      </div>

      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </div>
  );
}

export default Register;
