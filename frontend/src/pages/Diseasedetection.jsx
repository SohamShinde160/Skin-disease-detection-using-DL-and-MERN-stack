import { FaPlay, FaCaretRight } from "react-icons/fa";

const DiseaseDetection = () => {
  return (
    <section className="bg-[#F8FBFF] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Disease Detection Procedure
          </h2>
          <div className="w-12 mx-auto my-3 md:my-4 border-t-2 border-blue-500"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center mt-8 md:mt-10 gap-6 md:gap-0">
          <div className="w-full md:w-1/2 px-2 sm:px-0">
            <h3 className="text-lg sm:text-xl font-bold underline text-gray-700 mb-3 sm:mb-4 border-l-4 border-blue-500 pl-2">
              Follow this procedure:
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <FaCaretRight className="text-blue-500 mt-1 flex-shrink-0" />
                Create your account
              </li>
              <li className="flex items-start gap-2">
                <FaCaretRight className="text-blue-500 mt-1 flex-shrink-0" />
                Login With your Credentials
              </li>
              <li className="flex items-start gap-2">
                <FaCaretRight className="text-blue-500 mt-1 flex-shrink-0" />
                Upload an image of the affected area in the Dashboard.
              </li>
              <li className="flex items-start gap-2">
                <FaCaretRight className="text-blue-500 mt-1 flex-shrink-0" />
                Receive detected disease name.
              </li>
              <li className="flex items-start gap-2">
                <FaCaretRight className="text-blue-500 mt-1 flex-shrink-0" />
                Schedule an appointment with doctor for further consultation.
              </li>
              <li className="flex items-start gap-2">
                <FaCaretRight className="text-blue-500 mt-1 flex-shrink-0" />
                Disease name and uploaded image are forwarded to a dermatologist.
              </li>
              <li className="flex items-start gap-2">
                <FaCaretRight className="text-blue-500 mt-1 flex-shrink-0" />
                Find Nearby Dermatologist based on your current Location.
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2 flex justify-center mt-4 sm:mt-6 md:mt-0 px-2 sm:px-0">
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-md sm:shadow-lg overflow-hidden">
              <img
                src="img/newlogo.png"
                alt="Disease Detection"
                className="w-full h-auto"
              />
              <a
                href=" "
                target="_blank"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-5 hover:bg-opacity-10 transition-all"
              >
                <FaPlay className="text-white text-2xl sm:text-3xl md:text-4xl bg-blue-500 p-2 sm:p-3 md:p-4 rounded-full shadow-sm sm:shadow-md" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiseaseDetection;