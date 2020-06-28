var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
/* GET users listing. */

router.get('/', passport.authenticate('google'), (err,req, res,next) => {
    if (err.name === 'TokenError') {
        res.redirect('/google'); // redirect them back to the login page
    } else {
     // Handle other errors here
    }
},
(req, res) => { 
    res.send(req.user)
})

// router.get('/', (req, res) => {
//     res.send("YOU ARE IN...")
// })

module.exports = router;