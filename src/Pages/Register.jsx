import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<<<<<<< HEAD
// imageBB API Key
const image_hosting_key = import.meta.env.VITE_IMAGEHOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
=======

>>>>>>> d2a0298e88b3737c6b3d0584b47a18127f70eeea

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

<<<<<<< HEAD
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Upload photo to imgBB
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imgRes = await axios.post(image_hosting_api, formData);
      if (!imgRes.data.success) {
        throw new Error("Image upload failed");
      }
=======
 const onSubmit = async (data) => {
  setLoading(true);
  try {
    // Create user with Firebase
    const result = await createUser(data.email, data.password);
    await updateUserprofile(data.name, data.photo);

    // Save user in database
    const userInfo = {
      name: data.name,
      email: data.email,
      photo: data.photo, // ✅ FIXED HERE
      role: "user",
      status: "active",
    };
>>>>>>> d2a0298e88b3737c6b3d0584b47a18127f70eeea

    const dbRes = await axios.post("http://localhost:5000/users", userInfo);

<<<<<<< HEAD
      // Create user with Firebase Auth
      const result = await createUser(data.email, data.password);
      await updateUserprofile(data.name, photoURL);

      // Save user to DB
      const userInfo = {
        name: data.name,
        email: data.email,
        photo: photoURL,
        role: "user",
        status: "active",
      };

      const dbRes = await axios.post("http://localhost:5000/users", userInfo);
      console.log(dbRes.data)

      if (dbRes.data.insertedId) {
        toast.success("Account created successfully!");
        reset();
        navigate("/");
      } else {
        toast.error("Failed to save user to database");
      }

    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
=======
    if (dbRes.data.insertedId || dbRes.data.acknowledged) {
      toast.success("Account created successfully!");
      reset();
      navigate("/");
    } else {
      toast.error("User creation failed in database");
>>>>>>> d2a0298e88b3737c6b3d0584b47a18127f70eeea
    }

  } catch (error) {
    console.error("Registration Error:", error);
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

    await axios.post("https://gadget-zone-server-ashy.vercel.app/users", userInfo); 

    toast.success("Logged in with Google");
    navigate("/");
  } catch (error) {
    toast.error("Google login failed");
  }
};


  return (
    <div className="mx-auto w-full max-w-md bg-white p-10 shadow-lg my-28">
      <h1 className="text-xl font-bold text-center mb-6">Register Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name */}
        <div className="space-y-1 text-sm">
          <label htmlFor="name" className="block font-medium">Name*</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>

        {/* Photo */}
        <div className="space-y-1 text-sm">
          <label htmlFor="photo" className="block font-medium">Photo*</label>
          <input
            id="photo"
            type="url"
         
            {...register("photo", { required: true })}
            className="w-full border px-3 py-2 rounded"
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
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>

        {/* Password */}
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block font-medium">Password*</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W)(?!.* )/,
            })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.password?.type === "required" && <span className="text-red-500">Password is required</span>}
          {errors.password?.type === "minLength" && <span className="text-red-500">Minimum 6 characters</span>}
          {errors.password?.type === "maxLength" && <span className="text-red-500">Maximum 20 characters</span>}
          {errors.password?.type === "pattern" && (
            <span className="text-red-500">
              Password must contain 1 uppercase, 1 lowercase, 1 number, no spaces/special chars
            </span>
          )}
        </div>

        <input
          type="submit"
          value={loading ? "Signing Up..." : "Sign Up"}
          disabled={loading}
          className={`w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </form>

      <p className="text-sm mt-4 text-center">
        Already have an account?{" "}
        <Link to="/account/login" className="text-blue-600 underline">Sign In</Link>
      </p>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <hr className="flex-1 border-gray-300" />
        <span className="px-2 text-gray-500">OR</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Google Login Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGoogleSign}
          className="border rounded-full p-3 hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-5 w-5">
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"/>
          </svg>
        </button>
      </div>

      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </div>
  );
}

export default Register;
