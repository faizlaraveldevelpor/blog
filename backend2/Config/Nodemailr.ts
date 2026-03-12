import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER || "faizansari2025@gmail.com",
    pass: process.env.MAIL_PASS || "",
  },
});

export const nodemailerfnc = async (email: string): Promise<void> => {
  const code = Math.floor(Math.random() * 10000);
  await transporter.sendMail({
    from: process.env.MAIL_USER || "faizansari2025@gmail.com",
    to: email,
    text: code.toString(),
    subject: "This is test email",
  });
};
