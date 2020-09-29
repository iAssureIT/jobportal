import React, { Component } from 'react';
import jQuery from 'jquery';
import 'bootstrap/js/tab.js';

import StatutoryDetails from '../EntityMaster/Onboarding/basicInfo/StatutoryDetails.js';

function VendorStatutoryDetails() {
    return (
        <div className="">
            <StatutoryDetails entity="vendor" />
        </div>
    );
}
export default VendorStatutoryDetails;



