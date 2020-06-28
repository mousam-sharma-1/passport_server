var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
/* GET users listing. */
router.get('/', passport.authenticate('google',{
  scope: ['profile']
}));


module.exports = router;