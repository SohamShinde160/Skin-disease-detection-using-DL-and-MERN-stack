import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoctorAppointments, updateAppointmentStatus, getDoctorProfile, updateDoctorProfile } from "../../services/doctorService";

export const fetchDoctorAppointments = createAsyncThunk(
  "doctor/fetchAppointments",
  async (_, thunkAPI) => {
    try {
      return await getDoctorAppointments();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changeAppointmentStatus = createAsyncThunk(
  "doctor/updateAppointmentStatus",
  async ({ appointmentId, status, date, time }, thunkAPI) => {
    try {
      const updatedAppointment = await updateAppointmentStatus(appointmentId, status, date, time);
      return updatedAppointment.appointment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDoctorProfile = createAsyncThunk("doctor/fetchProfile", async (_, thunkAPI) => {
  try {
    return await getDoctorProfile();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateDoctorProfileData = createAsyncThunk("doctor/updateProfile", async (updatedData, thunkAPI) => {
  try {
    return await updateDoctorProfile(updatedData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  appointments: [],
  profile: null,
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorAppointments.pending, (state) => { state.loading = true; })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = Array.isArray(action.payload) ? action.payload : []; 
      })      
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(changeAppointmentStatus.pending, (state) => { state.loading = true; })
      .addCase(changeAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.map((appt) =>
          appt._id === action.payload._id ? action.payload : appt
        );
      })
      .addCase(changeAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchDoctorProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchDoctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchDoctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDoctorProfileData.pending, (state) => { state.loading = true; })
      .addCase(updateDoctorProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateDoctorProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorSlice.reducer;
