import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../redux/slices/patientSlice";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loader from "../Loader";

const BookAppointment = () => {
  const dispatch = useDispatch();
  const { doctors, loading } = useSelector((state) => state.patient);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleBookNow = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  const doctorsList = Array.isArray(doctors) ? doctors : [];

  return (
    <div className="flex flex-col md:flex-row bg-[#fdfdfdf3] min-h-screen font-semibold">
      <Sidebar />
      <div className="flex-1 p-4 pb-28 md:pb-6">
        <Navbar />
        <h2 className="text-2xl md:text-3xl font-bold my-6 text-center md:text-left">Available Doctors</h2>

        {loading ? (
          <div className="text-center">
            <p className="text-gray-700 mb-2">Loading doctors...</p>
            <Loader />
          </div>
        ) : doctorsList.length === 0 ? (
          <p className="text-center text-gray-600">No doctors available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctorsList.map((doctor) => (
              <div
                key={doctor._id}
                className="p-4 border-gray-300 border-2 rounded-md shadow-xl bg-white flex flex-col items-center text-center"
              >
                <img
                  src={doctor.profilePic || "/default-profile.png"}
                  alt="Doctor"
                  className="w-24 h-24 border-gray-300 border-2 object-cover rounded-full mb-3"
                />
                <h3 className="text-lg font-bold">{doctor.name}</h3>
                <p className="text-gray-700">{doctor.qualification}</p>
                <p className="text-gray-600">{doctor.experience} years experience</p>
                <p className="text-blue-600 mb-3 break-words">{doctor.email}</p>
                <p className="text-gray-900 bg-gray-200 rounded-md p-2 break-words"><span className="font-bold">Address :</span> {doctor.location}</p>
                <button
                  onClick={() => handleBookNow(doctor._id)}
                  className="bg-blue-500 font-semibold text-white px-4 py-2 rounded w-full mt-4 hover:bg-blue-600 transition"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
