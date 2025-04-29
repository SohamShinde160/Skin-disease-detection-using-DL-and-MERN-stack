import { FaHome, FaUserAlt, FaSmile, FaTable } from "react-icons/fa";

const FunFacts = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8 sm:py-12 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-white bg-opacity-10 rounded-lg shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-shadow">
            <div className="w-6 h-6 sm:w-8 sm:h-8 p-1 flex items-center justify-center border-2 border-white rounded-full mb-2 sm:mb-4">
              <FaHome className="text-xl sm:text-2xl md:text-3xl" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold">8</span>
            <p className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2">Diseases trained</p>
          </div>

          <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-white bg-opacity-10 rounded-lg shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-shadow">
            <div className="w-6 h-6 sm:w-8 sm:h-8 p-1 flex items-center justify-center border-2 border-white rounded-full mb-2 sm:mb-4">
              <FaUserAlt className="text-xl sm:text-2xl md:text-3xl" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold">6</span>
            <p className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2">Dermatologists</p>
          </div>

          <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-white bg-opacity-10 rounded-lg shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-shadow">
            <div className="w-6 h-6 sm:w-8 sm:h-8 p-1 flex items-center justify-center border-2 border-white rounded-full mb-2 sm:mb-4">
              <FaSmile className="text-xl sm:text-2xl md:text-3xl" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold">40+</span>
            <p className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2">Happy Patients</p>
          </div>

          <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-white bg-opacity-10 rounded-lg shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-shadow">
            <div className="w-6 h-6 sm:w-8 sm:h-8 p-1 flex items-center justify-center border-2 border-white rounded-full mb-2 sm:mb-4">
              <FaTable className="text-xl sm:text-2xl md:text-3xl" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold">6+</span>
            <p className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2">Months of Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunFacts;