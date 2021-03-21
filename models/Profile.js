const { Schema, model } = require('mongoose');
const User = require('./User');
const Gig = require('./Gig');


const profileSchema = new Schema({

user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
title: {

    type: String,
    trim: true,
    maxlength: 30,
    required: true
    

},
description: {

    type: String,
    trim: true,
    maxlength: 500,
    required: true
}, 

links: {

    facebook: String,
    twitter: String,
    linkedin: String

    
},
gigs: [

    {
        type: Schema.Types.ObjectId,
        ref: 'Gig'
    }
],
favourites: [

    {
        type: Schema.Types.ObjectId,
        ref: Gig
    }
]




},{timestamps:true});

const Profile = model('Profile', profileSchema);

module.exports=Profile;
