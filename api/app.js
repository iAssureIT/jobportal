const express       = require('express');
const app 			= express();
const morgan 		= require('morgan');// morgan call next function if problem occure
const bodyParser 	= require('body-parser');// this package use to formate json data 
const mongoose 	    = require ('mongoose');
var   nodeMailer    = require('nodemailer');
const globalVariable= require("./nodemon.js");
const fs  			= require('fs'); 
const axios         = require('axios');
const cron          = require('node-cron');
var moment          = require('moment');
var request         = require('request-promise');


const GlobalMaster  = require('./coreAdmin/projectSettings/ModelProjectSettings.js');
// Routes which should handle requests - Core Admin

const systemSecurityRoutes 				= require('./coreAdmin/systemSecurity/RoutesSystemSecurity.js');
const userRoutes 						= require('./coreAdmin/userManagement/RoutesUsers.js');
const rolesRoutes						= require('./coreAdmin/rolesManagement/RoutesRoles.js');
const masternotificationRoutes		    = require('./coreAdmin/notificationManagement/RoutesMasterNotification.js');
const notificationRoutes				= require('./coreAdmin/notificationManagement/RoutesNotification.js');
const companySettingsRoutes				= require('./coreAdmin/companySettings/RoutesCompanySettings.js');
const projectSettingRoutes 				= require('./coreAdmin/projectSettings/RoutesProjectSettings.js');
const globalMasterRoutes 				= require('./coreAdmin/globalMaster/RoutesGlobalMaster.js');
const preferencesRoutes 				= require('./coreAdmin/preferences/RoutesPreferences.js');
const paymentgatewayRoutes 				= require('./coreAdmin/paymentgateway/Routes.js');
const paymentTermsRoutes 				= require('./coreAdmin/PaymentTerms/PaymentTermsRoutes.js');
//const personMasterRoutes				= require("./coreAdmin/personMaster/RoutesPersonMaster.js");

const entityRoutes						= require("./coreAdmin/entityMaster/RoutesEntityMaster.js");

const addressTypeMasterRoutes			= require("./coreAdmin/AddressTypeMaster/RoutesAddressType.js");
const industryMasterRoutes			    = require("./coreAdmin/IndustryMaster/RoutesIndustryMaster.js");
const subIndustryMasterRoutes			= require("./coreAdmin/SubIndustryMaster/RoutesSubIndustryMaster.js");
const functionalAreaMasterRoutes		= require("./coreAdmin/FunctionalAreaMaster/RoutesFunctionalAreaMaster.js");
const subFunctionalAreaMasterRoutes		= require("./coreAdmin/SubFunctionalAreaMaster/RoutesSubFunctionalAreaMaster.js");

const designationMasterRoutes			= require("./coreAdmin/DesignationMaster/RoutesDesignationMaster.js");

const jobCategoryMasterRoutes			= require("./coreAdmin/JobCategoryMaster/RoutesJobCategory.js");
const jobTypeMasterRoutes				= require("./coreAdmin/JobTypeMaster/RoutesJobType.js");
const jobRoleMasterRoutes				= require("./coreAdmin/JobRoleMaster/RoutesJobRole.js");
const jobTimeMasterRoutes				= require("./coreAdmin/JobTimeMaster/RoutesJobTime.js");

const qualificationLevelMasterRoutes	= require("./coreAdmin/QualificationLevelMaster/RoutesQualificationLevel.js");
const qualificationMasterRoutes			= require("./coreAdmin/QualificationMaster/RoutesQualification.js");
const skillMasterRoutes					= require("./coreAdmin/SkillMaster/RoutesSkill.js");

const languageMasterRoutes				= require("./coreAdmin/LanguageMaster/RoutesLanguage.js");
const universityMasterRoutes			= require("./coreAdmin/UniversityMaster/RoutesUniversity.js");
const collageMasterRoutes				= require("./coreAdmin/CollageMaster/RoutesCollage.js");

const moduleRoutes				        = require("./coreAdmin/moduleMaster/RoutesModuleMaster.js");
const facilityRoutes				    = require("./coreAdmin/facilityMaster/RoutesFacilityMaster.js");
const accessRoutes				    	= require("./coreAdmin/accessManagement/RoutesAccessMaster.js");

//const AlertSystem		        = require("./coreAdmin/AlertSystem/Routes.js");

//============ To Start API on Server with Authentication ========
// mongoose.connect('mongodb://localhost/'+globalVariable.dbname,{
// 	useNewUrlParser		: true,
	// useUnifiedTopology	: true,
 	// useCreateIndex: true,
// })
// mongoose.promise = global.Promise;

// global.titleCase = function(Str){
//     return new Promise(function(resolve,reject){
//         resolve(Str.charAt(0).toUpperCase()+Str.slice(1));
//     });
// }
//============ To Start API on Local Server without CORS Error ========
mongoose.connect('mongodb://localhost/'+globalVariable.dbname,{
	// mongoose.connect('mongodb://localhost/'+dbname,{
		useNewUrlParser: true,
		useUnifiedTopology: true 
	})
mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;



