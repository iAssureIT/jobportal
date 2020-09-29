import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		  from 'react-router-dom';
import _                      from 'underscore';
class CarDetails extends Component {
	
	constructor(props) {
      super(props);
      this.state = {
      	id : '',
        tripArray : props.tripData,
      };
    }
    componentWillUnmount(){}
  componentDidMount(){
    this.setState({
        id : this.props.personID,
        tripArray: this.props.tripData
    })
  }
  componentWillReceiveProps(nextProps){
    	this.setState({
  			id : nextProps.personID,
        tripArray: nextProps.tripData
  		})
    }
	
    
	render() {
       	return (	
		        <div>
					        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 box_border nopadding">					   
					        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  										{this.state.tripArray && this.state.tripArray.selectedVehicle ?
                      <div>
                      <h5 className="titleprofileTD col-lg-8">Car Details</h5>
  										<ul className="col-lg-12 col-md-5 col-sm-5 col-xs-5 listfontED ">
  											{/*<li><i className="fa fa-car" aria-hidden="true"></i>&nbsp;&nbsp; {this.state.tripArray.selectedVehicle} | {this.state.tripArray.brand} | {this.state.tripArray.model} | {this.state.tripArray.capacity} </li>*/}
                        <li><i className="fa fa-car" aria-hidden="true"></i>&nbsp;&nbsp; {this.state.tripArray.selectedVehicle} </li>
                        {this.state.tripArray.reasonForSelectingVehicle === "" || this.state.tripArray.reasonForSelectingVehicle === undefined ?
                        null
                        :
                        <div>
                        <li><i className="fa fa-comment " aria-hidden="true"></i>&nbsp;&nbsp; {this.state.tripArray.reasonForSelectingVehicle}</li>
                        {(window.location.pathname == '/booking-details') || (window.location.pathname == '/booking') ? null : <p style={{'color':'red'}}>This employee doesn't have access to the selected car category</p>}
                        </div>
                        
                        }

  										</ul>
                      </div>
                      :
                      null
                      } 
									  </div>
					        </div>
	         </div>
	    );
	} 
}
export default withRouter(CarDetails); 
