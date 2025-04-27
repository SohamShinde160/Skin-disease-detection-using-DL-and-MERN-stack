const express = require("express");
const { uploadDetectionImage, getDetectionHistory, saveDetectionResult } = require("../controllers/detectionHistoryController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", protect, upload.single("image"), uploadDetectionImage);
router.get("/history", protect, getDetectionHistory);
router.post("/save", saveDetectionResult);

module.exports = router;
