const express 	= require("express");
const router 	= express.Router();

const automatedSequence = require('./Controller.js');

router.post('/post', 					automatedSequence.insertAutomatedBillingSequence);

router.post('/get/list', 				automatedSequence.fetchAutomatedBillingSequence);

router.get('/get/one/:sequenceID', 		automatedSequence.fetchSingleAutomatedBillingSequence);

router.patch('/patch', 					automatedSequence.updateAutomatedBillingSequence);

router.delete('/delete/:sequenceID', 	automatedSequence.deleteAutomatedBillingSequence);


module.exports = router;