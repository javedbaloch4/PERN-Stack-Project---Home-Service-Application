import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL_ADDRESS,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
});

async function sendVerificationEmail(
  email: string,
  verificationToken: string
): Promise<void> {
  const mailOptions = {
    from: "",
    to: email,
    subject: "Email Verification",
    text: `Click the following link to verify your email: ${process.env.HOST}/verify?token=${verificationToken}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error(error);
    throw new Error("Error sending verification email");
  }
}

export default sendVerificationEmail;
