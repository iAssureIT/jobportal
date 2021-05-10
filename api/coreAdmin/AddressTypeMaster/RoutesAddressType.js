const express 	= require("express");
const router 	= express.Router();

const addressTypeMaster = require('./ControllerAddressType.js');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', addressTypeMaster.insertAddressType);

router.post('/get/list', checkAuth, addressTypeMaster.fetchAddressTypes);

router.get('/get/list', addressTypeMaster.getAddressTypes);

router.get('/get/count', addressTypeMaster.countAddressTypes);

router.get('/get/one/:fieldID', addressTypeMaster.fetchSingleAddressType);

router.get('/search/:str', addressTypeMaster.searchAddressType);

router.patch('/patch', addressTypeMaster.updateAddressType);

router.delete('/delete/:fieldID', addressTypeMaster.deleteAddressType);

router.post('/bulkUploadIndustry',addressTypeMaster.bulkUploadAddressType);

router.post('/get/files', addressTypeMaster.fetch_file); 

router.get('/get/filedetails/:fileName', addressTypeMaster.filedetails);

module.exports = router;