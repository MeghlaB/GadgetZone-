import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // ✅ v2 style



export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // Handle login here
        console.log("Login Data:", data);
        const name = data.name 
        const email = data.email
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 p-8 shadow-xl rounded-2xl bg-white">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-500">Login to your account</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                            type={showPassword ? "text" : "password"}
                            name="password"
                            {...register("password", { required: "Password is required" })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
                            placeholder="••••••••"
                        />
                        <div
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-9 cursor-pointer text-gray-500"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}

                        </div>
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right text-sm">
                        <a href="/forgot-password" className="text-blue-500 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center justify-center space-x-2">
                    <span className="h-px w-16 bg-gray-200"></span>
                    <span className="text-sm text-gray-400">OR</span>
                    <span className="h-px w-16 bg-gray-200"></span>
                </div>

                {/* OAuth Buttons */}
                <div className="flex flex-col gap-3">
                    <button className="flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition">
                        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
                        <span className="text-black">Continue with Google</span>
                    </button>
                    {/* Optional: Add Facebook, GitHub etc. */}
                </div>

                {/* Register Redirect */}
                <p className="text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline font-medium">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
