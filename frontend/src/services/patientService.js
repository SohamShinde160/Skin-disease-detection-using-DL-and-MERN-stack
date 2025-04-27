import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const getPatientProfile = async () => {
  const response = await axios.get(`${API_URL}/patients/profile`, { withCredentials: true });
  return response.data;
};

export const updatePatientProfile = async (updatedData) => {
  const response = await axios.put(`${API_URL}/patients/update-profile`, updatedData, { withCredentials: true });
  return response.data;
};

export const getAllDoctors = async () => {
  const response = await axios.get(`${API_URL}/patients/doctors`, { withCredentials: true });
  return response.data.doctors || [];
};

export const bookAppointment = async (doctorId, date, time) => {
  const response = await axios.post(
    `${API_URL}/appointments/book`,
    { doctorId, date, time, detectedDisease: "", diseaseImage: "" },
    { withCredentials: true }
  );
  return response.data;
};

export const getMyAppointments = async () => {
  const response = await axios.get(`${API_URL}/appointments/my-appointments`, { withCredentials: true });

  return Array.isArray(response.data) 
    ? response.data.map(appt => ({
        ...appt,
        doctor: appt.doctorId || {},
      })) 
    : [];
};

export const getDetectionHistory = async () => {
  const response = await axios.get(`${API_URL}/detection-history/history`, { withCredentials: true });
  return response.data;
};

export const confirmAppointment = async (appointmentId, status) => {
    const response = await axios.post(
      `${API_URL}/appointments/confirm`,
      { appointmentId, status },
      { withCredentials: true }
    );
    return response.data;
  };
  
  export const uploadSkinImage = async (imageFile) => {
    console.log("🚀 Preparing image for upload:", imageFile);
    try {
      const response = await axios.post(`${API_URL}/detection-history/upload`, imageFile, {
        withCredentials: true,
      });
      console.log("✅ Image Upload Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Image Upload Failed:", error.response?.data || error);
      throw error;
    }
  };
  
