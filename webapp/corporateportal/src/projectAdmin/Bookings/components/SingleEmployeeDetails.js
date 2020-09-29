import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		      from 'react-router-dom';
import swal                   from 'sweetalert';
import TripDetails        	  from './TripDetails.js';
import EmployeeDetails        from './EmployeeDetails.js';
import CarDetails             from './CarDetails.js';
import EstimatedCost          from './EstimatedCost.js';
import ManagerApproval        from './ManagerApproval.js';
import DriverDetails          from './DriverDetails.js';
import FeedbackOnTrip         from './FeedbackOnTrip.js';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';
class SingleEmployeeDetails extends Component {
	
	constructor(props) {
      super(props);
    
      this.state = {
      	id : '',
        empID:"",
        personInfo:[]
      };
    }
    componentWillReceiveProps(nextProps){
      console.log('nextProps==============')
      console.log('nextProps: ',nextProps)
    	this.setState({
  			id : nextProps.id,
        empID:nextProps.name
  		},()=>{

  			axios.get("/api/personmaster/get/one/"+nextProps.name)
            .then((response)=>{
            	console.log("response",response);
              this.setState({
                  personInfo : response.data,
              });
            })
            .catch((error)=>{
            })
  		})
    }

    componentDidMount(){
    
    this.setState({
        id : this.props.id
      },()=>{

        axios.get("/api/personmaster/get/one/"+this.state.id)
            .then((response)=>{
            
              this.setState({
                  personInfo : response.data,
              });
            })
            .catch((error)=>{
            })
      })
    }
	  
	render() {
      console.log('this.state.empID: ',this.state.empID)
      console.log('this.state.personInfo: ',this.state.personInfo)
       	return (	
       		this.state.personInfo ? 
		        <div>
			        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
							 <EmployeeDetails personID={this.state.empID} />										
						  </div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
								<TripDetails personID={this.state.id} />										
							</div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <CarDetails personID={this.state.id} />                    
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <EstimatedCost personID={this.state.id} />                    
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <ManagerApproval personID={this.state.id} />                    
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <DriverDetails personID={this.state.id} />                    
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <FeedbackOnTrip personID={this.state.id} />                    
              </div>
	         </div>
	        : null
	    );
	} 
}
export default withRouter(SingleEmployeeDetails); 
