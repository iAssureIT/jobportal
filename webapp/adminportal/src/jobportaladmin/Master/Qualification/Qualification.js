import React, { Component } from 'react';
import { render }           from 'react-dom';
import TimePicker           from 'rc-time-picker';
import moment               from 'moment';
import jQuery               from 'jquery';
import $                    from 'jquery';
import OneFieldForm         from '../../../coreadmin/Master/OneFieldForm/OneFieldForm.js';
import 'rc-time-picker/assets/index.css';

const format = "h:mm a";
class Qualification extends Component{
   constructor(props) {
    super(props);
    this.state = {
      "fields" : {
        placeholder : "Add qualification & press 'Enter' Key",
        title       : "Qualification",
        attributeName : "qualification"
      },
      "tableHeading": {
          qualification: "Qualification",
          actions: 'Action',
      },
      "tableObjects": {
          deleteMethod: 'delete',
          apiLink: '/api/qualificationmaster/',
          paginationApply: false,
          searchApply: false,
          editUrl: '/qualification'
      },
      "startRange": 0,
      "limitRange": 10,
      "editId": this.props.match ? this.props.match.params.fieldID : ''
      };
  }
  componentDidMount() {
    var editId = this.props.match ? this.props.match.params.fieldID : '';
    this.setState({
        editId: editId
    })
    window.scrollTo(0, 0);
  } 
  componentWillReceiveProps(nextProps) {
      var editId = nextProps.match ? nextProps.match.params.fieldID : '';
      if (editId) {
          this.setState({
              editId: editId
          })
      }
  }

  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <OneFieldForm fields={this.state.fields}
                        tableHeading={this.state.tableHeading}
                        tableObjects={this.state.tableObjects}
                        editId ={this.props.match ? this.props.match.params.fieldID : ''}
                        history={this.props.history} />
      </div>
    );
  }
}

 export default Qualification;