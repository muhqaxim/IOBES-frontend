import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <main className="flex flex-col lg:flex-row font-inter bg-gradient-to-tr from-[#27569E] to-[#4A90E2]">
            {/* Back Button */}
            <Link to="/">
                <div className="absolute top-6 left-6 flex z-50 items-center gap-2 text-[#003C60] font-bold text-lg bg-white px-4 py-2 rounded-full shadow-md hover:bg-[#003C60] hover:text-white transition-all duration-500 ease-in-out cursor-pointer">
                    <FaArrowLeft />
                    <span>Back</span>
                </div>
            </Link>

            {/* Left Section - Image */}
            <div className="w-full lg:w-[60%] bg-cover bg-center max-h-screen relative rounded-l-3xl">
                <img
                    src="2.svg"
                    alt="Modern AI Technology"
                    className="h-full w-full object-cover animate-fadeIn rounded-l-3xl"
                />
            </div>

            {/* Right Section - Form */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center items-center px-8 ">
                <div className="max-w-md w-full bg-white shadow-xl border-4 border-[#003C60] rounded-3xl px-8  py-2 animate-slideInLeft">
                    {/* Logo  */}
                    <div className="text-center mb-4">
                        <Link to="/" className="flex flex-col items-center ">
                            <img src="Logo1.png" alt="logo" className="size-14 sm:size-16" />
                            <p className="text-xl lg:text-3xl font-extrabold font-inter text-[#293C58]  tracking-wide">
                                OBE SYSTEM
                            </p>
                        </Link>
                        <p className="text-gray-600 text-lg mb-4 ">
                            Register to AI-Powered Outcome Based Examination System.
                        </p>
                    </div>

                    {/* form  */}
                    <form className="space-y-3">
                        <div>
                            <label className="block text-[#003C60] font-semibold mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full px-3 py-2 border-2 border-[#003C60]  shadow-sm focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[#003C60] font-semibold mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border-2 border-[#003C60]  shadow-sm focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[#003C60] font-semibold mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full px-3 py-2 border-2 border-[#003C60]  shadow-sm focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[#003C60] font-semibold mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="w-full px-3 py-2 border-2 border-[#003C60]  shadow-sm focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2.5 text-gray-500"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#27569E] text-white text-lg font-semibold py-3  shadow-lg hover:bg-[#2F5ECC] transition-all duration-300 transform "
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center font-medium text-sm text-[#003C60] mt-2">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[#003C60] font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Register;
