const express 	= require("express");
const router 	= express.Router();

const languageMaster = require('./ControllerLanguage.js');
const checkAuth 	 = require('../../middleware/check-auth.js');

router.post('/post', languageMaster.insertLanguage);

router.post('/get/list', checkAuth, languageMaster.fetchLanguages);

router.get('/get/list', languageMaster.getLanguages);

router.get('/get/count', languageMaster.countLanguages);

router.get('/get/one/:fieldID', languageMaster.fetchSingleLanguage);

router.get('/search/:str', languageMaster.searchLanguage);

router.patch('/patch', languageMaster.updateLanguage);

router.delete('/delete/:fieldID', languageMaster.deleteLanguage);

router.post('/bulkUploadIndustry',languageMaster.bulkUploadLanguage);

router.post('/get/files', languageMaster.fetch_file); 

router.get('/get/filedetails/:fileName', languageMaster.filedetails);

module.exports = router;