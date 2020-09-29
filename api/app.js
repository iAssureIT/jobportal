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
const rolesentitymasterRoutes			= require('./coreAdmin/RoleEntityMaster/Routes.js');
const masternotificationRoutes		    = require('./coreAdmin/notificationManagement/RoutesMasterNotification.js');
const notificationRoutes				= require('./coreAdmin/notificationManagement/RoutesNotification.js');
const companySettingsRoutes				= require('./coreAdmin/companySettings/RoutesCompanySettings.js');
const projectSettingRoutes 				= require('./coreAdmin/projectSettings/RoutesProjectSettings.js');
const globalMasterRoutes 				= require('./coreAdmin/globalMaster/RoutesGlobalMaster.js');
const preferencesRoutes 				= require('./coreAdmin/preferences/RoutesPreferences.js');
const paymentgatewayRoutes 				= require('./coreAdmin/paymentgateway/Routes.js');
const paymentTermsRoutes 				= require('./coreAdmin/PaymentTerms/PaymentTermsRoutes.js');

const entityRoutes						= require("./coreAdmin/entityMaster/RoutesEntityMaster.js");

// const mappingRoutes						= require("./coreAdmin/entityMaster/RoutesMappingMaster.js");

const packageTypeMasterRoutes			= require("./coreAdmin/packageTypeMaster/RoutesPackageTypeMaster.js");
const packageNameMasterRoutes			= require("./coreAdmin/packageNameMaster/RoutesPackageNameMaster.js");
const packageMasterRoutes				= require("./coreAdmin/packageMaster/RoutesPackageMaster.js");

const packageMasterBulkRoutes			= require("./coreAdmin/packageMasterBulk_corp/RoutesPackageMasterBulk.js");

const categoryMasterRoutes			    = require("./coreAdmin/categoryMaster/RoutesCategoryMaster.js");
const brandMasterRoutes			    	= require("./coreAdmin/brandMaster/RoutesBrandMaster.js");
const cityTypeRoutes			    	= require("./coreAdmin/cityType/RoutesCityType.js");
const documententitymasterRoutes	    = require("./coreAdmin/DocumentEntityMaster/Routes.js");
const documentListMasterRoutes		    = require("./coreAdmin/DocumentListMaster/Routes.js");
const departmentMasterRoutes			= require("./coreAdmin/departmentMaster/RoutesDepartmentMaster.js");
const designationMasterRoutes			= require("./coreAdmin/designationMaster/RoutesDesignationMaster.js");
const fuelTypeMasterRoutes				= require("./coreAdmin/fuelTypeMaster/RoutesFuelTypeMaster.js");
const locationTypeMasterRoutes		    = require("./coreAdmin/locationTypeMaster/RoutesLocationTypeMaster.js");
const taxNameMasterRoutes				= require("./coreAdmin/taxNameMaster/RoutesTaxNameMaster.js");
const modelMasterRoutes					= require("./coreAdmin/modelMaster/RoutesModelMaster.js");
const categoryBrandRoutes				= require("./coreAdmin/categoryBrand/RoutesModelMaster.js");
const cityNameMasterRoutes				= require("./coreAdmin/cityNameMaster/RoutesCityNameMaster.js");
const vehicleMasterRoutes				= require("./coreAdmin/vehicleMaster/RoutesVehicleMaster.js");
const personMasterRoutes				= require("./coreAdmin/personMaster/RoutesPersonMaster.js");
const contractRoutes				    = require("./coreAdmin/contract/RoutesContracts.js");
const entityMappingRoutes				= require("./coreAdmin/EntityMapping/RoutesEntityMapping.js");
const vehicleDriverMappingRoutes	    = require("./coreAdmin/vehicleDriverMapping/RoutesVehicleDriverMapping.js");
const bookingRoutes				        = require("./coreAdmin/bookingMaster/RoutesBookingMaster.js");
const moduleRoutes				        = require("./coreAdmin/moduleMaster/RoutesModuleMaster.js");
const facilityRoutes				    = require("./coreAdmin/facilityMaster/RoutesFacilityMaster.js");
const accessRoutes				    	= require("./coreAdmin/accessManagement/RoutesAccessMaster.js");
const expenseTypeRoutes				    = require("./coreAdmin/expenseTypeMaster/RoutesExpenseTypeMaster.js");
const VehicleEmployeeMappingRoutes	    = require("./coreAdmin/VehicleEmployeeMapping/RoutesVehicleEmployeeMapping.js");
const expenseItemRoutes				    = require("./coreAdmin/expenseItemMaster/Routes.js");
const EventMappingRoutes				= require("./coreAdmin/EventMappingMaster/RoutesEventMapping.js");
const PurposeOfTravelRoutes				= require("./coreAdmin/purposeOfTravelMaster/RoutesPurposeOfTravelMaster.js");
const VendorAllocationRoutes			= require("./coreAdmin/vendorAllocation/RoutesVendorAllocation.js");

