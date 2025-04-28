import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Basic validation
  //   if (form.password !== form.confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     const res = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(form),
  //     });

  //     const data = await res.text();  

  //     if (res.ok) {
  //       navigate("/login");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Registration failed. Please try again.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role:"ADMIN"
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Connection error. Please check your internet connection.");
    }
  };

  return (
    <main className="flex flex-col lg:flex-row font-inter bg-gradient-to-tr from-[#141E30] to-[#243B55]">
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
        <div className="max-w-md w-full bg-white shadow-xl border-4 border-[#003C60] rounded-3xl px-8 py-2 animate-slideInLeft">
          {/* Logo  */}
          <div className="text-center mb-4">
            <Link to="/" className="flex flex-col items-center">
              <img src="Logo1.png" alt="logo" className="size-14 sm:size-16" />
              <p className="text-xl lg:text-3xl font-extrabold font-inter text-[#293C58] tracking-wide">
                OBE SYSTEM
              </p>
            </Link>
            <p className="text-gray-600 text-lg mb-4">
              Register to AI-Powered Outcome Based Examination System.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#003C60] font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-[#003C60] shadow-sm focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[#003C60] font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-[#003C60] shadow-sm focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[#003C60] font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-[#003C60] shadow-sm focus:outline-none"
                  required
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
              <label className="block text-[#003C60] font-semibold mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-[#003C60] shadow-sm focus:outline-none"
                  required
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
              className="w-full bg-[#141E30] text-white text-lg font-semibold py-3 shadow-lg hover:bg-[#243B55] transition-all duration-300 transform"
            >
              Register
            </button>
          </form>

          <p className="text-center font-medium text-sm text-[#003C60] mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-[#003C60] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
