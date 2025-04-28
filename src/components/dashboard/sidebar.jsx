import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { SlBookOpen } from "react-icons/sl";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdAssignment } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { GiBookmark } from "react-icons/gi";

const Sidebar = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    // Reusable Links with different icons
    const links = [
        { to: "/dashboard", icon: <FaHome className="text-lg" />, label: "Home" },
        { to: "/dashboard/course-management", icon: <GiBookmark className="text-lg" />, label: "Course Management" },
        { to: "/dashboard/exam-management", icon: <SlBookOpen className="text-lg" />, label: "Exam Management" },
        { to: "/dashboard/quiz-management", icon: <IoNewspaperOutline className="text-lg" />, label: "Quiz Management" },
        { to: "/dashboard/assignment-management", icon: <MdAssignment className="text-lg" />, label: "Assignment Management" },
        { to: "/login", icon: <RiLogoutCircleLine className="text-lg" />, label: "Logout" },
    ];

    // Link rendering function
    const renderLinks = () =>
        links.map((link, index) => (
            <li key={index}>
                <NavLink
                    to={link.to}
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-2 hover:bg-[#141E30] transition-all duration-300 ${isActive ? "bg-[#141E30] shadow-md" : "hover:bg-opacity-70"}`
                    }
                >
                    {link.icon}
                    <span className="text-sm font-medium">{link.label}</span>
                </NavLink>
            </li>
        ));

    return (
        <>
            {/* Sidebar for  Larger Devices */}
            <div className="hidden lg:block h-screen  lg:w-[25%] xl:w-[18%] p-4 py-8 fixed bg-gradient-to-tr from-[#141E30] to-[#243B55] shadow-lg">
                <div className="flex items-center justify-center h-20 mb-10 ">
                    {/* logo  */}
                    <NavLink to="/" className="flex flex-col items-center ">
                        <img src="Logo1.png" alt="logo" className="size-14 sm:size-16" />
                        <p className="text-xl lg:text-3xl font-extrabold font-inter text-yellow-400  tracking-wide pb-4 border-b">
                            OBE SYSTEM
                        </p>
                    </NavLink>
                </div>
                <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-2">{renderLinks()}</ul>
                </nav>
            </div>

            {/* Navbar for Small & medium Devices */}
            <div className="lg:hidden">
                <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-tr from-[#141E30] to-[#243B55] shadow-lg">
                    <h1 className="text-xl font-extrabold tracking-wide text-white">LOGO</h1>
                    <button className="text-2xl text-white" onClick={toggleNavbar}>
                        {isNavbarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Sidebar - Fullscreen when open */}
                {isNavbarOpen && (
                    <nav className="fixed inset-0 bg-gradient-to-tr from-[#141E30] to-[#243B55] shadow-lg z-50 h-screen">
                        <ul className="space-y-2 p-3">{renderLinks()}</ul>
                    </nav>
                )}
            </div>
        </>
    );
};

export default Sidebar;
