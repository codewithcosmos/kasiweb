const nodemailer = require('nodemailer');
require('dotenv').config();

exports.getContactPage = (req, res) => {
    res.render('contact', { title: 'Contact' });
};

exports.postContactForm = (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: 'Contact Form Submission',
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({ success: false, message: error.message });
        }
        res.json({ success: true, message: 'Email sent: ' + info.response });
    });
};
