const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const EntityMaster = require('./ModelEntityMaster');
const FailedRecords = require('../failedRecords/ModelFailedRecords');
const DesignationMaster = require('../designationMaster/ModelDesignationMaster.js');
const DepartmentMaster = require('../departmentMaster/ModelDepartmentMaster.js');
const User = require('../userManagement/ModelUsers.js');
const IndustryMaster = require('../IndustryMaster/ModelIndustryMaster.js');
const globalVariable = require("../../nodemon.js");
const axios = require('axios');
const NodeGeocoder = require('node-geocoder');
const _ = require("underscore");
var request = require('request-promise');
var ObjectID = require('mongodb').ObjectID;

exports.insertEntity = (req, res, next) => {
    insertEntityFun();
    async function insertEntityFun() {
        var getnext = await getNextSequence(req.body.entityType)
        var industry_id = "";
        if (req.body.industry_id != "") {
            industry_id = req.body.industry_id
        } else {
            industry_id = await industryInsert(req.body.industry)
        }

        if (req.body.entityType == 'appCompany') {
            var str = 1
        } else {
            var str = parseInt(getnext)
        }

        EntityMaster.findOne({
                companyName: req.body.companyName,
                groupName: req.body.groupName,
                //companyEmail: req.body.companyEmail,
                //companyPhone: req.body.companyPhone,
                //website: req.body.website
            })
            .exec()
            .then(data => {
                if (data) {
                    res.status(200).json({
                        duplicated: true
                    });
                } else {

                    const entity = new EntityMaster({
                        _id: new mongoose.Types.ObjectId(),
                        supplierOf: req.body.supplierOf,
                        entityType: req.body.entityType,
                        profileStatus: req.body.profileStatus,
                        companyNo: getnext ? getnext : 1,
                        companyID: str ? str : 1,
                        companyName: req.body.companyName,
                        groupName: req.body.groupName,
                        CIN: req.body.CIN,
                        COI: req.body.COI,
                        TAN: req.body.TAN,
                        companyLogo: req.body.companyLogo,
                        website: req.body.website,
                        companyPhone: req.body.companyPhone,
                        companyEmail: req.body.companyEmail,
                        country: req.body.country,
                        countryCode: req.body.countryCode,
                        industry_id: industry_id,
                        userID: req.body.userID,
                        createdBy: req.body.createdBy,
                        createdAt: new Date()
                    })
                    entity.save()
                        .then(data => {
                            res.status(200).json({
                                created: true,
                                entityID: data._id,
                                companyID: data.companyID
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });

    }
};

function getNextSequence(entityType) {
    return new Promise((resolve, reject) => {
        EntityMaster.findOne({
                entityType: entityType
            })
            .sort({
                companyNo: -1
            })
            .exec()
            .then(data => {
                if (data) {
                    var seq = data.companyNo;
                    seq = seq + 1;
                    resolve(seq)
                } else {
                    resolve(2)
                }

            })
            .catch(err => {
                reject(0)
            });
    });
}
exports.addStatutoryDetails = (req, res, next) => {
    EntityMaster.find({
            _id: req.body.entityID,
            "statutoryDetails.state": req.body.statutoryDetails.state
        })
        .then((datas) => {
            if (datas.length > 0) {
                res.status(200).json({
                    duplicated: true
                });
            } else {
                EntityMaster.updateOne({
                        _id: req.body.entityID
                    }, {
                        $push: {
                            'statutoryDetails': req.body.statutoryDetails
                        }
                    })
                    .exec()
                    .then(data => {
                        if (data.nModified == 1) {
                            EntityMaster.updateOne({
                                    _id: req.body.entityID
                                }, {
                                    $push: {
                                        'updateLog': [{
                                            updatedAt: new Date(),
                                            updatedBy: req.body.updatedBy
                                        }]
                                    }
                                })
                                .exec()
                                .then(data => {
                                    res.status(200).json({
                                        updated: true
                                    });
                                })
                        } else {
                            res.status(200).json({
                                updated: false
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

}

exports.listEntity = (req, res, next) => {
    EntityMaster.find({
            entityType: req.params.entityType
        }).sort({
            createdAt: -1
        })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.listSupplier = (req, res, next) => {
    EntityMaster.find({
            entityType: req.params.entityType,
            supplierOf: req.params.company_id
        }).sort({
            createdAt: -1
        })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.countEntity = (req, res, next) => {
    EntityMaster.find({
            entityType: req.params.entityType
        }).count()
        .exec()
        .then(data => {
            res.status(200).json({
                count: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.singleEntity = (req, res, next) => {
    EntityMaster.findOne({
            _id: req.params.entityID
        })
        .exec()
        .then(data => {

            var k = 0;
            var returnData = [];
            if (data) {
                if (data.contactPersons && data.contactPersons.length > 0) {
                    var contactData = [];
                    for (k = 0; k < data.contactPersons.length; k++) {
                        var manager1Details = {
                            Name: "",
                            Department: "",
                            Designation: "",
                            contactNo: "",
                            EmpID: "",
                        };
                        var manager2Details = {
                            Name: "",
                            Department: "",
                            Designation: "",
                            contactNo: "",
                            EmpID: "",
                        };
                        var manager3Details = {
                            Name: "",
                            Department: "",
                            Designation: "",
                            contactNo: "",
                            EmpID: "",
                        };
                        // if(data.contactPersons[k].bookingApprovalRequired == 'Yes'){


                        // manager1Details = await getManagerDetails(data.contactPersons[k].approvingAuthorityId1,data.companyID)


                        // manager2Details = await getManagerDetails(data.contactPersons[k].approvingAuthorityId2,data.companyID)


                        // manager3Details = await getManagerDetails(data.contactPersons[k].approvingAuthorityId3,data.companyID)


                        // }
                        contactData.push({
                            "_id": data.contactPersons[k]._id,
                            branchCode: data.contactPersons[k].branchCode,
                            branchName: data.contactPersons[k].branchName,
                            locationType: data.contactPersons[k].locationType,
                            firstName: data.contactPersons[k].firstName,
                            workLocationId: data.contactPersons[k].workLocationId,
                            addEmployee: data.contactPersons[k].addEmployee,
                            personID: data.contactPersons[k].personID,
                            lastName: data.contactPersons[k].lastName,
                            departmentName: data.contactPersons[k].departmentName,
                            designationName: data.contactPersons[k].designationName,
                            phone: data.contactPersons[k].phone,
                            email: data.contactPersons[k].email,
                            employeeID: data.contactPersons[k].employeeID,
                            role: data.contactPersons[k].role,
                            bookingApprovalRequired: data.contactPersons[k].bookingApprovalRequired,
                            profilePhoto: data.contactPersons[k].profilePhoto,
                            middleName: data.contactPersons[k].middleName,
                            DOB: data.contactPersons[k].DOB,
                            altPhone: data.contactPersons[k].altPhone,
                            gender: data.contactPersons[k].gender,
                            whatsappNo: data.contactPersons[k].whatsappNo,
                            department: data.contactPersons[k].department,
                            empCategory: data.contactPersons[k].empCategory,
                            empPriority: data.contactPersons[k].empPriority,
                            designation: data.contactPersons[k].designation,
                            address: data.contactPersons[k].address,
                            createUser: data.contactPersons[k].createUser,
                            approvingAuthorityId1: data.contactPersons[k].approvingAuthorityId1,
                            approvingAuthorityId2: data.contactPersons[k].approvingAuthorityId2,
                            approvingAuthorityId3: data.contactPersons[k].approvingAuthorityId3,
                            preApprovedKilometer: data.contactPersons[k].preApprovedKilometer,
                            preApprovedAmount: data.contactPersons[k].preApprovedAmount,
                            preApprovedRides: data.contactPersons[k].preApprovedRides,
                            userID: data.contactPersons[k].userID,
                            manager1Details: manager1Details,
                            manager2Details: manager2Details,
                            manager3Details: manager3Details,

                        })
                    }

                }
                returnData.push({
                    "_id": data._id,
                    supplierOf: data.supplierOf,
                    companyID: data.companyID,
                    companyName: data.companyName,
                    companyPhone: data.companyPhone,
                    companyEmail: data.companyEmail,
                    locations: data.locations,
                    statutoryDetails: data.statutoryDetails,
                    entityType: data.entityType,
                    profileStatus: data.profileStatus,
                    groupName: data.groupName,
                    CIN: data.CIN,
                    COI: data.COI,
                    TAN: data.TAN,
                    companyLogo: data.companyLogo,
                    website: data.website,
                    userID: data.userID,
                    contactData: contactData
                })
            }
            res.status(200).json(returnData);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.getCompany = (req, res, next) => {
    EntityMaster.findOne({
            companyID: req.params.companyID
        })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.entityDetails = (req, res, next) => {
    EntityMaster.findOne({
            "contactPersons.userID": req.params.userID
        })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.getEntity = (req, res, next) => {
    EntityMaster.findOne({
            _id: req.params.entityID
        })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.getAllStatutoryDetails = (req, res, next) => {
    EntityMaster.findOne({
            _id: req.params.entityID
        })
        .exec()
        .then(data => {
            res.status(200).json(data.statutoryDetails);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.fetchLocationEntities = (req, res, next) => {
    EntityMaster.findOne({
            _id: req.body.entityID
        })
        .sort({
            createdAt: -1
        })
        .skip(req.body.startRange)
        .limit(req.body.limitRange)
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.fetchContactEntities = (req, res, next) => {
    EntityMaster.findOne({
            _id: req.body.entityID
        })
        .sort({
            createdAt: -1
        })
        .skip(req.body.startRange)
        .limit(req.body.limitRange)
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.getWorkLocation = (req, res, next) => {
    console.log("body=>", req.body)
    var selector = {};
    if (req.body.company_id) {
        selector = {
            '_id': ObjectID(req.body.company_id)
        }
    } else {
        selector = {
            "entityType": req.body.entityType
        }
    }
    console.log("selector", selector);
    EntityMaster.aggregate([{
                $match: selector
            },
            {
                $unwind: "$locations"
            }
        ])
        .exec()
        .then(data => {
            var locations = data.map((a, i) => {
                return a.locations
            })
            res.status(200).json({
                locations
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.companyName = (req, res, next) => {
    EntityMaster.findOne({
            companyID: req.params.companyID
        }, {
            companyName: 1,
            companyLogo: 1
        })
        .exec()
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(200).json({
                    message: "COMPANY_NOT_FOUND"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.companyNameType = (req, res, next) => {
    EntityMaster.findOne({
            companyID: req.params.companyID,
            entityType: req.params.type
        }, {
            companyID: 1,
            companyName: 1
        })
        .exec()
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(200).json({
                    message: "COMPANY_NOT_FOUND"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.branchCodeLocation = (req, res, next) => {
    EntityMaster.findOne({
            _id: req.params.entityID,
            'locations.branchCode': req.params.branchCode
        })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.updateEntity = (req, res, next) => {

    var industry_id = "";

    updateEntity();

    async function updateEntity() {
        if (req.body.industry_id != "") {

            industry_id = req.body.industry_id
        } else {
            industry_id = await industryInsert(req.body.industry)
        }
        EntityMaster.updateOne({
                _id: req.body.entityID
            }, {
                $set: {
                    'companyName': req.body.companyName,
                    'groupName': req.body.groupName,
                    'CIN': req.body.CIN,
                    'COI': req.body.COI,
                    'TAN': req.body.TAN,
                    'companyLogo': req.body.companyLogo,
                    'website': req.body.website,
                    'companyEmail': req.body.companyEmail,
                    'companyPhone': req.body.companyPhone,
                    'country': req.body.country,
                    'countryCode': req.body.countryCode,
                    'industry_id': industry_id,
                }
            })
            .exec()
            .then(data => {
                if (data.nModified == 1) {
                    EntityMaster.updateOne({
                            _id: req.body.entityID
                        }, {
                            $push: {
                                'updateLog': [{
                                    updatedAt: new Date(),
                                    updatedBy: req.body.updatedBy
                                }]
                            }
                        })
                        .exec()
                        .then(data => {
                            res.status(200).json({
                                updated: true
                            });
                        })
                } else {
                    res.status(200).json({
                        updated: false
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });


    }


};

function industryInsert(industry) {
    return new Promise(function(resolve, reject) {
        industryDuplicateControl();
        async function industryDuplicateControl() {
            var industryPresent = await findIndustry(industry);
            //console.log('industryPresent',industryPresent)

            if (industryPresent === 0) {
                const industryObj = new IndustryMaster({
                    _id: new mongoose.Types.ObjectId(),
                    industry: industry,
                    createdAt: new Date()
                });

                industryObj
                    .save()
                    .then(data => {
                        //console.log('insertCategory',data.subCategory[0]._id);
                        resolve(data._id);
                    })
                    .catch(err => {
                        console.log(err);
                        reject(err);
                    });
            } else {
                IndustryMaster.findOne({
                        industry: {
                            "$regex": industry,
                            $options: "i"
                        }
                    })
                    .exec()
                    .then(industryObject => {
                        if (industryObject) {
                            //console.log('industry',industryObject);
                            resolve({
                                industry_id: industryObject._id,
                                industry: industryObject.industry
                            });
                        } else {
                            resolve(0);
                        }
                    })
            }
        }

    })
}

function findIndustry(industry) {
    return new Promise(function(resolve, reject) {
        IndustryMaster.findOne({
                industry: {
                    "$regex": industry,
                    $options: "i"
                }
            })
            .exec()
            .then(industryObject => {
                if (industryObject) {
                    resolve(industryObject);
                } else {
                    resolve(0);
                }
            })
    })
}
exports.updateProfileStatus = (req, res, next) => {
    EntityMaster.updateOne({
            _id: req.body.entityID
        }, {
            $set: {
                'profileStatus': req.body.status
            }
        })
        .exec()
        .then(data => {
            if (data.nModified == 1) {
                EntityMaster.updateOne({
                        _id: req.body.entityID
                    }, {
                        $push: {
                            'updateLog': [{
                                updatedAt: new Date(),
                                updatedBy: req.body.updatedBy
                            }]
                        }
                    })
                    .exec()
                    .then(data => {
                        res.status(200).json({
                            updated: true
                        });
                    })
            } else {
                res.status(200).json({
                    updated: false
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.addLocation = (req, res, next) => {
    var locationdetails = req.body.locationDetails;

    insertLocationdetails();
    async function insertLocationdetails() {
        // var data = await updateDocInLoc(req.body.entityID,locationdetails)
        // console.log('data====>',data)
        var getData = await fetchLocData(req.body.entityID, locationdetails);
        if (getData.length > 0) {
            res.status(200).json({
                duplicated: true
            });
        } else {
            // if(locationdetails.GSTIN || locationdetails.PAN){
            //     var compare = await updateSameStateDocuments(req.body.entityID,locationdetails)
            // }
            var getnext = await getNextBranchCode(req.body.entityID)
            locationdetails.branchCode = getnext;
            EntityMaster.updateOne({
                    _id: ObjectID(req.body.entityID)
                }, {
                    $push: {
                        'locations': locationdetails
                    }
                })
                .exec()
                .then(data => {
                    if (data.nModified == 1) {
                        res.status(200).json({
                            created: true
                        });
                    } else {
                        res.status(401).json({
                            created: false
                        });
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    }
};

function fetchLocData(entityID, locationdetails) {
    return new Promise((resolve, reject) => {
        EntityMaster.find({
                _id: entityID,
                "locations.locationType": locationdetails.locationType,
                "locations.addressLine1": locationdetails.addressLine1
            }, {
                'locations.$': 1
            })
            .exec()
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(0)
            });
    })
}

function getNextBranchCode(entityID) {
    return new Promise((resolve, reject) => {
        EntityMaster.findOne({
                "_id": entityID
            }).sort({
                "locations.branchCode": -1
            })
            .exec()
            .then(data => {
                if (data.locations.length > 0) {
                    var seq = data.locations[data.locations.length - 1].branchCode;
                    seq = seq + 1;
                    resolve(seq)
                } else {
                    resolve(1)
                }

            })
            .catch(err => {
                reject(0)
            });
    });
}

function updateSameStateDocuments(entityID, locationdetails) {
    return new Promise((resolve, reject) => {
        EntityMaster.updateMany({
                "_id": entityID,
                "locations.state": locationdetails.state
            }, {
                $set: {
                    'locations.$[].GSTIN': locationdetails.GSTIN,
                    'locations.$[].GSTDocument': locationdetails.GSTDocument,
                    'locations.$[].PAN': locationdetails.PAN,
                    'locations.$[].PANDocument': locationdetails.PANDocument
                }
            }, {
                multi: true
            })
            .exec()
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(0)
            });
    })
}

exports.updateDocInLoc = (req, res, next) => {
    EntityMaster.find({
            "_id": req.body.entityID,
            "locations.state": req.body.state
        }, {
            _id: 0,
            'locations.$': 1
        })
        .exec()
        .then(data => {
            console.log('results====>', JSON.stringify(data[0].locations[0].GSTIN))
            // EntityMaster.updateOne({"_id":entityID, "locations._id":})
            //              const category = await Category.findOne({ _id:req.params.categoryId });
            // const lastIndex: number = category.items.length - 1;

            // console.log(category.items[lastIndex]);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.singleLocation = (req, res, next) => {
    EntityMaster.find({
            "_id": req.body.entityID,
            "locations._id": req.body.locationID
        }, {
            "locations.$": 1
        })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.updateSingleLocation = (req, res, next) => {
    var locationdetails = req.body.locationDetails;
    insertLocationdetails();
    async function insertLocationdetails() {
        // var getData = await fetchLocData(req.body.entityID,locationdetails);
        //     if (getData.length > 0) {
        //         res.status(200).json({ duplicated : true });
        //     }else{
        // if(locationdetails.GSTIN || locationdetails.PAN){
        //     var compare = await updateSameStateDocuments(req.body.entityID,locationdetails)
        // }

        EntityMaster.updateOne({
                "_id": req.body.entityID,
                "locations._id": req.body.locationID
            }, {
                $set: {
                    'locations.$.locationType': locationdetails.locationType,
                    'locations.$.branchCode': locationdetails.branchCode,
                    'locations.$.addressLine1': locationdetails.addressLine1,
                    'locations.$.addressLine2': locationdetails.addressLine2,
                    'locations.$.countryCode': locationdetails.countryCode,
                    'locations.$.country': locationdetails.country,
                    'locations.$.stateCode': locationdetails.stateCode,
                    'locations.$.state': locationdetails.state,
                    'locations.$.district': locationdetails.district,
                    'locations.$.city': locationdetails.city,
                    'locations.$.area': locationdetails.area,
                    'locations.$.pincode': locationdetails.pincode,
                    'locations.$.latitude': locationdetails.latitude,
                    'locations.$.longitude': locationdetails.longitude,
                    // 'locations.$.GSTIN'        : locationdetails.GSTIN,
                    // 'locations.$.GSTDocument'  : locationdetails.GSTDocument,
                    // 'locations.$.PAN'          : locationdetails.PAN,
                    // 'locations.$.PANDocument'  : locationdetails.PANDocument
                }
            })
            .exec()
            .then(data => {
                if (data.nModified == 1) {
                    res.status(200).json({
                        updated: true
                    });
                } else {
                    res.status(200).json({
                        updated: false
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        // }
    }
};

exports.updateSingleStatutory = (req, res, next) => {
    var statutorydetails = req.body.statutoryDetails
    EntityMaster.updateOne({
            "_id": req.body.entityID,
            "statutoryDetails._id": req.body.statutoryID
        }, {
            $set: {
                'statutoryDetails.$.stateCode': statutorydetails.stateCode,
                'statutoryDetails.$.state': statutorydetails.state,
                'statutoryDetails.$.GSTIN': statutorydetails.GSTIN,
                'statutoryDetails.$.GSTDocument': statutorydetails.GSTDocument,
                'statutoryDetails.$.PAN': statutorydetails.PAN,
                'statutoryDetails.$.PANDocument': statutorydetails.PANDocument
            }
        })
        .exec()
        .then(data => {
            if (data.nModified == 1) {
                res.status(200).json({
                    updated: true
                });
            } else {
                res.status(200).json({
                    updated: false
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.addContact = (req, res, next) => {
    var contactdetails = req.body.contactDetails;
    if (contactdetails.role === 'driver') {
        var selector = {
            "_id": req.body.entityID,
            "contactPersons.phone": contactdetails.phone
        }
    } else if (contactdetails.role === 'guest') {
        var selector = {
            _id: req.body.entityID,
            $or: [{
                "contactPersons.email": contactdetails.email
            }, {
                "contactPersons.phone": contactdetails.phone
            }]
        }
    } else {
        //console.log(contactdetails)
        var selector = {
            _id: req.body.entityID,
            $and: [{
                "contactPersons.email": contactdetails.email
            }, {
                "contactPersons.employeeID": contactdetails.employeeID
            }]
        }
    }
    EntityMaster.find(selector)
        .then((datas) => {
            //console.log(datas)
            if (datas.length > 0) {
                res.status(200).json({
                    duplicated: true
                });
            } else {
                EntityMaster.updateOne({
                        _id: req.body.entityID
                    }, {
                        $push: {
                            'contactPersons': contactdetails
                        }
                    })
                    .exec()
                    .then(data => {
                        if (data.nModified == 1) {
                            res.status(200).json({
                                created: true
                            });
                        } else {
                            res.status(200).json({
                                created: false
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        })

};
exports.singleContact = (req, res, next) => {
    EntityMaster.findOne({
            "_id": req.body.entityID,
            "contactPersons._id": req.body.contactID
        }, {
            "contactPersons.$": 1
        })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

function camelCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

exports.getAllVendors = (req, res, next) => {
    var city = req.params.city;
    var city1 = camelCase(city);
    var city2 = city.toUpperCase();
    var city3 = city.toLowerCase();
    EntityMaster.find({
            "entityType": "vendor",
            "locations.city": {
                $in: [city, city1, city2, city3]
            }
        })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
// Convert Degress to Radians
function Deg2Rad(deg) {
    return deg * Math.PI / 180;
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
exports.getAllNearbyVendors = (req, res, next) => {
    EntityMaster.find({
            "entityType": "vendor"
        })
        .exec()
        .then(data => {
            if (data && data.length > 0) {
                var vendorArray = []
                for (var i = 0; i < data.length; i++) {
                    if (data[i].locations && data[i].locations.length > 0) {
                        var cityArray = []
                        for (var j = 0; j < data[i].locations.length; j++) {
                            var lat = data[i].locations[j].latitude;
                            var lng = data[i].locations[j].longitude;
                            if (lat && lng) {
                                cityArray.push({
                                    lat: lat,
                                    lng: lng
                                })
                            }
                        } //j
                        var minDif = 300;
                        var closest
                        if (cityArray && cityArray.length > 0) {
                            for (index = 0; index < cityArray.length; index++) {
                                var dif = PythagorasEquirectangular(req.params.lat, req.params.lng, cityArray[index].lat, cityArray[index].lng);
                                if (dif < minDif) {
                                    closest = index;
                                    minDif = dif;
                                    vendorArray.push(data[i])
                                }
                            } //index
                        }
                    }
                } //i
                var uniqueVendorArray = vendorArray.filter(onlyUnique);
                res.status(200).json(uniqueVendorArray);
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.getAdminCompany = (req, res, next) => {
    EntityMaster.find({
            "entityType": "appCompany"
        })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.getAllEntities = (req, res, next) => {
    EntityMaster.find({})
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.updateSingleContact = (req, res, next) => {
    var contactdetails = req.body.contactDetails;
    console.log('contactdetails', contactdetails, contactdetails.createUser);
    if (contactdetails.role === 'driver') {
        var selector = {
            "_id": req.body.entityID,
            "contactPersons.phone": contactdetails.phone
        }
    } else {
        var selector = {
            "contactPersons.email": contactdetails.email,
            _id: {
                $ne: req.body.entityID
            },
            "contactPersons._id": {
                $ne: req.body.contactID
            },
            "contactPersons.employeeID": {
                $ne: req.body.employeeID
            }
        }
    }
    EntityMaster.find(selector)
        .then((datas) => {
            if (datas.length > 0) {
                res.status(200).json({
                    duplicated: true
                });
            } else {
                EntityMaster.updateOne({
                        "_id": req.body.entityID,
                        "contactPersons._id": req.body.contactID
                    }, {
                        $set: {
                            'contactPersons.$.branchCode': contactdetails.branchCode,
                            'contactPersons.$.branchName': contactdetails.branchName,
                            'contactPersons.$.locationType': contactdetails.locationType,
                            'contactPersons.$.profilePhoto': contactdetails.profilePhoto,
                            'contactPersons.$.firstName': contactdetails.firstName,
                            'contactPersons.$.middleName': contactdetails.middleName,
                            'contactPersons.$.lastName': contactdetails.lastName,
                            'contactPersons.$.DOB': contactdetails.DOB,
                            'contactPersons.$.employeeID': contactdetails.employeeID,
                            'contactPersons.$.phone': contactdetails.phone,
                            'contactPersons.$.altPhone': contactdetails.altPhone,
                            'contactPersons.$.whatsappNo': contactdetails.whatsappNo,
                            'contactPersons.$.email': contactdetails.email,
                            'contactPersons.$.gender': contactdetails.gender,
                            'contactPersons.$.department': contactdetails.department,
                            'contactPersons.$.empCategory': contactdetails.empCategory,
                            'contactPersons.$.empPriority': contactdetails.empPriority,
                            'contactPersons.$.designationName': contactdetails.designationName,
                            'contactPersons.$.designation': contactdetails.designation,
                            'contactPersons.$.departmentName': contactdetails.departmentName,
                            'contactPersons.$.address': contactdetails.address,
                            'contactPersons.$.role': contactdetails.role,
                            'contactPersons.$.createUser': contactdetails.createUser,
                            'contactPersons.$.bookingApprovalRequired': contactdetails.bookingApprovalRequired,
                            'contactPersons.$.approvingAuthorityId1': contactdetails.approvingAuthorityId1,
                            'contactPersons.$.approvingAuthorityId2': contactdetails.approvingAuthorityId2,
                            'contactPersons.$.approvingAuthorityId3': contactdetails.approvingAuthorityId3,
                            'contactPersons.$.preApprovedKilometer': contactdetails.preApprovedKilometer,
                            'contactPersons.$.preApprovedAmount': contactdetails.preApprovedAmount,
                            'contactPersons.$.preApprovedRides': contactdetails.preApprovedRides,
                        }
                    })
                    .exec()
                    .then(data => {
                        if (data.nModified == 1) {
                            res.status(200).json({
                                updated: true
                            });
                        } else {
                            res.status(200).json({
                                updated: false
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        })
};

//function deleteEntityUsers(id){
// return new Promise((resolve,reject)=>{
//   User.deleteMany({"company_Id":id})
// .exec()
//.then(response=>{
//   resolve(response)
//})
//.catch(err=>{
//  console.log("Error :",err)
// reject(err)
//})
//})
//}
exports.deleteEntityUsers = (req, res, next) => {
    User.deleteMany({
            "profile.companyID": req.params.companyID
        })
        .exec()
        .then(data => {
            res.status(200).json({
                deleted: true
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.deleteEntity = (req, res, next) => {
    EntityMaster.deleteOne({
            _id: req.params.entityID
        })
        .exec()
        .then(data => {

            res.status(200).json({
                deleted: true
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.deleteLocation = (req, res, next) => {
    EntityMaster.updateOne({
            _id: req.params.entityID
        }, {
            $pull: {
                'locations': {
                    _id: req.params.locationID
                }
            }
        })
        .exec()
        .then(data => {
            if (data.nModified == 1) {
                res.status(200).json({
                    deleted: true
                });
            } else {
                res.status(401).json({
                    deleted: false
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.deleteStatutory = (req, res, next) => {
    EntityMaster.updateOne({
            _id: req.params.entityID
        }, {
            $pull: {
                'statutoryDetails': {
                    _id: req.params.statutoryID
                }
            }
        })
        .exec()
        .then(data => {
            if (data.nModified == 1) {
                res.status(200).json({
                    deleted: true
                });
            } else {
                res.status(401).json({
                    deleted: false
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.deleteContact = (req, res, next) => {
    EntityMaster.updateOne({
            _id: req.params.entityID
        }, {
            $pull: {
                'contactPersons': {
                    _id: req.params.contactID
                }
            }
        })
        .exec()
        .then(data => {
            if (data.nModified == 1) {
                res.status(200).json({
                    deleted: true
                });
            } else {
                res.status(200).json({
                    deleted: false
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.filterEntities = (req, res, next) => {
    // var selector = {
    //         "locations":{ $elemMatch: { stateCode : "MH" }}, 
    //         "locations":{ $elemMatch: { district : "Pune" }},
    //         "companyName" :  {$regex : "^i",$options: "i"} 
    //     };


    var selector = {};
    selector['$and'] = [];

    selector["$and"].push({
        entityType: {
            $regex: req.body.entityType,
            $options: "i"
        }
    })
    //selector.entityType = {$regex : req.body.entityType,$options: "i"}  
    if (req.body.stateCode) {
        selector["$and"].push({
            locations: {
                $elemMatch: {
                    stateCode: req.body.stateCode
                }
            }
        })
        //selector.locations = { $elemMatch: { stateCode : req.body.stateCode } }     
    }
    if (req.body.district) {
        selector["$and"].push({
            locations: {
                $elemMatch: {
                    district: {
                        $regex: req.body.district,
                        $options: "i"
                    }
                }
            }
        })
    }
    if (req.body.initial && req.body.initial != 'All') {
        //selector.companyName = {$regex : "^"+req.body.initial,$options: "i"} 
        selector["$and"].push({
            companyName: {
                $regex: "^" + req.body.initial,
                $options: "i"
            }
        })
    }
    if (req.body.searchStr && req.body.searchStr != '') {
        selector['$or'] = [];
        if (req.body.initial && req.body.initial != 'All') {
            selector["$and"].push({
                companyName: {
                    $regex: "^" + req.body.initial,
                    $options: "i"
                }
            })
        }

        selector["$or"].push({
            companyName: {
                $regex: req.body.searchStr,
                $options: "i"
            }
        })
        selector["$or"].push({
            groupName: {
                $regex: req.body.searchStr,
                $options: "i"
            }
        })
        selector["$or"].push({
            locations: {
                $elemMatch: {
                    addressLine1: {
                        $regex: req.body.searchStr,
                        $options: "i"
                    }
                }
            }
        })
        selector["$or"].push({
            locations: {
                $elemMatch: {
                    area: {
                        $regex: req.body.searchStr,
                        $options: "i"
                    }
                }
            }
        })
        selector["$or"].push({
            locations: {
                $elemMatch: {
                    district: {
                        $regex: req.body.searchStr,
                        $options: "i"
                    }
                }
            }
        })
        selector["$or"].push({
            locations: {
                $elemMatch: {
                    stateCode: {
                        $regex: req.body.searchStr,
                        $options: "i"
                    }
                }
            }
        })
    }

    EntityMaster.find(selector)
        .sort({
            createdAt: -1
        })
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.filterEntities_grid = (req, res, next) => {

    var selector = {};
    selector['$and'] = [];

    selector["$and"].push({
        entityType: {
            $regex: req.body.entityType,
            $options: "i"
        }
    })
    if (req.body.stateCode) {
        selector["$and"].push({
            locations: {
                $elemMatch: {
                    stateCode: req.body.stateCode
                }
            }
        })
    }
    if (req.body.district) {
        selector["$and"].push({
            locations: {
                $elemMatch: {
                    district: {
                        $regex: req.body.district,
                        $options: "i"
                    }
                }
            }
        })
    }
    if (req.body.initial && req.body.initial != 'All') {
        selector["$and"].push({
            companyName: {
                $regex: "^" + req.body.initial,
                $options: "i"
            }
        })
    }
    if (req.body.searchStr && req.body.searchStr != '') {
        selector['$or'] = [];
        if (req.body.initial && req.body.initial != 'All') {
            selector["$and"].push({
                companyName: {
                    $regex: "^" + req.body.initial,
                    $options: "i"
                }
            })
        }

        selector["$or"].push({
            companyName: {
                $regex: req.body.searchStr,
                $options: "i"
            }
        })
        selector["$or"].push({
            groupName: {
                $regex: req.body.searchStr,
                $options: "i"
            }
        })
        selector["$or"].push({
            locations: {
                $elemMatch: {
                    addressLine1: {
                        $regex: req.body.searchStr,
                        $options: "i"
                    }
                }
            }
        })
        selector["$or"].push({
            locations: {
                $elemMatch: {
                    area: {
                        $regex: req.body.searchStr,
                        $options: "i"
                    }
                }
            }
        })
        selector["$or"].push({
            locations: {
                $elemMatch: {
                    district: {
                        $regex: req.body.searchStr,
                        $options: "i"
                    }
                }
            }
        })
        selector["$or"].push({
            locations: {
                $elemMatch: {
                    stateCode: {
                        $regex: req.body.searchStr,
                        $options: "i"
                    }
                }
            }
        })
    }

    EntityMaster.find(selector)
        .sort({
            createdAt: -1
        })
        .skip(req.body.startRange)
        .limit(req.body.limitRange)
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.fetchEntities = (req, res, next) => {
    EntityMaster.find({
            entityType: req.body.type
        })
        .sort({
            createdAt: -1
        })
        .skip(req.body.startRange)
        .limit(req.body.limitRange)
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.CompanyfromEntities = (req, res, next) => {
    EntityMaster.find({})
        .sort({
            createdAt: -1
        })
        .select("companyName")
        .exec()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
exports.countContacts = (req, res, next) => {
    EntityMaster.aggregate([{
                "$match": {
                    entityType: req.params.entityType
                }
            },
            {
                $group: {
                    _id: "$entityType",
                    total: {
                        $sum: {
                            $size: "$contactPersons"
                        }
                    }
                }
            }
        ])
        .exec()
        .then(data => {
            if (data[0]) {
                var count = data[0].total
            } else {
                var count = 0
            }

            res.status(200).json({
                count: count
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


/*Bulk upload*/

function getIndustries() {
    return new Promise(function(resolve, reject) {
        IndustryMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
var fetchDesignations = async () => {
    return new Promise(function(resolve, reject) {
        DesignationMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

var fetchDepartments = async () => {
    return new Promise(function(resolve, reject) {
        DepartmentMaster.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};
var fetchAllUsers = async (type) => {
    return new Promise(function(resolve, reject) {
        User.find({})
            .exec()
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};
var fetchAllEntities = async (type) => {
    return new Promise(function(resolve, reject) {
        EntityMaster.find({
                entityType: type
            })
            .sort({
                createdAt: -1
            })
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
};



function insertDepartment(department, createdBy) {
    return new Promise(function(resolve, reject) {
        const departmentMaster = new DepartmentMaster({
            _id: new mongoose.Types.ObjectId(),
            department: department,
            companyID: 1,
            createdBy: createdBy,
            createdAt: new Date()
        })

        departmentMaster.save()
            .then(data => {
                resolve(data.department);
            })

            .catch(err => {
                reject(err);
            });
    });
}

function insertDesignation(designation, createdBy) {
    return new Promise(function(resolve, reject) {
        const designationMaster = new DesignationMaster({
            _id: new mongoose.Types.ObjectId(),
            designation: designation,
            companyID: 1,
            createdBy: createdBy,
            createdAt: new Date()
        })
        designationMaster.save()
            .then(data => {
                resolve(data.designation);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function getLatLong(address) {
    return new Promise(function(resolve, reject) {
        var type = 'GOOGLE';
        axios.get('http://localhost:' + globalVariable.port + '/api/projectsettings/get/' + type)
            .then((response) => {
                const options = {

                    provider: 'google',
                    httpAdapter: 'https', // Default
                    apiKey: response.data.googleapikey, // for Mapquest, OpenCage, Google Premier
                    formatter: null

                };
                const geocoder = NodeGeocoder(options);
                // console.log("geocoder",geocoder);

                geocoder.geocode('address', function(err, res) {
                    resolve(res)
                });


            })
            .catch((error) => {})
    })
    // const res = await geocoder.geocode('29 champs elysée paris');

}

exports.bulkUploadEntity = (req, res, next) => {
    var entity = req.body.data;
    
    var validData = [];
    var validObjects = [];
    var invalidData = [];
    var invalidObjects = [];
    var remark = '';
    var failedRecords = [];
    var Count = 0;
    var DuplicateCount = 0;
    var uploadTime = new Date();

    processData();
    async function processData() {

        var industries  = await getIndustries();
        var departments = await fetchDepartments();
        var designations = await fetchDesignations();

        for (var k = 0; k < entity.length; k++) {

            if (entity[k].entityType == '-') {
                remark += "entityType not found, ";
            }
            if (entity[k].industry == '-') {
                remark += "industry not found, ";
            }
            if (entity[k].companyName == '-') {
                remark += "companyName not found, ";
            }
            if (entity[k].groupName == '-') {
                remark += "groupName not found, ";
            }
            if (entity[k].companyEmail == '-') {
                remark += "companyEmail not found, ";
            }
            if (entity[k].departmentName == '-') {
                remark += "departmentName not found, ";
            }
            if (entity[k].projectName == '-') {
                remark += "projectName not found, ";
            }
            if (entity[k].countryCode == '-') {
                remark += "CountryCode not found, ";
            }

            EntityMaster.findOne({
                    companyName: entity[k].companyName,
                    groupName: entity[k].groupName,
                    companyEmail: entity[k].companyEmail,
                    companyPhone: entity[k].companyPhone,
                    website: entity[k].website
                })

                .exec()
                .then(data => {
                    if (data) {
                        remark += "Employer Already Exists"
                    }

                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });

            if (remark == '') {
                var departmentId, designationId;
                var industry_id;
                var industryExists = industries.filter((data) => {
                    if (data.industry.trim().toLowerCase() == entity[k].industry.trim().toLowerCase()) {
                        return data;
                    }
                })
                if (industryExists.length > 0) {
                    industry_id = industryExists[0]._id;
                } else {
                    if (jobs[k].industry != '-') {
                        industry_id = await insertIndustry(entity[k].industry, req.body.reqdata.createdBy);
                    }
                }

                var departmentExists = departments.filter((data) => {
                    if (data.department == entity[k].department) {
                        return data;
                    }

                })
                if (departmentExists.length > 0) {
                    departmentId = departmentExists[0].department;

                } else {
                    if (entity[k].department != '-') {
                        departmentId = await insertDepartment(entity[k].department, req.body.reqdata.createdBy);
                    }
                }

                // console.log("departmentId------>>>",departmentId); 

                var designationExists = designations.filter((data) => {
                    if (data.designation == entity[k].designation) {
                        return data;
                    }

                })
                if (designationExists.length > 0) {
                    designationId = designationExists[0].designation;

                } else {
                    if (entity[k].designation != '-') {
                        designationId = await insertDesignation(entity[k].designation, req.body.reqdata.createdBy);
                    }
                }

                /*var alldeptProjects = await fetchAllEntities1(entity[k].departmentName,entity[k].projectName);
                  if(!alldeptProjects){
                   var DeptAndProject={
                       departmentName:entity[k].departmentName,
                       projectName:entity[k].projectName,

                   }
                    if (DeptAndProject.departmentName!== null)
                        {
                         var insertUser1=await fetchDeptAndProject (DeptAndProject);
                        }
                  }*/


                var allEntities = await fetchAllEntities(entity[k].entityType);
                var employeeExists = allEntities.filter((data) => {
                    if (data.entityType == entity[k].entityType &&
                        data.companyName == entity[k].companyName &&
                        data.companyEmail == entity[k].companyEmail) {
                        return data;
                    }
                })
                validObjects.fileName = req.body.fileName;
                if (employeeExists.length == 0) {

                    var latlong = await getLatLong(entity[k].address1Line1);

                    var lat = latlong ? latlong[0].latitude : 0;
                    var lng = latlong ? latlong[0].longitude : 0;


                    var latlong1 = await getLatLong(entity[k].address2Line1);
                    var lat1 = latlong1 ? latlong1[0].latitude : 0;
                    var lng1 = latlong1 ? latlong1[0].longitude : 0;

                    var latlong2 = await getLatLong(entity[k].address3Line1);
                    var lat2 = latlong2 ? latlong2[0].latitude : 0;
                    var lng2 = latlong2 ? latlong2[0].longitude : 0;



                    var dept_project = entity[k].departmentName + " - " + entity[k].projectName;

                    var entityDept = [{
                        departmentName: entity[k].departmentName,
                        projectName: entity[k].projectName,

                    }]

                    var locations = [

                        {
                            locationType: entity[k].Location1Type,
                            addressLine1: entity[k].address1Line1,
                            addressLine2: entity[k].address1Line2 + "," + entity[k].district1 + "," + entity[k].state1 + "," + entity[k].country1,
                            department: dept_project,
                            countryCode: entity[k].countryCode1,
                            country: entity[k].country1,
                            state: entity[k].state1,
                            stateCode           : entity[k].stateCode1,
                            district: entity[k].district1,
                            city: entity[k].city1,
                            area: entity[k].area1,
                            pincode: entity[k].pincode1,
                            latitude: lat,
                            longitude: lng,
                            branchCode : 1
                        },

                        {
                            locationType: entity[k].Location2Type != '-' ? entity[k].Location2Type : 'null',
                            addressLine1: entity[k].address2Line1 != '-' ? entity[k].address2Line1 : 'null',
                            addressLine2: entity[k].address2Line2 != '-' ? entity[k].address2Line2 : 'null',
                            department: dept_project,
                            countryCode: entity[k].countryCode2,
                            country: entity[k].country2,
                            state: entity[k].state2,
                            stateCode           : entity[k].stateCode2,
                            district: entity[k].district2,
                            city: entity[k].city2,
                            area: entity[k].area2,
                            pincode: entity[k].pincode2,
                            latitude: lat1,
                            longitude: lng1,
                            branchCode : 2
                        },
                        {
                            locationType: entity[k].Location3Type != '-' ? entity[k].Location3Type : 'null',
                            addressLine1: entity[k].address3Line1 != '-' ? entity[k].address3Line1 : 'null',
                            addressLine2: entity[k].address3Line2 != '-' ? entity[k].address3Line2 : 'null',
                            department: dept_project,
                            countryCode: entity[k].countryCode3,
                            country: entity[k].country3,
                            state: entity[k].state3,
                            stateCode           : entity[k].stateCode3,
                            district: entity[k].district3,
                            city: entity[k].city3,
                            area: entity[k].area3,
                            pincode: entity[k].pincode3,
                            latitude: lat2,
                            longitude: lng2,
                            branchCode : 3
                        }
                    ]
                    let locationdetails = [];
                    for (var a = 0; a < locations.length; a++) {
                        if ((locations[a].locationType != 'null' || locations[a].addressLine1 != 'null' || locations[a].addressLine2 != 'null')) {

                            locationdetails.push(locations[a]);

                        }
                    }


                    var getnext = await getNextSequence(entity[k].entityType, entity[k].companyName);
                    if (entity[k].entityType == 'corporate') {
                        var str = getnext;
                    } else {
                        var str = 1
                    }

                    var validDcompanyNo = getnext ? getnext : 1;
                    var validDcompanyID = str ? str : 1;

                    var createLogin1 = entity[k].loginCredential;
                    // console.log("createLogin1>>>>>>>>>",createLogin1);
                    if (createLogin1 == 'No') {
                        createLogin1 = false;
                    } else {
                        createLogin1 = true;
                    }

                    validObjects = {

                        fileName: req.body.fileName,
                        entityType: entity[k].entityType,
                        companyName: entity[k].companyName,
                        groupName: entity[k].groupName,
                        CIN: entity[k].CIN,
                        COI: entity[k].COI,
                        TAN: entity[k].TAN,
                        website: entity[k].website,
                        companyPhone: entity[k].companyPhone,
                        companyEmail: entity[k].companyEmail,
                        country: entity[k].country,
                        locations: locationdetails,
                        //contactPersons: contactdetails,
                        departments: entityDept,
                        companyNo: getnext ? getnext : 1,
                        companyID: str ? str : 1,
                        uploadTime: uploadTime
                    }

                    validData.push(validObjects);

                    var entity1 = {
                        fileName: req.body.fileName,
                        entityType: entity[k].entityType,
                        industry_id: industry_id,
                        companyName: entity[k].companyName,
                        groupName: entity[k].groupName,
                        CIN: entity[k].CIN,
                        COI: entity[k].COI,
                        companyPhone: "+"+entity[k].phoneCountryCode+" "+entity[k].companyPhone,
                        TAN: entity[k].TAN,
                        website: entity[k].website,
                        companyEmail: entity[k].companyEmail,
                        country: entity[k].country,
                        locations: locationdetails,
                        //contactPersons: contactdetails,
                        departments: entityDept,
                        companyNo: getnext ? getnext : 1,
                        companyID: str ? str : 1,
                        uploadTime: uploadTime
                    }
                    var insertedEntity = await insertEntityFun(entity1);
                    //console.log("data to save", insertedEntity)
                    //console.log("entity...",entity[k].branchPincode); 
                    var branch_id = insertedEntity.locations.filter((lok)=>{
                        if (lok.pincode == entity[k].branchPincode ) {
                            return lok._id
                        }
                    })
                    //console.log(branch_id)
                    var contactPersons = [
                        { 

                            branchCode : branch_id[0].branchCode ,
                            branchName: branch_id[0].addressLine2,
                            locationType : branch_id[0].locationType,
                            firstName: entity[k].firstName,
                            lastName: entity[k].lastName,
                            phone: "+"+entity[k].phoneCountryCode+" "+entity[k].companyPhone,
                            altPhone: "+"+entity[k].phoneCountryCode+" "+entity[k].altPhone,
                            email: entity[k].email,
                            departmentName: departmentId,
                            designationName: designationId,
                            employeeID: entity[k].employeeID,
                            role: entity[k].role,
                            createUser: createLogin1,
                        }
                    ]
                    let contactdetails = [];
                        for (var a = 0; a < contactPersons.length; a++) {
                            if ((contactPersons[a].branchName != null || contactPersons[a].firstName != null ||
                                    contactPersons[a].phone != null || contactPersons[a].altPhone != null || contactPersons[a].email != null ||
                                    contactPersons[a].department != null || contactPersons[a].designation != null || contactPersons[a].employeeID != null))

                            {
                                contactdetails.push(contactPersons[a]);
                            }
                        }

                    //console.log("contactdetails----s",contactdetails); 

                    var insertedContact = await insertContactDetails( insertedEntity._id, contactdetails);
                    //console.log("insertedContact----s",insertedContact);
                    
                    var allUsers = await fetchAllUsers();
                    for (var a = 0; a < contactPersons.length; a++) {
                        var userExists = allUsers.filter((data) => {
                            //console.log(data)
                            if (data.username == contactPersons[a].phone) {
                                return data;
                            }
                        })
                        
                        if (userExists.length == 0){
                            var userDetails = {
                                username                : "MOBILE",
                                pwd                     : "welcome123",
                                firstname               : contactPersons[a].firstName,
                                lastname                : contactPersons[a].lastName,
                                mobNumber               : contactPersons[a].phone,
                                email                   : contactPersons[a].email,
                                company_id              : insertedEntity._id,
                                companyID               : insertedEntity.companyID,
                                companyName             : insertedEntity.companyName,
                                branch_id               : branch_id[0]._id,
                                branchCode              : contactPersons[a].branchCode,
                                workLocation            : contactPersons[a].branchName,
                                city                    : branch_id[0].city,
                                stateName               : branch_id[0].state,
                                stateCode               : branch_id[0].stateCode,
                                country                 : branch_id[0].country,
                                countryCode             : branch_id[0].countryCode,
                                role                    : 'employer'
                            }
                            //console.log("userExists",userDetails)
                            var insertUser1 = await createUserFun(userDetails);   
                        }
                    }
                } else {

                    remark += "data already exists.";

                    invalidObjects = entity[k];
                    invalidObjects.failedRemark = remark;
                    invalidData.push(invalidObjects);
                }

            } else {
                invalidObjects = entity[k];
                invalidObjects.failedRemark = remark;
                invalidData.push(invalidObjects);
            }
            remark = '';
        }


        /* EntityMaster.insertMany(validData)
            .then(data => {
            })
            .catch(err => {
                console.log(err);
            });
        */
        failedRecords.FailedRecords = invalidData;
        failedRecords.fileName = req.body.fileName;
        failedRecords.totalRecords = req.body.totalRecords;

        await insertFailedRecords(failedRecords, req.body.updateBadData);

        res.status(200).json({
            "message": "Bulk upload process is completed successfully!",
            "completed": true
        });
    }
};

var insertEntityFun = async (entity) => {
    return new Promise(function(resolve, reject) {
        const entity1 = new EntityMaster({
                        _id: new mongoose.Types.ObjectId(),
                        fileName: entity.fileName,
                        entityType: entity.entityType,
                        industry_id: entity.industry_id,
                        companyName: entity.companyName,
                        groupName: entity.groupName,
                        CIN: entity.CIN,
                        COI: entity.COI,
                        companyPhone: entity.companyPhone,
                        TAN: entity.TAN,
                        website: entity.website,
                        companyEmail: entity.companyEmail,
                        country: entity.country,
                        locations: entity.locations,
                        //contactPersons: contactdetails,
                        departments: entity.departments,
                        companyNo: entity.companyNo,
                        companyID: entity.companyID,
                        uploadTime: entity.uploadTime

                    })
                    // console.log("entity1entity1",entity1.companyPhone);
                    entity1.save()
                        .then(data => {
                            //console.log("data to save", data) 
                            resolve(data);
                        })
                        .catch(err => {
                            reject(err);
                        });

    })
}

function insertContactDetails(entity_id, contactdetails) {
    return new Promise(function(resolve, reject) {
        EntityMaster.updateOne({ _id: entity_id }, {
            $push: {
                'contactPersons': contactdetails
            }
        })
        .exec()
        .then(data => {
            if (data.nModified == 1) {
                resolve({ created: true })
            } else {
                resolve({ created: false })
            }
        })
        .catch(err => {
            reject(err);
        });
    });
}
function createUserFun(userDetails) {
    return new Promise(function(resolve, reject) {
    var emailId = userDetails.email;
    var userRole = (userDetails.role).toLowerCase();
    bcrypt.hash(userDetails.pwd, 10, (err, hash) => {
        if (err) {
            resolve({created:false})
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
                    username: userDetails.mobNumber,
                    profile:
                    {
                        firstname    : userDetails.firstname,
                        lastname     : userDetails.lastname,
                        fullName     : userDetails.firstname + ' ' + userDetails.lastname,
                        email        : emailId.toLowerCase(),
                        mobile       : userDetails.mobNumber,
                        company_id   : ObjectID(userDetails.company_id),
                        companyID    : userDetails.companyID,
                        branch_id    : userDetails.branch_id,  
                        branchCode   : userDetails.branchCode, 
                        workLocation : userDetails.workLocation,
                        passwordreset: false, 
                        companyName  : userDetails.companyName,
                        //department   : req.body.department,
                        //designation  : req.body.designation,
                        city         : userDetails.city,
                        stateName    : userDetails.stateName,
                        stateCode    : userDetails.stateCode,
                        country      : userDetails.country,
                        countryCode  : userDetails.countryCode,
                        otpMobile    : mobileOTP,
                        status       : "blocked",
                        //createdBy    : req.body.createdBy,
                        createdAt    : new Date(),
                    },
                    roles: [userRole]
                });
                
                user.save()
                    .then(result => {
                        console.log('bef mail===',result)
                        if (result) {
                            resolve({created:true})
                        }else {
                            resolve({created:true})
                        }
                    })
                    .catch(err => {
                        reject(err)
                    });
            }
        }
    });
});
}
var insertFailedRecords = async (invalidData, updateBadData) => {
    //console.log('invalidData',invalidData);
    return new Promise(function(resolve, reject) {
        FailedRecords.find({
                fileName: invalidData.fileName
            })
            .exec()
            .then(data => {
                if (data.length > 0) {
                    //console.log('data',data[0].failedRecords.length)   
                    if (data[0].failedRecords.length > 0) {
                        if (updateBadData) {
                            FailedRecords.updateOne({
                                    fileName: invalidData.fileName
                                }, {
                                    $set: {
                                        'failedRecords': []
                                    }
                                })
                                .then(data => {
                                    if (data.nModified == 1) {
                                        FailedRecords.updateOne({
                                                fileName: invalidData.fileName
                                            }, {
                                                $set: {
                                                    'totalRecords': invalidData.totalRecords
                                                },
                                                $push: {
                                                    'failedRecords': invalidData.FailedRecords
                                                }
                                            })
                                            .then(data => {
                                                if (data.nModified == 1) {
                                                    resolve(data);
                                                } else {
                                                    resolve(data);
                                                }
                                            })
                                            .catch(err => {
                                                reject(err);
                                            });
                                    } else {
                                        resolve(0);
                                    }
                                })
                                .catch(err => {
                                    reject(err);
                                });
                        } else {
                            FailedRecords.updateOne({
                                    fileName: invalidData.fileName
                                }, {
                                    $set: {
                                        'totalRecords': invalidData.totalRecords
                                    },
                                    $push: {
                                        'failedRecords': invalidData.FailedRecords
                                    }
                                })
                                .then(data => {
                                    if (data.nModified == 1) {
                                        resolve(data);
                                    } else {
                                        resolve(data);
                                    }
                                })
                                .catch(err => {
                                    reject(err);
                                });
                        }

                    } else {
                        FailedRecords.updateOne({
                                fileName: invalidData.fileName
                            }, {
                                $set: {
                                    'totalRecords': invalidData.totalRecords
                                },
                                $push: {
                                    'failedRecords': invalidData.FailedRecords
                                }
                            })
                            .then(data => {
                                if (data.nModified == 1) {
                                    resolve(data);
                                } else {
                                    resolve(data);
                                }
                            })
                            .catch(err => {
                                reject(err);
                            });
                    }
                } else {
                    const failedRecords = new FailedRecords({
                        _id: new mongoose.Types.ObjectId(),
                        failedRecords: invalidData.FailedRecords,
                        fileName: invalidData.fileName,
                        totalRecords: invalidData.totalRecords,
                        createdAt: new Date()
                    });

                    failedRecords
                        .save()
                        .then(data => {
                            resolve(data._id);
                        })
                        .catch(err => {
                            console.log(err);
                            reject(err);
                        });
                }
            })

    })
}
exports.filedetails = (req, res, next) => {
    // console.log('req------',req,'res',res);
    var finaldata = {};
    EntityMaster.find({
            fileName: req.params.fileName
        })
        .exec()
        .then(data => {
            // finaldata.push({goodrecords: data})
            finaldata.goodrecords = data;
            FailedRecords.find({
                    fileName: req.params.fileName
                })
                .exec()
                .then(badData => {
                    finaldata.failedRecords = badData[0].failedRecords
                    finaldata.totalRecords = badData[0].totalRecords
                    res.status(200).json(finaldata);
                })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.fetch_file = (req, res, next) => {
    EntityMaster.aggregate([{
                $group: {
                    _id: {
                        "fileName": "$fileName",
                        "uploadTime": "$uploadTime",
                    },
                    'count': {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    "fileName": "$_id.fileName",
                    "uploadTime": "$_id.uploadTime",
                    'count': 1
                }
            }
        ])
        .sort({
            "uploadTime": -1
        })
        .exec()
        .then(data => {
            console.log('data', data);
            var tableData = data.filter((a, i) => {
                if (a.fileName) {
                    return {
                        fileName: a.fileName ? a.fileName : "Manual",
                        uploadTime: a.uploadTime !== null ? a.uploadTime : "-",
                        count: a.count !== NaN ? "<p>" + a.count + "</p>" : "a",
                        _id: a.fileName + "/" + a.uploadTime,
                    }
                }
            })
            console.log(tableData)
            res.status(200).json(tableData.slice(req.body.startRange, req.body.limitRange));
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.fetch_file_count = (req, res, next) => {
    EntityMaster.find({})
        .exec()
        .then(data => {
            var x = _.unique(_.pluck(data, "fileName"));
            var z = [];
            for (var i = 0; i < x.length; i++) {
                var y = data.filter((a) => a.fileName == x[i]);
                z.push({
                    "fileName": x[i],
                    'count': y.length,
                    "_id": x[i]
                })
            }
            res.status(200).json(z.length);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
exports.delete_file = (req, res, next) => {
    //console.log(req.params.uploadTime)
    EntityMaster.deleteMany({
            "fileName": req.params.fileName,
            "uploadTime": req.params.uploadTime
        })
        .exec()
        .then(data => {
            res.status(200).json({
                "message": "Employers of file " + req.params.fileName + " deleted successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};