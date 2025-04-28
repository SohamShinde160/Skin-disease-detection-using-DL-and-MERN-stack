import axiosInstance from "./axiosInstance";

export const getPatientProfile = async () => {
  const response = await axiosInstance.get("/patients/profile");
  return response.data;
};

export const updatePatientProfile = async (updatedData) => {
  const response = await axiosInstance.put("/patients/update-profile", updatedData);
  return response.data;
};

export const getAllDoctors = async () => {
  const response = await axiosInstance.get("/patients/doctors");
  return response.data.doctors || [];
};

export const bookAppointment = async (doctorId, date, time) => {
  const response = await axiosInstance.post("/appointments/book", {
    doctorId,
    date,
    time,
    detectedDisease: "",
    diseaseImage: "",
  });
  return response.data;
};

export const getMyAppointments = async () => {
  const response = await axiosInstance.get("/appointments/my-appointments");
  return Array.isArray(response.data)
    ? response.data.map((appt) => ({
        ...appt,
        doctor: appt.doctorId || {},
      }))
    : [];
};

export const getDetectionHistory = async () => {
  const response = await axiosInstance.get("/detection-history/history");
  return response.data;
};

export const confirmAppointment = async (appointmentId, status) => {
  const response = await axiosInstance.post("/appointments/confirm", { appointmentId, status });
  return response.data;
};

export const uploadSkinImage = async (imageFile) => {
  try {
    const response = await axiosInstance.post("/detection-history/upload", imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Image Upload Failed:", error.response?.data || error);
    throw error;
  }
};
