import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		  from 'react-router-dom';
import swal                   from 'sweetalert';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';
class EmployeeDetails extends Component {
	
	constructor(props) {
      super(props);
    
      this.state = {
      	id : '',
        loadMore: false,
        loadless: false,
        manager:{},
        personInfo:[]
      };
      // this.handleChange = this.handleChange.bind(this);
        this.camelCase = this.camelCase.bind(this);
      this.isLoaded = false
    }
    componentWillReceiveProps(nextProps){
    	this.setState({
  			id : nextProps.personID,
        managerID : nextProps.managerID,
        approvalRequired : nextProps.approvalRequired,
  		},()=>{

        if(this.state.managerID){
        axios.get("/api/personmaster/get/User/"+this.state.managerID)
            .then((response)=>{
              if(response.data && response.data.data[0]){
                var data = {
                  name : response.data.data[0].firstName +' '+response.data.data[0].lastName,
                  contact: response.data.data[0].contactNo,
                  empID: response.data.data[0].employeeId,
                  email: response.data.data[0].email
                }
                this.setState({
                    manager : data,
                    // type : response.data.type
                },()=>{
                  // console.log("personInfo")
                });
              }
            })
            .catch((error)=>{
                              console.log("error",error)

            })
        }

  			axios.get("/api/personmaster/get/one/"+this.state.id)
            .then((response)=>{
              this.setState({
                  personInfo : response.data,
                  // type : response.data.type
              },()=>{
                // console.log("personInfo")
              });
            })
            .catch((error)=>{
                              console.log("error",error)

            })
  		})
    }
	componentDidMount(){
		
		this.setState({
  			id : this.props.personID,
        managerID : this.props.managerID,
        approvalRequired : this.props.approvalRequired,
  		},()=>{
        if(this.state.managerID){
        axios.get("/api/personmaster/get/User/"+this.state.managerID)
            .then((response)=>{
              if(response.data && response.data.data[0]){
                var data = {
                  name : response.data.data[0].firstName +' '+response.data.data[0].lastName,
                  contact: response.data.data[0].contactNo,
                  empID: response.data.data[0].employeeId,
                  email: response.data.data[0].email
                }
                this.setState({
                    manager : data,
                    // type : response.data.type
                },()=>{
                  // console.log("personInfo")
                });
              }
            })
            .catch((error)=>{
                              console.log("error",error)

            })
        }

  			axios.get("/api/personmaster/get/one/"+this.state.id)
            .then((response)=>{
              this.setState({
                  personInfo : response.data,
                  type : response.data.type
              },()=>{
              	
              
              });
            })
            .catch((error)=>{
              console.log("error",error)

            })
  		})
  	}
 
    camelCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
	render() {
       	return (	
       			this.state.personInfo ? 
		        <div>
		            <div className="">
					        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 box_border nopadding">					   
					        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
									
										<h5 className="titleprofileTD col-lg-8">Employee Details</h5>
										
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                      <div className="col-lg-8 col-md-5 col-sm-5 col-xs-5 listfontED nopadding">
  											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding"><span className="col-lg-6 col-md-6 col-sm-6 col-xs-6"><i className="fa fa-hashtag " aria-hidden="true"></i>&nbsp;&nbsp;Employee ID</span> <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6">: {this.state.personInfo.employeeId ? this.state.personInfo.employeeId : 'Guest'}</span></div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding"><span className="col-lg-6 col-md-6 col-sm-6 col-xs-6"><i className="fa fa-user-o " aria-hidden="true"></i>&nbsp;&nbsp;Name</span> <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6">: {this.state.personInfo.firstName} {this.state.personInfo.lastName}</span></div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding"><span className="col-lg-6 col-md-6 col-sm-6 col-xs-6"><i className="fa fa-phone " aria-hidden="true"></i>&nbsp;&nbsp;Mobile</span> <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6">: {this.state.personInfo.contactNo ? this.state.personInfo.contactNo : 'NA'}</span></div>
                      </div>
  										<div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 profileImage nopadding pull-right">
  											<img src={this.state.personInfo.profilePhoto && this.state.personInfo.profilePhoto.length > 0 ? this.state.personInfo.profilePhoto : "/images/userIcon.jpg"}/>
  										</div>
									  </div>
                    {this.state.approvalRequired == 'Yes' ?
                      this.state.managerID ?
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding mgnBottom25">
                        <h6 className="col-lg-12 nopadding"><b>Manager Details</b></h6>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 nopadding">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 nopadding"><i className="fa fa-hashtag " aria-hidden="true"></i>&nbsp;&nbsp;Employee ID</span> <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 nopadding">:{this.state.managerID ? this.state.managerID : 'NA'}</span></div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 nopadding"><i className="fa fa-user-o " aria-hidden="true"></i>&nbsp;&nbsp;Name</span> <span className="col-lg-6 col-md-6 col-sm-6 col-xs-6 nopadding">:{this.state.manager.name}</span></div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 nopadding">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 nopadding"><i className="fa fa-envelope " aria-hidden="true"></i>&nbsp;&nbsp;Email</span> <span className="col-lg-8 col-md-8 col-sm-8 col-xs-8 nopadding">:{this.state.manager.email}</span></div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 nopadding"><i className="fa fa-phone " aria-hidden="true"></i>&nbsp;&nbsp;Mobile</span> <span className="col-lg-8 col-md-8 col-sm-8 col-xs-8 nopadding">:{this.state.manager.contact ? this.state.manager.contact : 'NA'}</span></div>
                        </div>
                      </div>
                      :
                      <div><i className="fa fa-user-o " aria-hidden="true"></i>&nbsp;&nbsp; Manager Details :<span className="pull-right" style={{'color':'red'}}>Manager not registered in the system.</span></div>
                    :
                    null
                    }
                  </div>
					        	
					        </div>
	                  	  </div>
	            </div>
	            : null
	    );
	} 
}
export default withRouter(EmployeeDetails); 
