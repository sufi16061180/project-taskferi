
const {body} = require('express-validator');


module.exports = [

    body('gigtitle')
        .not()
        .isEmpty()
        .withMessage('Please enter gig title')
        .trim()
        .isLength({ max: 100})
        .withMessage('Maximum 100 characters')
    
    ,
        
    body('gigprice')
            .not()
            .isEmpty()
            .withMessage('Please enter gig price')
            .trim()
            
            
    ,

    body('gigdescription')
            .not()
            .isEmpty()
            .withMessage('Please enter gig description')
            .trim()
            .isLength({ max: 500})
            .withMessage('Maximum 500 characters')
           

]