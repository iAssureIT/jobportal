import React, { Component } from 'react';
// import LocationDetails from '../EntityMaster/Onboarding/locationDetails/LocationDetails.jsx';
import LocationDetails from '../../coreadmin/Master/EntityMaster/Onboarding/locationDetails/LocationDetails.jsx';
import _ from 'underscore';
import 'bootstrap/js/tab.js';

class CorporateLocationDetails extends Component {
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
                <LocationDetails entity="supplier" />
            </div>
        );
    }
}
export default CorporateLocationDetails;

