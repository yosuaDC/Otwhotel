import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Email route
  app.post("/api/send-confirmation", async (req, res) => {
    const { email, name, hotelName, checkIn, checkOut, bookingId, totalPrice } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if email credentials are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("Email credentials not set. Simulating success for demo purposes.");
      return res.json({ 
        success: true, 
        message: "Email simulated (Configure EMAIL_USER and EMAIL_PASS in settings to send real emails)" 
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"OTW Hotel" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Booking Confirmed: ${hotelName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 24px; overflow: hidden;">
            <div style="background-color: #0d9488; padding: 40px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 900;">OTW Hotel</h1>
              <p style="opacity: 0.8; margin-top: 8px;">Reservation Confirmed</p>
            </div>
            <div style="padding: 40px; background-color: white;">
              <p style="font-size: 16px; color: #1e293b;">Hi <strong>${name}</strong>,</p>
              <p style="color: #475569; line-height: 1.6;">Your luxury stay at <strong>${hotelName}</strong> has been confirmed. Get ready for an unforgettable experience!</p>
              
              <div style="background-color: #f8fafc; padding: 24px; border-radius: 16px; margin-top: 32px;">
                <p style="margin: 0 0 16px 0; font-size: 12px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Booking Details</p>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                  <span style="color: #64748b;">Booking ID:</span>
                  <strong style="color: #0f172a;">${bookingId}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                  <span style="color: #64748b;">Check-in:</span>
                  <strong style="color: #0f172a;">${checkIn}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                  <span style="color: #64748b;">Check-out:</span>
                  <strong style="color: #0f172a;">${checkOut}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px solid #e2e8f0;">
                  <span style="color: #64748b;">Total Amount:</span>
                  <strong style="color: #059669;">IDR ${totalPrice.toLocaleString()}</strong>
                </div>
              </div>

              <div style="margin-top: 40px; text-align: center;">
                <p style="color: #94a3b8; font-size: 14px;">If you have any questions, reply to this email or visit our help center.</p>
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
