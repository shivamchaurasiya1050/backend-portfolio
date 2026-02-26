const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to DB
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // Brevo Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "shivamatlas15@gmail.com",
        pass: "fjzf pjgq qvpf rzcu",
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact shivamatlas15@gmail.com`,
      to: "shivamchaurasiya1050@gmail.com",
      replyTo: email,
      subject: `New Contact Message: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);


    await transporter.sendMail({
  from: `"Shivam Chaurasiya" shivamchaurasiya1050@gmail.com`,
  to: email,
  replyTo:"shivamchaurasiya1050@gmail.com",
  subject: "Thank you for contacting me",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Hi ${name},</h2>
      <p>Thank you for reaching out through my portfolio website.</p>
      <p>I have received your message and will get back to you as soon as possible.</p>
      <br/>
      <p>Best Regards,<br/><strong>Shivam Chaurasiya</strong></p>
      <hr/>
      <small>This is an automated response confirming your message submission.</small>
    </div>
  `,
});

    res.status(201).json({ message: "Message sent successfully ✅" });

  } catch (error) {
    console.error(error);
    res.status(500).json({error:error, message: "Email failed ❌" });
  }
});

module.exports = router;