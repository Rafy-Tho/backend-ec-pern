import nodemailer from "nodemailer";
import ENV from "../configs/env.js";

//
const transporter = nodemailer.createTransport({
  host: ENV.MAIL_HOST,
  port: ENV.MAIL_PORT,
  secure: false,
  auth: {
    user: ENV.MAIL_USER,
    pass: ENV.MAIL_PASSWORD,
  },
});

export const sendEmail = async (email, subject, text) => {
  await transporter.sendMail({
    from: `"Ecommerce khmer" <${ENV.MIAL_SENDER}>`,
    to: email,
    subject,
    text,
  });
};
