const { Schema, model } = require('mongoose');
const User= require('./User');
const Gig= require('./Gig');


const ratingSchema = new Schema({

gig: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Gig'
},
user: {

    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true

},
body: {

    type: String,
    trim: true,
    require: true
},
stars: {

    type: Number,
    require: true
},
createTime: {

    type: Date,
    default: new Date()
}


},{timestamps:true});

const Rating = model('Rating', ratingSchema);

module.exports= Rating;
