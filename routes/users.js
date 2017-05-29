const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/register', function (req, res, next) {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, function (err, user) {
       if(err){
           res.json({success: false, msg: 'Korisnik nije registrovan'})
       }else {
           res.json({success: true, msg: 'Korisnik je uspjesno registrovan'})
       }
    });
});
router.post('/authenticate', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.getUsersByName(username, function (err, user) {
        if(err) throw err;

        if(!user){
            res.json({success: false, msg: 'Korisnik nije pronađen!'})
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
            if(err) throw err;

            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT' +token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        name: user.name
                    }
                });
            }else{
                res.json({success: false, msg: 'Pogrešna lozinka!'})
            }
        });
    });
});
router.get('/profile', function (req, res, next) {
    res.send('Profile');
});


module.exports = router;