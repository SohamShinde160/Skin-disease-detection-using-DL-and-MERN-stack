import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookNewAppointment } from "../../redux/slices/patientSlice";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (!appointmentData.date || !appointmentData.time) {
      toast.error("Please select a date and time.");
      return;
    }

    dispatch(bookNewAppointment({ doctorId, date: appointmentData.date, time: appointmentData.time }));
    toast.success("Appointment booked successfully!");

    setTimeout(() => {
      navigate("/my-appointments");
    }, 2000);
  };

  return (
    <div className="flex flex-col md:flex-row font-semibold min-h-screen bg-[#fdfdfd]">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Sidebar />
      <div className="flex-1 p-4 pb-28 md:pb-6">
        <Navbar />
        <h2 className="text-2xl md:text-3xl text-center md:text-left font-bold my-6 text-gray-800">
          Select Appointment Date & Time
        </h2>

        <div className="bg-white border-gray-200 border-2 p-6 shadow-xl rounded-md w-full max-w-md mx-auto">
          <label className="block font-semibold mb-2">Select Date:</label>
          <input
            type="date"
            name="date"
            min={today}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:ring-2 focus:ring-blue-500"
          />

          <label className="block font-semibold mb-2">Select Time:</label>
          <input
            type="time"
            name="time"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleConfirm}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full transition"
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAppointment;
