import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetectionHistory } from "../../redux/slices/patientSlice";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loader from "../Loader";

const DetectionHistory = () => {
  const dispatch = useDispatch();
  const { detectionHistory, loading } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchDetectionHistory());
  }, [dispatch]);

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        <h2 className="text-2xl font-bold my-4">Detection History</h2>

        {loading ? (
          <Loader/>
        ) : detectionHistory.length === 0 ? (
          <p>No detection history found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detectionHistory.map((record) => (
              <div key={record._id} className="border p-4 rounded-md shadow-md bg-white hover:shadow-lg transition-shadow">
                <img src={record.imageUrl} alt="Uploaded Skin" className="w-full h-48 object-cover rounded-md" />
                <div className="mt-3 bg-gray-50 p-3 rounded-md">
                  <h3 className="text-lg font-bold text-center">Detected Disease</h3>
                  <p className="text-center font-semibold text-red-600">{record.detectedDisease}</p>

                  {record.confidence && (
                    <div className="mt-1">
                      <p className="text-sm text-center text-gray-600">Confidence: <span className="font-medium text-blue-600">{record.confidence}</span></p>
                    </div>
                  )}

                  <p className="text-sm text-center text-gray-500 mt-2">
                    Detected on: {new Date(record.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionHistory;
