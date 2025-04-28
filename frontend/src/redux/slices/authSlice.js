import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patientLogin, doctorLogin, adminLogin } from "../../services/authService";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

export const patientLoginThunk = createAsyncThunk(
  "auth/patientLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await patientLogin(email, password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const doctorLoginThunk = createAsyncThunk(
  "auth/doctorLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await doctorLogin(email, password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Doctor Login failed");
    }
  }
);

export const adminLoginThunk = createAsyncThunk(
  "auth/adminLogin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await adminLogin(email, password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Admin Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.role = action.payload.role;
      state.user = action.payload.user;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(patientLoginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(patientLoginThunk.fulfilled, (state, action) => {
        console.log("Patient Login success:", action.payload);
        state.user = action.payload.patient;
        state.token = action.payload.token;
        state.role = "patient";
        state.isAuthenticated = true;
        state.isLoading = false;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", "patient");
      })
      .addCase(patientLoginThunk.rejected, (state, action) => {
        console.error("Patient Login failed:", action.payload);
        state.user = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(doctorLoginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(doctorLoginThunk.fulfilled, (state, action) => {
        console.log("Doctor Login success:", action.payload);
        state.user = action.payload.doctor;
        state.token = action.payload.token;
        state.role = "doctor";
        state.isAuthenticated = true;
        state.isLoading = false;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", "doctor");
      })
      .addCase(doctorLoginThunk.rejected, (state, action) => {
        console.error("Doctor Login failed:", action.payload);
        state.user = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(adminLoginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminLoginThunk.fulfilled, (state, action) => {
        console.log("Admin Login success:", action.payload);
        state.user = action.payload.admin;
        state.token = action.payload.token;
        state.role = "admin";
        state.isAuthenticated = true;
        state.isLoading = false;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", "admin");
      })
      .addCase(adminLoginThunk.rejected, (state, action) => {
        console.error("Admin Login failed:", action.payload);
        state.user = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
