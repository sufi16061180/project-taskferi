const Gig = require('../models/Gig')

exports.servicesGetController = async(req, res, next)=>
{

    try{

        let gigs = await Gig.find()
        .populate('gigcreator', 'fullname')
        console.log(Gig.gigcreator)
        res.render('services', {title: 'Find services', gigs})
        
    }catch(e)
    {
        next(e)
    }

    
}

exports.singleGigGetController = async(req, res, next)=>
{
    let{gigId}=req.params

    try{

        let gig = await Gig.findById(gigId)
        .populate('gigcreator', 'fullname')

        if(!gig)
        {
            let error = new Error('404 page not found')
            error.status = 404
            throw error
        }

        res.render('singleGig', {title: gig.title, gig})

    }catch(e)
    {
        next(e)
    }
}