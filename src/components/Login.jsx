import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="flex flex-col lg:flex-row font-inter h-screen bg-gradient-to-tr from-[#27569E] to-[#4A90E2]  ">
            {/* Back Button */}
            <Link to="/">
                <div className="absolute top-6 left-6 flex z-50 items-center gap-2 text-[#003C60] font-bold text-lg bg-white px-4 py-2 rounded-full shadow-md hover:bg-[#003C60] hover:text-white transition-all duration-700 ease-in-out cursor-pointer">
                    <FaArrowLeft />
                    <span>Back</span>
                </div>
            </Link>

            {/* Left Section - Image */}
            <div className="w-full lg:w-[60%] bg-cover bg-center relative rounded-l-3xl">
                <img
                    src="2.svg"
                    alt="Modern AI Technology"
                    className="h-full w-full object-cover animate-fadeIn rounded-l-3xl"
                />
            </div>

            {/* Right Section - Form */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center items-center px-8">
                <div className="max-w-md w-full bg-white shadow-xl border-4 border-[#003C60] rounded-3xl p-10 animate-slideInLeft">
                    <div className="text-center mb-6">
                        {/* Logo Placeholder */}
                        <Link to="/" className="flex flex-col items-center ">
                            <img src="Logo1.png" alt="logo" className="size-14 sm:size-16" />
                            <p className="text-xl lg:text-3xl font-extrabold font-inter text-[#293C58]  tracking-wide">
                                OBE SYSTEM
                            </p>
                        </Link>
                        <p className="text-gray-600 text-lg mb-6 ">
                            Log in to AI-Powered Outcome Based Examination System.
                        </p>
                    </div>
                    <form className="mt-4 space-y-4">
                        <div className="mb-4">
                            <label className="block text-[#003C60] font-semibold mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border-2 border-[#003C60]  shadow-sm focus:outline-none "
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#003C60] font-semibold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 border-2 border-[#003C60]  shadow-sm focus:outline-none "
                                />
                                {/* Eye Icon */}
                                <span
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-[#003C60]"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div className="mb-4 text-right">
                            <a
                                href="#"
                                className="text-[#003C60] text-sm font-semibold hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#27569E] text-white font-semibold py-3  shadow-lg hover:bg-[#2F5ECC] transition-all duration-300 transform "
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center font-medium text-sm text-[#003C60] mt-4">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-[#003C60] font-semibold hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login;
