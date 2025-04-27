import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAppointments } from "../../redux/slices/patientSlice";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loader from "../Loader";

const MyAppointments = () => {
  const dispatch = useDispatch();
  const { appointments = [], loading } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row bg-[#fdfdfd] font-semibold min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 pb-28 md:pb-6">
        <Navbar />

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 my-6 text-center md:text-left">
          My Appointments
        </h2>

        {loading ? (
          <Loader />
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments booked yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 border-black text-gray-700 text-sm md:text-base">
                  <th className="border py-3 px-4 text-center">Doctor Name</th>
                  <th className="border py-3 px-4 text-center">Date</th>
                  <th className="border py-3 px-4 text-center">Time</th>
                  <th className="border py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-b text-center hover:bg-gray-50 transition text-sm md:text-base"
                  >
                    <td className="border py-3 px-4">{appointment.doctor?.name || "Unknown"}</td>
                    <td className="border py-3 px-4">{appointment.date}</td>
                    <td className="border py-3 px-4">{appointment.time}</td>
                    <td
                      className={`border py-3 px-4 ${
                        appointment.status === "Confirmed"
                          ? "text-green-600 bg-green-100 px-3 py-1 rounded-lg"
                          : "text-yellow-600 bg-yellow-100 px-3 py-1 rounded-lg"
                      }`}
                    >
                      {appointment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <img
            src="img/animated-doctor.gif"
            width={100}
            height={100}
            alt="Animated Doctor"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
