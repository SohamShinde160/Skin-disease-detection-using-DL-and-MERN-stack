import axiosInstance from "./axiosInstance";

export const getDoctorAppointments = async () => {
  const response = await axiosInstance.get("/appointments/doctor-appointments");
  return Array.isArray(response.data) ? response.data : [];
};

export const updateAppointmentStatus = async (appointmentId, status, date, time) => {
  const response = await axiosInstance.post(
    "/appointments/confirm",
    { appointmentId, status, date, time }
  );
  return response.data;
};

export const getDoctorProfile = async () => {
  const response = await axiosInstance.get("/doctors/profile");
  return response.data;
};

export const updateDoctorProfile = async (updatedData) => {
  const response = await axiosInstance.put(
    "/doctors/update-profile",
    updatedData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
