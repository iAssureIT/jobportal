import React, { Component } from 'react';
import { render }           from 'react-dom';
import TimePicker           from 'rc-time-picker';
import moment               from 'moment';
import jQuery               from 'jquery';
import $                    from 'jquery';
import OneFieldForm         from '../../../coreadmin/Master/OneFieldForm/OneFieldForm.js';
import 'rc-time-picker/assets/index.css';

const format = "h:mm a";
class JobShift extends Component{
   constructor(props) {
    super(props);
    this.state = {
      "fields" : {
        placeholder : "Add job shift & press 'Enter' Key",
        title       : "Job Shift",
        attributeName : "jobShift"
      },
      "tableHeading": {
          jobShift: "Job Shift",
          actions: 'Action',
      },
      "tableObjects": {
          deleteMethod: 'delete',
          apiLink: '/api/jobshiftmaster/',
          paginationApply: false,
          searchApply: false,
          editUrl: '/project-master-data'
      },
      "startRange": 0,
      "limitRange": 10,
      "editId": ''
      };
  }
  

  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <OneFieldForm fields={this.state.fields}
                        tableHeading={this.state.tableHeading}
                        tableObjects={this.state.tableObjects}
                        editId ={this.props.editId}
                        masterFieldForm = {true}   
                        history={this.props.history} />
      </div>
    );
  }
}

 export default JobShift;