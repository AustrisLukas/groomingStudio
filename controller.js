const path = require('path');

exports.renderHome = async (req,res) =>{

    console.log('App: Processing renderHome');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    

}