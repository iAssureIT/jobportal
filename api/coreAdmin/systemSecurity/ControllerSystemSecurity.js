const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var ObjectID = require('mongodb').ObjectID;
var request = require('request-promise');
const User = require('../userManagement/ModelUsers.js');
const Role = require('../rolesManagement/ModelRoles.js');
const EntityMaster = require('../entityMaster/ModelEntityMaster.js');
const globalVariable = require("../../nodemon.js");
const nodeMailer            = require('nodemailer');
const GlobalMaster        = require('../projectSettings/ModelProjectSettings.js');

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.user_signupUser = (req, res, next) => {
	console.log("req.body==>>", req.body)
	var username = "EMAIL";
	if(req.body.username){
		if(req.body.username === "EMAIL"){
			username = "EMAIL";
		}else if(req.body.username === "MOBILE"){
			username = "MOBILE";
		}
	}
	if(username==="EMAIL"){
		if(req.body.email && req.body.pwd && req.body.role){
			var emailId = req.body.email;
			var role_lower = req.body.role.slice(0,1);
			console.log("role_lower==>",role_lower);  
			if (role_lower && emailId) {
				Role.findOne({ role: role_lower })
					.exec()
					.then(role => {
						if (role) {
							User.find({ "username": emailId.toLowerCase() })
								.exec()
								.then(user => {
									if (user.length > 0) {
										return res.status(200).json({
											message: 'Email Id already exist.'
										});
									} else {
										bcrypt.hash(req.body.pwd, 10, (err, hash) => {
											if (err) {
												return res.status(500).json({
													message: "Failed to match the password",
													error: err
												});
											} else {
												const user = new User({
													_id: new mongoose.Types.ObjectId(),
													createdAt: new Date,
													services: {
														password: {
															bcrypt: hash
														},
													},
													username: emailId.toLowerCase(),
													profile: {
														firstname    : req.body.firstname,
														lastname     : req.body.lastname,
														fullName     : req.body.firstname + ' ' + req.body.lastname,
														email        : emailId.toLowerCase(),
														mobile       : req.body.mobNumber,
														company_id   : ObjectID(req.body.company_id),
														companyID    : req.body.companyID,
														workLocation : req.body.workLocation,
														passwordreset: false,
														companyName  : req.body.companyName,
														department	 : req.body.department,
														designation	 : req.body.designation,
														city         : req.body.cityName,
														states       : req.body.states,
														status       : req.body.status ? req.body.status : "blocked",
														createdBy    : req.body.createdBy,
														createdAt    : new Date(),
													},
													roles: req.body.role,
												});
												// console.log("roles==>",roles);  
												if (!req.body.firstname) {
													user.profile.fullName = req.body.fullName;
												}
												
												user.save()
													.then(result => {

														res.status(200).json({
															message: 'USER_CREATED',
															ID: result._id,
														})

													})
													.catch(err => {
														console.log(err);
														res.status(500).json({
															message: "Failed to save User Details",
															error: err
														});
													});
											}
										});
									}
								})
								.catch(err => {
									console.log(err);
									res.status(500).json({
										message: "Failed which finding the User",
										error: err
									});
								});
						} else {
							res.status(200).json({ message: "Role does not exist" });
						}
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
							message: "Failed when trying to find Role",
							error: err
						});
					});
			}
		}else {
			res.status(200).json({ message: "Email, pwd and role are mandatory" });
		}
	}else if(username==="MOBILE"){
		if(req.body.mobNumber && req.body.pwd && req.body.role) {
			var mobNumber = req.body.mobNumber;
			var role_lower = (req.body.role).toLowerCase();
			if (role_lower && mobNumber) {
				Role.findOne({ role: role_lower })
					.exec()
					.then(role => {
						if (role) {
							User.find({ "username": mobNumber })
								.exec()
								.then(user => {
									if (user.length > 0) {
										return res.status(200).json({
											message: 'Mobile number already exists.'
										});
									} else {
										bcrypt.hash(req.body.pwd, 10, (err, hash) => {
											if (err) {
												return res.status(500).json({
													message: "Failed to match the password",
													error: err
												});
											} else {
												const user = new User({
													_id: new mongoose.Types.ObjectId(),
													createdAt: new Date,
													services: {
														password: {
															bcrypt: hash

														},
													},
													username: req.body.mobNumber,
													profile:
													{
														firstname: req.body.firstname,
														lastname: req.body.lastname,
														fullName: req.body.firstname + ' ' + req.body.lastname,
														email: req.body.email,
														mobile: mobNumber,
														passwordreset: false,
														companyID: req.body.companyID,
														companyName: req.body.companyName,
														createdAt: new Date(),
														status: req.body.status ? req.body.status : "Block",
														createdBy: req.body.createdBy,
													},
													roles: [role_lower]
												});
												if (!req.body.firstname) {
													user.profile.fullName = req.body.fullName;
												}
												user.save()
												.then(result => {
													if(result) {
														res.status(200).json({ message: "USER_CREATED", ID: result._id })
													}else {
														res.status(200).json({ message: "USER_NOT_CREATED" })
													}
												})
												.catch(err => {
													console.log(err);
													res.status(500).json({
														message: "Failed to save User Details",
														error: err
													});
												});
											}
										});
									}
								})
								.catch(err => {
									console.log(err);
									res.status(500).json({
										message: "Failed which finding the User",
										error: err
									});
								});
						} else {
							res.status(200).json({ message: "Role does not exits" });
						}
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
							message: "Failed when trying to find Role",
							error: err
						});
					});
			}
		} else {
			res.status(200).json({ message: "Email, pwd and role are mandatory" });
		}
	}	
};
//
function sendEmail(toEmail,subject,content){
   
    // async function main() { 
      GlobalMaster.findOne({type:'EMAIL'})
        .exec() 
        .then(data=>{
            const senderEmail = data.user;
            const senderEmailPwd = data.password;
            // create reusable transporter object using the default SMTP transport
              let transporter = nodeMailer.createTransport({
                host: data.emailHost,
                port: data.port,
                // secure: false, // true for 465, false for other ports
                auth: {
                  user: senderEmail, 
                  pass: senderEmailPwd 
                }
              });

              // send mail with defined transport object
              var mailOptions = {
                    from: data.projectName+' <' + senderEmail + '>', // sender address
                    to: toEmail, // list of receiver
                    subject: subject, // Subject line
                    html: "<pre>" + content + "</pre>", // html body
                };
               let info =  transporter.sendMail(mailOptions, (error, info) => {
                    console.log("Message sent: %s", error,info);
                });
             
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // console.log("Message sent: %s", info.messageId);
              // Preview only available when sending through an Ethereal account
              // console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
              
            

        })
        .catch(err =>{
            console.log('mail error=>',err)
        });
         // main().catch(err=>{console.log('mail error=>',err)});
      
   // }
   
}
//
exports.user_signup_user_otp = (req, res, next) => {
	console.log('signup====',req.body)
	var username = "EMAIL";
	if(req.body.username){
		if(req.body.username === "EMAIL"){
			username = "EMAIL";
		}else if(req.body.username === "MOBILE"){
			username = "MOBILE";
		}
	}
	if(username==="EMAIL"){
		if(req.body.email && req.body.pwd && req.body.role) {
			var emailId = req.body.email;
			var userRole = (req.body.role).toLowerCase();
			if (userRole && emailId) {
				Role.findOne({ role: userRole })
					.exec()
					.then(role => {
						if (role) {
							User.find({ "username": emailId.toLowerCase() })
								.exec()
								.then(user => {
									if (user.length > 0) {
										return res.status(200).json({
											message: 'Email Id already exits.'
										});
									} else {
										bcrypt.hash(req.body.pwd, 10, (err, hash) => {
											if (err) {
												return res.status(500).json({
													message: "Failed to match the password",
													error: err
												});
											} else {
												var emailOTP = getRandomInt(1000, 9999);
												if (emailOTP) {
													const user = new User({
														_id: new mongoose.Types.ObjectId(),
														createdAt: new Date,
														services: {
															password: {
																bcrypt: hash

															},
														},
														username: emailId.toLowerCase(),
														profile:
														{
															firstname    : req.body.firstname,
															lastname     : req.body.lastname,
															fullName     : req.body.firstname + ' ' + req.body.lastname,
															email        : emailId.toLowerCase(),
															mobile       : req.body.mobNumber,
															company_id   : ObjectID(req.body.company_id),
															companyID    : req.body.companyID,
															branch_id 	 : req.body.branch_id,	
															branchCode 	 : req.body.branchCode,	
															workLocation : req.body.workLocation,
															passwordreset: false, 
															companyName  : req.body.companyName,
															department	 : req.body.department,
															designation	 : req.body.designation,
															city		 : req.body.city,
															stateName	 : req.body.stateName,
															stateCode 	 : req.body.stateCode,
															country 	 : req.body.country,
															countryCode  : req.body.countryCode,
															otpEmail     : emailOTP,
															status       : req.body.status ? req.body.status : "blocked",
															createdBy    : req.body.createdBy,
															createdAt    : new Date(),
														},
														roles: [userRole]
													});
													if (!req.body.firstname) {
														user.profile.fullName = req.body.fullName;
													}
													console.log("user.profile.fullName",user.profile.fullName)
													user.save()
														.then(result => {
															console.log('bef mail===',result)

															if (result) {
																// console.log('bef mail359===',result)
															// 	request({
															// 		"method": "POST",
															// 		"url": "http://localhost:" + globalVariable.port + "/send-email",
															// 		"body": {
															// 			email: req.body.email,
															// 			subject: req.body.emailSubject,
															// 			text: req.body.emailContent + " Your OTP is " + emailOTP,
															// 		},
															// 		"json": true,
															// 		"headers": {
															// 			"User-Agent": "Test Agent"
															// 		}
															// 	})
															// 	.then(source => {
															// console.log('aft mail===',source)

															// 		res.status(200).json({ message: "USER_CREATED", ID: result._id })
															// 	})
															// 	.catch(err => {
															// 		console.log(err);
															// 		res.status(500).json({
															// 			message: "Failed to Send Email",
															// 			error: err
															// 		});
															// 	});
															main();
										                        async function main(){ 
											                    	//var sendMail = await sendEmail(req.body.email,req.body.emailSubject,req.body.emailContent + " Your OTP is " + emailOTP);
											                    	res.status(200).json({ message: "USER_CREATED", ID: result._id, OTP:emailOTP})
											                     }
															}else {
																res.status(200).json({ message: "USER_NOT_CREATED" })
															}
														})
														.catch(err => {
															console.log(err);
															res.status(500).json({
																message: "Failed to save User Details",
																error: err
															});
														});
												}
											}
										});
									}
								})
								.catch(err => {
									console.log(err);
									res.status(500).json({
										message: "Failed which finding the User",
										error: err
									});
								});
						} else {
							res.status(200).json({ message: "Role does not exits" });
						}
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
							message: "Failed when trying to find Role",
							error: err
						});
					});
			}
		} else {
			res.status(200).json({ message: "Email, pwd and role are mandatory" });
		}
	}else if(username==="MOBILE"){
		if(req.body.mobNumber && req.body.pwd && req.body.role) {
			var emailId = req.body.email;
			var mobNumber = req.body.mobNumber;
			var userRole = (req.body.role).toLowerCase();
			if (userRole && mobNumber) {
				Role.findOne({ role: userRole })
					.exec()
					.then(role => {
						if (role) {
							User.find({ "username": mobNumber })
								.exec()
								.then(user => {
									if (user.length > 0) {
										return res.status(200).json({
											message: 'Mobile number already exits.'
										});
									} else {
										bcrypt.hash(req.body.pwd, 10, (err, hash) => {
											if (err) {
												return res.status(500).json({
													message: "Failed to match the password",
													error: err
												});
											} else {
												//var mobileOTP = getRandomInt(1000, 9999);
												var mobileOTP = 1234;
												if (mobileOTP) {
													const user = new User({
														_id: new mongoose.Types.ObjectId(),
														createdAt: new Date,
														services: {
															password: {
																bcrypt: hash

															},
														},
														username: req.body.mobNumber,
														profile:
														{
															// firstname: req.body.firstname,
															// lastname: req.body.lastname,
															// fullName: req.body.firstname + ' ' + req.body.lastname,
															// email: req.body.email,
															// mobile: req.body.mobNumber,
															// companyID: req.body.companyID,
															// companyName: req.body.companyName,
															// createdAt: new Date(),
															// passwordreset: false,
															// otpMobile: mobileOTP,
															// status: req.body.status ? req.body.status : "Inactive",
															// createdBy: req.body.createdBy,

															firstname    : req.body.firstname,
															lastname     : req.body.lastname,
															fullName     : req.body.firstname + ' ' + req.body.lastname,
															email        : emailId.toLowerCase(),
															mobile       : req.body.mobNumber,
															company_id   : req.body.company_id ? ObjectID(req.body.company_id) : null,
															companyID    : req.body.companyID,
															branch_id 	 : req.body.branch_id,	
															branchCode 	 : req.body.branchCode,	
															workLocation : req.body.workLocation,
															passwordreset: false, 
															companyName  : req.body.companyName,
															department	 : req.body.department,
															designation	 : req.body.designation,
															city		 : req.body.city,
															stateName	 : req.body.stateName,
															stateCode 	 : req.body.stateCode,
															country 	 : req.body.country,
															countryCode  : req.body.countryCode,
															otpMobile    : mobileOTP,
															status       : req.body.status ? req.body.status : "blocked",
															createdBy    : req.body.createdBy,
															createdAt    : new Date(),
														},
														roles: [userRole]
													});
													if (!req.body.firstname) {
														user.profile.fullName = req.body.fullName;
													}
													user.save()
														.then(result => {
															if(result) {
																res.status(200).json({ message: "USER_CREATED", ID: result._id })
															}else {
																res.status(200).json({ message: "USER_NOT_CREATED" })
															}
														})
														.catch(err => {
															console.log(err);
															res.status(500).json({
																message: "Failed to save User Details",
																error: err
															});
														});
												}
											}
										});
									}
								})
								.catch(err => {
									console.log(err);
									res.status(500).json({
										message: "Failed which finding the User",
										error: err
									});
								});
						} else {
							res.status(200).json({ message: "Role does not exits" });
						}
					})
					.catch(err => {
						console.log(err);
						res.status(500).json({
							message: "Failed when trying to find Role",
							error: err
						});
					});
			}
		} else {
			res.status(200).json({ message: "Email, pwd and role are mandatory" });
		}
	}		
};

