import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { patientLoginThunk } from "../../redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMenu, FiX, FiEye, FiEyeOff } from "react-icons/fi";

const PatientLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("Redirecting to dashboard...");
      navigate("/patient-dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(patientLoginThunk(formData));

    if (patientLoginThunk.fulfilled.match(result)) {
      console.log("Login successful, redirecting...");
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/patient-dashboard");
      }, 2000);
    } else {
      console.log("Login failed, staying on login page.");
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="font-semibold">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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
            <li onClick={() => navigate("/")} className="cursor-pointer hover:text-blue-500">
              Home
            </li>
            <li onClick={() => navigate("/disease-details")} className="cursor-pointer hover:text-blue-500">
              Disease Details
            </li>
            <li onClick={() => navigate("/team")} className="cursor-pointer hover:text-blue-500">
              About our Team
            </li>
            <li>
              <Link
                to="dermatologist-list"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-blue-500"
              >
                Dermatologist List
              </Link>
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
              <li className="text-center">
                <Link
                  to="dermatologist-list"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dermatologist List
                </Link>
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

      {/* Login Content */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12 pt-20 md:pt-24 px-4 min-h-[100vh] bg-gradient-to-r from-blue-50 to-purple-50">
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 shadow-xl sm:shadow-2xl rounded-xl w-full max-w-md relative">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Patient Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base pr-10"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base"
          >
            Login
          </button>

          <h2 className="text-center mx-auto mt-4 font-semibold text-gray-600 text-sm sm:text-base">
            New User?{" "}
            <span
              onClick={() => navigate("/patient-signup")}
              className="text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
            >
              Signup Here
            </span>
          </h2>
        </form>

        <img
          src="img/Banner7.jpg"
          className="shadow-xl sm:shadow-2xl rounded-xl w-[80%] md:full max-w-md block"
          alt="Medical illustration"
        />
      </div>
    </div>
  );
};

export default PatientLogin;
