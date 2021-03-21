const router = require('express').Router()

const {servicesGetController,
       singleGigGetController} = require('../controllers/servicesController')

router.get('/:gigId', singleGigGetController)
router.get('/', servicesGetController)

module.exports= router