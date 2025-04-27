import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const patientSignup = async (userData) => {
  const response = await axios.post(`${API_URL}/patients/register`, userData);
  return response.data;
};

export const patientLogin = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/patients/login`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const patientLogout = async () => {
  await axios.post(`${API_URL}/patients/logout`, {}, { withCredentials: true });
  return { message: "Patient logged out successfully" };
};

export const doctorSignup = async (userData) => {
  const response = await axios.post(`${API_URL}/doctors/signup`, userData);
  return response.data;
};

export const doctorLogin = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/doctors/login`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const doctorLogout = async () => {
  await axios.post(`${API_URL}/doctors/logout`, {}, { withCredentials: true });
  return { message: "Doctor logged out successfully" };
};
