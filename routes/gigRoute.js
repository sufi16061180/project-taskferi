const router = require('express').Router()
const{
    createGigGetController,
    createGigPostController,
    editGigGetController,
    editGigPostController
} = require('../controllers/gigController')

const gigValidator = require('../validator/gigValidator')
const {isAuthenticated} = require('../middleware/authMiddleware')


router.get('/create-gig', isAuthenticated, createGigGetController)
router.post('/create-gig', isAuthenticated, gigValidator, createGigPostController)


router.get('/edit-gig/:gigId', isAuthenticated, editGigGetController)
router.post('/edit-gig/:gigId', isAuthenticated, gigValidator, editGigPostController)

module.exports = router