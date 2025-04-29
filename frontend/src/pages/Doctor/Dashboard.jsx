import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorAppointments, changeAppointmentStatus } from "../../redux/slices/doctorSlice";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loader from "../Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector((state) => state.doctor);
  const [editAppointment, setEditAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [zoomedImage, setZoomedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  const appointmentsList = Array.isArray(appointments) ? appointments : [];
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAppointments(appointmentsList);
    } else {
      const filtered = appointmentsList.filter((appointment) =>
        appointment.patientId?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAppointments(filtered);
    }
  }, [searchQuery, appointmentsList]);

  const handleUpdateStatus = (appointmentId, status, date = null, time = null) => {
    dispatch(changeAppointmentStatus({ appointmentId, status, date, time }));
    toast.success("Patient Notified!");
    setEditAppointment(null);
  };

  const handleImageZoom = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  return (
    <div className="flex flex-col md:flex-row font-semibold bg-gray-100 min-h-screen">
      <ToastContainer />
      <Sidebar />

      <div className="flex-1 p-4 pb-28 md:pb-6">
        <Navbar />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 mt-5 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center md:text-left">
            Appointments
          </h2>
          <div className="w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search by patient name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : filteredAppointments.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            {searchQuery.trim() === ""
              ? "No Appointments Available"
              : `No patient found with the name "${searchQuery}"`}
          </p>
        ) : (
          <div className="bg-white shadow-md font-semibold rounded-lg overflow-x-auto">
            <table className="min-w-full text-left border-gray-200">
              <thead>
                <tr className="bg-blue-500 text-white uppercase text-xs md:text-sm">
                  <th className="py-3  text-center px-2">Patient</th>
                  <th className="py-3  text-center px-2">Age</th>
                  <th className="py-3  text-center px-2">Gender</th>
                  <th className="py-3  text-center px-2">Location</th>
                  <th className="py-3  text-center px-2">Email</th>
                  <th className="py-3  text-center px-2">Mobile No</th>
                  <th className="py-3  text-center px-2">Disease</th>
                  <th className="py-3  text-center px-2">Image</th>
                  <th className="py-3  text-center px-2">Date</th>
                  <th className="py-3  text-center px-2">Time</th>
                  <th className="py-3  text-center px-2">Status</th>
                  <th className="py-3  px-2">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-700 text-xs md:text-sm">
                {filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-2 border-l border-gray-300 px-2">{appointment.patientId?.name || "Unknown"}</td>
                    <td className="py-2 border-l border-gray-300 px-2">{appointment.patientId?.age || "N/A"}</td>
                    <td className="py-2 border-l border-gray-300 px-2">{appointment.patientId?.gender || "N/A"}</td>
                    <td className="py-2 border-l border-gray-300 px-2">{appointment.patientId?.location || "N/A"}</td>
                    <td className="py-2 border-l border-gray-300 px-2 break-words">{appointment.patientId?.email || "N/A"}</td>
                    <td className="py-2 border-l border-gray-300 px-2">{appointment.patientId?.mobileNo || "N/A"}</td>
                    <td className="py-2 border-l border-gray-300 px-2 text-red-500">{appointment.detectedDisease || "No Disease Name"}</td>
                    <td className="py-2 border-l border-gray-300 px-2">
                      {appointment.diseaseImage ? (
                        <img
                          src={appointment.diseaseImage}
                          alt="Disease"
                          className="w-12 h-12 border-l border-gray-300 rounded-md object-cover cursor-pointer mx-auto"
                          onClick={() => handleImageZoom(appointment.diseaseImage)}
                        />
                      ) : (
                        <span className="text-red-500 ">Not Uploaded</span>
                      )}
                    </td>
                    <td className="py-2 border-l border-gray-300 px-4">{appointment.date}</td>
                    <td className="py-2 border-l border-gray-300 px-4">{appointment.time}</td>
                    <td className="py-2 border-l border-gray-300 px-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          appointment.status === "Confirmed"
                            ? "bg-green-500 text-white"
                            : appointment.status === "Rejected"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 border-l border-gray-300 flex flex-col gap-2 justify-center">
                      {appointment.status !== "Pending" ? (
                        <span className="text-green-600 text-center">Action Taken</span>
                      ) : editAppointment === appointment._id ? (
                        <>
                          <input
                            type="date"
                            min={today}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="border p-1 rounded-md w-full"
                          />
                          <input
                            type="time"
                            onChange={(e) => setNewTime(e.target.value)}
                            className="border p-1 rounded-md w-full"
                          />
                          <button
                            onClick={() => handleUpdateStatus(appointment._id, "Rescheduled", newDate, newTime)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition w-full"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditAppointment(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition w-full"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(appointment._id, "Confirmed")}
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition w-full"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(appointment._id, "Rejected")}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition w-full"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => setEditAppointment(appointment._id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition w-full"
                          >
                            Reschedule
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {zoomedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleCloseZoom}
          >
            <div className="relative w-[90%] md:w-[50%] max-w-4xl">
              <img src={zoomedImage} alt="Zoomed Disease" className="w-full h-auto rounded-lg" />
              <button
                onClick={handleCloseZoom}
                className="absolute top-4 right-4 bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
