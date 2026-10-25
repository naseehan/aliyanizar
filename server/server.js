import dotenv from "dotenv";
import { Resend } from "resend";
import { createApp } from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

const app = createApp({ mailer: resend });

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
