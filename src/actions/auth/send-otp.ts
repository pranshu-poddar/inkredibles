'use server'
import { env } from "@/lib/env";
import nodemailer from "nodemailer";

export async function sendOTP(
  email: string,
  subject: string,
  content: string,
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.NODEMAILER_MAIL,
      pass: env.NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: env.NODEMAILER_MAIL,
    to: email,
    subject,
    html: content,
  };

  await transporter.sendMail(mailOptions);
}
