const express = require("express");
const {
  adminLogin,
  adminLogout,
  getAllPatients,
  getAllDoctors,
  getAllDetectionHistory
} = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Auth routes
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

// Data routes (protected)
router.get("/patients", protectAdmin, getAllPatients);
router.get("/doctors", protectAdmin, getAllDoctors);
router.get("/detection-history", protectAdmin, getAllDetectionHistory);

module.exports = router;
