
const {body} = require('express-validator');


module.exports = [

    body('fullname')
        .not()
        .isEmpty()
        .withMessage('Please enter fullname')
        .trim()
        .isLength({ min: 5, max: 30})
        .withMessage('Fullname must be 5-30 characters')
    
    ,
        
    body('username')
            .not()
            .isEmpty()
            .withMessage('Please enter username')
            .trim()
            .isLength({ min: 5, max: 15})
            .withMessage('Username must be 5-15 characters')
            
    ,

    body('email')
            .not()
            .isEmpty()
            .withMessage('Please enter email')
            .isEmail()
            .withMessage('Invalid email')
            .normalizeEmail()
            
    ,

    body('mobilenumber')
            .not()
            .isEmpty()
            .withMessage('Please enter mobile number')
            .isLength({ min: 11, max: 11})
            .withMessage('Invalid mobile number')
    ,
    body('about')
            .trim()




]