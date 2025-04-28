import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) =>
        location.pathname === path
            ? "text-[#293C58] font-semibold underline"
            : "text-gray-700 hover:text-[#141E30] transition duration-300";

    return (
        <nav className="fixed top-0 z-50 w-full bg-gray-50 border-gray-300 font-inter shadow-md border-b">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src="Logo1.png" alt="logo" className="size-14 sm:size-16" />
                        <p className="text-xl lg:text-3xl font-extrabold font-inter text-[#293C58]  tracking-wide">
                            OBE SYSTEM
                        </p>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className={`text-base font-medium ${isActive("/")}`}>
                            Home
                        </Link>
                        <Link to="/about" className={`text-base font-medium ${isActive("/about")}`}>
                            About
                        </Link>

                        {/* Login & Register Buttons */}
                        <div className="ml-6 space-x-4">
                            <Link to="/login">
                                <button className="relative px-6 py-2 border-2 border-[#141E30] text-[#141E30] font-semibold rounded-lg overflow-hidden ease-in-out transition duration-500 group">
                                    <span className="absolute inset-0 bg-[#141E30] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
                                    <span className="relative z-10 group-hover:text-white">
                                        Login
                                    </span>
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="relative px-6 py-2 text-white bg-[#141E30] border-2 border-[#141E30] font-semibold rounded-lg ease-in-out overflow-hidden transition duration-500 group">
                                    <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
                                    <span className="relative z-10 group-hover:text-[#141E30]">
                                        Register
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-16 left-0 w-full bg-white shadow-lg h-screen"
                    >
                        <div className="flex flex-col text-center space-y-4 py-6">
                            <Link to="/" className={`block px-6 py-3 text-lg font-medium ${isActive("/")}`} onClick={() => setIsOpen(false)}>
                                Home
                            </Link>
                            <Link to="/about" className={`block px-6 py-3 text-lg font-medium ${isActive("/about")}`} onClick={() => setIsOpen(false)}>
                                About
                            </Link>

                            {/* Mobile Login & Register Buttons */}
                            <div className="px-6 space-y-3">
                                <Link to="/login">
                                    <button className="block w-full px-6 py-2 mb-2 bg-white border border-[#141E30] text-[#141E30] font-semibold shadow-md  transition  rounded-lg">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button className="block w-full px-6 py-2 bg-[#141E30] text-white font-semibold shadow-md  transition duration-300 rounded-lg">
                                        Register
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
