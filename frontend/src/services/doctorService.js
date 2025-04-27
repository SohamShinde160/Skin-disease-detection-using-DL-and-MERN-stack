import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const getDoctorAppointments = async () => {
  const response = await axios.get(`${API_URL}/appointments/doctor-appointments`, { withCredentials: true });

  return Array.isArray(response.data) ? response.data : []; 
};

export const updateAppointmentStatus = async (appointmentId, status, date, time) => {
  const response = await axios.post(
    `${API_URL}/appointments/confirm`,
    { appointmentId, status, date, time },
    { withCredentials: true ,headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
  );
  return response.data;
};


export const getDoctorProfile = async () => {
  const response = await axios.get(`${API_URL}/doctors/profile`, { withCredentials: true });
  return response.data;
};

export const updateDoctorProfile = async (updatedData) => {
  const response = await axios.put(
    `${API_URL}/doctors/update-profile`,
    updatedData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data", // ✅ VERY IMPORTANT
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

