import React, { Component } from 'react';
import jQuery from 'jquery';
import 'bootstrap/js/tab.js';

import StatutoryDetails from '../EntityMaster/Onboarding/basicInfo/StatutoryDetails.js';

function EmployerStatutoryDetails() {
    return (
        <div className="">
            <StatutoryDetails entity="corporate" />
        </div>
    );
}
export default EmployerStatutoryDetails;



