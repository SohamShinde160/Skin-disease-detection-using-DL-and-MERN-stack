const Admin = require("../models/adminModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const DetectionHistory = require("../models/detectionHistoryModel");
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

module.exports = {
  adminLogin,
  adminLogout,
  getAllPatients,
  getAllDoctors,
  getAllDetectionHistory
};
