import React from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Soham Shinde",
    role: "Full Stack Developer",
    image: "/img/soham.jpg",
    linkedin: "https://www.linkedin.com/in/soham-s-shinde-16012004ss/",
  },
  {
    name: "Vighnesh Patil",
    role: "Machine Learning Engineer",
    image: "/img/vighnesh.jpg",
    linkedin: "https://www.linkedin.com/in/vighnesh-patil-bb7789230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Vyankatesh Kumbhar",
    role: "Python Developer",
    image: "/img/vyankatesh.jpg",
    linkedin: "https://www.linkedin.com/in/vyankatesh-kumbhar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Vedant Tambe",
    role: "ML Model Integration",
    image: "/img/vedant.jpg",
    linkedin: "https://www.linkedin.com/in/vedant-tambe-50277a233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

const MeetOurTeam = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="font-semibold">
      <nav
        className={`border border-gray-200 bg-white  z-50 rounded-[50px] shadow-lg py-3 px-4 md:px-8
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
              <li
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="text-center py-2"
              >
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

      {/* Team Section */}
      <section className="min-h-screen bg-gray-100 py-8 md:py-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 mt-20 md:mb-6">
            Meet Our Team
          </h2>
          <div className="w-12 md:w-16 mx-auto mb-6 md:mb-8 border-t-2 md:border-t-4 border-blue-500"></div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 px-2 sm:px-0">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white shadow-md md:shadow-lg rounded-lg p-4 md:p-6 flex flex-col items-center w-full sm:w-56 md:w-64"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full mb-3 md:mb-4 border-2 md:border-4 border-blue-400"
                />
                <h3 className="text-lg md:text-xl font-bold text-gray-700">{member.name}</h3>
                <p className="text-sm md:text-base text-gray-500">{member.role}</p>

                {/* LinkedIn Link */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm md:text-base mt-2 flex items-center hover:underline transition"
                  >
                    LinkedIn &nbsp; <FaLinkedin></FaLinkedin>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetOurTeam;
