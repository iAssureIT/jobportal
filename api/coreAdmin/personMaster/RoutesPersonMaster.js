const express 	= require("express");
const router 	= express.Router();

const personMaster = require('./ControllerPersonMaster');

router.post('/post', personMaster.insertPerson);

router.get('/get/count/:type',personMaster.countPersons);

router.post('/get/list',personMaster.listPersons);

router.post('/get/filterPersons',personMaster.filterPersons);

router.get('/get/one/:personID', personMaster.singlePerson);
 
router.get('/get/details/:userID', personMaster.singlePersonByUserId);

router.patch('/patch', personMaster.updatePerson);

router.get('/search/:type/:str', personMaster.searchPerson);

router.post('/bulkUploadEmployee',personMaster.bulkUploadEmployee);

router.delete('/delete/:personID',personMaster.deletePerson);

//Driver Mobile App Routes

router.post('/post/basicInfo',personMaster.insertPersonBasicInfo);

router.post('/post/addressInfo',personMaster.insertPersonAddressInfo);

router.post('/post/documentsInfo',personMaster.insertPersonDocumentsProof);

router.get('/get/filedetails/:type/:fileName', personMaster.filedetails);

router.post('/get/files', personMaster.fetch_file); 
 
router.get('/get/files/count/:type', personMaster.fetch_file_count);


router.get('/get/UserID/:employeeId',personMaster.getUserByEmpID);

module.exports = router;