exports.check_userID_EmailOTP = (req, res, next) => { 
	User.findOne({ _id: ObjectID(req.body.user_id), "profile.otpEmail": req.body.emailotp })
		.exec()
		.then(user => {
			console.log(user)
			if (user) {
				User.updateOne(
					{ _id: ObjectID(req.body.user_id) },
					{
						$set: {
							"profile.otpEmail": 0,
							"profile.status": req.body.status
						}
					}
				)
					.exec()
					.then(data => {
						console.log(data)
						if (data.nModified === 1) {
							res.status(200).json({ message: "SUCCESS", userID: user._id, passwordreset : user.profile.passwordreset });
						} else {
							res.status(200).json({ message: "SUCCESS_OTP_NOT_RESET" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to update Email OTP",
							error: err
						});
					})
			} else {
				res.status(200).json({ message: "FAILED" });
			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};

exports.check_userID_mobileOTP = (req, res, next) => {
	console.log("user", req.body)

	User.findOne({ _id: ObjectID(req.body.user_id), "profile.otpMobile": req.body.mobileotp })
		.exec()
		.then(user => {
			//console.log("user", user)
			if (user) {
				User.updateOne(
					{ _id: ObjectID(req.body.user_id) },
					{
						$set: {
							"profile.otpMobile": 0,
							"profile.status": req.body.status
						}
					}
				)
					.exec()
					.then(async(data) => {
						
						//console.log("data", data)
						if (data.nModified === 1) {
							await removeTokens(req.body.user_id)
							//res.status(200).json({ message: "SUCCESS", userID: data._id });

							res.status(200).json({ message: "SUCCESS", userID: user._id, passwordreset : user.profile.passwordreset });
						} else {
							res.status(200).json({ message: "SUCCESS_OTP_NOT_RESET" });
						}
					})
					.catch(err => {
						//console.log('user error ', err);
						res.status(500).json({
							message: "Failed to update Mobile OTP",
							error: err
						});
					})
			} else {
				res.status(200).json({ message: "FAILED" });
			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};

exports.check_signup_userID_mobileOTP = (req, res, next) => {
	User.find({ _id: ObjectID(req.params.ID), "profile.otpMobile": req.params.mobileotp })
		.exec()
		.then(data => {
			if (data.length > 0) {
				User.updateOne(
					{ _id: ObjectID(req.params.ID) },
					{
						$set: {
							"profile.otpMobile": 0,
							"profile.status": "blocked"
						}
					}
				)
					.exec()
					.then(data => {
						if (data.nModified === 1) {
							res.status(200).json({ message: "SUCCESS", userID: data._id });
						} else {
							res.status(200).json({ message: "SUCCESS_OTP_NOT_RESET" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to update Mobile OTP",

							error: err
						});
					})
			} else {
				res.status(200).json({ message: "FAILED" });
			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};

exports.check_signup_userID_mobileOTP = (req, res, next) => {
	User.find({ _id: ObjectID(req.params.ID), "profile.otpMobile": req.params.mobileotp })
		.exec()
		.then(data => {
			if (data.length > 0) {
				User.updateOne(
					{ _id: ObjectID(req.params.ID) },
					{
						$set: {
							"profile.otpMobile": 0,
							"profile.status": "blocked"
						}
					}
				)
					.exec()
					.then(data => {
						if (data.nModified === 1) {
							res.status(200).json({ message: "SUCCESS", userID: data._id });
						} else {
							res.status(200).json({ message: "SUCCESS_OTP_NOT_RESET" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to update Mobile OTP",

							error: err
						});
					})
			} else {
				res.status(200).json({ message: "FAILED" });
			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};

exports.check_signup_userID_mobileOTP = (req, res, next) => {

	User.find({ _id: ObjectID(req.params.ID), "profile.otpMobile": req.params.mobileotp })
		.exec()
		.then(data => {
			if (data.length > 0) {
				User.updateOne(
					{ _id: ObjectID(req.params.ID) },
					{
						$set: {
							"profile.otpMobile": 0,
							"profile.status": "blocked"
						}
					}
				)
					.exec()
					.then(data => {
						if (data.nModified === 1) {
							res.status(200).json({ message: "SUCCESS", userID: data._id });
						} else {
							res.status(200).json({ message: "SUCCESS_OTP_NOT_RESET" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to update Mobile OTP",
							error: err
						});
					})
			} else {
				res.status(200).json({ message: "FAILED" });
			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};

exports.check_signup_userID_mobileOTP = (req, res, next) => {

	User.find({ _id: ObjectID(req.params.ID), "profile.otpMobile": req.params.mobileotp })
		.exec()
		.then(data => {
			if (data.length > 0) {
				User.updateOne(
					{ _id: ObjectID(req.params.ID) },
					{
						$set: {
							"profile.otpMobile": 0,
							"profile.status": "blocked"
						}
					}
				)
					.exec()
					.then(data => {
						if (data.nModified === 1) {
							res.status(200).json({ message: "SUCCESS", userID: data._id });
						} else {
							res.status(200).json({ message: "SUCCESS_OTP_NOT_RESET" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to update Mobile OTP",
							error: err
						});
					})
			} else {
				res.status(200).json({ message: "FAILED" });
			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};

exports.check_username_EmailOTP = (req, res, next) => {
	console.log("req.parmas", req.params);
	User.find({ username: req.params.username, "profile.otpEmail": req.params.emailotp })
		.exec()
		.then(data => {
			if (data.length > 0) {
				User.updateOne(
					{
						username: req.params.username
					},
					{
						$set: {
							"profile.otpEmail": 0,
							"profile.status": "active"
						}
					}
				)
					.exec()
					.then(data => {
						if (data.nModified === 1) {
							res.status(200).json({ message: "SUCCESS" });
						} else {
							res.status(200).json({ message: "SUCCESS_OTP_NOT_RESET" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to update Email OTP",
							error: err
						});
					})
			} else {
				res.status(200).json({ message: "FAILED" });
			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};

exports.user_login_using_email = (req, res, next) => {
	var emailId = (req.body.email).toLowerCase();
	var role = (req.body.role).toLowerCase();
	console.log('body', req.body);
	User.findOne({
		"username": emailId,
		"roles": role,
		// "profile.status"	: "active",
	})
		.exec()
		.then(user => {
			if (user) {

				if ((user.profile.status).toLowerCase() == "active") {
					var pwd = user.services.password.bcrypt;
					console.log('pwd', pwd);
					if (pwd) {
						bcrypt.compare(req.body.password, pwd, (err, result) => {
							console.log(err)
							if (err) {
								return res.status(200).json({
									message: 'Auth failed'
								});
							}
							if (result) {
								const token = jwt.sign({
									email: req.body.email,
									userId: user._id,
								}, globalVariable.JWT_KEY,
									{
										expiresIn: "365d"
									}
								);

								User.updateOne(
									{ "username": emailId.toLowerCase() },
									{
										$push: {
											"services.resume.loginTokens": {
												whenLogin: new Date(),
												loginTimeStamp: new Date(),
												hashedToken: token
											}
										}
									}
								)
									.exec()
									.then(updateUser => {
										console.log("updateUser ==>",updateUser)
										if (updateUser.nModified == 1) {
											res.status(200).json({
												message: 'Login Auth Successful',
												token: token,
												roles: user.roles,
												ID: user._id,
												companyID: user.profile.companyID,
												userDetails: {
													firstName: user.profile.firstname,
													lastName: user.profile.lastname,
													email: user.profile.email,
													phone: user.profile.phone,
													city: user.profile.city,
													passwordreset: user.profile.passwordreset,
													companyID: user.profile.companyID,
													locationID: user.profile.locationID,
													user_id: user._id,
													roles: user.roles,
													token: token,
												}
											});
										} else {
											return res.status(200).json({
												message: 'Auth failed'
											});
										}
									})

									.catch(err => {
										console.log("500 err ", err);
										res.status(500).json({
											message: "Failed to save token",
											error: err
										});
									});
							} else {
								return res.status(200).json({
									message: 'INVALID_PASSWORD'
								});
							}
						})
					} else {
						res.status(200).json({ message: "INVALID_PASSWORD" });
					}
				} else if ((user.profile.status).toLowerCase() == "blocked") {
					res.status(200).json({ message: "USER_BLOCK" });
				} else if ((user.profile.status).toLowerCase() == "unverified") {
					res.status(200).json({ message: "USER_UNVERIFIED" });
				}
			} else {
				res.status(200).json({ message: "NOT_REGISTER" });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};

exports.user_login_using_mobile = (req, res, next) => {
	var mobNumber = req.body.mobNumber;
	var role = (req.body.role).toLowerCase();

	console.log("mobNumber",mobNumber)
	console.log("role",role)

	User.findOne({
		"username": mobNumber,
		"roles": role,
	})
	.exec()
	.then(user => {
		if (user){
			main();
			async function main(){
				if((user.profile.status).toLowerCase() == "active") {
					var pwd = user.services.password.bcrypt;
					console.log('pwd', pwd);
					if (pwd) {
							bcrypt.compare(req.body.password, pwd, (err, result) => {
								if (err) {
									return res.status(200).json({
										message: 'Auth failed'
									});
								}
								if (result) {
									// var login_token = user.services.resume.loginTokens.length > 0 && user.services.resume.loginTokens[user.services.resume.loginTokens.length-1].hashedToken !== undefined ? user.services.resume.loginTokens[user.services.resume.loginTokens.length-1].hashedToken : false;
									// if(login_token){
									// 	console.log("login_token",login_token);
									// 	res.status(200).json({
									// 		message: 'already_loggedin',
									// 		token: user.token,
									// 		ID: user._id,
									// 	});
									// }
									// else{
									const token = jwt.sign({
										mobile: req.body.mobNumber,
										userId: user._id,
									}, globalVariable.JWT_KEY,
										{
											expiresIn: "365d"
										}
									);
		
									User.updateOne(
										{ "username": mobNumber },
										{
											$push: {
												"services.resume.loginTokens": {
													whenLogin: new Date(),
													hashedToken: token
												}
											}
										}
									)
										.exec()
										.then(updateUser => {
											main();
											async function main(){
												//var companyContacts = await getCompanyContacts(user.profile.companyID);
												//console.log("companyContacts",companyContacts);
												if (updateUser.nModified == 1) {
													
														res.status(200).json({
															/*message: 'Login Auth Successful',
															token: token,
															roles: user.roles,
															ID: user._id,
															companyID: user.profile.companyID,
															passwordreset: user.profile.passwordreset,
															username : user.username,
															userDetails: {
																firstName: user.profile.firstname,
																lastName: user.profile.lastname,
																email: user.profile.email,
																phone: user.profile.phone,
																passwordreset: user.profile.passwordreset,
																city: user.profile.city,
																companyID: user.profile.companyID,
																locationID: user.profile.locationID,
																user_id: user._id,
																roles: user.roles,
																token: token,
															},
															companyContacts : companyContacts */

															message: 'Login Auth Successful',
															token: token,
															roles: user.roles,
															ID: user._id,
															company_id: user.profile.company_id,
															companyID: user.profile.companyID,
															passwordreset: user.profile.passwordreset,
															username : user.username,
															userDetails: {
																firstName: user.profile.firstname,
																lastName: user.profile.lastname,
																email: user.profile.email,
																phone: user.profile.phone,
																passwordreset: user.profile.passwordreset,
																company_id:user.profile.company_id,
																companyID: user.profile.companyID,
																workLocation: user.profile.workLocation,
																branch_id: user.profile.branch_id,
																branchCode: user.profile.branchCode,
																city: user.profile.city,
																stateName 	: user.profile.stateName,
																stateCode 	: user.profile.stateCode,
																country 	: user.profile.country,
																countryCode : user.profile.countryCode,
																user_id: user._id,
																roles: user.roles,
																token: token,
															}  
														});
												
												} else {
													return res.status(200).json({
														message: 'Auth failed'
													});
												}
											}		
										})
		
										.catch(err => {
											console.log("500 err ", err);
											res.status(500).json({
												message: "Failed to save token",
												error: err
											});
										});
									//}		
								} else {
									return res.status(200).json({
										message: 'INVALID_PASSWORD'
									});
								}
							})
					} else {
						res.status(200).json({ message: "INVALID_PASSWORD",ID: user._id});
					}
				} else if ((user.profile.status).toLowerCase() == "blocked") {
					res.status(200).json({ message: "USER_BLOCK",ID: user._id });
				} else if ((user.profile.status).toLowerCase() == "unverified") {
					res.status(200).json({ message: "USER_UNVERIFIED",ID: user._id});
				}
			}
		} else {
			res.status(200).json({ message: "NOT_REGISTER" });
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({
			message: "Failed to find the User",
			error: err
		});
	});
};

function removeTokens(user_id){
   return new Promise(function(resolve,reject){
	User.findOne({ _id: user_id },{services:1})
	.exec()
	.then(user => {
		var login_token = user.services.resume.loginTokens.length > 0 && user.services.resume.loginTokens[user.services.resume.loginTokens.length-1].hashedToken !== undefined ? user.services.resume.loginTokens[user.services.resume.loginTokens.length-1].hashedToken : false;
			if(login_token){	
				User.update(
					{
						"_id": user_id,
						"services.resume.loginTokens.hashedToken":login_token
					},
					{
						$set: {
							"services.resume.loginTokens.$.logoutTimeStamp": new Date(),
						},
						$unset: {
							"services.resume.loginTokens.$.hashedToken":1
						}, 
					})	
					.exec()
					.then(data => {
						resolve(data);
					})
					.catch(err => {
						console.log("err",err)
					});
			}else{
				resolve("Not Found");
			}	
		})
		.catch(err => {
			console.log('update user status error ',err);
		});
    });
}

exports.checked_token = (req, res, next) => {
	User.findOne({ _id: req.params.user_id },{services:1})
	.exec()
	.then(user => {
	var login_token = user.services.resume.loginTokens.length > 0 && user.services.resume.loginTokens[user.services.resume.loginTokens.length-1].hashedToken !== undefined ? user.services.resume.loginTokens[user.services.resume.loginTokens.length-1].hashedToken : false;
		if(req.params.token === login_token){
			return res.status(200).json({token: true});
		}else{
			return res.status(200).json({token: false});
		}
	})
	.catch(err => {
		console.log('update user status error ',err);
	});
}

function getCompanyContacts(companyID){
	console.log("companyID",companyID)
   return new Promise(function(resolve,reject){
        EntityMaster.findOne({"companyID" : companyID},{"contactPersons":1})
             .exec()
             .then(data=>{
			console.log("data",data)
              var contacts = data.contactPersons.map((a, i)=>a.phone);
				console.log("contacts",contacts)
              resolve(contacts);
             })
            .catch(err =>{
                console.log("err",err)
            });
    });
}

exports.user_login_with_companyID = (req, res, next) => {
	var emailId = (req.body.email).toLowerCase();
	var role = (req.body.role).toLowerCase();
	User.findOne({
		"username": emailId,
		"roles": role,
	})
		.exec()
		.then(user => {
			if (user) {
				var loginTokenscount = user.services.resume.loginTokens.length;
				if (user.profile.companyID != "") {
					if ((user.profile.status).toLowerCase() == "active") {
						var pwd = user.services.password.bcrypt;
						if (pwd) {
							bcrypt.compare(req.body.password, pwd, (err, result) => {
								if (err) {
									return res.status(200).json({
										message: 'Auth failed'
									});
								}
								if (result) {
									const token = jwt.sign({
										email: req.body.email,
										userId: user._id,
									}, globalVariable.JWT_KEY,
										{
											expiresIn: "365d"
										}
									);
									User.updateOne(
										{ "username": emailId.toLowerCase() },
										{
											$push: {
												"services.resume.loginTokens": {
													whenLogin: new Date(),
													loginTimeStamp: new Date(),
													hashedToken: token,
												}
											}
										}
									)
										.exec()
										.then(updateUser => {
											console.log("Login details===>>",user.profile.passwordreset)
											if (updateUser.nModified == 1) {
												res.status(200).json({
													message: 'Login Auth Successful',
													token: token,
													roles: user.roles,
													ID: user._id,
													company_id: user.profile.company_id, 
													companyID: user.profile.companyID,
													loginTime: user.services.resume.loginTokens,
													passwordreset: user.profile.passwordreset,
													userDetails: {
														firstName: user.profile.firstname,
														lastName: user.profile.lastname,
														email: user.profile.email,
														phone: user.profile.phone,
														passwordreset: user.profile.passwordreset,
														city: user.profile.city,

														company_id:user.profile.company_id,

														companyID: user.profile.companyID,
														workLocation: user.profile.workLocation,
														locationID: user.profile.locationID,
														user_id: user._id,
														roles: user.roles,
														token: token,
														// loginTime: user.services.resume.loginTokens
														// loginTime: user.services.resume.loginTokens[loginTokenscount-1].logoutTimeStamp,
													}
												});
											} else {
												return res.status(200).json({
													message: 'Auth failed'
												});
											}
										})
										.catch(err => {
											console.log("500 err ", err);
											res.status(500).json({
												message: "Failed to save token",
												error: err
											});
										});
								} else {
									return res.status(200).json({
										message: 'INVALID_PASSWORD'
									});
								}
							})
						} else {
							res.status(200).json({ message: "INVALID_PASSWORD" });
						}
					} else if ((user.profile.status).toLowerCase() == "blocked") {
						console.log("user.USER_BLOCK IN ==>")
						res.status(200).json({ message: "USER_BLOCK" });
					} else if ((user.profile.status).toLowerCase() == "unverified") {
						res.status(200).json({ message: "USER_UNVERIFIED" });
					}
				} else if (user.profile.companyID == "") {
					res.status(200).json({ message: "NO_COMPANYID" });
				}
			} else {
				res.status(200).json({ message: "NOT_REGISTER" });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: "Failed to find the User",
				error: err
			});
		});
};
// exports.user_login_with_companyID = (req, res, next) => {
// 	var emailId = (req.body.email).toLowerCase();
// 	var role = (req.body.role).toLowerCase();
// 	User.findOne({
// 		"username": emailId,
// 		"roles": role,
// 	})
// 		.exec()
// 		.then(user => {
// 			if (user) {
// 				var loginTokenscount = user.services.resume.loginTokens.length;
// 				if (user.profile.companyID != "") {
// 					if ((user.profile.status).toLowerCase() == "active") {
// 						var pwd = user.services.password.bcrypt;
// 						if (pwd) {
// 							bcrypt.compare(req.body.password, pwd, (err, result) => {
// 								if (err) {
// 									return res.status(200).json({
// 										message: 'Auth failed'
// 									});
// 								}
// 								if (result) {
// 									const token = jwt.sign({
// 										email: req.body.email,
// 										userId: user._id,
// 									}, globalVariable.JWT_KEY,
// 										{
// 											expiresIn: "365d"
// 										}
// 									);
// 									User.updateOne(
// 										{ "username": emailId.toLowerCase() },
// 										{
// 											$push: {
// 												"services.resume.loginTokens": {
// 													whenLogin: new Date(),
// 													loginTimeStamp: new Date(),
// 													hashedToken: token,
// 													logoutTimeStamp : null
// 												}
// 											}
// 										}
// 									)
// 										.exec()
// 										.then(updateUser => {
// 											if (updateUser.nModified == 1) {
// 												var alllogings = user.services.resume.loginTokens;
// 												console.log("user after alllogings corporate===>",alllogings)
// 												res.status(200).json({
// 													message: 'Login Auth Successful',
// 													token: token,
// 													roles: user.roles,
// 													ID: user._id,
// 													companyID: user.profile.companyID,
// 													lastLogin: alllogings,
// 													userDetails: {
// 														firstName: user.profile.firstname,
// 														lastName: user.profile.lastname,
// 														email: user.profile.email,
// 														phone: user.profile.phone,
// 														city: user.profile.city,
// 														companyID: user.profile.companyID,
// 														locationID: user.profile.locationID,
// 														user_id: user._id,
// 														roles: user.roles,
// 														token: token,
// 														lastLogin: alllogings,

// 													}
// 												});
// 											} else {
// 												return res.status(200).json({
// 													message: 'Auth failed'
// 												});
// 											}
// 										})
// 										.catch(err => {
// 											console.log("500 err ", err);
// 											res.status(500).json({
// 												message: "Failed to save token",
// 												error: err
// 											});
// 										});
// 								} else {
// 									return res.status(200).json({
// 										message: 'INVALID_PASSWORD'
// 									});
// 								}
// 							})
// 						} else {
// 							res.status(200).json({ message: "INVALID_PASSWORD" });
// 						}
// 					} else if ((user.profile.status).toLowerCase() == "blocked") {
// 						console.log("user.USER_BLOCK IN ==>")
// 						res.status(200).json({ message: "USER_BLOCK" });
// 					} else if ((user.profile.status).toLowerCase() == "unverified") {
// 						res.status(200).json({ message: "USER_UNVERIFIED" });
// 					}
// 				} else if (user.profile.companyID == "") {
// 					res.status(200).json({ message: "NO_COMPANYID" });
// 				}
// 			} else {
// 				res.status(200).json({ message: "NOT_REGISTER" });
// 			}
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json({
// 				message: "Failed to find the User",
// 				error: err
// 			});
// 		});
// };

exports.logouthistory = (req, res, next) => {
	// console.log("res -----");
	console.log("res -----",req.body);
	// var emailId = req.body.emailId;
	User.findOne({ _id: req.body.user_ID })
		.exec()
		.then(user => {
			console.log("user",user);
				User.updateOne(
					{
						"username": req.body.email,
						"services.resume.loginTokens.hashedToken":req.body.token

					},
					{
						$set: {
							
								"services.resume.loginTokens.$.logoutTimeStamp": new Date(),
						
						}
					}
					)	.exec()
					.then(data => {
							res.status(201).json({data})
					})
					.catch(err => {
						res.status(500).json({
							message: "Failed to update User",
							error: err
						});
					});
					
					})
		.catch(err => {
			// console.log('update user status error ',err);
			res.status(500).json({
				error: err
			});
		});
};

exports.logout_mobile = (req, res, next) => {
	// console.log("res -----");
	console.log("res -----",req.body);
	// var emailId = req.body.emailId;
	User.findOne({ _id: req.body.user_id })
		.exec()
		.then(user => {
			console.log("user",user);
				User.updateOne(
					{
						"_id": req.body.user_id ,
						"services.resume.loginTokens.hashedToken":req.body.token

					},
					{
						$set: {
							"services.resume.loginTokens.$.logoutTimeStamp": new Date(),
						},
						$unset: {
							"services.resume.loginTokens.$.hashedToken":1
						}, 
					}	)	
					.exec()
					.then(data => {
							res.status(201).json({data})
					})
					.catch(err => {
						res.status(500).json({
							message: "Failed to update User",
							error: err
						});
					});
					
					})
		.catch(err => {
			console.log('update user status error ',err);
			res.status(500).json({
				error: err
			});
		});
};

exports.user_update_password_withoutotp_ID = (req, res, next) => {
	console.log(req.body)
	User.findOne({ _id: req.body.user_id })
		.exec()
		.then(user => {
			if (user) {
				console.log(req.body.pwd)
				bcrypt.hash(req.body.pwd, 10, (err, hash) => {
					User.updateOne(
						{ _id: req.body.user_id },
						{
							$set: {
								services: {
									password: {
										bcrypt: hash
									},
								},
								//"profile.passwordreset": true,
							}
						}
					)
						.exec()
						.then(data => {
							console.log('update user data ',data);
							if (data.nModified == 1) {
								res.status(200).json("PASSWORD_RESET");
								// User.updateOne(
								// 	{ "username": req.body.emailId.toLowerCase() },
								// 	{
								// 		$push: {
								// 			"services.resume.loginTokens": {
								// 				hashedToken: token,
								// 			}
								// 		}
								// 	}
								// )
								// 	.exec()
								// 	.then(data => {
										
								// 		});
								// 		.catch(err => {
								// 			console.log(err);
								// 			res.status(500).json({
								// 				error: err
								// 			});
								// 		});
								
							} else {
								res.status(401).json("PASSWORD_NOT_RESET");
							}
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				});
			} else {
				res.status(404).json("User Not Found");
			}
		})
		.catch(err => {
			// console.log('update user status error ',err);
			res.status(500).json({
				error: err
			});
		});
};

exports.user_update_password_withoutotp_username = (req, res, next) => {
	User.findOne({ username: req.params.username })
		.exec()
		.then(user => {
			console.log("user ", user);
			if (user) {
				bcrypt.hash(req.body.pwd, 10, (err, hash) => {
					User.updateOne(
						{ username: req.params.username },
						{
							$set: {
								services: {
									password: {
										bcrypt: hash
									},
								},
							}
						}
					)
						.exec()
						.then(data => {
							if (data.nModified == 1) {
								res.status(200).json("PASSWORD_RESET");
							} else {
								res.status(401).json("PASSWORD_NOT_RESET");
							}
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				});
			} else {
				res.status(404).json("User Not Found");
			}
		})
		.catch(err => {
			// console.log('update user status error ',err);
			res.status(500).json({
				error: err
			});
		});
};

exports.user_update_password_with_emailOTP_ID = (req, res, next) => {
	User.findOne({
		"_id": req.params.ID,
		"profile.otpEmail": req.body.emailOTP
	})
		.exec()
		.then(user => {
			if (user) {
				bcrypt.hash(req.body.pwd, 10, (err, hash) => {
					User.updateOne(
						{ _id: req.params.ID },
						{
							$set: {
								services: {
									password: {
										bcrypt: hash
									},
								},
							}
						}
					)
						.exec()
						.then(data => {
							if (data.nModified == 1) {
								res.status(200).json("PASSWORD_RESET");
							} else {
								res.status(401).json("PASSWORD_NOT_RESET");
							}
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				});
			} else {
				res.status(404).json({ message: "User Not Found or Otp Didnt match" });
			}
		})
		.catch(err => {
			// console.log('update user status error ',err);
			res.status(500).json({
				error: err
			});
		});
};

exports.user_update_password_with_emailOTP_username = (req, res, next) => {
	User.findOne({
		"username": req.params.username,
		"profile.otpEmail": req.body.emailOTP
	})
		.exec()
		.then(user => {
			if (user) {
				bcrypt.hash(req.body.pwd, 10, (err, hash) => {
					User.updateOne(
						{ "username": req.params.username },
						{
							$set: {
								services: {
									password: {
										bcrypt: hash
									},
								},
							}
						}
					)
						.exec()
						.then(data => {
							if (data.nModified == 1) {
								res.status(200).json("PASSWORD_RESET");
							} else {
								res.status(401).json("PASSWORD_NOT_RESET");
							}
						})
						.catch(err => {
							console.log(err);
							res.status(500).json({
								error: err
							});
						});
				});
			} else {
				res.status(404).json({ message: "User Not Found or Otp Didnt match" });
			}
		})
		.catch(err => {
			// console.log('update user status error ',err);
			res.status(500).json({
				error: err
			});
		});
};

exports.set_send_emailOTPIDWith_usingID = (req, res, next) => {

	var otpEmail = getRandomInt(1000, 9999);
	User.updateOne(
		{ _id: req.params.username },
		{
			$set: {
				"profile.otpEmail": otpEmail,
			},
		}
	)
		.exec()
		.then(data => {
			if (data.nModified === 1) {
				User.findOne({ _id: req.params.username })
					.then(user => {
						if (user) {
							main();
							async function main(){ 
								res.status(200).json({ message: "OTP_UPDATED", otpEmail : otpEmail,ID: user._id })
							 }
						} else {
							res.status(200).json({ message: "User not found" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to find User",
							error: err
						});
					});
			} else {
				console.log("data not modified");
				res.status(401).json({ message: "OTP_NOT_UPDATED" })
			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to update User",
				error: err
			});
		});
};
exports.set_send_emailotp_usingID = (req, res, next) => {
	var otpEmail = getRandomInt(1000, 9999);
	User.updateOne(
		{ _id: req.params.username },
		{
			$set: {
				"profile.otpEmail": otpEmail,
			},
		}
	)
		.exec()
		.then(data => {
			if (data.nModified === 1) {
				User.findOne({ _id: req.params.username })
					.then(user => {
						if (user) {
							main();
							async function main(){ 

								res.status(200).json({ message: "OTP_UPDATED", otpEmail : otpEmail,ID: user._id })

							 }
						} else {
							res.status(200).json({ message: "User not found" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to find User",
							error: err
						});
					});
			} else {
				console.log("data not modified");
				res.status(401).json({ message: "OTP_NOT_UPDATED" })

			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to update User",
				error: err
			});
		});
};
exports.set_otp_usingID = (req, res, next) => {
	var otpEmail = getRandomInt(1000, 9999);
	User.updateOne(
		{ _id: req.body.userid },
		{
			$set: {
				"profile.otpEmail": otpEmail,
			},
		}
	)
		.exec()
		.then(data => {
			if (data.nModified === 1) {
				User.findOne({ _id: req.body.userid })
					.then(user => {
						if (user) {
							res.status(200).json({ message: "OTP_UPDATED", ID: user._id, OTP:otpEmail, firstName:user.profile.firstname })
						} else {
							res.status(200).json({ message: "User not found" });
						}
					})
					.catch(err => {
						console.log('user error ', err);
						res.status(500).json({
							message: "Failed to find User",
							error: err
						});
					});
			} else {
				console.log("data not modified");
				res.status(401).json({ message: "OTP_NOT_UPDATED" })

			}
		})
		.catch(err => {
			console.log('user error ', err);
			res.status(500).json({
				message: "Failed to update User",
				error: err
			});
		});
};

exports.set_send_mobileotp_usingID = (req, res, next) => {
	User.findOne({ _id: req.params.ID})
	.then(user => {
		if(user){
			var otpMobile = getRandomInt(1000, 9999);
			User.updateOne(
			{ _id: req.params.ID},
			{
				$set: {
					"profile.otpMobile": otpMobile,
				},
			})
			.exec()
			.then(data => {
				// if (data.nModified === 1) {
					res.status(201).json({ message: "OTP_UPDATED", userID: user._id,otpMobile:otpMobile,fullName:user.profile.fullName })
				// } else {
				// 	res.status(200).json({ message: "OTP_NOT_UPDATED" })
				// }
			})
			.catch(err => {
				res.status(500).json({
					message: "Failed to update User",
					error: err
				});
			});
		}else{
			res.status(200).json({ message: "NOT_REGISTER" })
		}
	})
	.catch(err => {
		res.status(500).json({
			message: "Failed to find User",
			error: err
		});
	});
};

exports.set_otp_usingEmail = (req, res, next) => {
	User.findOne({ "profile.email": req.body.email })
	.then(user => {
		if(user){
			if ((user.profile.status).toLowerCase() === "active" || (user.profile.status).toLowerCase() == "unverified") {
 				var optEmail = getRandomInt(1000, 9999);
				//console.log("optEmail", optEmail, req.body);
				User.updateOne(
					{ "profile.email": req.body.email },
					{
						$set: {
							"profile.otpEmail"		: optEmail,
							"profile.passwordreset"	: (user.profile.status).toLowerCase() == "active" ? true : false,
						},
					}
				)
				.exec()
				.then(data => {
					if (data.nModified === 1) {
						User.findOne({ "profile.email": req.body.email })
							.then(user => {
								if (user) {

									res.status(200).json({ message: "OTP_UPDATED", ID: user._id, OTP:optEmail, firstName:user.profile.firstname })

								} else {
									res.status(200).json({ message: "User not found" });
								}
							})
							.catch(err => {
								res.status(500).json({
									message: "Failed to find User",
									error: err
								});
							});
					} else {
						res.status(401).json({ message: "OTP_NOT_UPDATED" })
					}
				})
				.catch(err => {
					res.status(500).json({
						message: "Failed to update User",
						error: err
					});
				});
 			}
 			
 			else if ((user.profile.status).toLowerCase() == "blocked") {
				console.log("user.USER_BLOCK IN ==>")
				res.status(200).json({ message: "USER_BLOCK" });
			} 
			/*else if ((user.profile.status).toLowerCase() == "unverified") {
				res.status(200).json({ message: "USER_UNVERIFIED" });
			}*/
		}else{
			res.status(200).json({ message: "NOT_REGISTER" })
		}		
	})
	.catch(err => {
		res.status(500).json({
			message: "Failed to find User",
			error: err
		});
	});				
};

exports.set_send_mobileotp_usingMobile = (req, res, next) => {
	console.log(req.body.mobileNo)
	User.findOne({ "username": req.body.mobileNo })
	.then(user => {
		if(user){
			if ((user.profile.status).toLowerCase() === "active" || (user.profile.status).toLowerCase() == "unverified") {
 				var otpMobile = 1234
				//var otpMobile = getRandomInt(1000, 9999);
				User.updateOne(
				{ "username": req.body.mobileNo },
				{
					$set: {
						"profile.otpMobile": otpMobile,
						"profile.passwordreset"	: (user.profile.status).toLowerCase() == "active" ? true : false,
					},
				})
				.exec()
				.then(async(data) => {
					// if (data.nModified === 1) {
						
						res.status(201).json({ message: "OTP_UPDATED", userID: user._id ,fullName:user.profile.fullName,otpMobile:otpMobile})
					// } else {
					// 	res.status(200).json({ message: "OTP_NOT_UPDATED" })
					// }
				})
				.catch(err => {
					res.status(500).json({
						message: "Failed to update User",
						error: err
					});
				});
			}
			else if ((user.profile.status).toLowerCase() == "blocked") {
				console.log("user.USER_BLOCK IN ==>")
				res.status(200).json({ message: "USER_BLOCK" });
			} 
		}else{
			res.status(200).json({ message: "NOT_REGISTER" })
		}
	})
	.catch(err => {
		res.status(500).json({
			message: "Failed to find User",
			error: err
		});
	});	
};


exports.update_user_resetpwd = (req, res, next) => {
	console.log(req.body)
	User.findOne({ "username": req.body.mobileNo })
	.exec()
	.then(user => {
		// console.log("reset pwd user",user)
		if (user) {
			// console.log("reset pwd user1",user)
			bcrypt.hash(req.body.pwd, 10, (err, hash) => {
			User.updateOne(
				{ _id: user._id },
				{
					$set: {
							services: {
								password: {
								bcrypt: hash
							},
						},
					}
				}
			)
			.exec()
			.then(data => {
				if (data.nModified == 1) {
					// console.log("reset data==>> ",data)
					res.status(200).json("Password Updated");
				} else {
					res.status(401).json("Password Not Found");
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
		});
		} else {
			res.status(404).json("User Not Found");
		}
	})
	.catch(err => {
		res.status(500).json({
		error: err
		});
	});
}