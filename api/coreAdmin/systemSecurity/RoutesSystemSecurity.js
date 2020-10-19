const express 	= require("express");
const router 	= express.Router();

const checkAuth     = require('../middlerware/check-auth.js');
const UserController = require('./ControllerSystemSecurity.js');

router.post('/post/signup/user', UserController.user_signup_user); //Working
router.post('/post/signup/user/emailotp', UserController.user_signup_user_email_otp); //Working
router.get('/get/checkemailotp/usingID/:ID/:emailotp',UserController.check_userID_EmailOTP);
router.get('/get/checkemailotp/usingUsername/:username/:emailotp',UserController.check_username_EmailOTP);
router.post('/post/login',UserController.user_login); //Working
router.patch('/patch/change_password_withoutotp/id/:ID',UserController.user_update_password_withoutotp_ID);
router.patch('/patch/change_password_withoutotp/username/:username',UserController.user_update_password_withoutotp_username);
router.patch('/patch/setsendemailotpusingID/:ID',UserController.set_send_emailotp_usingID);
router.patch('/patch/setsendemailotpusingEmail/:emailId',UserController.set_send_emailotp_usingEmail);
module.exports = router;