const RoutesReports		        = require("./coreAdmin/Reports/RoutesReports.js");

const NightTimingsRoutes		= require("./coreAdmin/nightTimings/RoutesNightTimings.js");
const EarlyMorningTimingsRoutes	= require("./coreAdmin/earlyMorningTimings/RoutesEarlyMorningTimings.js");
const TimeFormatRoutes			= require("./coreAdmin/timeFormat/RoutesTimeFormat.js");
const EmpVehicalRoutes			= require("./coreAdmin/EmpVehicalMaster/RoutesEmpVehicalMaster.js");
const EventTokenRoutes			= require("./coreAdmin/EventTokenMaster/RoutesEventTokenMaster.js");
const BillingManagement			= require("./coreAdmin/BillingManagement/Routes.js");
const InvoiceNumber		    	= require("./coreAdmin/InvoiceNumbers/Routes.js");
const AutomatedBillingSequence  = require("./coreAdmin/AutomatedSequenceMaster/Routes.js");
const InvoiceMaster             = require("./coreAdmin/invoiceMaster/RoutesInvoiceMaster.js");
const MasterInvoiceNumber		= require("./coreAdmin/masterInvoiceNumbers/Routes.js");
const CountrySpecificConfig		= require("./coreAdmin/CountrySpecificConfig/RoutesCountrySpecificConfig.js");
const AlertSystem		        = require("./coreAdmin/AlertSystem/Routes.js");

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
app.use("/api/empvehicalmaster", EmpVehicalRoutes);

app.use("/api/packagetypemaster", packageTypeMasterRoutes);
app.use("/api/packagenamemaster", packageNameMasterRoutes);

app.use("/api/paymentgateway", paymentgatewayRoutes);
app.use("/api/paymentterms", paymentTermsRoutes);

app.use("/api/packagemaster", packageMasterRoutes);

app.use("/api/packagemasterbulk", packageMasterBulkRoutes);
app.use("/api/categorymaster", categoryMasterRoutes);
app.use("/api/brandmaster", brandMasterRoutes);
app.use("/api/citytypemaster", cityTypeRoutes);
app.use("/api/documententitymaster", documententitymasterRoutes);
app.use("/api/rolesentitymaster", rolesentitymasterRoutes);
app.use("/api/documentlistmaster", documentListMasterRoutes);
app.use("/api/departmentmaster", departmentMasterRoutes);
app.use("/api/designationmaster", designationMasterRoutes);
app.use("/api/fueltypemaster", fuelTypeMasterRoutes);
app.use("/api/locationtypemaster", locationTypeMasterRoutes);
app.use("/api/taxnamemaster", taxNameMasterRoutes);
app.use("/api/modelmaster", modelMasterRoutes);
app.use("/api/categoryBrandmaster", categoryBrandRoutes);
app.use("/api/citynamemaster", cityNameMasterRoutes);
app.use("/api/vehiclemaster", vehicleMasterRoutes);
app.use("/api/modulemaster", moduleRoutes);
app.use("/api/facilitymaster", facilityRoutes);

app.use("/api/personmaster", personMasterRoutes);
app.use("/api/contract", contractRoutes);
app.use("/api/entitymapping", entityMappingRoutes);
app.use("/api/vehicledrivermapping", vehicleDriverMappingRoutes);
app.use("/api/bookingmaster", bookingRoutes);
app.use("/api/accessmaster", accessRoutes);
app.use("/api/expensetypemaster", expenseTypeRoutes);
app.use("/api/VehicleEmployeeMapping", VehicleEmployeeMappingRoutes);
app.use("/api/expenseitemmaster", expenseItemRoutes);
app.use("/api/eventmapping", EventMappingRoutes);
app.use("/api/purposeoftravelmaster", PurposeOfTravelRoutes);
app.use("/api/VendorAllocation", VendorAllocationRoutes);

app.use("/api/reports", 	RoutesReports);
app.use("/api/countryspecificConfig", 	CountrySpecificConfig);
app.use("/api/alertSystem", 	AlertSystem);

app.use("/api/nighttimingsmaster", 			NightTimingsRoutes);
app.use("/api/earlymorningtimingsmaster", 	EarlyMorningTimingsRoutes);
app.use("/api/timeformat", 					TimeFormatRoutes);
app.use("/api/EventToken", 					EventTokenRoutes);
app.use("/api/billing", 					BillingManagement);
app.use("/api/invoicenumber", 				InvoiceNumber);
app.use("/api/automatedbillingsequence", 	AutomatedBillingSequence);
app.use("/api/invoiceMaster", 	InvoiceMaster);
app.use("/api/masterinvoiceMaster", 	MasterInvoiceNumber);

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
