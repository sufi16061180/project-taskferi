const User = require('../models/User');
const{ validationResult} = require('express-validator');
const errorFormatter = require('../utils/validationErrorFormatter');

exports.profileGetController = (req, res, next) =>{


    res.render('profile',{title: 'My profile'});

    
}



exports.editProfileGetController = (req, res, next)=>{

        res.render('edit-profile', {title: 'Edit profile',error:{}, User})

}

exports.editProfilePostController = async(req, res, next)=>{

    let errors = validationResult(req).formatWith(errorFormatter)
     
    let {
        fullname,
        username,
        email,
        mobilenumber,
        about
        
    } = req.body
    
    if(!errors.isEmpty()){

        return res.render('edit-profile', {title: 'Edit profile', error: errors.mapped(), user: {fullname, username, email, mobilenumber, about}});

    }
    

    try{

   
        let user= {
            fullname,
            username,
            email,
            mobilenumber,
            about
            
        }

        await User.findOneAndUpdate(
            {_id: req.user._id},
            {$set: user }
           
        )

        res.redirect('/profile');



    }catch(e)
    {
        next(e)
    }


}