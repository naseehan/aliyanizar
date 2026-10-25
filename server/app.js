import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

// Build the Express app. The mailer is injected so tests can use a fake
// instead of sending real emails through Resend.
export function createApp({ mailer, rateLimitMax = 3 } = {}) {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Rate limiter to prevent spam
  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: rateLimitMax,
    message: { error: "Too many requests, try again later." },
  });
  app.use(limiter);

  // POST endpoint to handle form submissions
  app.post("/sendmail", async (req, res) => {
    const { name, email, phone, what, message } = req.body || {};

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    try {
      // Send email using Resend
      const data = await mailer.emails.send({
        from: "Website Contact <onboarding@resend.dev>", // use your verified sender if available
        to: "aliyanizar023@gmail.com",
        subject: `New message from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Regarding: ${what}
Message: ${message}
      `,
      });

      res.json({ success: true, message: "✅ Email sent successfully!", data });
    } catch (error) {
      console.error("Email send error:", error);
      res.status(500).json({
        success: false,
        message: `❌ Failed to send email: ${error.message}`,
      });
    }
  });

  return app;
}
