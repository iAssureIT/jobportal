const express 	= require("express");
const router 	= express.Router();

const CountrySpecificConfigContoller = require('./ControllerCountrySpecificConfig.js');

router.post('/post', CountrySpecificConfigContoller.insertCountrySpecificConfig);
router.patch('/patch', CountrySpecificConfigContoller.updateCountrySpecificConfig);
router.post('/list', CountrySpecificConfigContoller.getAllCountrySpecificConfig);
router.get('/get/one/:id', CountrySpecificConfigContoller.getSingleCountrySpecificConfig);
router.get('/getTaxName/:countryCode', CountrySpecificConfigContoller.getTaxName);
router.delete('/delete/:id', CountrySpecificConfigContoller.deleteCountrySpecificConfig);

module.exports = router;


