const mongoose = require("mongoose");

const detectionHistorySchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    imageUrl: { type: String, required: true },
    detectedDisease: { type: String, required: true },
    confidence: { type: String, default: "Unknown" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DetectionHistory", detectionHistorySchema);
