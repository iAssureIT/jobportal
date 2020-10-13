import React, { Component } from 'react';
import 'bootstrap/js/tab.js';

import LocationDetails from '../EntityMaster/Onboarding/locationDetails/LocationDetails.jsx';

function EmployerLocationDetails() {
    return (
        <div className="">
            <LocationDetails entity="employer" />
        </div>
    );
}
export default EmployerLocationDetails;

