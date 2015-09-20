// passport.js

var LocalStrategy			   	= 	require('passport-local').Strategy;   

//get our user schema from our user model
var userDetails     			= 	require('../back/user.js');

module.exports = function(passport){

    //serialize user for session
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
 
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });


    //sign-up for a specific user
    // passport.use('local-signup',new LocalStrategy(
    //     {usernameField : 'doctor'},
    //     function(doctor, password, done) {
    //     process.nextTick(function() {
    //     // find a user whose doctor is the same as the forms doctor
    //     // we are checking to see if the user trying to login already exists
    //         userDetails.findOne({ 'doctor': doctor,
    //     }, function(err, user) {
    //         // if there are any errors, return the error
    //         if (err)
    //             return done(err);

    //         // check to see if theres already a user with that doctor
    //         if (user) {
    //             return done(null, false);
    //         } else {

    //             // if there is no user with that doctor
    //             // create the user
    //             var newUser            = new userDetails();

    //             // set the user's local credentials
    //             newUser.doctor    = doctor;
    //             newUser.password    = password;

    //             // save the user
    //             newUser.save(function(err) {
    //                 if (err)
    //                     throw err;
    //                 return done(null, newUser);
    //             });
    //         }
    //     });    
    //     });
    // }));
    //login and signup for a specific user
    passport.use('local-login',new LocalStrategy({
        usernameField : 'doctor',
        passReqToCallback : true
    },
        function(req, doctor, password, done) {
      process.nextTick(function() {
        // Auth Check Logic
            userDetails.findOne({
          'doctor': doctor, 
        }, function(err, user) {
            //return errors if any
          if (err) {
            return done(err);
          }
     
          //if user is not found
          if (!user)    {
            if(req.body.newsignup==false) {
                console.log("I'm a wrong user! No!");
                return done(null, false, { message: 'doctor not found!' });
            }
            //if it's not found because that user is new, sign em up
            if(req.body.newsignup==true) {
                console.log("I'm a new user! Whoppee!");
                var newUser            = new userDetails();

                // set the user's local credentials
                newUser.doctor    = doctor;
                newUser.password    = password;

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    //return the new user
                    return done(null, newUser);
                });
            }
          }

          //if user is found
          if (user)    {
            //but password is wrong
                if (user.password != password) {
                    return done(null, false, { message: 'Incorrect password!' });
                }
            //if none of these, finally return the user
                return done(null, user);
            }
        });
      });
    }));
}