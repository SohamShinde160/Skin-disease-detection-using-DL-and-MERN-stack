import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPatients, getAllDoctors, getAllDetectionHistory } from "../../services/adminService";

export const fetchAllPatients = createAsyncThunk(
  "admin/fetchAllPatients",
  async (_, thunkAPI) => {
    try {
      const response = await getAllPatients();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch patients");
    }
  }
);

export const fetchAllDoctors = createAsyncThunk(
  "admin/fetchAllDoctors",
  async (_, thunkAPI) => {
    try {
      const response = await getAllDoctors();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch doctors");
    }
  }
);

export const fetchAllDetectionHistory = createAsyncThunk(
  "admin/fetchAllDetectionHistory",
  async (_, thunkAPI) => {
    try {
      const response = await getAllDetectionHistory();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch detection history");
    }
  }
);

const initialState = {
  patients: [],
  doctors: [],
  detectionHistory: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllDetectionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDetectionHistory.fulfilled, (state, action) => {
        state.detectionHistory = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllDetectionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
