import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPatients,
  getAllDoctors,
  getAllDetectionHistory,
  deletePatient,
  deleteDoctor,
  deleteDetectionHistory,
  getAllAppointments,
  deleteAppointment
} from "../../services/adminService";

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

export const deletePatientThunk = createAsyncThunk(
  "admin/deletePatient",
  async (patientId, thunkAPI) => {
    try {
      await deletePatient(patientId);
      return patientId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete patient");
    }
  }
);

export const deleteDoctorThunk = createAsyncThunk(
  "admin/deleteDoctor",
  async (doctorId, thunkAPI) => {
    try {
      await deleteDoctor(doctorId);
      return doctorId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete doctor");
    }
  }
);

export const deleteDetectionHistoryThunk = createAsyncThunk(
  "admin/deleteDetectionHistory",
  async (recordId, thunkAPI) => {
    try {
      await deleteDetectionHistory(recordId);
      return recordId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete detection history");
    }
  }
);

export const fetchAllAppointments = createAsyncThunk(
  "admin/fetchAllAppointments",
  async (_, thunkAPI) => {
    try {
      const response = await getAllAppointments();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch appointments");
    }
  }
);

export const deleteAppointmentThunk = createAsyncThunk(
  "admin/deleteAppointment",
  async (appointmentId, thunkAPI) => {
    try {
      await deleteAppointment(appointmentId);
      return appointmentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete appointment");
    }
  }
);

const initialState = {
  patients: [],
  doctors: [],
  detectionHistory: [],
  appointments: [],
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
      })

      // Delete patient cases
      .addCase(deletePatientThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePatientThunk.fulfilled, (state, action) => {
        state.patients = state.patients.filter(patient => patient._id !== action.payload);
        state.loading = false;
      })
      .addCase(deletePatientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete doctor cases
      .addCase(deleteDoctorThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctorThunk.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(doctor => doctor._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteDoctorThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete detection history cases
      .addCase(deleteDetectionHistoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDetectionHistoryThunk.fulfilled, (state, action) => {
        state.detectionHistory = state.detectionHistory.filter(record => record._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteDetectionHistoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch appointments cases
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete appointment cases
      .addCase(deleteAppointmentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointmentThunk.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter(appointment => appointment._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteAppointmentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
