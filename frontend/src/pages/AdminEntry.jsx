import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-scroll";

const AdminEntry = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen font-semibold bg-gray-100 flex flex-col">
      <nav
        className={`border border-gray-200 bg-white z-50 rounded-[50px] shadow-lg py-3 px-4 md:px-8 ${
          windowWidth < 768
            ? "fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%]"
            : "absolute w-[90%] mt-4 ml-16"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img
              src="img/newlogo.png"
              alt="Logo"
              className="h-10 md:h-14 scale-125 pl-3"
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
              <li className="text-center pt-2">
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

      <div className="flex-1 flex items-center justify-center p-4 mt-20 md:mt-0">
        <div className="p-4 py-12 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center w-full max-w-xs md:w-72">
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-4 text-gray-700">
            Admin
          </h2>
          <button
            onClick={() => navigate("/admin-login")}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg w-full hover:from-purple-600 hover:to-purple-700 transition-all text-sm md:text-base"
          >
            Admin Login
          </button>
          <p className="mt-2 md:mt-3 text-xs text-gray-500">
            For administrative access only
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminEntry