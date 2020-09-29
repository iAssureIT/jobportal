import React, { Component } from 'react';
import LocationDetails from '../../coreadmin/Master/EntityMaster/Onboarding/locationDetails/LocationDetails.jsx';
import 'bootstrap/js/tab.js';

function CorporateLocationDetails() {
    return (
        <div className="">
            <LocationDetails entity="supplier" />
        </div>
    );
}
export default CorporateLocationDetails;

