const path = require("path");
const transporter = require("./config/mailer.js");

exports.renderHome = async (req, res) => {
    console.log("App: Processing renderHome");
    res.sendFile(path.join(__dirname, "public", "index.html"));
};

exports.renderAppointments = async (req, res) => {
    console.log("App: Processing renderAppointments");

    //VARIABLE TO CHECK URL FOR /?booked=true
    const booked = req.query.booked === 'true';

    res.render('appointments',{
        booked: booked
    });
};

exports.renderGallery = async (req, res) => {
    console.log("App: Processing renderGallery");

    res.render("gallery");
};

exports.renderServices = async (req, res) => {
    console.log("App: Processing renderServices");
    res.sendFile(path.join(__dirname, "public", "services.html"));
};


//PROCESS NEW INQUIRY MESSAGE
exports.sendInquiry = async (req, res) => {
    console.log("App: Processing sendInquiry");

    if(req.body.website){
        console.log("BOT DETECTED");
        return res.status(400).send('BOT DETECTED');
    }

    console.log(req.body);

    //VERIFY TRANSPORTER CONNECTION
    try {
        await transporter.verify();
        console.log("Transporter is ready");
    } catch (err) {
        console.error("Transporter verify failed:", err);
        return res.status(500).send("Transporter verification failed.");
    }

    //SEND EMAIL
    try {
        const info = await transporter.sendMail({
            from: '"Sandra\'s Dog Grooming" <info@sandrasdoggrooming.live>',
            to: "austris.lukas@gmail.com",
            subject: "Naujas Pranesimas - Sandra\'s Dog Grooming",
            text: "Gautas naujas pranesimas is klijento",
            html: `
            <h3>Naujas pranesimas is klijiento</h3><br>
            <p>${new Date().toLocaleString()}</p><br>
            <b>NUO:</b><br> ${req.body.name}<br><br>
            <b>E-MAIL:</b><br> ${req.body.email}<br><br>
            <b>TEL:</b><br> ${req.body.tel}<br><br>
            <b>VEISLE:</b><br> ${req.body.dog_breed}<br><br>
            <b>PRANESIMAS:</b><br>${req.body.notes}<br><br><hr>`
        });
        console.log("Email sent:", info.messageId);
        return res.redirect('/appointments/?booked=true');

    } catch (err) {
        console.error("SendMail error:", err);
        return res.status(500).send("Failed to send email.");
    }
};
