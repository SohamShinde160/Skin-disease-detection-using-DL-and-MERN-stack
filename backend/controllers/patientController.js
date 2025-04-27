const Patient = require("../models/patientModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const { sendEmail } = require("../utils/emailSender");
const Doctor = require("../models/doctorModel");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerPatient = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    if (!name || !email || !password || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const patient = await Patient.create({ name, email, password, location });
    const token = generateToken(patient._id);

    res.status(201).json({ message: "Patient registered successfully", token, patient });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });

    if (!patient || !(await patient.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(patient._id);
    res.cookie("jwt", token, { httpOnly: true, secure: false, sameSite: "lax" });

    res.status(200).json({ message: "Login successful", token, patient });
  } catch (error) {
    console.error("Patient Login Error:", error); 
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logoutPatient = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};

const updateProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const { age, gender, mobileNo, location } = req.body;

    if (req.file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
      patient.profilePic = cloudinaryResponse.secure_url;
    }

    patient.age = age || patient.age;
    patient.gender = gender || patient.gender;
    patient.mobileNo = mobileNo || patient.mobileNo;
    patient.location = location || patient.location;

    await patient.save();
    res.status(200).json({ message: "Profile updated successfully", patient });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select("-password");
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

const findDermatologists = async (req, res) => {
  try {
    const { location } = req.body;
    const googleSearchUrl = `https://www.google.com/search?q=skin+doctors+in+${location}`;
    res.status(200).json({ message: "Search URL generated", url: googleSearchUrl });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllDoctorsList = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("name email qualification experience location profilePic");
    
    if (!doctors.length) {
      return res.status(404).json({ message: "No doctors available at the moment" ,  doctors: []});
    }

    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// console.log("updateProfile function con:", updateProfile);
module.exports = {
  registerPatient,
  loginPatient,
  logoutPatient,
  updateProfile,
  findDermatologists,
  getAllDoctorsList,
  getPatientProfile
};
