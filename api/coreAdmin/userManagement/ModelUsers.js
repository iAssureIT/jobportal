const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
	createdAt	: {type:Date},
	createdBy	: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	services	: {
		password:{
					bcrypt:String
				  },
		resume: {
			loginTokens:[
				{
					loginTimeStamp: {type:Date},
					logoutTimeStamp: {type:Date},
					ValidateTill: {type:Date},
					hashedToken : String
				}
			]
		}
	},
	username	: {type:String},
	profile 	:
					{
						company_id 				: { type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters' },
						companyID 				: String,
						companyName  			: String,
						branch_id	  			: String,
						branchCode 				: Number,
						firstname 				: String,
						lastname  				: String,
						fullName  				: String,
						mobile 		 			: String,
						image 					: String,
						mobileVerified			: Boolean,
						email 					: String,
						otpEmail	  			: String,
						passwordreset	  		: Boolean,
						otpMobile	  			: String,
						emailVerified			: Boolean,
						status					: String,
						department				: String,
						designation				: String,
						city					: String,
						stateName				: String,
						stateCode 				: String,
						country 				: String,
						countryCode 			: String,	
						createdOn 				: String,
					},
	roles       : [String],
	statusLog   : [
	                {
	                	status 				: String,
	                    updatedAt           : Date,
	                    updatedBy           : String,
	                }
	            ],
});

module.exports = mongoose.model('users',userSchema);
