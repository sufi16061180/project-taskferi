const router = require('express').Router();
const{isAuthenticated} = require('../middleware/authMiddleware');
const sellerprofileValidator = require('../validator/sellerprofileValidator');
const {
        sellerprofileGetController,
        createSellerProfileGetController,
        createSellerProfilePostController,
        editSellerProfileGetController,
        editSellerProfilePostController
}= require('../controllers/sellerprofileController');

router.get('/', isAuthenticated, sellerprofileGetController);

router.get('/create-sellerprofile', isAuthenticated, createSellerProfileGetController);
router.post('/create-sellerprofile', isAuthenticated, sellerprofileValidator, createSellerProfilePostController);

router.get('/edit-sellerprofile', isAuthenticated, editSellerProfileGetController);
router.post('/edit-sellerprofile', isAuthenticated, sellerprofileValidator, editSellerProfilePostController);

module.exports = router;