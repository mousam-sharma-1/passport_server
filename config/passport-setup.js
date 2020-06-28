const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const User = require('../models/mongooseModel')

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})

passport.use(
    new GoogleStrategy({
        // options for google strat..
        callbackURL: '/auth/google/cb',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    }, (accessToken, refreshToken,profile,done) => {
        // passport callback function
        // console.log("CALLBACK")
        console.log(profile);
        User.findOne({googleId:profile.id}).then((currentuser)=>{
            console.log("what c. ",currentuser);
            if(currentuser){
                //already have user
                console.log("already have user",currentuser);
                 done(null,currentuser)
            }
            else{
                new User({
                    username: profile.displayName,
                    googleId:profile.id
                }).save().then((newUser) =>{
                    console.log("NEW USER",newUser);
                    done(null,newUser)
                })
            }
        })
  
    })
)