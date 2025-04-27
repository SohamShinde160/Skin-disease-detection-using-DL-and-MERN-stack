import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientProfile, updateProfile } from "../../redux/slices/patientSlice";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loader from "../Loader";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.patient);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    mobileNo: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    dispatch(fetchPatientProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        location: profile.location || "",
        mobileNo: profile.mobileNo || "",
        age: profile.age || "",
        gender: profile.gender || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData)).unwrap(); // unwrap to catch success/failure
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile!");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col md:flex-row font-semibold min-h-screen bg-[#fdfdfd]">
      <Sidebar />
      <div className="flex-1 p-4 pb-28 md:pb-6">
        <Navbar />
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-6xl mx-auto mt-6 p-4 md:p-6 shadow-md rounded-md flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Form Section */}
          <div className="bg-gray-50 w-full max-w-md shadow-xl p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">Edit Profile</h2>

            <label className="block mb-2">Name:</label>
            <input type="text" name="name" value={formData.name} className="border p-2 w-full mb-3" disabled />

            <label className="block mb-2">Email:</label>
            <input type="email" name="email" value={formData.email} className="border p-2 w-full mb-3" disabled />

            <label className="block mb-2">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            <label className="block mb-2">Mobile:</label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            <label className="block mb-2">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            <label className="block mb-2">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full">
              Update Profile
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full max-w-xs lg:max-w-sm">
            <img
              src="img/ai-bot.png"
              width={420}
              height={420}
              alt="AI Bot"
              className="w-full h-auto object-contain"
            />
          </div>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default EditProfile;
