import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-scroll";
import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PatientSignup = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/patients/register`, formData);
      alert("Signup successful! Please log in.");
      navigate("/patient-login");
    } catch (error) {
      alert("Signup failed. Please try again.");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="font-semibold">
      {/* Navigation */}
      <nav className={`border border-gray-200 bg-white z-50 rounded-[50px] shadow-lg py-3 px-4 md:px-8
        ${window.innerWidth < 768 ? 
          'fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%]' : 
          'absolute w-[90%] mt-4 ml-16'}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div onClick={() => navigate("/")}>
            <img
              src="img/newlogo.png"
              alt="Logo"
              className="h-12 scale-125 pl-3 md:h-16 cursor-pointer"
            />
          </div>         
           {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-4 lg:space-x-8 font-semibold text-black text-[15px] lg:text-[17px]">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-blue-500"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/disease-details")}
              className="cursor-pointer hover:text-blue-500"
            >
              Disease Details
            </li>
            <li
              onClick={() => navigate("/team")}
              className="cursor-pointer hover:text-blue-500"
            >
              About our Team
            </li>
            <li
                onClick={() => {
                  navigate("/admin-entry");
                  setMobileMenuOpen(false);
                }}
                className="cursor-pointer hover:text-blue-500 text-center"
              >
                Restricted Route
              </li>
          </ul>

          <div className="hidden md:block">
            <Link
              to="get-started-section"
              smooth={true}
              duration={500}
              className="bg-blue-500 text-white px-4 py-1 md:px-6 md:py-2 rounded-[50px] cursor-pointer hover:bg-blue-600 transition text-sm md:text-base"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-4">
              <li
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className="cursor-pointer hover:text-blue-500 text-center py-2"
              >
                Home
              </li>
              <li
                onClick={() => {
                  navigate("/disease-details");
                  setMobileMenuOpen(false);
                }}
                className="cursor-pointer hover:text-blue-500 text-center py-2"
              >
                Disease Details
              </li>
              <li
                onClick={() => {
                  navigate("/team");
                  setMobileMenuOpen(false);
                }}
                className="cursor-pointer hover:text-blue-500 text-center py-2"
              >
                About our Team
              </li>
              <li
                onClick={() => {
                  navigate("/admin-entry");
                  setMobileMenuOpen(false);
                }}
                className="cursor-pointer hover:text-blue-500 text-center py-2"
              >
                Restricted Route
              </li>
              <li className="text-center">
                <Link
                  to="get-started-section"
                  smooth={true}
                  duration={500}
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-[50px] cursor-pointer hover:bg-blue-600 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Signup Content */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12 pt-20 md:pt-24 px-4 min-h-[100vh] bg-gradient-to-r from-blue-50 to-purple-50">
        <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 shadow-xl sm:shadow-2xl rounded-xl w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Patient Signup</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-2 sm:p-3 mb-3 sm:mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 sm:p-3 mb-3 sm:mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full p-2 sm:p-3 mb-3 sm:mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          
          {/* Password Input with Eye Button */}
          <div className="relative mb-3 sm:mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 sm:p-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base"
          >
            Sign Up
          </button>
          <h2 className="text-center mx-auto mt-3 sm:mt-4 font-medium sm:font-semibold text-gray-600 text-sm sm:text-base">
            Already Have an account?{" "}
            <span
              onClick={() => navigate("/patient-login")}
              className="text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
            >
              Login Here
            </span>
          </h2>
        </form>

        <img
          src="img/Banner2.jpg"
          className="shadow-xl sm:shadow-2xl rounded-xl w-[80%] md:full max-w-md block"
          alt="Medical illustration"
        />
      </div>
    </div>
  );
};

export default PatientSignup;
