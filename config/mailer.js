const nodemailer = require("nodemailer");

//INITIALIZE TRANSPORTER OBBJECT
const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 587,
    secure: false,
    auth: {
        user: 'info@sandrasdoggrooming.live',
        pass: '14qmvGYUXQAa',
    },
});

module.exports = transporter;
