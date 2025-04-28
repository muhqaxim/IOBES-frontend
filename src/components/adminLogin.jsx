import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json(); // Use res instead of response
  
      if (res.ok) {
        // Store admin token for authenticated requests
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminId", data.adminId);
        localStorage.setItem("adminName", data.name);
        navigate("/admin-dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your internet connection.");
      console.error("Login error:", err);
    }
  };

  return (
    <main className="flex flex-col lg:flex-row font-inter h-screen bg-gradient-to-tr from-[#141E30] to-[#243B55]">
      <Link to="/">
        <div className="absolute top-6 left-6 flex z-50 items-center gap-2 text-[#003C60] font-bold text-lg bg-white px-4 py-2 rounded-full shadow-md hover:bg-[#003C60] hover:text-white transition-all duration-700 ease-in-out cursor-pointer">
          <FaArrowLeft />
          <span>Back</span>
        </div>
      </Link>

      <div className="w-full lg:w-[60%] bg-cover bg-center relative rounded-l-3xl">
        <img
          src="2.svg"
          alt="Modern AI Technology"
          className="h-full w-full object-cover animate-fadeIn rounded-l-3xl"
        />
      </div>

      <div className="w-full lg:w-[40%] flex flex-col justify-center items-center px-8">
        <div className="max-w-md w-full bg-white shadow-xl border-4 border-[#003C60] rounded-3xl p-10 animate-slideInLeft">
          <div className="text-center mb-6">
            <Link to="/" className="flex flex-col items-center">
              <img src="Logo1.png" alt="logo" className="size-14 sm:size-16" />
              <p className="text-xl lg:text-3xl font-extrabold font-inter text-[#293C58] tracking-wide">
                OBE SYSTEM
              </p>
            </Link>
            <p className="text-gray-600 text-lg mb-6">
              Log in to AI-Powered Outcome Based Examination System.
            </p>
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form className="mt-4 space-y-4" onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-[#003C60] font-semibold mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 border-[#003C60] shadow-sm focus:outline-none"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 border-[#003C60] shadow-sm focus:outline-none"
                  required
                />
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
              className="w-full bg-[#141E30] text-white font-semibold py-3 shadow-lg hover:bg-[#243B55] transition-all duration-300 transform"
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
          <p className="text-center mt-4 w-full">
            <Link
              to="/login"
              className="text-[#003C60] font-semibold hover:underline"
            >
              Login as Faculty
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
