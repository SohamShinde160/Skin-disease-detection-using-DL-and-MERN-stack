import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorProfile, updateDoctorProfileData } from "../../redux/slices/doctorSlice";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loader from "../Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.doctor);
  const [formData, setFormData] = useState({
    location: "",
    age: "",
    gender: "",
    achievements: "",
    experience: "",
    profilePic: null,
  });

  useEffect(() => {
    dispatch(fetchDoctorProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        location: profile.location || "",
        age: profile.age || "",
        gender: profile.gender || "",
        achievements: profile.achievements || "",
        experience: profile.experience || "",
        profilePic: profile.profilePic || null,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("location", formData.location);
    updatedData.append("age", formData.age);
    updatedData.append("gender", formData.gender);
    updatedData.append("achievements", formData.achievements);
    updatedData.append("experience", formData.experience);
    if (formData.profilePic && formData.profilePic instanceof File) {
      updatedData.append("profilePic", formData.profilePic);
    }
  
    await dispatch(updateDoctorProfileData(updatedData));
    dispatch(fetchDoctorProfile()); // ✅ After update, refetch doctor profile again
    toast.success("Profile Updated Successfully!");
  };
  
  if (loading) return <Loader />;

  return (
    <div className="flex flex-col md:flex-row font-semibold min-h-screen bg-[#fdfdfd]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
        <h2 className="text-2xl md:text-3xl font-bold my-6 text-center md:text-left text-gray-800">
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 md:p-6 shadow-md rounded-md w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Form Section */}
          <div className="w-full max-w-md">
            <label className="block mb-2">Profile Picture:</label>
            <input
              type="file"
              name="profilePic"
              onChange={handleFileChange}
              className="border p-2 w-full mb-3"
            />
            {formData.profilePic && (
              <img
                src={
                  formData.profilePic instanceof File
                    ? URL.createObjectURL(formData.profilePic)
                    : formData.profilePic
                }
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
            )}

            <label className="block mb-2">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
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

            <label className="block mb-2">Experience (Years):</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="border p-2 w-full mb-3"
            />

            <label className="block mb-2">Achievements:</label>
            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
            ></textarea>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full transition"
            >
              Update Profile
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full max-w-sm">
            <img
              src="img/doctos.png"
              width={490}
              height={490}
              alt="Doctor"
              className="w-full h-auto object-contain"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
