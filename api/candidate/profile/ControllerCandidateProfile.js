const mongoose = require('mongoose');
const mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

const CandidateProfile 		= require('./ModelCandidateProfile.js');
const SkillMaster           = require('../../coreAdmin/SkillMaster/ModelSkill.js');
const LanguageMaster        = require('../../coreAdmin/LanguageMaster/ModelLanguage.js');
const QualificationLevelMaster = require('../../coreAdmin/QualificationLevelMaster/ModelQualificationLevel.js');
const QualificationMaster   = require('../../coreAdmin/QualificationMaster/ModelQualification.js');
const UniversityMaster      = require('../../coreAdmin/UniversityMaster/ModelUniversity.js');


exports.insertCandidateBasicInfo = (req, res, next)=>{
    
    	const candidateData = new CandidateProfile({
    		"_id" : new mongoose.Types.ObjectId(),
    		"basicInfo" : {
    			"firstName"			: req.body.firstName,
    			"middleName"		: req.body.middleName ? req.body.middleName : null,
    			"lastName" 		 	: req.body.lastName,
    			"dob" 			 	: req.body.dob ? req.body.dob : null,
    			//"age" 			 	: req.body.age ? req.body.age : null,
    			"gender"	 	 	: req.body.gender ? req.body.gender : null,
    			"maritalStatus"  	: req.body.maritalStatus ? req.body.maritalStatus : null,
    			"anniversaryDate"	: req.body.anniversaryDate ? req.body.anniversaryDate : null,
    			"nationality" 	 	: req.body.nationality ? req.body.nationality : null,
                "profilePicture"    : req.body.profilePicture ? req.body.profilePicture : null,
    		},
            "languagesKnown"        : req.body.languagesTags ? req.body.languagesTags : null,
    		"panCard" 		 		: req.body.panCard ? req.body.panCard : null,
    		"aadhaarCard" 	 		: req.body.aadhaarCard ? req.body.aadhaarCard  : null,
    		"contact" : {
    			"mobile" 		 	: req.body.mobile,
                "altMobile"         : req.body.altMobile ? req.body.altMobile : null,
    			"emailId" 		 	: req.body.emailId,
    		},
    		"user_id"		 	 	: req.body.user_id,	
    		"createdAt" : new Date(),
    		"createdBy" : req.body.createdBy,
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


exports.getcandidate_id = (req,res,next)=>{
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
    CandidateProfile.findOne({_id : req.params.candidate_id})
    .populate('languagesKnown.language_id')
    .populate('address.addressType')
    .populate('academics.qualificationlevel_id')
    .populate('academics.qualification_id')
    .populate('academics.university_id')
    
    .exec(function (err, candidate) {
    console.log(err)
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(candidate);
    // prints "The author is Ian Fleming"
    });
    /*.then(data=>{
        res.status(200).json(data);
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        });
    });*/
};
function insertLanguage(language, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const languageMaster = new LanguageMaster({
                        _id                   : new mongoose.Types.ObjectId(),
                        language              : language,
                        createdBy             : createdBy,
                        createdAt             : new Date()
                    })
                    languageMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
} 
function insertQualificationLevel(qualificationLevel, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const qualificationLevelMaster = new QualificationLevelMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        qualificationLevel          : qualificationLevel,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    qualificationLevelMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}
function insertQualification(qualification, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const qualificationMaster = new QualificationMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        qualification               : qualification,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    qualificationMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}
function insertUniversity(university, createdBy){
    return new Promise(function(resolve,reject){ 
        const universityMaster = new UniversityMaster({
                        _id                         : new mongoose.Types.ObjectId(),
                        university                  : university,
                        createdBy                   : createdBy,
                        createdAt                   : new Date()
                    })
                    universityMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}
exports.updateCandidateBasicInfo = (req, res, next)=>{
	var languages   = [];
    var language_id; 
    processData();
        async function processData(){
        for (var i = 0 ; i < req.body.languagesTags.length; i++) {
            language_id = req.body.languagesTags[i].id != "" ? req.body.languagesTags[i].id
                                : await insertLanguage(req.body.languagesTags[i].text, req.body.user_id)
                
            languages.push({ "language_id" : language_id })
        }
        CandidateProfile.updateOne(
            { "_id":req.body.candidate_id},  
            {
                $set:   {   
                        "basicInfo.firstName"      : req.body.firstName,
                        "basicInfo.middleName"     : req.body.middleName, 
                        "basicInfo.lastName"       : req.body.lastName,
                        "basicInfo.dob"            : req.body.dob == "" ? null : new Date(req.body.dob),
                        //"basicInfo.age"            : req.body.dob,
                        "basicInfo.gender"         : req.body.gender,
                        "basicInfo.maritalStatus"  : req.body.maritalStatus,
                        "basicInfo.anniversaryDate": req.body.anniversaryDate == "" ? null : new Date(req.body.anniversaryDate),
                        "basicInfo.nationality"    : req.body.nationality,
                        "languagesKnown"           : languages,
                        "panCard"                  : req.body.panCard,
                        "aadhaarCard"              : req.body.aadhaarCard,
                        "profilePicture"           : req.body.profilePicture,
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
}

exports.addCandidateAddress = (req,res,next)=>{
    
    CandidateProfile.updateOne(
            { _id: req.body.candidate_id },  
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
    CandidateProfile.find({"_id" : req.body.candidate_id, "address._id":req.body.addressID },
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
            { "_id":req.body.candidate_id, "address._id": req.body.addressID},  
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
            { _id:req.params.candidate_id},  
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
            { "_id":req.body.candidate_id },  
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
    var qualificationlevel_id, qualification_id, university_id; 

    processData();
        async function processData(){
            qualificationlevel_id   = req.body.academics.qualificationlevel_id != "" ? req.body.academics.qualificationlevel_id 
                                : await insertQualificationLevel(req.body.academics.qualificationLevel,req.body.user_id)
            
            qualification_id       = req.body.academics.qualification_id != "" ? req.body.academics.qualification_id 
                                : await insertQualification(req.body.academics.qualification,req.body.user_id)
            
            university_id          = req.body.academics.university_id != "" ? req.body.academics.university_id 
                                : await insertUniversity(req.body.academics.university,req.body.user_id)
            
            var academics = {
                                    //qualificationLevel   : this.state.qualificationLevel,
                                    qualificationlevel_id: qualificationlevel_id,
                                    //qualification        : this.state.qualification,
                                    qualification_id     : qualification_id,
                                    specialization       : req.body.academics.specialization,
                                    collegeSchool        : req.body.academics.collegeSchool,
                                    //university           : req.body.academics.university,
                                    university_id        : req.body.academics.university_id,    
                                    collegeSchool        : req.body.academics.collegeSchool,
                                    area                 : req.body.academics.area,
                                    cityVillage          : req.body.academics.city,
                                    district             : req.body.academics.district,
                                    state                : req.body.academics.states,
                                    country              : req.body.academics.country,
                                    pincode              : req.body.academics.pincode,
                                    stateCode            : req.body.academics.stateCode,
                                    countryCode          : req.body.academics.countryCode,
                                    grade                : req.body.academics.grade,
                                    mode                 : req.body.academics.mode,
                                    passOutYear          : req.body.academics.passOutYear,
                                    admisionYear         : req.body.academics.admisionYear
                                } 

                      
    CandidateProfile.updateOne(
            { _id: req.body.candidate_id },  
            {
                $push:  { 'academics' :academics }
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
    }    
};

exports.getOneCandidateAcademics = (req,res,next)=>{
    CandidateProfile.findOne({"_id" : req.body.candidate_id, "academics._id":req.body.academicsID },
        {"academics.$" : 1})
    .populate('academics.qualificationlevel_id')
    .populate('academics.qualification_id')
    .populate('academics.university_id')
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
            { "_id":req.body.candidate_id, "academics._id": req.body.academicsID},  
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
            { _id:req.params.candidate_id},  
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
            { _id: req.body.candidate_id },  
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
    CandidateProfile.find({"_id" : req.body.candidate_id, "workExperience._id":req.body.workExperienceID },
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
            { "_id":req.body.candidate_id, "workExperience._id": req.body.experienceID},  
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
            { _id:req.params.candidate_id},  
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
    var skills   = [];
    var skill_id; 
    console.log(req.body)
    
    processData();
        async function processData(){

        skill_id = req.body.skill.skill_id != "" ? req.body.skill.skill_id
                                : await insertSkill(req.body.skill.skill, req.body.user_id)
                
        skills.push({ "skill_id" : ObjectID(skill_id), "skillType" : req.body.skill.skillType, "rating": req.body.skill.rating })
    
            CandidateProfile.updateOne(
                { _id: req.body.candidate_id },  
                { 
                    $push : {    "skills"      :  skills}
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
                console.log(err)
                res.status(500).json({ error: err });
            });
            
    }   
};

var fetchCandidateSkills = async (candidate_id)=>{
    return new Promise(function(resolve,reject){ 
    CandidateProfile.findOne({"_id" : candidate_id }, {"skills" : 1})
        .exec()
        .then(data=>{
             resolve( data );
        })
        .catch(err =>{
            reject(err);
        });
        
    });
}; 
function insertSkill(skill, createdBy){ 
    return new Promise(function(resolve,reject){ 
        const skillMaster = new SkillMaster({
                        _id                   : new mongoose.Types.ObjectId(),
                        skill                 : skill,
                        createdBy             : createdBy,
                        createdAt             : new Date()
                    })
                    skillMaster.save()
                    .then(data=>{
                        resolve( data._id );
                    })
                    .catch(err =>{
                        reject(err); 
                    });
    });
}
exports.getCandidateSkills = (req,res,next)=>{
    CandidateProfile.findOne({_id : req.body.candidate_id},{"skills":1})
    .populate('skills.skill_id')
    
    .exec(function (err, candidate) {
    console.log(err)
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(candidate);
    // prints "The author is Ian Fleming"
    });

    /*CandidateProfile.aggregate([
        {       $match: { "_id" : ObjectID(req.body.candidate_id) } },
        {       $unwind:"$primarySkills"},{$unwind:"$secondarySkills"}*/
        
}
exports.deleteSkill = (req,res,next)=>{
    CandidateProfile.updateOne(
            { _id:req.params.candidate_id},  
            {
                $pull: { 'skills' : {_id:req.params.skill_id}}
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
/*exports.getOneCandidateSkill = (req,res,next)=>{
    CandidateProfile.find({"_id" : req.body.candidate_id },
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
            { "_id":req.body.candidate_id, "skills._id": req.body.skillCertificationID},  
            {
                $set:   {   "primarySkills"   : req.body.primarySkills,
                            "secondarySkills" : req.body.secondarySkills,
                            "rating"          : req.body.rating,
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
};*/

exports.addCandidateCertification = (req,res,next)=>{

    CandidateProfile.updateOne(
            { _id: req.body.candidate_id },  
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
    CandidateProfile.findOne({"_id" : req.body.candidate_id, "certifications._id":req.body.certificationID },
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
            { "_id":req.body.candidate_id, "certifications._id": req.body.certificationID},  
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
            { _id:req.params.candidate_id},  
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
    CandidateProfile.find({_id : req.params.candidate_id})
    .populate('languagesKnown.language_id')
    .populate('address.addressType')
    .populate('academics.qualificationlevel_id')
    .populate('academics.qualification_id')
    .populate('academics.university_id')
    
    .exec(function (err, candidate) {
    console.log(err)
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(candidate);
    // prints "The author is Ian Fleming"
    });
};

exports.deleteCandidate = (req,res,next)=>{
    CandidateProfile.deleteOne({_id : req.params.candidate_id})
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