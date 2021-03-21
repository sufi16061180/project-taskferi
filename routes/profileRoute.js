const router = require('express').Router()
const{isAuthenticated} = require('../middleware/authMiddleware')
const profileValidator = require('../validator/profileValidator')

const {
        profileGetController,
        editProfileGetController,
        editProfilePostController
}= require('../controllers/profileController')

router.get('/', isAuthenticated, profileGetController)

router.get('/edit-profile', isAuthenticated, editProfileGetController)
router.post('/edit-profile', isAuthenticated, profileValidator, editProfilePostController)

module.exports = router;