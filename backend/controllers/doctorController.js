const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const DetectionHistory = require("../models/detectionHistoryModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/emailSender");
const Patient = require('../models/patientModel');
const cloudinary = require("../config/cloudinary");

const generateToken = (id) => {
  return jwt.sign({ id, role: "doctor" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const doctorSignup = async (req, res) => {
  try {
    const { name, email, password, qualification, experience, location } = req.body;

    if (!name || !email || !password || !qualification || !experience || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) return res.status(400).json({ message: "Doctor already exists" });

    const doctor = await Doctor.create({
      name,
      email,
      password,  
      qualification,
      experience,
      location,
    });

    const token = generateToken(doctor._id);
    res.status(201).json({ message: "Doctor registered successfully", doctor, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      console.log("Login Failed: Doctor not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await doctor.matchPassword(password);

    if (!isMatch) {
      console.log("Login Failed: Password does not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(doctor._id);
    res.cookie("doctorToken", token, { httpOnly: true, secure: false, sameSite: "lax" });

    res.status(200).json({
      message: "Login successful",
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        qualification: doctor.qualification,
        experience: doctor.experience,
        location: doctor.location,
      },
      token,
    });
  } catch (error) {
    console.error("Doctor Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const doctorLogout = (req, res) => {
  res.clearCookie("doctorToken").status(200).json({ message: "Doctor logged out" });
};

const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (req.body.location) doctor.location = req.body.location;
    if (req.body.age) doctor.age = Number(req.body.age);
    if (req.body.gender) doctor.gender = req.body.gender;
    if (req.body.achievements) doctor.achievements = req.body.achievements;
    if (req.body.experience) doctor.experience = Number(req.body.experience);

    if (req.file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
      doctor.profilePic = cloudinaryResponse.secure_url;
    }

    await doctor.save();

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id })
      .populate("patientId", "name age gender location mobileNo")
      .populate("doctorId", "name email");

    if (!appointments || appointments.length === 0) {
      return res.status(200).json([]); 
    }

    res.status(200).json(appointments); 
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
    try {
      const { appointmentId, status, newDate, newTime } = req.body;
  
      if (!["Confirmed", "Rejected", "Rescheduled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) return res.status(404).json({ message: "Appointment not found" });

      if (status === "Rescheduled") {
        if (!newDate || !newTime) return res.status(400).json({ message: "New date and time required" });
        appointment.date = newDate;
        appointment.time = newTime;
      }
  
      appointment.status = status;
      await appointment.save();
  
      const patient = await Patient.findById(appointment.patientId);
      let emailSubject, emailMessage;
  
      if (status === "Confirmed") {
        emailSubject = "Appointment Confirmed ✅";
        emailMessage = `Dear ${patient.name},\n\nYour appointment with Dr. ${req.user.name} on ${appointment.date} at ${appointment.time} has been confirmed.`;
      } else if (status === "Rejected") {
        emailSubject = "Appointment Rejected ❌";
        emailMessage = `Dear ${patient.name},\n\nUnfortunately, your appointment with Dr. ${req.user.name} has been rejected.`;
      } else if (status === "Rescheduled") {
        emailSubject = "Appointment Rescheduled 🔄";
        emailMessage = `Dear ${patient.name},\n\nYour appointment with Dr. ${req.user.name} has been rescheduled to ${appointment.date} at ${appointment.time}.`;
      }
  
      await sendEmail(patient.email, emailSubject, emailMessage);
  
      res.status(200).json({ message: `Appointment ${status.toLowerCase()}`, appointment });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = { doctorSignup, doctorLogin, doctorLogout, updateDoctorProfile, getDoctorAppointments, updateAppointmentStatus };
