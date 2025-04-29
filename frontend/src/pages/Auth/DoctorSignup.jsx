import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorSignup } from "../../services/authService";
import { Link } from "react-scroll";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMenu, FiX } from "react-icons/fi";

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    qualification: "",
    experience: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await doctorSignup(formData);
      toast.success("Signup successful! Please log in."); 
      navigate("/doctor-login");
    } catch (error) {
      console.error("Doctor Signup Error:", error.response?.data || error.message);
      toast.error("Signup failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };


  return (
    <div className="font-semibold">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <nav className={`border border-gray-200 bg-white  z-50 rounded-[50px] shadow-lg py-3 px-4 md:px-8
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

      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12 pt-20 md:pt-28 px-4 min-h-[100vh] bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 shadow-md sm:shadow-lg rounded-md w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Doctor Signup</h2>
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="number"
            name="experience"
            placeholder="Experience (years)"
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            } text-sm sm:text-base`}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
          
          <h2 className="text-center mx-auto mt-3 sm:mt-4 font-medium sm:font-semibold text-sm sm:text-base">
            Already Have an account?{" "}
            <span
              onClick={() => navigate("/doctor-login")}
              className="text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
            >
              Login Here
            </span>
          </h2>
        </form>
        
        <img 
          src="img/Banner4.jpg" 
          className="shadow-lg rounded-md w-[80%] md:w-full max-w-md block" 
          alt="Doctor illustration"
        />
      </div>
    </div>
  );
};

export default DoctorSignup;