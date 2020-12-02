const express 	= require("express");
const router 	= express.Router();

const ControllerCandidateWishlist = require('./ControllerCandidateWishlist');

router.post('/post', ControllerCandidateWishlist.manage_wishlist);

// router.patch('/', wishlistsController.update_wishlists);

router.post('/candidateWishlist',ControllerCandidateWishlist.getCandidateWishlist);

router.get('/get/wishlistcount/:candidateID',ControllerCandidateWishlist.countCandidateWishlist);

//router.delete('/delete/:wishlistID',wishlistsController.delete_wishlist);


module.exports = router;