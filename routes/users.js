const express = require('express');
const router = express.Router();

router.get('/register', function (req, res, next) {
    res.send('REGISTER');
});
router.get('/authenticate', function (req, res, next) {
    res.send('authenticate');
});
router.get('/profile', function (req, res, next) {
    res.send('Profile');
});
router.get('/validate', function (req, res, next) {
    res.send('Validate');
});

module.exports = router;