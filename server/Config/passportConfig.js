const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

 var LoginCredentials = mongoose.model('LoginCredentials');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            //check whether we have a user with given address
            LoginCredentials.findOne({ email: username },
                (err, loginCredentials) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!loginCredentials)
                        return done(null, false, { message: 'Email is not registered' });
                    // wrong password
                    else if (!loginCredentials.verifyPassword(password))
                        return done(null, false, { message: 'Wrong Password.' });
                    // authentication succeeded
                    else
                        return done(null, loginCredentials);
                });
        })
);



// passport.use(new LocalStrategy(
//     passport.use(new LocalStrategy({
//         usernameField: 'Email',
//         passwordField: 'Password',
//         session: false
//       },
//     function(username, password, done) {
//         userSchema.findOne({ username: Email }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//  ));

//3rd Try
// passport.use(new localStrategy({
//     usernameField: 'email'
//     // passwordField: 'Password'
// }, 
// function (username, password, cb) {

// //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

// return LoginCredentials.findOne({email:username, Password})
//        .then(user => {
//            if (!user) {
//                return cb(null, false, {message: 'Incorrect email or password.'});
//            }

// return cb(null, user, {message: 'Logged In Successfully'});
//       })
//       .catch(err => cb(err));
// }
// ));