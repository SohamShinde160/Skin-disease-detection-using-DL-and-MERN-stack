import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import { fetchAllPatients, fetchAllDoctors, fetchAllDetectionHistory } from "../../redux/slices/adminSlice";
import { FiUsers, FiUserPlus, FiImage } from "react-icons/fi";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { patients, doctors, detectionHistory, loading } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchAllPatients());
    dispatch(fetchAllDoctors());
    dispatch(fetchAllDetectionHistory());
  }, [dispatch]);

  return (
    <div className="flex flex-col font-semibold md:flex-row h-screen bg-gray-100">
      {!isMobile && <AdminSidebar />}
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center">
              <span className="mr-2 text-sm md:text-base font-semibold text-gray-600">Welcome, Admin Soham</span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm md:text-base">
                {user?.email?.charAt(0)?.toUpperCase() || "S"}
              </div>
            </div>
          </div>
        </header>

        <main className="p-3 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 flex items-center">
              <div className="rounded-full bg-blue-100 p-2 md:p-3 mr-3 md:mr-4">
                <FiUsers className="text-blue-600 text-lg md:text-xl" />
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-gray-500">Total Patients</h3>
                <p className="text-lg md:text-2xl font-bold">{loading ? "..." : patients.length}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 flex items-center">
              <div className="rounded-full bg-green-100 p-2 md:p-3 mr-3 md:mr-4">
                <FiUserPlus className="text-green-600 text-lg md:text-xl" />
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-gray-500">Total Doctors</h3>
                <p className="text-lg md:text-2xl font-bold">{loading ? "..." : doctors.length}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 flex items-center">
              <div className="rounded-full bg-purple-100 p-2 md:p-3 mr-3 md:mr-4">
                <FiImage className="text-purple-600 text-lg md:text-xl" />
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-gray-500">Total Detections</h3>
                <p className="text-lg md:text-2xl font-bold">{loading ? "..." : detectionHistory.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Recent Patients</h2>
            {loading ? (
              <p>Loading...</p>
            ) : patients.length === 0 ? (
              <p>No patients found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>

                          <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>

                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.slice(0, 5).map((patient) => (
                      <tr key={patient._id}>
                        <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm">{patient.name}</td>
                        <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm">{patient.email}</td>
                            <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm">{patient.location}</td>
                            <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm">
                              {new Date(patient.createdAt).toLocaleDateString()}
                            </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg mb-36 shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Recent Doctors</h2>
            {loading ? (
              <p>Loading...</p>
            ) : doctors.length === 0 ? (
              <p>No doctors found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>

                          <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
                          <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>

                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {doctors.slice(0, 5).map((doctor) => (
                      <tr key={doctor._id}>
                        <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm">{doctor.name}</td>
                        <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm">{doctor.email}</td>
                            <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm">{doctor.qualification}</td>
                            <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm">{doctor.experience} years</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {isMobile && <AdminSidebar />}
    </div>
  );
};

export default AdminDashboard;