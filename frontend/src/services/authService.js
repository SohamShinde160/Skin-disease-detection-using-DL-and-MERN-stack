import axiosInstance from "./axiosInstance";

export const patientSignup = async (userData) => {
  const response = await axiosInstance.post("/patients/register", userData);
  return response.data;
};

export const patientLogin = async (email, password) => {
  const response = await axiosInstance.post("/patients/login", { email, password });
  return response.data;
};

export const patientLogout = async () => {
  await axiosInstance.post("/patients/logout");
  return { message: "Patient logged out successfully" };
};

export const doctorSignup = async (userData) => {
  const response = await axiosInstance.post("/doctors/signup", userData);
  return response.data;
};

export const doctorLogin = async (email, password) => {
  const response = await axiosInstance.post("/doctors/login", { email, password });
  return response.data;
};

export const doctorLogout = async () => {
  await axiosInstance.post("/doctors/logout");
  return { message: "Doctor logged out successfully" };
};

export const adminLogin = async (email, password) => {
  const response = await axiosInstance.post("/admin/login", { email, password });
  return response.data;
};

export const adminLogout = async () => {
  await axiosInstance.post("/admin/logout");
  return { message: "Admin logged out successfully" };
};
