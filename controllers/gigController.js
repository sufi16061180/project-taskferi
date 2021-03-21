const {validationResult} = require('express-validator')
const errorFormatter = require('../utils/validationErrorFormatter')
const Gig = require('../models/Gig')
const User = require('../models/User')
const Profile = require('../models/Profile')



exports.createGigGetController = (req, res, next)=>{

    res.render('create-gig', {title: 'Create gig', error:{}, value: {}})
   

}

exports.createGigPostController = async(req, res, next)=>{

    
    let errors = validationResult(req).formatWith(errorFormatter)

    let {gigtitle, gigprice, gigdescription} = req.body



    if(!errors.isEmpty())
    {
        res.render('create-gig', {title: 'Create gig', error: errors.mapped(), value: {gigtitle, gigprice, gigdescription}})
    }

    let gig = new Gig({

        gigtitle,
        gigprice,
        gigdescription,
        gigcreator: req.user._id

    })
    

    try{


        let createdGig = await gig.save()
        await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$push: {'gigs': createdGig._id}}
        )

       // return res.redirect(`/gigs/edit-gig/${createdGig._id}`)
       return res.redirect('/sellerprofile')

    }catch(e)
    {
        next(e)
    }
    

}

exports.editGigGetController = async(req, res, next)=>
{

    let gigId = req.params.gigId

    try{
        
    let gig = await Gig.findOne({ gigcreator: req.user._id, _id: gigId})

    if(!gig)
    {
        let error = new Error('404 page not found')
        error.status = 404
        throw error
        
    }

    
    res.render('edit-gig', {title: 'Edit gig', error:{}, gig})

    }catch(e)
    {
        next(e)
    }
}





exports.editGigPostController = async(req, res, next)=>{

    
    let errors = validationResult(req).formatWith(errorFormatter)

    let {gigtitle, gigprice, gigdescription} = req.body

    let gigId = req.params.gigId


    try{

    let gig = await Gig.findOne({ gigcreator: req.user._id, _id: gigId})

    if(!gig)
    {
        let error = new Error('404 page not found')
        error.status = 404
        throw error
        
    }

    //res.render('edit-gig', {title: 'Edit gig', error:{}, gig})

    if(!errors.isEmpty())
    {
        res.render('edit-gig', {title: 'Edit gig', error: errors.mapped(), gig})
    }

    await Gig.findOneAndUpdate(
        {_id: gig._id},
        {$set: {gigtitle, gigprice, gigdescription}},
        {new: true}
    )

    //res.redirect('/gigs/edit-gig/' + gig._id)
    res.redirect('/sellerprofile')

    }catch(e)
    {
        next (e)
    }


}