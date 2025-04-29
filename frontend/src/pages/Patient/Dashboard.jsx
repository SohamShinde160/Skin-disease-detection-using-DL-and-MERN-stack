import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detectSkinDisease } from "../../redux/slices/patientSlice";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { diseaseResult, loading } = useSelector((state) => state.patient);
  const [formData, setFormData] = useState({ profilePic: null });

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    if (!formData.profilePic) {
      toast.error("Please select an image.");
      return;
    }

    const updatedData = new FormData();
    updatedData.append("image", formData.profilePic);

    try {
      toast.info("⏳ Uploading image, please wait...", { autoClose: 1500 });
      await dispatch(detectSkinDisease(updatedData)).unwrap();
      toast.success("✅ Prediction Successful!", { autoClose: 2000 });
    } catch (error) {
      console.error("Prediction Error:", error);
      toast.error("🚫 ML Server sleeping or error occurred. Please try again!", { autoClose: 3000 });
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <div className="flex flex-col lg:flex-row bg-[#F3F4F6] font-semibold min-h-screen relative">
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

        <Sidebar />
        <div className="flex-1 p-4 sm:p-6">
          <Navbar />

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="bg-white shadow-xl mt-4 rounded-2xl p-6 w-full lg:max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Upload Skin Image for Disease Detection
              </h2>

              <div className="flex flex-col items-center sm:flex-row sm:items-start justify-between gap-4">
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                      type="file"
                      name="profilePic"
                      onChange={handleFileChange}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all w-full sm:w-auto"
                    >
                      {loading ? "Processing..." : "Get Result"}
                    </button>
                  </div>

                  {formData.profilePic && (
                    <img
                      src={formData.profilePic instanceof File ? URL.createObjectURL(formData.profilePic) : formData.profilePic}
                      alt="Uploaded"
                      className="w-full max-w-md mt-4 mx-auto rounded-md"
                    />
                  )}
                </div>
              </div>

              {diseaseResult && (
                <div className="mt-6 p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                  <h3 className="text-2xl font-bold text-center mb-2">Detection Result</h3>
                  <div className="flex flex-col sm:flex-row items-center justify-center mb-2 gap-2">
                    <span className="text-lg font-semibold">Detected Disease:</span>
                    <span className="text-xl font-bold text-red-600">{diseaseResult.detection.detectedDisease}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center mb-3 gap-2">
                    <span className="text-md font-semibold">Confidence:</span>
                    <span className="text-md font-bold text-blue-600">{diseaseResult.detection.confidence || "Unknown"}</span>
                  </div>
                  <p className="text-gray-700 mb-4 text-center">
                    Based on our ML model analysis, we've detected the above condition in your uploaded image.
                    Please consult with a dermatologist for proper diagnosis and treatment.
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate("/find-dermatologist")}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      Find Dermatologist
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 lg:mt-6 lg:border-l-2 mb-32 border-gray-400 px-4 lg:px-10">
              <h2 className="text-xl font-bold underline mb-4">Instructions for uploading the Image</h2>
              <ul className="list-disc text-sm sm:text-base space-y-2 pl-5">
                <li>Ensure the image is clear and well-lit.</li>
                <li>Only upload images in JPG, PNG, or JPEG format.</li>
                <li>Avoid blurry or low-resolution images.</li>
                <li>Ensure the affected skin area is visible in the image.</li>
                <li>Click 'Get Result' after selecting an image.</li>
                <li>Image size must be ≤ 5MB.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
