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

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "shivamatlas15@gmail.com",
        pass: "fjzf pjgq qvpf rzcu",
      },
    });

    // Email options
    const mailOptions = {
      from:"shivamatlas15@gmail.com" ,
      to: "shivamchaurasiya1050@gmail.com",
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

    res
      .status(201)
      .json({ message: "Message sent successfully and email delivered ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error ❌" });
  }
});

module.exports = router;
