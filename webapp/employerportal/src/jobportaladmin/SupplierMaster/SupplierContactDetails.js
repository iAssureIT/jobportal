import React, { Component } from 'react';
// import ContactDetails from '../EntityMaster/Onboarding/contactDetails/ContactDetails.jsx';
import ContactDetails from '../../coreadmin/Master/EntityMaster/Onboarding/contactDetails/ContactDetails.jsx';
import _ from 'underscore';
import 'bootstrap/js/tab.js';

class CorporateContactDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillReceiveProps(nextProps) {
    
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <ContactDetails entity="supplier" />
            </div>
        );
    }
}
export default CorporateContactDetails;

