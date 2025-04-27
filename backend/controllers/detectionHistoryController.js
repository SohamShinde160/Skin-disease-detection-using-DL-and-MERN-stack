const DetectionHistory = require("../models/detectionHistoryModel");
const cloudinary = require("../config/cloudinary");
const axios = require("axios");
const fs = require("fs");
const FormData = require('form-data');

const uploadDetectionImage = async (req, res) => {
  try {
    if (!req.file) {
      console.error("No file received!");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Received file:", req.file);
    const patientId = req.user.id;

    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = cloudinaryResponse.secure_url;
    console.log("✅ Image uploaded to Cloudinary:", imageUrl);

    let detectedDisease = "Unknown";
    let confidence = "0%";

    let compressedPath = null; // define compressedPath here to use later safely

    try {
      // 🛠 Compress the uploaded image first
      const sharp = require('sharp');
      compressedPath = `uploads/compressed_${Date.now()}.jpg`;

      await sharp(req.file.path)
        .resize({ width: 300, height: 300 }) // Resize image
        .jpeg({ quality: 70 })               // Compress image quality
        .toFile(compressedPath);

      const formData = new FormData();
      formData.append('image', fs.createReadStream(compressedPath));

      console.log("Sending compressed image to ML model...");
      const mlResponse = await axios.post('https://web-production-b5823.up.railway.app/predict', formData, {
        headers: {
          ...formData.getHeaders()
        },
        timeout: 60000 // ⏳ Increase timeout to 60 seconds
      });

      console.log("ML Model Response:", mlResponse.data);

      if (mlResponse.data && mlResponse.data.prediction) {
        detectedDisease = mlResponse.data.prediction;
        confidence = mlResponse.data.confidence || "Unknown";
      } else {
        console.warn("⚠️ ML Model did not return a prediction, using default value");
      }

    } catch (mlError) {
      console.error("❌ ML Model Error:", mlError.message);
      if (mlError.response) {
        console.error("Error response:", mlError.response.data);
      }
      console.warn("⚠️ Using default disease value due to ML model error");
    } finally {
      // SAFELY delete compressed temp file (but not the uploaded file)
      if (compressedPath) {
        fs.unlink(compressedPath, (err) => {
          if (err) console.error("Failed to delete compressed image:", err.message);
          else console.log("✅ Compressed file deleted successfully.");
        });
      }
    }

    const detection = await DetectionHistory.create({
      patientId,
      imageUrl,
      detectedDisease,
      confidence
    });

    res.status(201).json({
      message: "Image uploaded & disease detected",
      detection
    });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const saveDetectionResult = async (req, res) => {
    try {
      const { patientId, imageUrl, detectedDisease, confidence } = req.body;

      if (!patientId || !imageUrl || !detectedDisease) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newHistory = new DetectionHistory({
        patientId,
        imageUrl,
        detectedDisease,
        confidence: confidence || "Unknown"
      });
      await newHistory.save();

      res.status(201).json({ message: "Detection history saved successfully", data: newHistory });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getDetectionHistory = async (req, res) => {
  try {
    const history = await DetectionHistory.find({ patientId: req.user.id });
    if (!history.length) {
        return res.status(404).json({ message: "No past detections found" });
    }
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { uploadDetectionImage, getDetectionHistory , saveDetectionResult};
