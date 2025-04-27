const express = require("express");
const { bookAppointment, getPatientAppointments, confirmAppointment, getDoctorAppointments } = require("../controllers/appointmentController");
const { protect , protectDoctor} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/book", protect, bookAppointment);
router.get("/my-appointments", protect, getPatientAppointments);
router.post("/confirm", protectDoctor, confirmAppointment);
router.get("/doctor-appointments", protectDoctor, getDoctorAppointments);

module.exports = router;
