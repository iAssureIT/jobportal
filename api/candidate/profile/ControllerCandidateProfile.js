const mongoose = require('mongoose');
const mongodb = require('mongodb');


const CandidateProfile 		= require('./ModelCandidateProfile.js');

exports.insertCandidateBasicInfo = (req, res, next)=>{

	const candidateData = new CandidateProfile({
		"_id" : new mongoose.Types.ObjectId(),
		"basicInfo" : {
			"firstName"			: req.body.firstName,
			"lastName" 		 	: req.body.lastName,
			"dob" 			 	: null,
			"age" 			 	: null,
			"gender"	 	 	: null,
			"maritalStatus"  	: null,
			"anniversaryDate"	: null,
			"languagesKnown" 	: [],
			"nationality" 	 	: null,
		},
		"panCard" 		 		: null,
		"aadhaarCard" 	 		: null,
		"contact" : {
			"mobile" 		 	: req.body.mobile,
			"emailId" 		 	: req.body.emailId,
		},
		"user_id"		 	 	: req.body.user_id,	
		"createdAt" : new Date(),
		"createdBy" : req.body.createdBy,
		"updateLog" : [
			{"updatedBy": req.body.user_id, "updatedAt":new Date(), "remark":req.body.remark }
		]
		});
	

	candidateData.save()
			.then(data => {
			res.status(200).json({							
				message	: "Candidate details inserted successfully",
			});
		})
		.catch(error=>{
			console.log(error);
			res.status(500).json({
				error 	: error,
				message : "Failed to insert candidate details."
			});
		});		
}

exports.updateCandidate = (req, res, next)=>{
	console.log("inside insertCandidate");
	
	addCadidateDetails();
	
	async function addCadidateDetails(){

		const candidateData = new CandidateProfile({
			"_id" : new mongoose.Types.ObjectId(),
			"basicInfo" : {
				"firstName"		 : req.body.firstName,
				"lastName" 		 : req.body.lastName,
				"dob" 			 : new Date(req.body.dob),
				"age" 			 : await calculateAge(new Date(req.body.dob)),
				"gender"	 	 : req.body.gender,
				"maritalStatus"  : req.body.maritalStatus,
				"anniversaryDate": new Date(req.body.anniversaryDate),
				"languagesKnown" : req.body.languagesKnown,
				"nationality" 	 : req.body.nationality,
				"panCard" 		 : req.body.panCard,
				"aadhaarCard" 	 : req.body.aadhaarCard,
			},
			"address" : {
				"addressType"    : req.body.addressType,
				"houseNumber" 	 : req.body.houseNumber,
				"address" 		 : req.body.currency,
				"area" 		 	 : req.body.area,
				"cityVillage" 	 : req.body.cityVillage,
				"district" 		 : req.body.district,
				"state" 		 : req.body.state,
				"country" 		 : req.body.country,
				"pincode" 		 : req.body.pincode,
			},
			"contact" : {
				"mobile" 		 : req.body.mobile,
				"altMobile"   	 : req.body.altMobile,
				"emailId" 		 : req.body.emailId,
			},
			"academics":{
				"qualificationLevel" : req.body.qualLevel,
				"qualification"	     : req.body.qual,
				"specialization" 	 : req.body.specialization,
				"grade" 		 	 : req.body.grade,
				"mode"			 	 : req.body.mode,
				"passOutYear" 	 	 : req.body.passOutYear,
				"collegeSchool"  	 : req.body.collegeSchool,
				"universityBoard"	 : req.body.universityBoard,
				"state"			 	 : req.body.state,
				"country"		 	 : req.body.country,
				"cityVillage" 	 	 : req.body.cityVillage,
			},
			"skillCertification": {
				"skill" 		: req.body.skill,
				"rating"   		: req.body.rating,
				"skilldesc"   	: req.body.skilldesc,
				"certName"		: req.body.certName,
				"issuedBy"   	: req.body.issuedBy,
				"certifiedOn" 	: new Date(req.body.certifiedOn),
				"validTill"		: new Date(req.body.validTill),
				"gradePercent"	: req.body.gradePercent,
			},
			"workExperience":{
				"companyName"  	: req.body.companyName,
				"country" 	    : req.body.country,
				"city" 			: req.body.city,
				"lastDegn"		: req.body.lastDegn,
				"department"	: req.body.department,
				"lastSalary" 	: req.body.lastSalary,
				"fromDate" 		: new Date(req.body.fromDate),
				"toDate"  		: new Date(req.body.toDate),
				"resp"			: req.body.resp,
				"manager"		: req.body.manager,
				"managerDegn" 	: req.body.managerDegn,
			},
			"createdAt" : new Date(),
			"createdBy" : req.body.user_id,
			"updateLog" : [
				{"updatedBy": req.body.user_id, "updatedAt":new Date(), "remark":req.body.remark }
			]
			});
		

		candidateData.save()
				.then(data => {
				res.status(200).json({							
					message	: "Candidate details Inserted Successfully",
				});
			})
			.catch(error=>{
				console.log(error);
				res.status(500).json({
					error 	: error,
					message : "Some issue occurred during Insert Candidate details."
				});
			});
		}
}