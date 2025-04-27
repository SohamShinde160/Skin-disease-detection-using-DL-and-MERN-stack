const express = require("express");
const {
  doctorSignup,
  doctorLogin,
  doctorLogout,
  updateDoctorProfile,
  getDoctorAppointments,
  updateAppointmentStatus
} = require("../controllers/doctorController");
const { protectDoctor } = require("../middleware/authMiddleware");
const multer = require("multer");
const Doctor = require("../models/doctorModel");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/signup", doctorSignup);
router.post("/login", doctorLogin);
router.post("/logout", doctorLogout);
router.put("/update-profile", protectDoctor, upload.single("profilePic"), updateDoctorProfile);
router.get("/appointments", protectDoctor, getDoctorAppointments);
router.post("/update-appointment", protectDoctor, updateAppointmentStatus);
router.get("/profile", protectDoctor, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id).select("-password");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;