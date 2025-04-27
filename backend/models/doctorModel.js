const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please enter your name'] },
    email: { 
      type: String, 
      unique: true, 
      required: [true, 'Please enter your email'], 
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] 
    },
    password: { 
      type: String, 
      required: [true, 'Please enter your password'],  
      minLength: [6, 'Password must be at least 6 characters'], 
    },
    profilePic: { type: String, default: "" },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" },
    age: { type: Number, default: null, min: [0, 'Age cannot be negative'] },
    qualification: { type: String, default: "", required: [true, 'Please enter your qualification'] },
    achievements: { type: String, default: "" },
    experience: { type: Number, default: null, required: [true, 'Please enter years of experience'] },
    location: { type: String, default: "" },
  },
  { timestamps: true }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

doctorSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, role: "doctor" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
module.exports = mongoose.model("Doctor", doctorSchema);
