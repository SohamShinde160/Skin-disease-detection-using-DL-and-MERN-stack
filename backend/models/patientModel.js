const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxLength: [50, 'Name cannot exceed 50 characters'] },
    email: { 
      type: String, 
      unique: true, 
      required: [true, 'Please enter your email'], 
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: { 
      type: String, 
      required: [true, 'Please enter password'], 
      minLength: [6, 'Password must be at least 6 characters'], 
    },
    age: { type: Number, default: null , min: [0, 'Age cannot be negative'] },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: null },
    mobileNo: { type: String, default: null },
    location: { type: String, default: null , required: [true, 'Please enter your location'] },
    profilePic: { type: String, default: null },
  },
  { timestamps: true }
);

patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

patientSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, role: "patient" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

patientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Patient", patientSchema);
