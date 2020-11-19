const mongoose = require('mongoose');

const entitySchema = mongoose.Schema({
    _id                       : mongoose.Schema.Types.ObjectId,
    supplierOf                : { type: mongoose.Schema.Types.ObjectId, ref: 'entitymaster' },
    entityType                : String,
    companyNo                 : Number,
    companyID                 : String, 
    companyName               : String,
    groupName                 : String,
    CIN                       : String,   
    COI                       : Array,
    TAN                       : String,
    companyLogo               : Array,
    website                   : String,
    companyPhone              : String,
    companyEmail              : String,  
    profileStatus             : String,
    country                   : String,
    countryCode               : String,
    industry_id               : { type: mongoose.Schema.Types.ObjectId, ref: 'industrymaster' },  
    statutoryDetails    : [{
                            stateCode           : String,
                            state               : String,
                            GSTIN               : String,
                            GSTDocument         : Array,
                            PAN                 : String,
                            PANDocument         : Array
                           }],
    locations           :       [
    
                                {
                                    locationType        : String,
                                    branchCode          : Number,
                                    addressLine1        : String,
                                    addressLine2        : String,
                                    countryCode         : String,
                                    country             : String,
                                    stateCode           : String,
                                    state               : String,
                                    district            : String,
                                    city                : String,
                                    area                : String,
                                    pincode             : Number,
                                    latitude            : Number,
                                    longitude           : Number,
                                    // GSTIN               : String,
                                    // GSTDocument         : Array,
                                    // PAN                 : String,
                                    // PANDocument         : Array
                                }
                                ],
    contactPersons      :       [
                                {
                                    branchCode                : Number,
                                    branchName                : String,
                                    profileStatus             : String,

                                    locationType              : String,
                                    profilePhoto              : String,
                                    firstName                 : String,
                                    middleName                : String,
                                    lastName                  : String,
						            empCategory               : String,
                                    empPriority               : String,
                                    DOB                       : Date,
                                    phone                     : String,
                                    gender                    : String,
                                    altPhone                  : String,
                                    whatsappNo                : String,
                                    email                     : String,
                                    department                : String,
                                    designation               : String,
                                    departmentName            : String,
                                    designationName           : String,
                                    employeeID                : String,
                                    userID                    : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
                                    personID                  : { type: mongoose.Schema.Types.ObjectId, ref: 'personmasters' },
                                    bookingApprovalRequired   : String,
                                    approvingAuthorityId1     : String,
                                    approvingAuthorityId2     : String,
                                    approvingAuthorityId3     : String,
                                    preApprovedKilometer     : Number,
                                    preApprovedRides          : Number,
                                    preApprovedAmount         : Number,
                                    createUser                : Boolean,
                                    addEmployee               : Boolean,
                                    role                      : String,
                                    address                   : [{
                                                                addressLine1    : String,
                                                                addressLine2    : String,
                                                                landmark        : String,
                                                                area            : String,
                                                                city            : String,
                                                                district        : String,
                                                                stateCode       : String,
                                                                state           : String,
                                                                countryCode     : String,
                                                                country         : String,
                                                                pincode         : Number,
                                                                latitude        : String,
                                                                longitude       : String,
                                                                addressProof    : Array
                                                            }],
   
                                }
                                ],
    
    createdBy                 : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                 : Date,
    fileName                  : String,

    updateLog                 : [
                                {
                                    updatedAt           : Date,
                                    updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                                }
                                ]
});

module.exports = mongoose.model('entitymasters',entitySchema);