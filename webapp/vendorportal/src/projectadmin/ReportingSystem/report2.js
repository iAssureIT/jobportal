import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import swal                 from 'sweetalert';
import { withRouter }       from 'react-router-dom';
import _                    from 'underscore';

import 'bootstrap/js/tab.js';
var apiLink = "";
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "user_ID"   : "",
            "startRange": 0,
            "limitRange": 10,
            "editId"    :  '',
            "fieldValue" : ""
        };
    }

    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                <section className="content">
                    <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <label className="font40 col-lg-6 col-lg-offset-3">Coming Soon</label>
                    </div>
                </section>
            </div>
        );
    }
}
export default withRouter(Dashboard)


