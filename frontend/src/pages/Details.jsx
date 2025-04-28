import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const PopularTreatments = () => {
  const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

  return (
    <div className="font-semibold">
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
     {/* Content Section */}
     <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 md:py-16 px-4 md:px-6 relative ">
        <div className="max-w-6xl mt-16 mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            OUR <span className="text-blue-600">POPULAR</span> TREATMENTS
          </h2>
          <div className="w-16 md:w-20 mx-auto my-3 md:my-4 border-t-2 md:border-t-4 border-blue-600 rounded-full"></div>
          <h1 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-gray-800">
            Empowering Health with AI-Driven Skin Disease Detection
          </h1>
          <p className="text-gray-600 max-w-4xl mx-auto text-sm sm:text-base font-medium md:font-semibold">
            We leverage advanced AI technology to accurately detect a variety of skin diseases, providing users with instant insights and customized recommendations. Our platform connects you with trusted dermatologists for professional consultations tailored to your skin condition. Start your journey toward healthier skin with confidence and convenience.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              title: "Actinic Keratosis",
              description: "A rough, scaly patch on the skin caused by sun exposure, often considered a precancerous lesion that can develop into squamous cell carcinoma.",
              bgColor: "bg-blue-100 font-medium md:font-semibold",
            },
            {
              title: "Basal Cell Carcinoma (BCC)",
              description: "The most common type of skin cancer, appearing as a pearly or waxy bump, often in sun-exposed areas; grows slowly and rarely spreads but can cause tissue damage.",
              bgColor: "bg-purple-100 font-medium md:font-semibold",
            },
            {
              title: "Dermatofibroma",
              description: "A benign, firm, small, dark brown or reddish bump, usually found on the legs; often results from minor skin trauma.",
              bgColor: "bg-pink-100 font-medium md:font-semibold",
            },
            {
              title: "Melanoma",
              description: "A serious and aggressive form of skin cancer that develops from melanocytes; often appears as an irregular, dark-colored mole that changes in size, shape, or color.",
              bgColor: "bg-orange-100 font-medium md:font-semibold",
            },
            {
              title: "Nevus (Mole)",
              description: "A common, benign skin growth made up of pigment-producing cells (melanocytes); may be flat or raised and vary in color from tan to black.",
              bgColor: "bg-blue-200 font-medium md:font-semibold",
            },
            {
              title: "Pigmented Benign Keratosis (Seborrheic Keratosis)",
              description: "A noncancerous, warty, brown, or black skin growth with a stuck-on appearance; common in older adults.",
              bgColor: "bg-purple-200 font-medium md:font-semibold",
            },
            {
              title: "Squamous Cell Carcinoma (SCC)",
              description: "A type of skin cancer that appears as a red, scaly patch, open sore, or thickened bump; can spread if untreated but is usually curable when caught early.",
              bgColor: "bg-pink-200 font-medium md:font-semibold",
            },
            {
              title: "Vascular Lesion",
              description: "A broad term for skin conditions related to abnormal blood vessels, including birthmarks, spider veins, and hemangiomas; may appear red, blue, or purple.",
              bgColor: "bg-orange-200 font-medium md:font-semibold",
            },
          ].map((treatment, index) => (
            <div
              key={index}
              className={`${treatment.bgColor} p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 md:hover:-translate-y-2`}
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-4">
                {treatment.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {treatment.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopularTreatments;