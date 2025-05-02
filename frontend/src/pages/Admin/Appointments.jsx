import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSidebar";
import { fetchAllAppointments, deleteAppointmentThunk } from "../../redux/slices/adminSlice";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (appointments) {
      setFilteredAppointments(
        appointments.filter(
          (appointment) =>
            appointment.patientId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.doctorId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.appointmentDate?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [appointments, searchTerm]);

  const handleDeleteClick = (appointment) => {
    setDeleteConfirmation(appointment);
  };

  const confirmDelete = async () => {
    if (deleteConfirmation) {
      try {
        await dispatch(deleteAppointmentThunk(deleteConfirmation._id)).unwrap();
        toast.success("Appointment deleted successfully");
        setDeleteConfirmation(null);
      } catch (error) {
        toast.error(`Failed to delete appointment: ${error}`);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  return (
    <div className="flex flex-col font-semibold md:flex-row h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      {!isMobile && <AdminSidebar />}
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Appointment Management</h1>
        </header>

        <main className="p-4 md:p-6">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-lg md:text-xl font-bold">All Appointments</h2>
              <div className="relative w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search appointments..."
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
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No appointments found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                              {appointment.patientId?.name?.charAt(0).toUpperCase() || "P"}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm md:text-base">
                                {appointment.patientId?.name || "Unknown Patient"}
                              </div>
                              <div className="text-gray-500 text-xs md:text-sm">
                                {appointment.patientId?.email || "No email"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">
                              {appointment.doctorId?.name?.charAt(0).toUpperCase() || "D"}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm md:text-base">
                                {appointment.doctorId?.name || "Unknown Doctor"}
                              </div>
                              <div className="text-gray-500 text-xs md:text-sm">
                                {appointment.doctorId?.qualification || "No qualification"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs md:text-sm font-medium rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                            {appointment.status || "Unknown"}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteClick(appointment)}
                            className="text-red-600 hover:text-red-900 flex items-center text-sm md:text-base"
                          >
                            <FiTrash2 className="mr-1" />
                            <span>Delete</span>
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
      </div>
      
      {isMobile && <AdminSidebar />}
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to permanently delete this appointment? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
