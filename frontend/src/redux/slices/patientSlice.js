import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPatientProfile,
  updatePatientProfile,
  getAllDoctors,
  bookAppointment,
  getMyAppointments,
  getDetectionHistory,
  confirmAppointment,
  uploadSkinImage,
} from "../../services/patientService";

export const fetchPatientProfile = createAsyncThunk("patient/fetchProfile", async (_, thunkAPI) => {
  try {
    return await getPatientProfile();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateProfile = createAsyncThunk("patient/updateProfile", async (updatedData, thunkAPI) => {
  try {
    return await updatePatientProfile(updatedData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const confirmPatientAppointment = createAsyncThunk(
    "patient/confirmAppointment",
    async ({ appointmentId, status }, thunkAPI) => {
      try {
        return await confirmAppointment(appointmentId, status);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  export const detectSkinDisease = createAsyncThunk(
    "patient/detectDisease",
    async (imageFile, thunkAPI) => {
      try {
        return await uploadSkinImage(imageFile);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Image upload failed");
      }
    }
  );  

export const fetchDoctors = createAsyncThunk("patient/fetchDoctors", async (_, thunkAPI) => {
  try {
    const response = await getAllDoctors();
    return response; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch doctors");
  }
});

export const bookNewAppointment = createAsyncThunk("patient/bookAppointment", async ({ doctorId, date, time }, thunkAPI) => {
  try {
    return await bookAppointment(doctorId, date, time);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchMyAppointments = createAsyncThunk("patient/fetchAppointments", async (_, thunkAPI) => {
  try {
    return await getMyAppointments();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchDetectionHistory = createAsyncThunk("patient/fetchDetectionHistory", async (_, thunkAPI) => {
  try {
    return await getDetectionHistory();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  profile: null,
  doctors: [],
  appointments: [],
  detectionHistory: [],
  confirmedAppointments: [],
  diseaseResult: null,
  loading: false,
  error: null,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        console.log("Fetched doctors:", action.payload); 
        state.doctors = Array.isArray(action.payload) ? action.payload : []; 
        state.loading = false;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.error = action.payload;
        state.doctors = [];
        state.loading = false;
      })

      .addCase(bookNewAppointment.pending, (state) => { state.loading = true; })
      .addCase(bookNewAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = [...state.appointments, action.payload];  
      })
      .addCase(bookNewAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMyAppointments.pending, (state) => { state.loading = true; })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.map(appt => ({
          ...appt,
          doctor: appt.doctor || { name: "Unknown", email: "" }, 
        }));
      })      
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDetectionHistory.pending, (state) => { state.loading = true; })
      .addCase(fetchDetectionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.detectionHistory = action.payload;
      })
      .addCase(fetchDetectionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(confirmPatientAppointment.pending, (state) => { state.loading = true; })
      .addCase(confirmPatientAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.confirmedAppointments.push(action.payload);
      })
      .addCase(confirmPatientAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(detectSkinDisease.pending, (state) => { state.loading = true; })
      .addCase(detectSkinDisease.fulfilled, (state, action) => {
        state.loading = false;
        state.diseaseResult = action.payload;
      })
      .addCase(detectSkinDisease.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default patientSlice.reducer;
