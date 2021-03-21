const { Schema, model } = require('mongoose');

const User = require('./User');
const Profile = require('./Profile');
const Rating= require('./Rating');

const gigSchema = new Schema({

gigtitle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
},
gigprice: {

    type: Number,
    required: true

},
gigdescription: {

    type: String,
    required: true,
    trim: true,
    maxlength: 500

},

gigcreator: {

    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
}, 
tags: {

    type: [String],
    required: true
  
},
thumbnail: 
{
    type: String,
    default : '/uploads/thum.png'
},
readTime: String,
offers: [

{
    type: Schema.Types.ObjectId,
    ref: 'Offer'
    
}
    
],
ratings: [

{
    type: Schema.Types.ObjectId,
    ref: Rating

}

]

},{timestamps:true});

const Gig = model('Gig', gigSchema);

module.exports= Gig;
