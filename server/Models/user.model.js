const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // generate randam saltsecret
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:'User Name can not empety',
        unique: true},
    email:{
        type:String,
        required:'Email can not empety',
        unique: true},
    password:{
            type:String,
            required: 'Password can\'t be empty',
            minlength : [8,'Password must be atleast 8 character long']},
            saltSecret:String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//Methods
userSchema.methods.verifyPassword = function(Password)
{
    return bcrypt.compareSync(Password, this.password);
};

userSchema.methods.generateJwt = function()
{
    return jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET,
        { 
//set expression time to jwt token (config.json) 2h-2 hour, 2d-2 days, 2m-2 minit . JWT_EXP is set in config.json
            expiresIn: process.env.JWT_EXP
        });
}


mongoose.model('LoginCredentials',userSchema);