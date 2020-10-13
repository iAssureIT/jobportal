import React, { Component } from 'react';
import jQuery from 'jquery';
import 'bootstrap/js/tab.js';

import BasicInfo from '../EntityMaster/Onboarding/basicInfo/BasicInfo.jsx';

function EmployerBasicInfo() {
    return (
        <div className="">
            <BasicInfo entity="employer" />
        </div>
    );
    
}
export default EmployerBasicInfo;



