import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const artSchema = new mongoose.Schema({
  name: String,
  category: String,
  sold: Boolean,
  image: Image,
  thumbnail: Image,

});

app.post("/sendmail", async (req, res) => {
  const { name, email, phone, what, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: process.env.EMAIL_RECEIVER,
      subject: `New message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Regarding: ${what}
        Message: ${message}
      `,
    });

    res.json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
