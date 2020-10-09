import React, { Component } from 'react';
import ContactDetails from '../../coreadmin/Master/EntityMaster/Onboarding/contactDetails/ContactDetails.jsx';
import 'bootstrap/js/tab.js';

function CorporateContactDetails() {
    return (
        <div className="">
            <ContactDetails entity="supplier" 
            				roles={['supplier']} 
                            userRole="supplier" 
                            bookingRequired={false}
            />
        </div>
    );
}
export default CorporateContactDetails;

