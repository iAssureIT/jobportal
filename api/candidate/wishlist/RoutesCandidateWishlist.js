const express 	= require("express");
const router 	= express.Router();

const ControllerCandidateWishlist = require('./ControllerCandidateWishlist');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', checkAuth, ControllerCandidateWishlist.manage_wishlist);

// router.patch('/', wishlistsController.update_wishlists);

router.post('/candidateWishlist', checkAuth, ControllerCandidateWishlist.getCandidateWishlist);

router.get('/get/wishlistcount/:candidate_id', checkAuth, ControllerCandidateWishlist.countCandidateWishlist);

//router.delete('/delete/:wishlistID',wishlistsController.delete_wishlist);


module.exports = router;