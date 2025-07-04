const express = require('express');
require('dotenv').config({ path: './config.env' });
const router = require('./routes.js');
const path = require('path');


const app = express();
app.use('/', router);


app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, '/public')));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
});