const express = require("express");
const {
  registerPatient,
  loginPatient,
  logoutPatient,
  updateProfile,
  findDermatologists,
  getAllDoctorsList,
  getPatientProfile,
} = require("../controllers/patientController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
// console.log("Debug: protect middleware ->", protect); 
router.post("/register", registerPatient);
router.post("/login", loginPatient);
router.post("/logout", logoutPatient);

// console.log("updateProfile function:", updateProfile);

router.get("/profile", protect, getPatientProfile);
router.put("/update-profile", protect, updateProfile);
router.post("/find-dermatologists", findDermatologists);
router.get("/doctors", protect, getAllDoctorsList);

module.exports = router;
