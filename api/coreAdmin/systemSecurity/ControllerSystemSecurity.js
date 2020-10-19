const mongoose			= require("mongoose");
const bcrypt			= require("bcrypt");
const jwt				= require("jsonwebtoken");
var   ObjectID 			= require('mongodb').ObjectID;
var   request           = require('request-promise');
const User 				= require('../userManagement/ModelUsers.js');
const Role 				= require('../rolesManagement/ModelRoles.js');
const globalVariable 	= require("../../nodemon.js");

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.user_signup_user = (req,res,next)=>{
	console.log("user_signup_user ",req.body);
	if(req.body.email && req.body.pwd && req.body.role){
		var emailId 	= req.body.email;
		var role_lower 	= (req.body.role).toLowerCase();
		console.log("role ",role_lower);
		if(role_lower && emailId){
			Role.findOne({role:role_lower})
			    .exec()
			    .then(role=>{
			    	if(role){
			    		User.find({"username":emailId.toLowerCase()})
							.exec()
							.then(user =>{
								if(user.length > 0){
									return res.status(200).json({
										message: 'Email Id already exits.'
									});
								}else{
									bcrypt.hash(req.body.pwd,10,(err,hash)=>{
										if(err){
											return res.status(500).json({
												message 	: "Failed to match the password",
												error 		: err
											});
										}else{
											const user = new User({
															_id			: new mongoose.Types.ObjectId(),
															createdAt	: new Date,
															services	: {
																password:{
																			bcrypt:hash
																			
																		},
															},
															username	: emailId.toLowerCase(),
															profile		: {
																		firstname     : req.body.firstname,
																		lastname      : req.body.lastname,
																		fullName      : req.body.firstname+' '+req.body.lastname,
																		email         : emailId.toLowerCase(),
																		mobile     	  : req.body.mobNumber,
																		createdAt     : new Date(),
																		status		  : req.body.status ? req.body.status : "Block",
																		createdBy 	  : req.body.createdBy,
																	},
															roles 		: [role_lower]
											});	
											if(!req.body.firstname){
												user.profile.fullName = req.body.fullName;
											}
											user.save()
												.then(result =>{
													res.status(200).json({
														message	: 'USER_CREATED',
														ID 		: result._id,
													})
												})
												.catch(err =>{
													console.log(err);
													res.status(500).json({
														message : "Failed to save User Details", 
														error 	: err
													});
												});
										}			
									});
								}
							})
							.catch(err =>{
								console.log(err);
								res.status(500).json({
									message 	: "Failed which finding the User",
									error 		: err
								});
							});
			    	}else{
			    		res.status(200).json({message: "Role does not exits"});
			    	}
			    })
			    .catch(err =>{
					console.log(err);
					res.status(500).json({
						message : "Failed when trying to find Role",
						error   : err
					});
				});
		}
	}else{
		res.status(200).json({message:"Email, pwd and role are mandatory"});
	}
};
exports.user_signup_user_email_otp = (req,res,next)=>{
	console.log('req.body', req.body);
	if(req.body.email && req.body.pwd && req.body.role){
		var emailId = req.body.email;
		var userRole 	= (req.body.role).toLowerCase();
		if(userRole && emailId){
			Role.findOne({role:userRole})
			    .exec()
			    .then(role=>{
			    	if(role){
			    		User.find({"username":emailId.toLowerCase()})
							.exec()
							.then(user =>{
								if(user.length > 0){
									return res.status(200).json({
										message: 'Email Id already exits.'
									});
								}else{
									bcrypt.hash(req.body.pwd,10,(err,hash)=>{
										if(err){
											return res.status(500).json({
												message 	: "Failed to match the password",
												error 		: err
											});
										}else{
											var emailOTP = getRandomInt(1000,9999);
											if(emailOTP){
												const user = new User({
																_id			: new mongoose.Types.ObjectId(),
																createdAt	: new Date,
																services	: {
																	password:{
																				bcrypt:hash
																				
																			},
																},
																username	: emailId.toLowerCase(),
																profile		:
																		{
																			firstname     : req.body.firstname,
																			lastname      : req.body.lastname,
																			fullName      : req.body.firstname+' '+req.body.lastname,
																			email         : emailId.toLowerCase(),
																			mobile     	  : req.body.mobNumber,
																			createdAt     : new Date(),
																			otpEmail      : emailOTP,
																			status		  : req.body.status ? req.body.status : "Inactive",
																			createdBy 	  : req.body.createdBy,
																		},
																roles 		: [userRole]
												});	
												if(!req.body.firstname){
													user.profile.fullName = req.body.fullName;
												}
												user.save()
												.then(result =>{
													if(result){
														request({
												                "method"    : "POST", 
												                "url"       : "http://localhost:"+globalVariable.port+"/send-email",
												                "body"      : {
												                					email 	: req.body.email, 
												                					subject : req.body.emailSubject,
												                					text    : req.body.emailContent + " Your OTP is "+ emailOTP, 
												                			   },
												                "json"      : true,
												                "headers"   : {
												                                "User-Agent": "Test Agent"
												                            }
												            })
												            .then(source=>{
												            	res.status(200).json({message:"USER_CREATED",ID:result._id})
												            })
												    		.catch(err =>{
																console.log(err);
																res.status(500).json({
																	message : "Failed to Send Email",
																	error: err
																});
															});        
													}else{
														res.status(200).json({message:"USER_NOT_CREATED"})
													}
												})
												.catch(err =>{
													console.log(err);
													res.status(500).json({
														message : "Failed to save User Details", 
														error 	: err
													});
												});
											}
										}			
									});
								}
							})
							.catch(err =>{
								console.log(err);
								res.status(500).json({
									message 	: "Failed which finding the User",
									error 		: err
								});
							});
			    	}else{
			    		res.status(200).json({message: "Role does not exits"});
			    	}
			    })
			    .catch(err =>{
					console.log(err);
					res.status(500).json({
						message : "Failed when trying to find Role",
						error   : err
					});
				});
		}
	}else{
		res.status(200).json({message:"Email, pwd and role are mandatory"});
	}
};
exports.check_userID_EmailOTP = (req,res,next)=>{
	User.find({_id : ObjectID(req.params.ID), "profile.otpEmail" : req.params.emailotp})
		.exec()
		.then(data=>{
			if(data.length > 0){
				User.updateOne(
							{_id : ObjectID(req.params.ID)}, 
							{
								$set:{
									"profile.otpEmail" : 0,
									"profile.status"   : "active"
								}
							}
					)
				    .exec()
				    .then(data=>{
				    	if(data.nModified === 1){
							res.status(200).json({message:"SUCCESS", userID: data._id});
				    	}else{
							res.status(200).json({message:"SUCCESS_OTP_NOT_RESET"});    		
				    	}
				    })
				    .catch(err =>{
						console.log('user error ',err);
						res.status(500).json({
							message : "Failed to update Email OTP",
							error: err
						});
					})
			}else{
				res.status(200).json({message:"FAILED"});
			}
		})
		.catch(err =>{
			console.log('user error ',err);
			res.status(500).json({
				message : "Failed to find the User",
				error: err
			});
		});		
};
exports.check_username_EmailOTP = (req,res,next)=>{
	console.log("req.parmas",req.params);
	User.find({username : req.params.username, "profile.otpEmail" : req.params.emailotp})
		.exec()
		.then(data=>{
			if(data.length > 0){
				User.updateOne(
							{
								username : req.params.username
							}, 
							{
								$set:{
									"profile.otpEmail" : 0,
									"profile.status"   : "active"
								}
							}
					)
				    .exec()
				    .then(data=>{
				    	if(data.nModified === 1){
							res.status(200).json({message:"SUCCESS"});
				    	}else{
							res.status(200).json({message:"SUCCESS_OTP_NOT_RESET"});    		
				    	}
				    })
				    .catch(err =>{
						console.log('user error ',err);
						res.status(500).json({
							message : "Failed to update Email OTP",
							error: err
						});
					})
			}else{
				res.status(200).json({message:"FAILED"});
			}
		})
		.catch(err =>{
			console.log('user error ',err);
			res.status(500).json({
				message : "Failed to find the User",
				error: err
			});
		});		
};
exports.user_login = (req,res,next) =>{
	var emailId = (req.body.email).toLowerCase();
	var role 	= (req.body.role).toLowerCase();
	console.log('user',req.body)
	User.findOne({
				"username"  		: emailId,
				"roles" 			: role,
				// "profile.status"	: "active",
			})
			.exec()
			.then(user => {
				if(user && user.profile){
					if(( user.profile.status).toLowerCase() == "active"){
						var pwd = user.services.password.bcrypt;
						console.log('pwd', pwd);
						if(pwd){
							bcrypt.compare(req.body.password,pwd,(err,result)=>{
								if(err){
									return res.status(200).json({
										message: 'Auth failed'
									});		
								}
								if(result){
									const token = jwt.sign({
										email 	: req.body.email,
										userId	:  user._id ,
									},globalVariable.JWT_KEY,
									{
										expiresIn: "365d"
									}
									);
									User.updateOne(
											{"username":emailId.toLowerCase()},
											{
												$push : {
													"services.resume.loginTokens" : {
															whenLogin: new Date(),
															hashedToken : token
														}
												}
											}
										)
										.exec()
										.then(updateUser=>{
											if(updateUser.nModified == 1){
												res.status(200).json({
															message	: 'Auth successful',
															token	: token,
															roles 	: user.roles,
															ID 		: user._id
												});	
											}else{
												return res.status(200).json({
														message: 'Auth failed'
													});
											}
										})
										.catch(err=>{
											console.log("500 err ",err);
											res.status(500).json({
												message : "Failed to save token",
												error : err
											});
										});	
								}else{
									return res.status(200).json({
										message: 'INVALID_PASSWORD'
									});	
								}
							})
						}else{
							res.status(200).json({message:"INVALID_PASSWORD"}); 
						}
					}else if((user.profile.status).toLowerCase() == "blocked") {
						res.status(200).json({message:"USER_BLOCK"});
					}else if((user.profile.status).toLowerCase() == "unverified"){
						res.status(200).json({message:"USER_UNVERIFIED"});
					}	
				}else{
					res.status(200).json({message:"NOT_REGISTER"});
				}	
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					message : "Failed to find the User",
					error   : err
				});
			});
};
exports.user_update_password_withoutotp_ID = (req,res,next)=>{
	User.findOne({_id:req.params.ID})
		.exec()
		.then(user=>{
			if(user){
				bcrypt.hash(req.body.pwd,10,(err,hash)=>{
				    User.updateOne(
				        {_id:req.params.ID},  
				        {
				            $set:{
								services: {
									password: {
										bcrypt:hash
									},
								},
							}			
				        }
				    )
				    .exec()
				    .then(data=>{
				        if(data.nModified == 1){
				            res.status(200).json("PASSWORD_RESET");
				        }else{
				            res.status(401).json("PASSWORD_NOT_RESET");
				        }
				    })
				    .catch(err =>{
				        console.log(err);
				        res.status(500).json({
				            error: err
				        });
					});
				});
			}else{
				res.status(404).json("User Not Found");
			}
		})
		.catch(err=>{
			// console.log('update user status error ',err);
			res.status(500).json({
				error:err
			});
		});
};
exports.user_update_password_withoutotp_username = (req,res,next)=>{
	User.findOne({username:req.params.username})
		.exec()
		.then(user=>{
			console.log("user ",user);
			if(user){
				bcrypt.hash(req.body.pwd,10,(err,hash)=>{
				    User.updateOne(
				        {username:req.params.username},  
				        {
				            $set:{
								services: {
									password: {
										bcrypt:hash
									},
								},
							}			
				        }
				    )
				    .exec()
				    .then(data=>{
				        if(data.nModified == 1){
				            res.status(200).json("PASSWORD_RESET");
				        }else{
				            res.status(401).json("PASSWORD_NOT_RESET");
				        }
				    })
				    .catch(err =>{
				        console.log(err);
				        res.status(500).json({
				            error: err
				        });
					});
				});
			}else{
				res.status(404).json("User Not Found");
			}
		})
		.catch(err=>{
			// console.log('update user status error ',err);
			res.status(500).json({
				error:err
			});
		});
};
exports.user_update_password_with_emailOTP_ID = (req,res,next)=>{
	User.findOne({
					"_id" 			   : req.params.ID,
					"profile.otpEmail" : req.body.emailOTP 
				})
		.exec()
		.then(user=>{
			if(user){
				bcrypt.hash(req.body.pwd,10,(err,hash)=>{
				    User.updateOne(
				        {_id:req.params.ID},  
				        {
				            $set:{
								services: {
									password: {
										bcrypt:hash
									},
								},
							}			
				        }
				    )
				    .exec()
				    .then(data=>{
				        if(data.nModified == 1){
				            res.status(200).json("PASSWORD_RESET");
				        }else{
				            res.status(401).json("PASSWORD_NOT_RESET");
				        }
				    })
				    .catch(err =>{
				        console.log(err);
				        res.status(500).json({
				            error: err
				        });
					});
				});
			}else{
				res.status(404).json({message : "User Not Found or Otp Didnt match"});
			}
		})
		.catch(err=>{
			// console.log('update user status error ',err);
			res.status(500).json({
				error:err
			});
		});
};
exports.user_update_password_with_emailOTP_username = (req,res,next)=>{
	User.findOne({
					"username" 		   : req.params.username,
					"profile.otpEmail" : req.body.emailOTP 
				})
		.exec()
		.then(user=>{
			if(user){
				bcrypt.hash(req.body.pwd,10,(err,hash)=>{
				    User.updateOne(
				        {"username" 		   : req.params.username},  
				        {
				            $set:{
								services: {
									password: {
										bcrypt:hash
									},
								},
							}			
				        }
				    )
				    .exec()
				    .then(data=>{
				        if(data.nModified == 1){
				            res.status(200).json("PASSWORD_RESET");
				        }else{
				            res.status(401).json("PASSWORD_NOT_RESET");
				        }
				    })
				    .catch(err =>{
				        console.log(err);
				        res.status(500).json({
				            error: err
				        });
					});
				});
			}else{
				res.status(404).json({message : "User Not Found or Otp Didnt match"});
			}
		})
		.catch(err=>{
			// console.log('update user status error ',err);
			res.status(500).json({
				error:err
			});
		});
};
exports.set_send_emailotp_usingID = (req,res,next) =>{
	var otpEmail = getRandomInt(1000,9999);
	User.updateOne(
					{_id:req.params.ID},
					{
						$set:{
							"profile.otpEmail"     : otpEmail,
						},
					}
				)
				.exec()
				.then(data=>{
					if(data.nModified === 1){
						User.findOne({_id:req.params.ID})
							.then(user=>{
								if(user){
									request({
							                "method"    : "POST", 
							                "url"       : "http://localhost:"+globalVariable.port+"/send-email",
							                "body"      : {
							                					email 	: user.profile.email, 
							                					subject : req.body.emailSubject,
							                					text    : req.body.emailContent + " "+ otpEmail, 
							                			   },
							                "json"      : true,
							                "headers"   : {
							                                "User-Agent": "Test Agent"
							                            }
							            })
							            .then(source=>{
							            	res.status(201).json({message:"OTP_UPDATED"})
							            })
							    		.catch(err =>{
											console.log(err);
											res.status(500).json({
												message : "Failed to Send the send email",
												error: err
											});
										});
								}else{
									res.status(200).json({message : "User not found"});
								}
							})
							.catch(err =>{
								console.log('user error ',err);
								res.status(500).json({
									message : "Failed to find User",
									error: err
								});
							});
					}else{
						console.log("data not modified");
						res.status(401).json({message:"USER_NOT_UPDATED"})
					}
				})
				.catch(err =>{
					console.log('user error ',err);
					res.status(500).json({
						message : "Failed to update User",
						error: err
					});
				});
};
exports.set_send_emailotp_usingEmail = (req,res,next) =>{
	var optEmail = getRandomInt(1000,9999);
	console.log("optEmail",optEmail, req.body);
	User.updateOne(
					{"profile.email":req.params.emailId},
					{
						$set:{
							"profile.otpEmail"     : optEmail,
						},
					}
				)
				.exec()
				.then(data=>{
					if(data.nModified === 1){
						User.findOne({"profile.email":req.params.emailId})
							.then(user=>{
								if(user){
									request({
							                "method"    : "POST", 
							                "url"       : "http://localhost:"+globalVariable.port+"/send-email",
							                "body"      : {
							                					email 	: user.profile.email, 
							                					subject : req.body.emailSubject,
							                					text    : req.body.emailContent + " "+ optEmail, 
							                			   },
							                "json"      : true,
							                "headers"   : {
							                                "User-Agent": "Test Agent"
							                            }
							            })
							            .then(source=>{
							            	res.status(201).json({message:"OTP_UPDATED",userID:user._id})
							            })
							    		.catch(err =>{
											res.status(500).json({
												message : "Failed to Send the send email",
												error: err
											});
										});
								}else{
									res.status(200).json({message : "User not found"});
								}
							})
							.catch(err =>{
								res.status(500).json({
									message : "Failed to find User",
									error: err
								});
							});
					}else{
						res.status(401).json({message:"USER_NOT_UPDATED"})
					}
				})
				.catch(err =>{
					res.status(500).json({
						message : "Failed to update User",
						error: err
					});
				});
};
