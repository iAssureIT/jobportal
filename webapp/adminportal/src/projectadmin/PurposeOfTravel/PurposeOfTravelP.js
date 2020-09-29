import React, { Component } from 'react';
import { render }           from 'react-dom';
import TimePicker           from 'rc-time-picker';
import moment               from 'moment';
import jQuery               from 'jquery';
import $                    from 'jquery';
import OneFieldForm         from '../../coreadmin/Master/OneFieldForm/OneFieldForm.js';

class PurposeOfTravel extends Component{
   constructor(props) {
    super(props);
    this.state = {
       "tableHeading": {
          purposeType: "Purpose Type",
          actions: 'Actions',
      },
      "tableObjects": {
          deleteMethod: 'delete',
          apiLink: '/api/purposeoftravelmaster/',
          paginationApply: false,
          searchApply: false,
          editUrl: '/project-master-data'
      },
      "startRange": 0,
      "limitRange": 10,
      "fields" : {
        placeholder : "Enter purpose type..",
        title       : "Purpose of Travel",
        api         : "/api/purposeoftravelmaster/",
        attributeName : "purposeType"
      }
    };
  }

    render() {
        return (
            <div className="container-fluid">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                  <OneFieldForm fields={this.state.fields}
                                tableHeading={this.state.tableHeading}
                                tableObjects={this.state.tableObjects}
                                editId ={this.props.editId}
                                masterFieldForm = {true}                              
                                history={this.props.history} />
                </div>
              </div>
            </div>
        );
    }
}

 export default PurposeOfTravel;