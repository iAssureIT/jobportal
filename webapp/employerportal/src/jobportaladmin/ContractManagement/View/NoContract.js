import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import _ from 'underscore';
import moment from 'moment';
import 'bootstrap/js/tab.js';
import 'react-phone-input-2/lib/style.css';
import './Viewcontract.css';
class NoContract extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();
    }
    componentWillReceiveProps(nextProps) {

    }
    
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pageContent">
                <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12 noContractDiv">
                   <span> <b className="fz22">Thank you for approving your Company Profile.</b> <br/><br/>
                    It seems that your contract is not yet ready. It will be created very soon & you will be notified when it will be ready.
                    In case of any doubt, please contact system admin.</span>

                </div>
            </div>
        );
    }
}
export default NoContract;