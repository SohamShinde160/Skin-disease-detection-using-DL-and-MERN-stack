const express = require("express");
const {
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
} = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);

// Get all data
router.get("/patients", protectAdmin, getAllPatients);
router.get("/doctors", protectAdmin, getAllDoctors);
router.get("/detection-history", protectAdmin, getAllDetectionHistory);

// Appointments routes
router.get("/appointments", protectAdmin, getAllAppointments);
router.delete("/appointments/:appointmentId", protectAdmin, deleteAppointment);

// Delete endpoints
router.delete("/patients/:patientId", protectAdmin, deletePatient);
router.delete("/doctors/:doctorId", protectAdmin, deleteDoctor);
router.delete("/detection-history/:recordId", protectAdmin, deleteDetectionHistory);

module.exports = router;
