const path = require('path');

exports.renderHome = async (req,res) =>{
    console.log('App: Processing renderHome');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    
}

exports.renderAppointments = async (req,res) => {
    console.log('App: Processing renderAppointments');
    res.sendFile(path.join(__dirname, 'public', 'appointments.html'));
}

exports.renderGallery = async (req,res) => {
    console.log('App: Processing renderGallery');
    res.sendFile(path.join(__dirname, 'public', 'gallery.html'));
    
}

exports.renderServices = async (req,res) => {
    console.log('App: Processing renderServices');
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
}
