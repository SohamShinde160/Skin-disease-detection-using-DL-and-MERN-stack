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
