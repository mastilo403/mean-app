const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
//konektovanje na bazu
mongoose.connect(config.database);
//on connection
mongoose.connection.on('connected', function () {
    console.log('konektovan na: '+config.database);
});
//on error
mongoose.connection.on('error', function (err) {
    console.log('Došlo je do greške: '+err);
});
const app = express();

const users = require('./routes/users');
//konfigurisanje porta
const port = 3000;
//CORS Middleware
app.use(cors());
//Definisati staticni folder
app.use(express.static(path.join(__dirname, 'public')));
//Bodyparser Middleware
app.use(bodyParser.json());
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
//Index route
app.get('/', function (req, res) {
   res.send('Invalid point');
});
//startovanje servera
app.listen(port, function () {
    console.log('Server je uspješno startovan na portu: '+port);
});