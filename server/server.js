import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Limit form submissions
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1,
  handler: (req, res) => {
    res.status(429).json({ error: "Too many requests, try again later." });
  },
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  // NOT localhost
  port: 587,
  secure: false, // true if port is 465
  auth: {
    user: process.env.EMAIL_SENDER, // verified Gmail
    pass: process.env.EMAIL_PASS,   // App Password
  },
});

app.post("/sendmail", limiter, async (req, res) => {
  const { name, email, phone, what, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const mailOptions = {
    from: process.env.EMAIL_SENDER, // your verified email
    to: ["naseehan700@gmail.com", "aliyanizar023@gmail.com"], // you + client
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nRegarding: ${what || ""}\nMessage:\n${message}`,
    // replyTo: email // OPTIONAL if you want to reply directly to user
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({
      success: false,
      message: `❌ Failed to send email: ${error.message}`,
    });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
