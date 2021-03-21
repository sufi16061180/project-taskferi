const Profile = require('../models/Profile');
//const User = require('../models/User');
const{validationResult} = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');
const User = require('../models/User');
const Gig = require ('../models/Gig')


exports.sellerprofileGetController = async (req, res, next) =>{

    try{

        let profile = await Profile.findOne({
            user: req.user._id
        })


        /*ghjghj*/

        let gigs = await Gig.find({ gigcreator: req.user._id})

        if(profile)
        {
        return res.render('sellerprofile', {title: 'Seller profile', profile, gigs})
        }

        res.redirect('/sellerprofile/create-sellerprofile')
    }catch(e)
    {
        next(e);
    }

    
}

exports.createSellerProfileGetController = async (req, res, next)=>{

    try{

        let profile = await Profile.findOne({user: req.user._id})

        if(profile)
        {
            return res.redirect('/sellerprofile/edit-sellerprofile')
        }

        res.render('create-sellerprofile', {title: 'Create seller profile', error: {}});

    }catch(e)
    {
        next(e)
    }

   // res.render('create-sellerprofile', {title: 'Create seller profile'});

}



exports.createSellerProfilePostController = async(req, res, next)=>{

    let errors = validationResult(req).formatWith(errorFormatter)
     
    
    if(!errors.isEmpty()){

        return res.render('create-sellerprofile', {title: 'Create seller profile', error: errors.mapped()});

    }
    
    let {
        title,
        description
    } = req.body

    try{

        let profile = new Profile({
            user: req.user._id,
            title,
            description
        })

        let createdProfile = await profile.save()

        await User.findOneAndUpdate(
            {_id: req.user._id},
            {$set: {profile: createdProfile._id}}
        )

        res.redirect('/sellerprofile')

    }catch(e)
    {
        next(e)
    }


}

exports.editSellerProfileGetController = async(req, res, next)=>{


    try{

        let profile = await Profile.findOne({user: req.user._id})

        if(!profile){

            return res.redirect('/sellerprofile/create-sellerprofile')
        }

        res.render('edit-sellerprofile', {title: 'Edit seller profile', error:{}, profile})

    }catch(e)
    {

        next(e)
    }

}

exports.editSellerProfilePostController = async(req, res, next)=>{

    let errors = validationResult(req).formatWith(errorFormatter)
     
    let {
        title,
        description
    } = req.body
    
    if(!errors.isEmpty()){

        return res.render('edit-sellerprofile', {title: 'Edit seller profile', error: errors.mapped(), profile: {title, description}});

    }
    

    try{

        let profile = {
            title,
            description
        }

        let updatedProfile = await Profile.findOneAndUpdate(
            {user: req.user._id},
            {$set: profile },
            {new: true }
        )

        res.redirect('/sellerprofile')


    }catch(e)
    {
        next(e)
    }


}