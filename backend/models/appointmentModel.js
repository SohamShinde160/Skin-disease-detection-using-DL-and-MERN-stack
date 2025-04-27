const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientName: { type: String, required: true },
    patientAge: { type: Number, default: 0 },
    patientGender: { type: String, default: "Not Specified" },
    patientLocation: { type: String, default: "Not Specified" },
    patientMobileNo: { type: String, default: "Not Provided" },
    detectedDisease: { type: String, default: "No Disease Detected" },
    diseaseImage: { type: String, default: "" },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Confirmed", "Rejected", "Rescheduled"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
