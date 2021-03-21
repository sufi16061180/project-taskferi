const { Schema, mode, model }= require('mongoose');
/*const { options } = require('../routes/authRoutes');*/
const Profile= require('./Profile')
const Gig = require('./Gig');

const userSchema = new Schema({


    fullname: {

        type: String,
        trim: true,
        maxlength: 30,
        required: true

    },
    username: {

        type: String,
        trim: true,
        maxlength: 15,
        required: true


    },
    email: {

        type: String,
        trim: true,
        required: true


    },
    mobilenumber: {

        type: String,
        required: true


    },
    birthdate: {

        type: Date,
        required: true


    },
    gender: {

        type: String,
        required: true

    },
    password: {

        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true,
        default: ''
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: Profile
    },
   
    profilePics: {
        type: String,
        default: '/uploads/defaultuser.png'
    }
}, {

    timestamps: true
});


const User= model('User', userSchema)
module.exports = User;





















/*
const mongoose = require('mongoose');
const { isEmail }= require('validator');
const bcrypt = require('bcrypt');


const infoSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: [true, 'Please enter fullname']
        
    },
    username: {
        type: String,
        required: [true, 'Please enter username'],
        minlength: [5, 'Minimum length is 6 characters']
        
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
        
    },
    mobilenumber: {
        type: Number,
        required: [true, 'Please enter mobile number'],

        
        
    },
    birthdate: {
        type: String,
        required: [true, 'Please enter birthdate']
        
    },
    gender: {
        type: String,
        required: [true, 'Please select gender']
        
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Minimum length is 6 characters']
        
    }
  

});


infoSchema.pre('save', async function (next)
{
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
    
});



const Info = mongoose.model('info', infoSchema);

module.exports = Info;

*/