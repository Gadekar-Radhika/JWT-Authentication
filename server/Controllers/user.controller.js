  const mongoose = require('mongoose');
  const passport = require('passport');
  const _ = require('lodash');
   const jwt = require('jsonwebtoken');

  const LoginCredentials = mongoose.model('LoginCredentials');
 
module.exports.register = (req, res, next) => {
      var logincredentials = new LoginCredentials();
      logincredentials.userName = req.body.userName;
      logincredentials.email = req.body.email;
      logincredentials.password = req.body.password;
      logincredentials.save((err, doc) => {
          if (!err)
             res.send(doc);
         else {
            //error handling
            // console.log(err);
            if(err.code==11000)
            res.status(422).send(['Duplicate Email Address Found.']);
            else
            return next(err);
         }
 
      });
   //  console.log('inside register function.');
}
module.exports.authenticate = (req, res, next) => {
   // call for passport authentication
   passport.authenticate('local', (err, logincredentials, info) => {
       // error from passport middleware
       if (err) return res.status(400).json(err);
       // registered user
       else if (logincredentials) return res.status(200).json({ "token": logincredentials.generateJwt() });
       // unknown user or wrong password
        else return res.status(404).json(info);
   })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
   LoginCredentials.findOne({ _id: req._id },
      (err, loginCredentials) => {
          if (!loginCredentials)
              return res.status(404).json({ status: false, message: 'User record not found.' });
          else
              return res.status(200).json({ status: true, loginCredentials : _.pick(loginCredentials,['userName','email']) });
      }
  );
}