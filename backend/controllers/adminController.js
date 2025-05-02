const Admin = require("../models/adminModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const DetectionHistory = require("../models/detectionHistoryModel");
const Appointment = require("../models/appointmentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email });

    if (!admin && email === "rohitadmin45@ymail.com") {
      admin = await Admin.create({
        email: "rohitadmin45@ymail.com",
        password: "Rohitbhai@45"
      });
    }

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = generateToken(admin._id);
    res.cookie("adminToken", token, { httpOnly: true, secure: false, sameSite: "lax" });

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        _id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const adminLogout = (req, res) => {
  res.clearCookie("adminToken").status(200).json({ message: "Admin logged out" });
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("-password");
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllDetectionHistory = async (req, res) => {
  try {
    const detectionHistory = await DetectionHistory.find().populate("patientId", "name email");
    res.status(200).json(detectionHistory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a patient
const deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Delete all detection history records associated with this patient
    await DetectionHistory.deleteMany({ patientId });

    // Delete the patient
    const deletedPatient = await Patient.findByIdAndDelete(patientId);

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient and associated records deleted successfully" });
  } catch (error) {
    console.error("Delete Patient Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Delete the doctor
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Delete Doctor Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a detection history record
const deleteDetectionHistory = async (req, res) => {
  try {
    const { recordId } = req.params;

    // Delete the detection history record
    const deletedRecord = await DetectionHistory.findByIdAndDelete(recordId);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Detection history record not found" });
    }

    res.status(200).json({ message: "Detection history record deleted successfully" });
  } catch (error) {
    console.error("Delete Detection History Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email location")
      .populate("doctorId", "name email qualification experience");

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Get All Appointments Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Delete the appointment
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Delete Appointment Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  adminLogin,
  adminLogout,
  getAllPatients,
  getAllDoctors,
  getAllDetectionHistory,
  deletePatient,
  deleteDoctor,
  deleteDetectionHistory,
  getAllAppointments,
  deleteAppointment
};
