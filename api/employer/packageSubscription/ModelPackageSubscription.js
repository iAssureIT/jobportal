const mongoose = require('mongoose');

const packagesubscriptionSchema = mongoose.Schema({
	_id				: mongoose.Schema.Types.ObjectId,
	package_id 		: {type: mongoose.Schema.Types.ObjectId, ref: 'packagemasters'},
	company_id 		: {type: mongoose.Schema.Types.ObjectId, ref: 'entitymasters'},
	companyID 		: Number,
	branch_id 		: String,
	startDate 		: String, //"YYYY-MM-DD"
	endDate 		: String, //"YYYY-MM-DD"
	planStatus 		: String, //"Active" or "Inactive"
	amountPaid 		: Number,
	paymentMethod 	: String,
	transactionID 	: Number,
	paymentOrderID 	: String,
	paymentStatus	: String, //Paid or Failed
	invoiceNumber 	: Number,
	createdAt 		: Date,
	createdBy		: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
	
});

module.exports = mongoose.model('packagesubscriptions',packagesubscriptionSchema);
