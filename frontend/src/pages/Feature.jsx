import { FaEye, FaNotesMedical, FaStethoscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  return (
    <section className=" bg-gradient-to-r from-blue-200 to-purple-200 relative min-h-[80vh] py-8 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 md:mt-24 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 mt-28 md:mt-0 md:mb-6 font-extrabold text-gray-900">
          SKIN DISEASE HEALTH PARTNER!
        </h2>

        <div className="absolute icons icons-cube hidden md:block">
          <img src="/img/cube.png" alt="cube decoration" className="w-16 md:w-auto" />
        </div>

        <img 
          src="img/section-img.png" 
          alt="section divider" 
          className="w-12 md:w-16 mx-auto mb-8 md:my-4"
        />
        
        <h3 className="text-xl md:text-2xl mb-8 md:mb-11 font-semibold text-gray-800">
          HOW <span className="text-blue-600 font-extrabold md:font-semibold underline md:no-underline md:text-gray-800">AI DERMATOLOGIST</span> WORK?
        </h3>
        
        <div className="flex flex-row justify-center items-center gap-6 md:gap-12">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-24 md:h-24 flex justify-center items-center bg-white border-2 border-blue-500 rounded-full shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-shadow">
              <FaEye className="text-blue-600 text-3xl md:text-5xl" />
            </div>
            <h3 className="text-sm md:text-xl font-bold text-gray-800 mt-2 md:mt-4">Upload Image</h3>
          </div>

          <div className="block w-24 border-dashed mb-10 border-b-2 border-gray-500"></div>

          <div className="flex flex-col items-center md:ml-10">
            <div className="w-16 h-16 md:w-24 md:h-24 flex justify-center items-center bg-white border-2 border-blue-500 rounded-full shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-shadow">
              <FaNotesMedical className="text-blue-600 text-3xl md:text-5xl" />
            </div>
            <h3 className="text-sm md:text-xl font-bold text-gray-800 mt-2 md:mt-4">Disease Detection</h3>
          </div>

          <div className="block w-24 border-dashed mb-10 border-b-2 border-gray-500"></div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-24 md:h-24 flex justify-center items-center bg-white border-2 border-blue-500 rounded-full shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transition-shadow">
              <FaStethoscope className="text-blue-600 text-3xl md:text-5xl" />
            </div>
            <h3 className="text-sm md:text-xl font-bold text-gray-800 mt-2 md:mt-4">Book Appointment</h3>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 flex justify-center items-center px-4">
        <button
          onClick={() => navigate("/patient-login")}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 md:px-12 font-bold py-3 md:py-4 rounded-full cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 text-sm md:text-base"
        >
          CHECK YOUR SKIN NOW
        </button>
      </div>
    </section>
  );
};

export default Features;