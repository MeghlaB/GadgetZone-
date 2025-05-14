import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // Send data to backend API
        console.log("Register Data:", data);
        const name = data.name 
        const email = data.email 
        const password = data.password 
        const conPassword = data.cnPassword
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 p-8 shadow-xl rounded-2xl bg-white">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
                    <p className="mt-2 text-sm text-gray-500">Join ElectroShop today!</p>
                </div>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            {...register("name", { required: "Full name is required" })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            {...register("email", { required: "Email is required" })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="example@mail.com"
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters" },
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
                            placeholder="••••••••"
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 cursor-pointer text-gray-500"
                        >
                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}

                        </div>
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            id="confirm"
                            name="cnPassword"
                            type={showConfirm ? "text" : "password"}
                            {...register("confirm", {
                                required: "Please confirm your password",
                                validate: (val) => val === watch("password") || "Passwords do not match",
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
                            placeholder="••••••••"
                        />
                        <div
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-9 cursor-pointer text-gray-500"
                        >
                            {showConfirm ? <EyeIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </div>
                        {errors.confirm && <p className="text-sm text-red-500 mt-1">{errors.confirm.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition duration-200"
                    >
                        Register
                    </button>
                </form>

                {/* OR Divider */}
                <div className="flex items-center justify-center space-x-2 mt-4">
                    <span className="h-px w-16 bg-gray-200"></span>
                    <span className="text-sm text-gray-400">OR</span>
                    <span className="h-px w-16 bg-gray-200"></span>
                </div>

                {/* Google Signup */}
                <div className="flex flex-col gap-3 mt-2">
                    <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition">
                        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
                        <span className="text-black">Continue with Google</span>
                    </button>
                </div>

                {/* Login Redirect */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline font-medium">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
