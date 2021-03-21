
const {body} = require('express-validator');
const User= require('../../models/User');

module.exports = [

    body('fullname')
        .not()
        .isEmpty()
        .withMessage('Please enter fullname')
        .trim()
        .isLength({ min: 5, max: 30})
        .withMessage('Fullname must be 5-30 characters')
    
    ,
        

    body('email')
            .not()
            .isEmpty()
            .withMessage('Please enter email')
            .isEmail()
            .withMessage('Invalid email')
            .normalizeEmail()
            .custom(async email =>{

                let user = await User.findOne({ email })

                if(user)
                {
                    return Promise.reject('Email already used')
                }
            })
    ,

    body('username')
            .not()
            .isEmpty()
            .withMessage('Please enter username')
            .trim()
            .isLength({ min: 5, max: 15})
            .withMessage('Username must be 5-15 characters')
            .custom(async username =>{

                let user = await User.findOne({ username })

                if(user)
                {
                    return Promise.reject('Username already used')
                }
            })
    ,

    body('mobilenumber')
            .not()
            .isEmpty()
            .withMessage('Please enter mobile number')
            .isLength({ min: 11, max: 11})
            .withMessage('Invalid mobile number')
    ,

    body('birthdate')
            .not()
            .isEmpty()
            .withMessage('Please enter birthdate')
 
    ,
    
    body('gender')
            .not()
            .isEmpty()
            .withMessage('Please select gender')

    ,

    body('password')
            .not()
            .isEmpty()
            .withMessage('Please enter password')
            .isLength({ min: 5 })
            .withMessage('Must be greater than 5 characters')
    ,

    body('confirmpassword')
            .not()
            .isEmpty()
            .withMessage('Please confirm password')
            .custom((confirmpassword, { req})=>
            {
                if(confirmpassword!== req.body.password)
                {

                    throw new Error('Password does not match')
                }

                return true;


            })
            

    


]