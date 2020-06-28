var express = require('express');
var router = express.Router();
var users = require('./users');
var index = require('./index');
var redirectPAGE = require('./redirectPAGE')
// console.log("IN Routes")

router.use('/', index);
router.use('/google', users);
router.use('/auth/google/cb', redirectPAGE);
router.get('/logout',(req,res)=>{req.logout(); res.send("LOGOUT")});

module.exports = router;
