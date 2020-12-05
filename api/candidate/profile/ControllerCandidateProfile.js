const mongoose = require('mongoose');
const mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

const CandidateProfile 		= require('./ModelCandidateProfile.js');

exports.insertCandidateBasicInfo = (req, res, next)=>{

	const candidateData = new CandidateProfile({
		"_id" : new mongoose.Types.ObjectId(),
		"basicInfo" : {
			"firstName"			: req.body.firstName,
			"middleName"		: null,
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
            "altMobile"         : null,
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

exports.getcandidateID = (req,res,next)=>{
    CandidateProfile.find({user_id: req.params.userID})
                    .exec()
                    .then(data=>{
                        res.status(200).json(data);
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(500).json({
                            error: err
                        });
                    });
}
exports.getSingleCandidate = (req,res,next)=>{
    //CandidateProfile.findOne({_id : req.params.candidateID})
    console.log("hsadh",req.params.candidateID);
    CandidateProfile.aggregate([
        {$match:{"_id": ObjectID(req.params.candidateID)} },
        {$lookup:{
                   from: "addresstypemasters",
                   localField: "address.addressType",
                   foreignField: "_id",
                   as: "addressType" } 
        },
        {$lookup:{
                   from: "qualificationlevelmasters",
                   localField: "academics.qualificationLevel",
                   foreignField: "_id",
                   as: "qualificationlevel" } 
         },   
         {$lookup:{
                   from: "qualificationmasters",
                   localField: "academics.qualification",
                   foreignField: "_id",
                   as: "qualification" } 
         }
         
         ])
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
};
exports.updateCandidateBasicInfo = (req, res, next)=>{
	
        CandidateProfile.updateOne(
            { "_id":req.body.candidateID},  
            {
                $set:   {   
                        "basicInfo.firstName"      : req.body.firstName,
                        "basicInfo.middleName"     : req.body.middleName, 
                        "basicInfo.lastName"       : req.body.lastName,
                        "basicInfo.dob"            : req.body.dob == "" ? null : new Date(req.body.dob),
                        "basicInfo.age"            : req.body.dob,
                        "basicInfo.gender"         : req.body.gender,
                        "basicInfo.maritalStatus"  : req.body.maritalStatus,
                        "basicInfo.anniversaryDate": req.body.anniversaryDate == "" ? null : new Date(req.body.anniversaryDate),
                        "basicInfo.languagesKnown" : req.body.languagesKnown,
                        "basicInfo.nationality"    : req.body.nationality,
                        "panCard"                  : req.body.panCard,
                        "aadhaarCard"              : req.body.aadhaarCard,
                        }
            }
        )
		.exec()
				.then(data => {
				if(data.nModified == 1){
                    res.status(200).json({ updated : true });
                }else{
                    res.status(200).json({ updated : false });
                }
			})
			.catch(error=>{
				console.log(error);
				res.status(500).json({
                    error: err
                });
			});	
}

exports.addCandidateAddress = (req,res,next)=>{
    console.log(req.body)
    CandidateProfile.updateOne(
            { _id: req.body.candidateID },  
            { 
                $push:  { 'address' : req.body.address }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ created : true });
            }else{
                res.status(401).json({ created : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });    
};

exports.getOneCandidateAddress = (req,res,next)=>{
    CandidateProfile.find({"_id" : req.body.candidateID, "address._id":req.body.addressID },
        {"address.$" : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};
exports.updateOneCandidateAddress = (req,res,next)=>{
    var address = req.body.address;
    
    CandidateProfile.updateOne(
            { "_id":req.body.candidateID, "address._id": req.body.addressID},  
            {
                $set:   { 	'address.$.addressType'    	: address.addressType,
							'address.$.houseNumber' 	: address.houseNumber,
							'address.$.address' 		: address.address,
							'address.$.area' 		 	: address.area,
							'address.$.cityVillage' 	: address.cityVillage,
							'address.$.district' 		: address.district,
							'address.$.state' 		 	: address.state,
							'address.$.country' 		: address.country,
							'address.$.pincode' 		: address.pincode,
                            'address.$.stateCode'       : address.stateCode,
                            'address.$.countryCode'     : address.countryCode
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ updated : true });
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.deleteAddress = (req,res,next)=>{   
    CandidateProfile.updateOne(
            { _id:req.params.candidateID},  
            {
                $pull: { 'address' : {_id:req.params.addressID}}
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ deleted : true });
            }else{
                res.status(401).json({ deleted : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.updateCandidateContact = (req,res,next)=>{
   CandidateProfile.updateOne(
            { "_id":req.body.candidateID },  
            {
                $set:   { 		"contact.mobile" 		 : req.body.mobile,
							 	"contact.altMobile"   	 : req.body.altMobile
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ updated : true });
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.addCandidateAcademics = (req,res,next)=>{
    console.log(req.body)
    CandidateProfile.updateOne(
            { _id: req.body.candidateID },  
            {
                $push:  { 'academics' : req.body.academics }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ created : true });
            }else{
                res.status(401).json({ created : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });    
};

exports.getOneCandidateAcademics = (req,res,next)=>{
    CandidateProfile.find({"_id" : req.body.candidateID, "academics._id":req.body.academicsID },
        {"academics.$" : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};


exports.updateOneCandidateAcademics = (req,res,next)=>{
    var academics = req.body.academics;
    
    CandidateProfile.updateOne(
            { "_id":req.body.candidateID, "academics._id": req.body.academicsID},  
            {
                $set:   { 	"academics.$.qualificationLevel" : academics.qualificationLevel,
						 	"academics.$.qualification"	     : academics.qualification,
						 	"academics.$.specialization" 	 : academics.specialization,
						 	"academics.$.grade" 		 	 : academics.grade,
						 	"academics.$.mode"			 	 : academics.mode,
						 	"academics.$.passOutYear" 	 	 : academics.passOutYear,
                            "academics.$.admisionYear"       : academics.admisionYear,
						 	"academics.$.collegeSchool"  	 : academics.collegeSchool,
						 	"academics.$.universityBoard"	 : academics.universityBoard,
						 	"academics.$.state"			 	 : academics.state,
						 	"academics.$.country"		 	 : academics.country,
						 	"academics.$.cityVillage" 	 	 : academics.cityVillage,
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ updated : true });
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};

exports.deleteAcademics = (req,res,next)=>{   
    CandidateProfile.updateOne(
            { _id:req.params.candidateID},  
            {
                $pull: { 'academics' : {_id:req.params.academicsID}}
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ deleted : true });
            }else{
                res.status(401).json({ deleted : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.addCandidateExperience = (req,res,next)=>{
    CandidateProfile.updateOne(
            { _id: req.body.candidateID },  
            {
                $push:  { 'workExperience' : req.body.experience }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ created : true });
            }else{
                res.status(401).json({ created : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });   
};

exports.getOneCandidateExperience = (req,res,next)=>{
    CandidateProfile.find({"_id" : req.body.candidateID, "workExperience._id":req.body.workExperienceID },
        {"workExperience.$" : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};


exports.updateOneCandidateExperience = (req,res,next)=>{
    var experience = req.body.experience;
    
    CandidateProfile.updateOne(
            { "_id":req.body.candidateID, "workExperience._id": req.body.experienceID},  
            {
                $set:   { 	"workExperience.$.companyName"          : experience.companyName,
                            "workExperience.$.country"              : experience.country,
                            "workExperience.$.city"                 : experience.city,
                            "workExperience.$.state"                : experience.state,
                            "workExperience.$.lastDegn"             : experience.lastDegn,
                            "workExperience.$.department"           : experience.department,
                            "workExperience.$.lastSalary"           : experience.lastSalary,
                            "workExperience.$.fromDate"             : experience.fromDate,
                            "workExperience.$.toDate"               : experience.toDate,
                            "workExperience.$.noticePeriod"         : experience.noticePeriod,
                            "workExperience.$.expectedSalary"       : experience.expectedSalary,
                            "workExperience.$.responsibilities"     : experience.responsibilities,
                            "workExperience.$.reportingManager"     : experience.reportingManager,
                            "workExperience.$.reportingManagerDegn" : experience.reportingManagerDegn,
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ updated : true });
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.deleteExperience = (req,res,next)=>{   
    CandidateProfile.updateOne(
            { _id:req.params.candidateID},  
            {
                $pull: { 'workExperience' : {_id:req.params.experienceID}}
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ deleted : true });
            }else{
                res.status(401).json({ deleted : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.addCandidateSkill = (req,res,next)=>{

    CandidateProfile.updateOne(
            { _id: req.body.candidateID },  
            {
                $push:  { 'skills' :
                {
                    primarySkills   : req.body.primarySkills,
                    secondarySkills : req.body.secondarySkills,
                    //rating          : req.body.rating,
                    /*certName        : req.body.certName,
                    issuedBy        : req.body.issuedBy,
                    certifiedOn     : req.body.certifiedOn,
                    validTill       : req.body.validTill,
                    gradePercent    : req.body.gradePercent,*/
                }  }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ created : true });
            }else{
                res.status(401).json({ created : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });   
};
exports.getOneCandidateSkill = (req,res,next)=>{
    CandidateProfile.find({"_id" : req.body.candidateID },
        {"skills.$" : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.updateOneCandidateSkill = (req,res,next)=>{
    CandidateProfile.updateOne(
            { "_id":req.body.candidateID, "skills._id": req.body.skillCertificationID},  
            {
                $set:   {   "primarySkills"   : req.body.primarySkills,
                            "secondarySkills" : req.body.secondarySkills,
                            /*"rating"          : req.body.rating,
                            "certName"        : req.body.certName,
                            "issuedBy"        : req.body.issuedBy,
                            "certifiedOn"     : req.body.certifiedOn,
                            "validTill"       : req.body.validTill,
                            "gradePercent"    : req.body.gradePercent*/
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ updated : true });
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.deleteSkill = (req,res,next)=>{   
    CandidateProfile.updateOne(
            { _id:req.params.candidateID},  
            {
                $pull: { 'skills' : {_id:req.params.skillID}}
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ deleted : true });
            }else{
                res.status(401).json({ deleted : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.addCandidateCertification = (req,res,next)=>{

    CandidateProfile.updateOne(
            { _id: req.body.candidateID },  
            {
                $push:  { 'certifications' :
                {
                    certName        : req.body.certName,
                    issuedBy        : req.body.issuedBy,
                    certifiedOn     : req.body.certifiedOn,
                    validTill       : req.body.validTill,
                    gradePercent    : req.body.gradePercent,
                }  }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ created : true });
            }else{
                res.status(401).json({ created : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });   
};
exports.getOneCandidateCertification = (req,res,next)=>{
    CandidateProfile.find({"_id" : req.body.candidateID },
        {"certifications.$" : 1})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.updateOneCandidateCertification = (req,res,next)=>{
    CandidateProfile.updateOne(
            { "_id":req.body.candidateID, "certifications._id": req.body.certificationID},  
            {
                $set:   {   
                            "certName"        : req.body.certName,
                            "issuedBy"        : req.body.issuedBy,
                            "certifiedOn"     : req.body.certifiedOn,
                            "validTill"       : req.body.validTill,
                            "gradePercent"    : req.body.gradePercent
                        }
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ updated : true });
            }else{
                res.status(200).json({ updated : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.deleteCertification = (req,res,next)=>{   
    CandidateProfile.updateOne(
            { _id:req.params.candidateID},  
            {
                $pull: { 'certifications' : {_id:req.params.certificationID}}
            }
        )
        .exec()
        .then(data=>{
            if(data.nModified == 1){
                res.status(200).json({ deleted : true });
            }else{
                res.status(401).json({ deleted : false });
            }
        })
        .catch(err =>{
            res.status(500).json({ error: err });
        });
};
exports.getCandidateList = (req,res,next)=>{
    CandidateProfile.find({})
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};

exports.deleteCandidate = (req,res,next)=>{
    CandidateProfile.deleteOne({_id : req.params.candidateID})
    .exec()
    .then(data=>{
        if(data.deletedCount === 1){
            res.status(200).json({ deleted : true });
        }else{
            res.status(200).json({ deleted : false });
        }
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
};