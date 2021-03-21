const {body} = require('express-validator');



module.exports = [

    body('title')
            .not()
            .isEmpty()
            .withMessage('Please enter title')
            .trim()
            .isLength({ max: 30})
            .withMessage('Maximum 30 characters')
            

    ,

    body('description')
            .not()
            .isEmpty()
            .withMessage('Please enter description')
            .trim()
            .isLength({ min: 50})
            .withMessage('Minimum 50 characters')

    


]