app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Credentials', 'true');
	// res.header("Access-Control-Allow-Origin", "http://qafivebeescorporate.iassureit.com/");
	// res.header("Access-Control-Allow-Origin", "http://qafivebees.iassureit.com/");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

let rawdata = fs.readFileSync('./masterData.json');
let masterData = JSON.parse(rawdata);


//URL's collection wise
//coreAdmin
app.use("/api/roles", rolesRoutes);
app.use('/api/projectsettings',projectSettingRoutes);
app.use("/api/auth", systemSecurityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/masternotifications",masternotificationRoutes);
app.use('/api/notifications',notificationRoutes);
app.use('/api/companysettings',companySettingsRoutes);
app.use('/api/globalmaster',globalMasterRoutes);
app.use('/api/preferences',preferencesRoutes);
app.use("/api/entitymaster", entityRoutes);

app.use("/api/paymentgateway", paymentgatewayRoutes);
app.use("/api/paymentterms", paymentTermsRoutes);

app.use("/api/addresstypemaster", addressTypeMasterRoutes);
app.use("/api/industrymaster", industryMasterRoutes);
app.use("/api/subindustrymaster", subIndustryMasterRoutes);
app.use("/api/functionalareamaster", functionalAreaMasterRoutes);
app.use("/api/subfunctionalareamaster", subFunctionalAreaMasterRoutes);

app.use("/api/designationmaster", designationMasterRoutes);

app.use("/api/jobcategorymaster", jobCategoryMasterRoutes);
app.use("/api/jobtypemaster", jobTypeMasterRoutes);
app.use("/api/jobrolemaster", jobRoleMasterRoutes);

app.use("/api/qualificationlevelmaster", qualificationLevelMasterRoutes);
app.use("/api/qualificationmaster", qualificationMasterRoutes);
app.use("/api/skillmaster", skillMasterRoutes);
app.use("/api/languagemaster", languageMasterRoutes);
app.use("/api/universitymaster", universityMasterRoutes);


app.use("/api/modulemaster", moduleRoutes);
app.use("/api/facilitymaster", facilityRoutes);

//app.use("/api/personmaster", personMasterRoutes);
//p.use("/api/accessmaster", accessRoutes);
//app.use("/api/reports", 	RoutesReports);
//app.use("/api/alertSystem", 	AlertSystem);


var formvalues = masterData.locationType[0];
axios.post('/api/locationtypemaster/post',formvalues)
            .then((response) => {
                console.log("response",response);
            })
            .catch((error) => {
                //console.log("error",error);

            })

// var task = cron.schedule('* * * * *', async () => {
var task = cron.schedule('*/30 * * * *', async () => {
    var booking = await getBookings();
});

var notification = cron.schedule('*/5 * * * *', async () => {
    var push_notification = await sendPushNotificationToDriver();
});

function getBookings() {
	return new Promise(function (resolve, reject) {
		axios.get('http://localhost:'+globalVariable.port+'/api/alertSystem/vendorAcceptanceAlert')
	    .then((response) => {
	    	resolve(response);
	        // console.log("response",response);
	    })
	    .catch((error) => {
	        //console.log("error",error);

	    })
    });
	
}

function sendPushNotificationToDriver() {
	return new Promise(function (resolve, reject) {
		axios.post('http://localhost:'+globalVariable.port+'/api/bookingmaster/post/send_push_notification')
	    .then((response) => {
	        resolve(response);
	    })
	    .catch((error) => {
	        console.log("error",error);

	    })
    });
	
}

app.post('/send-email', (req, res)=> {
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
                    from	 : data.projectName+'" Admin" <' + senderEmail + '>', // sender address
                    to     : req.body.email, // list of receivers
										subject: req.body.subject, // Subject line
										text   : req.body.text, // plain text body
										html   : req.body.mail // html body
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
            res.status(500).json({ error: err });
        });
	// let transporter = nodeMailer.createTransport({
	// 	host: globalVariable.emailHost,
	// 	port: globalVariable.emailPort,
	// 	auth: {
	// 		user: globalVariable.user,
	// 		pass: globalVariable.pass
	// 	}
	// });
	// console.log("transporter",transporter);
	// let mailOptions = {
	// 	from   : '"iAssureIT" <'+globalVariable.user+'>', // sender address
	// 	to     : req.body.email, // list of receivers
	// 	subject: req.body.subject, // Subject line
	// 	text   : req.body.text, // plain text body
	// 	html   : req.body.mail // html body
	// };	
	// transporter.sendMail(mailOptions, (error, info) => {
	// 	if (error) {			
	// 		return "Failed";
	// 	}
	// 	if(info){
	// 		res.status(200).json({ 
	// 			message: "Success",
	// 		});
	// 	}else{
	// 		res.status(401).json({ 
	// 			message: "Failed",
	// 		});
	// 	}
	// 	res.render('index');
	// });
});

// handle all other request which not found 
app.use((req, res, next) => {
	const error = new Error('Not Found Manual ERROR');
	error.status = 404;
	next(error);
		// when we get 404 error it send to next 
});
// it will handel all error in the application
app.use((error, req, res, next) => {
	
	res.status(error.status || 500);
	res.json({
		error:{
			message:error.message
		}
	})
});

module.exports = app;
