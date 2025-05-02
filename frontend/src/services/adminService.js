import axiosInstance from "./axiosInstance";

export const getAllPatients = async () => {
  const response = await axiosInstance.get("/admin/patients");
  return response.data;
};

export const getAllDoctors = async () => {
  const response = await axiosInstance.get("/admin/doctors");
  return response.data;
};

export const getAllDetectionHistory = async () => {
  const response = await axiosInstance.get("/admin/detection-history");
  return response.data;
};

export const deletePatient = async (patientId) => {
  const response = await axiosInstance.delete(`/admin/patients/${patientId}`);
  return response.data;
};

export const deleteDoctor = async (doctorId) => {
  const response = await axiosInstance.delete(`/admin/doctors/${doctorId}`);
  return response.data;
};

export const deleteDetectionHistory = async (recordId) => {
  const response = await axiosInstance.delete(`/admin/detection-history/${recordId}`);
  return response.data;
};

export const getAllAppointments = async () => {
  const response = await axiosInstance.get("/admin/appointments");
  return response.data;
};

export const deleteAppointment = async (appointmentId) => {
  const response = await axiosInstance.delete(`/admin/appointments/${appointmentId}`);
  return response.data;
};
