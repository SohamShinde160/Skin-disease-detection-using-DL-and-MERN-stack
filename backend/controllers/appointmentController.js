const Appointment = require("../models/appointmentModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const { sendEmail } = require("../utils/emailSender");
const DetectionHistory = require("../models/detectionHistoryModel");

const generateEmailHTML = (title, body) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="text-align: center; color: #4CAF50;">${title}</h2>
      <p style="font-size: 16px; color: #333;">${body}</p>
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #777; text-align: center;">
        Thank you for using SkinCare App | AI Dermatologist.
      </p>
    </div>
  `;
};

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patient = await Patient.findById(req.user.id);
    const doctor = await Doctor.findById(doctorId);

    if (!patient || !doctor) {
      return res.status(404).json({ message: "Doctor or Patient not found" });
    }

    const latestDetection = await DetectionHistory.findOne({ patientId: patient._id })
      .sort({ createdAt: -1 })
      .limit(1);

    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId: doctor._id,
      patientName: patient.name,
      patientAge: patient.age || 0,
      patientGender: patient.gender || "Not Specified",
      patientLocation: patient.location || "Not Specified",
      patientMobileNo: patient.mobileNo || "Not Provided",
      detectedDisease: latestDetection ? latestDetection.detectedDisease : "No Disease Detected",
      diseaseImage: latestDetection ? latestDetection.imageUrl : "",
      date,
      time,
      status: "Pending",
    });

    // Email to Doctor
    const doctorSubject = "New Appointment Request";
    const doctorText = `You have received a new appointment request from ${patient.name} for ${date} at ${time}.`;
    const doctorHTML = generateEmailHTML(
      "New Appointment Request",
      `You have received a new appointment request from <b>${patient.name}</b>.<br>
      <b>Date:</b> ${date}<br>
      <b>Time:</b> ${time}<br><br>
      Please login to your dashboard for more details.`
    );
    await sendEmail(doctor.email, doctorSubject, doctorText, doctorHTML);

    // Email to Patient
    const patientSubject = "Appointment Booked Successfully";
    const patientText = `Your appointment with Dr. ${doctor.name} has been booked for ${date} at ${time}. Status: Pending.`;
    const patientHTML = generateEmailHTML(
      "Appointment Booked",
      `Your appointment with <b>Dr. ${doctor.name}</b> has been successfully booked.<br>
      <b>Date:</b> ${date}<br>
      <b>Time:</b> ${time}<br>
      <b>Status:</b> Pending<br><br>
      Please wait for confirmation from the doctor.`
    );
    await sendEmail(patient.email, patientSubject, patientText, patientHTML);

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error("Appointment Booking Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user.id })
      .populate("doctorId", "name email qualification experience location profilePic");

    if (!appointments || appointments.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(
      appointments.map(appt => ({
        ...appt.toObject(),
        doctor: appt.doctorId || {},
      }))
    );
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const confirmAppointment = async (req, res) => {
  try {
    const { appointmentId, status, date, time } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (status === "Rescheduled") {
      if (!date || !time) {
        return res.status(400).json({ message: "New date and time are required for rescheduling" });
      }
      appointment.date = date;
      appointment.time = time;
    }

    appointment.status = status;
    await appointment.save();

    const patient = await Patient.findById(appointment.patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    let emailSubject = "";
    let emailText = "";
    let emailHTML = "";

    if (status === "Confirmed") {
      emailSubject = "Appointment Confirmed";
      emailText = `Your appointment has been confirmed for ${appointment.date} at ${appointment.time}.`;
      emailHTML = generateEmailHTML(
        "Appointment Confirmed",
        `Good news! Your appointment has been <b>confirmed</b>.<br>
        <b>Date:</b> ${appointment.date}<br>
        <b>Time:</b> ${appointment.time}`
      );
    } else if (status === "Rejected") {
      emailSubject = "Appointment Rejected";
      emailText = `Your appointment has been rejected. Please try booking again.`;
      emailHTML = generateEmailHTML(
        "Appointment Rejected",
        `We regret to inform you that your appointment request was <b>rejected</b>.<br>
        You can try booking with a different doctor.`
      );
    } else if (status === "Rescheduled") {
      emailSubject = "Appointment Rescheduled";
      emailText = `Your appointment has been rescheduled to ${appointment.date} at ${appointment.time}.`;
      emailHTML = generateEmailHTML(
        "Appointment Rescheduled",
        `Your appointment has been <b>rescheduled</b>.<br>
        <b>New Date:</b> ${appointment.date}<br>
        <b>New Time:</b> ${appointment.time}`
      );
    }

    await sendEmail(patient.email, emailSubject, emailText, emailHTML);

    res.status(200).json({ message: `Appointment ${status}`, appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id })
      .populate("patientId", "name age gender location email mobileNo")
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

module.exports = {
  bookAppointment,
  getPatientAppointments,
  confirmAppointment,
  getDoctorAppointments
};
