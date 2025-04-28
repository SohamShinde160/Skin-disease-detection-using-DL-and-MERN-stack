import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import { fetchAllDetectionHistory } from "../../redux/slices/adminSlice";
import { FiSearch, FiEye } from "react-icons/fi";

const AdminDetectionHistory = () => {
  const dispatch = useDispatch();
  const { detectionHistory, loading } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchAllDetectionHistory());
  }, [dispatch]);

  useEffect(() => {
    if (detectionHistory) {
      setFilteredHistory(
        detectionHistory.filter(
          (record) =>
            record.detectedDisease.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.patientId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.patientId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [detectionHistory, searchTerm]);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {!isMobile && <AdminSidebar />}
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Detection History</h1>
        </header>

        <main className="p-4 md:p-6">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold">All Skin Disease Detections</h2>
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search detections..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No detection history found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>

                          <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                          <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detected Disease</th>
                          <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                          <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>

                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredHistory.map((record) => (
                      <tr key={record._id}>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-medium text-gray-900 text-sm md:text-base">
                              {record.patientId?.name || "Unknown Patient"}
                            </div>
                            <div className="text-gray-500 text-xs md:text-sm">
                              {record.patientId?.email || "No email"}
                            </div>
                          </div>
                        </td>

                            <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                              <div className="h-12 w-12 md:h-16 md:w-16 relative">
                                <img
                                  src={record.imageUrl}
                                  alt="Skin condition"
                                  className="h-full w-full object-cover rounded-md"
                                />
                                <button
                                  onClick={() => openImageModal(record.imageUrl)}
                                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md"
                                >
                                  <FiEye className="text-white text-lg" />
                                </button>
                              </div>
                            </td>
                            <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs md:text-sm font-medium bg-red-100 text-red-800 rounded-full">
                                {record.detectedDisease}
                              </span>
                            </td>
                            <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">{record.confidence || "Unknown"}</td>
                            <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                              {new Date(record.createdAt).toLocaleDateString()}
                            </td>

                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => openImageModal(record.imageUrl)}
                            className="text-blue-600 hover:text-blue-900 text-sm md:text-base"
                          >
                            {isMobile ? "View" : "View Image"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeImageModal}>
            <div className="max-w-3xl w-[90%] max-h-[90vh] p-2 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage} alt="Enlarged view" className="max-h-[80vh] max-w-full object-contain" />
              <div className="mt-4 text-center">
                <button
                  onClick={closeImageModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm md:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {isMobile && <AdminSidebar />}
    </div>
  );
};

export default AdminDetectionHistory;