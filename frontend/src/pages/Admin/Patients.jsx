import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import { fetchAllPatients } from "../../redux/slices/adminSlice";
import { FiSearch } from "react-icons/fi";

const AdminPatients = () => {
  const dispatch = useDispatch();
  const { patients, loading } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
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
    dispatch(fetchAllPatients());
  }, [dispatch]);

  useEffect(() => {
    if (patients) {
      setFilteredPatients(
        patients.filter(
          (patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [patients, searchTerm]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {!isMobile && <AdminSidebar />}
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Patient Details</h1>
        </header>

        <main className="p-4 md:p-6">
          <div className="bg-white rounded-lg shadow-md p-4 mb-28 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold">All Patients</h2>
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search patients..."
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
            ) : filteredPatients.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No patients found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>

                          <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                          <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                          <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                          <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>

                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                      <tr key={patient._id}>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-2 md:mr-3 text-sm md:text-base">
                              {patient.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-sm md:text-base">{patient.name}</div>
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">{patient.email}</td>

                            <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">{patient.gender || "Not specified"}</td>
                            <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">{patient.age || "Not specified"}</td>
                            <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">{patient.location}</td>
                            <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">{patient.mobileNo || "Not provided"}</td>
                            <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm md:text-base">
                              {new Date(patient.createdAt).toLocaleDateString()}
                            </td>

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

export default AdminPatients;