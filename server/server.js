import express from "express";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import SibApiV3Sdk from "sib-api-v3-sdk";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

const artSchema = new mongoose.Schema({
  name: String,
  category: String,
  sold: Boolean,
  image: String,
  thumbnail: String,
});

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 1, // Limit each IP to 1 requests per windowMs
  handler: (req, res) => {
    console.log("Rate limit reached for IP:", req.ip);
    res.status(429).json({
      error: "Too many requests from this IP, please try again later.",
    });
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const api = new SibApiV3Sdk.TransactionalEmailsApi();

app.post("/sendmail", limiter, async (req, res) => {
  const { name, email, phone, what, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // const transporter = nodemailer.createTransport({
  //   service:"gmail",
  //   auth: {
  //       user: process.env.EMAIL_RECEIVER,
  //       pass: process.env.EMAIL_PASS,
  //     },
  // })

  //   const mailOptions = {
  //     from: process.env.EMAIL_RECEIVER,
  //     replyTo: email, // the person filling out your form
  //     to: "aliyanizar023@gmail.com",
  //     subject: `New message from ${name}`,
  //     text: `From: ${name} (${email})\n${phone || "Not provided"}\n${what}\n\n${message}`,
  //   };

  try {
    await api.sendTransacEmail({
      sender: { email: "naseehan700@gmail.com" },
      to: [
        { email: `${process.env.EMAIL_RECEIVER}` },
        { email: "naseehan700@gmail.com" },
      ],
      subject: `New message from ${name}`,
      textContent: `Name: ${name}\nEmail: ${email}\nRegarding: ${what || ""}\nMessage:\n${message}`
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Failed to send email: ${error.message}`,
    });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
