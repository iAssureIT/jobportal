import React, { Component } from 'react';
import BasicInfo from '../../coreadmin/Master/EntityMaster/Onboarding/basicInfo/BasicInfo.jsx';
import 'bootstrap/js/tab.js';

function CorporateBasicInfo() {
    return (
        <div className="">
            <BasicInfo entity="supplier" vendorID={localStorage.getItem("company_Id")}/>
        </div>
    );
}
export default CorporateBasicInfo;

