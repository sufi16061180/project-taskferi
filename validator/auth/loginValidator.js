const {body} = require('express-validator');


module.exports = [

    body('username')
            .not()
            .isEmpty()
            .withMessage('Please enter username')
            

    ,

    body('password')
            .not()
            .isEmpty()
            .withMessage('Please enter password')

    


]