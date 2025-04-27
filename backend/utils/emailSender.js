const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, message, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"SkinCare App | AI Dermatologist" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: message,
      html: htmlContent // newly added
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};

module.exports = { sendEmail };
