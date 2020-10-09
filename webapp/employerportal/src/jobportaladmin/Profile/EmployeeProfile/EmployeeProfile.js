import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  		  		from 'react-router-dom';
import swal                   from 'sweetalert';
import _                      from 'underscore';
import IAssureTable           from '../CompanyProfile/IAssureTable.jsx';
import moment 								from 'moment';


import 'bootstrap/js/tab.js';
class EmployeeProfile extends Component {
	
	constructor(props) {
      super(props);
      this.state = {
      	id : '',
        loadMore: false,
        loadless: false,
        personInfo: "",
        percentage:100,
        tableHeadingCompany     : {
	        companyName     	  : "Company Name",
	        officelocation      : "Office Location",
	        department          : "Department",
	        designation         : "Designation",
	        approvingauthority1  : "Approving Authority #1",
	        approvingauthority2  : "Approving Authority #2",
	        approvingauthority3  : "Approving Authority #3",
	    	},
		    tableObjects      			: {
			    deleteMethod    			: 'delete',
			    apiLink         			: '/api/packagemaster/',
			    paginationApply 			: false,
			    searchApply     			: false,
			    editUrl         			: '/package-master'
			  },
      };
  }
	componentDidMount(){
		var employeeID ="";
		var user_id = localStorage.getItem("user_ID");
		var formvalues = { type : "employee", entityType:"corporate"}
		axios.post("/api/personmaster/get/list",formvalues)
		.then((response) => {
			for(let i=0;i<response.data.length>0;i++)
			{
				if(response.data[i].userId == user_id)
				{
					employeeID = response.data[i]._id
					break;
				}
			}
			this.setState({
		      personID: employeeID
		    }, () => {
	    	axios.get("/api/personmaster/get/one/"+this.state.personID)
        .then((response)=>{
          this.setState({
            personInfo : response.data,
            type : response.data.type,
            address : response.data.address,
            contact : response.data.contactPersons
          },()=>{
          console.log("personInfo",this.state.personInfo);
          this.getManagerData(this.state.personInfo.approvingAuthorityId1,this.state.personInfo.approvingAuthorityId2,this.state.personInfo.approvingAuthorityId3);
					this.getRoles(this.state.personInfo.userId)
          });
        })
        .catch((error)=>{
        })
		 	})
		})
  }
 	getRoles(userid){
		axios.get('/api/users/get/' + userid)
    .then((res) => {
      console.log("res",res)
      this.setState({
        roles: res.data.role,
      });
    })
    .catch((err) => {
    })
	}
	editBasicform(event){
  	this.props.history.push("/my-profile/"+event.currentTarget.getAttribute('data-id'))
  }

getManagerData(managerID1,managerID2,managerID3){
	    axios.get("/api/personmaster/get/User/"+managerID1)
	    .then((response) => {
	    	var emp_id = response.data.data[0]._id
	    	axios.get("/api/personmaster/get/one/" + emp_id)
			.then((response) => {
				this.setState({
					manager1ID: response.data.employeeId,
					manager1contactNo: response.data.contactNo,
					manager1Name : response.data.firstName +' '+response.data.lastName,
					manager1dept : response.data.department ? response.data.department[0].department : "",
					manager1desig : response.data.designation ? response.data.designation[0].designation:"",
				});
			})
			.catch((error) => {
				console.log("error /api/personmaster/get/one/ =>",error)
			})
	    })
	    .catch((error) => {
	      console.log('error: ',error)
	    })
	    axios.get("/api/personmaster/get/User/"+managerID2)
	    .then((response) => {
	    	var emp_id = response.data.data[0]._id
	    	axios.get("/api/personmaster/get/one/" + emp_id)
			.then((response) => {
				this.setState({
					manager2ID: response.data.employeeId,
					manager2contactNo: response.data.contactNo,
					manager2Name : response.data.firstName +' '+response.data.lastName,
					manager2dept : response.data.department ? response.data.department[0].department : "",
					manager2desig : response.data.designation ? response.data.designation[0].designation:"",
				});
			})
			.catch((error) => {
				console.log("error /api/personmaster/get/one/ =>",error)
			})
	    })
	    .catch((error) => {
	      console.log('error: ',error)
	    })
	    axios.get("/api/personmaster/get/User/"+managerID3)
	    .then((response) => {
	    	var emp_id = response.data.data[0]._id
	    	axios.get("/api/personmaster/get/one/" + emp_id)
			.then((response) => {
				this.setState({
					managerId3 : response.data._id,
					manager3ID: response.data.employeeId,
					manager3contactNo: response.data.contactNo,
					manager3Name : response.data.firstName +' '+response.data.lastName,
					manager3dept : response.data.department ? response.data.department[0].department : "",
					manager3desig : response.data.designation ? response.data.designation[0].designation:"",
				});
			})
			.catch((error) => {
				console.log("error /api/personmaster/get/one/ =>",error)
			})
	    })
	    .catch((error) => {
	      console.log('error: ',error)
	    })
 	}

 	Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  changeStatus(event){
		event.preventDefault();
		var entityID = localStorage.getItem("company_Id");
		var companyName = localStorage.getItem("companyName");
		var userId = localStorage.getItem("user_ID");

		var formValues={
			userId 	 : userId,
			profileStatus   : "Approved"
		}
		console.log("formValues",formValues);
		axios.patch("/api/personmaster/patch/changeStatusProfile",formValues)
		.then((response) => {
		  this.props.history.push("/dashboard")
		  window.location.reload()
		})
		.catch((error) => {
		  console.log('error: ',error)
		})
	}

	render() {
    return (
     	<div  className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
				{
					this.state.personInfo ?
		    		<div className=" pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleClientDetails" data-child={this.state.personInfo._id} id={this.state.personInfo._id}>
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding borderAllED">
						    	<div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blueBack ">
						    		<div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 ">
							    		<div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 companyLogoImage noPadding">
												<img src={this.state.personInfo.profilePhoto ? this.state.personInfo.profilePhoto:"/images/noImagePreview.png"} className=""></img>
							    		</div>
						    		</div>
						    		<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 noPadding pull-right marginTop12 textAlignCenter colorWhite">Login Credential Created  {this.state.personInfo.userId !=""? <i class="fa fa-check-circle" aria-hidden="true"></i> : <i class="fa fa-times-circle-o " aria-hidden="true"></i>}</div>
							    </div>
							    <div className="col-lg-10 col-lg-offset-2 col-md-10 col-sm-10 col-xs-10 ">
						    		<div className="col-lg-12 col-md-4 col-sm-4 col-xs-4 empHeadview">
						    			<label><a target="_blank" title="view profile" href={"/employee-profile/"+this.state.personInfo._id}>{this.state.personInfo.firstName + " "+(this.state.personInfo.middleName?this.state.personInfo.middleName:"") +" "+ this.state.personInfo.lastName }</a></label>&nbsp;&nbsp;<span> {(this.state.personInfo.employeeId ? " (Emp ID : " + this.state.personInfo.employeeId +") ":"")}</span>
						    		</div>
							    	<div className="col-lg-1 col-md-2 col-sm-2 col-xs-2 editOptionView pull-right noPadding">
							    		<div id={this.state.personInfo._id} className=" col-lg-6 noPadding"  title="Edit" data-index data-id={this.state.personInfo._id} onClick={this.editBasicform.bind(this)}>	
										    <i className="fa fa-pencil "  aria-hidden="true" ></i>
										  </div>{/*
										  <div id={this.state.personInfo._id} className="col-lg-6 noPadding"  title="delete" data-index data-id={this.state.personInfo._id} onClick={this.deleteEntity.bind(this)}>	
										    <i className="fa fa-trash "  aria-hidden="true" ></i>
										  </div>*/}
							    	</div>
						    		<div className="col-lg-12 col-md-6 col-sm-6 col-xs-6 ">
						    			<ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding listLI">
												<li>{this.state.personInfo.designation && this.state.personInfo.designation.length>0 ? this.state.personInfo.designation[0].designation : "- NA -"}</li>
												<li><b><a target="_blank" title="view profile" href={"/company-profile/"+this.state.personInfo.company_Id}>{this.state.personInfo.companyName +" (Company ID : "+this.state.personInfo.companyID+") "}</a></b></li>
											</ul>
						    		</div>
							    </div>				   
							  </div>
							  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderAllED padding20">
							  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
								  	<ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
											<li><i className="fa fa-briefcase changeColor " aria-hidden="true"></i>&nbsp;&nbsp;<b>Role</b></li>
											
											<li className="marginLeft5">
											{
												this.state.roles && this.state.roles.length>0?
												this.state.roles.map((role,index)=>{
													return(
															<span> {this.Capitalize(role)}&nbsp;</span>
														)
												})
												:
												null
											}
											</li>
										</ul>
										<ul className="col-lg-6 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
											<li><i className="fa fa-map-marker changeColor " aria-hidden="true"></i>&nbsp;&nbsp;<b>Work Location</b></li>
											<li className="marginLeft5">{this.state.personInfo.workLocation}</li>
										</ul>
										<ul className="col-lg-2 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
											<li><i className="fa fa-calendar changeColor " aria-hidden="true"></i>&nbsp;&nbsp;<b>DOB</b></li>
											<li className="marginLeft5">{this.state.personInfo.DOB ? moment(this.state.personInfo.DOB).format('DD-MM-YYYY') : "- NA -"}</li>
										</ul>
									</div>
									<ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
										<li><i className="fa fa-mortar-board changeColor " aria-hidden="true"></i>&nbsp;&nbsp;<b>Category</b></li>
										<li className="marginLeft5">&nbsp;&nbsp;{this.state.personInfo.empCategory ? this.state.personInfo.empCategory : "- NA -"}</li>
									</ul>
									<ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
										<li><i className="fa fa-star-half-empty changeColor " aria-hidden="true"></i>&nbsp;&nbsp;<b>Priority</b></li>
										<li className="marginLeft5">{this.state.personInfo.empPriority ? (this.state.personInfo.empPriority == "1" ? "★" : this.state.personInfo.empPriority == "2" ? "★ ★" : "★ ★ ★" ): "- NA -"}</li>
									</ul>
							  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding seperaterBorder">
							  	</div>
							  	<ul className="col-lg-8 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
										<li><i className="fa fa-envelope changeColor " aria-hidden="true"></i>&nbsp;&nbsp;{this.state.personInfo.email}</li>
										<i className="fa fa-map-marker textAlignLeft noPadding changeColor col-lg-1 width18px" aria-hidden="true"></i><li className="col-lg-10 noPadding">{this.state.personInfo.address && this.state.personInfo.address.length > 0 ? ((this.state.personInfo.address[0].addressLine2 ? this.state.personInfo.address[0].addressLine2 +" , " : "")+ this.state.personInfo.address[0].addressLine1 +" , "+ this.state.personInfo.address[0].pincode) : " -Address not entered- " }</li>
									</ul>
									<ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 listLI">
										<li><i className="fa fa-mobile changeColor " aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;{this.state.personInfo.contactNo}</li>
										{this.state.personInfo.altContactNo ? <li><i className="fa fa-mobile changeColor " aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;{this.state.personInfo.altContactNo}</li>:""}
										{this.state.personInfo.whatsappNo ? <li><i className="fa fa-whatsapp changeColor " aria-hidden="true"></i>&nbsp;&nbsp;{this.state.personInfo.whatsappNo}</li>:""}
									</ul>
							 	</div>
							 	{this.state.type !== "driver" ?
								  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderAllED padding20">
								  	<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 fz18 noPadding" >Booking Approval Details</label>
								  	<ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
											<li><b>Approving Authority ID 1</b></li>
											<li> Employee ID : {this.state.personInfo.approvingAuthorityId1}</li>
											<li> Name : {this.state.manager1Name?this.state.manager1Name :" -NA- "}</li>
											<li> Mobile : {this.state.manager1contactNo ? this.state.manager1contactNo : " -NA- "}</li>
											<li> Department : {this.state.manager1dept ? this.state.manager1dept : " -NA- "}</li>
											<li> Designation : {this.state.manager1desig ? this.state.manager1desig : " -NA- "}</li>
										</ul>
										<ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
											<li><b>Approving Authority ID 2</b></li>
											<li> Employee ID : {this.state.personInfo.approvingAuthorityId2}</li>
											<li> Name : {this.state.manager2Name?this.state.manager2Name:" -NA- "}</li>
											<li> Mobile : {this.state.manager2contactNo ? this.state.manager2contactNo : " -NA- "}</li>
											<li> Department : {this.state.manager2dept ? this.state.manager2dept : " -NA- "}</li>
											<li> Designation : {this.state.manager2desig ? this.state.manager2desig : " -NA- "}</li>

										</ul>
										<ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
											<li><b>Approving Authority ID 3</b></li>
											<li> Employee ID : {this.state.personInfo.approvingAuthorityId3}</li>
											<li> Name : {this.state.manager3Name?this.state.manager3Name:" -NA- "}</li>
											<li> Mobile : {this.state.manager3contactNo ? this.state.manager3contactNo : " -NA- "}</li>
											<li> Department : {this.state.manager3dept ? this.state.manager3dept : " -NA- "}</li>
											<li> Designation : {this.state.manager3desig ? this.state.manager3desig : " -NA- "}</li>

										</ul>
								  	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding seperaterBorder">
								  	</div>
								  	{this.state.personInfo.bookingApprovalRequired == "Yes" ?

								  	<div>
									  	<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 fz18 noPadding" >Pre-Approved Limits</label>
									  	<ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
											<li><b>Amount</b></li>
											<li>₹ {this.state.personInfo.preApprovedAmount}</li>
										</ul>
										<ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
											<li><b>Kilometer</b></li>
											<li>{this.state.personInfo.preApprovedKilometer} Km</li>
										</ul>
										<ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
											<li><b>Rides</b></li>
											<li>{this.state.personInfo.preApprovedRides}</li>
										</ul>
								  	</div>
								  :
								  null
									}
								  </div>
								  :null
								}
							</div>
							{
								this.props.type !== "guest" && this.state.Documentarray && this.state.Documentarray.length > 0 &&
								<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 locationMainContainer addMarginTopPM">
									<div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 mapIconMargin">
										<i className="fa fa-map-marker addressIcon" aria-hidden="true"></i>
									</div>
									<div className="col-lg-6 col-md-1 col-sm-12 col-xs-12">
										<h5 className="locationHeading">Document List</h5>
									</div>
									{
										this.state.Documentarray.map((docdata, index) => {
											return (
												<div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 noRightPadding" key={index}>
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ heigth: '100px' }}>
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 locationAddress">
															<ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																<li title="document"><b>{docdata.documentName}</b>: {docdata.documentNumber}</li>
																<li title="document"><b>Document Valid From : </b>{moment(docdata.documentValidFrom).format("DD-MMM-YY")}</li>
																<li title="document"><b>Document Valid To :</b> {moment(docdata.documentValidTo).format("DD-MMM-YY")}</li>
																
															</ul>
														</div>
													</div>
													<br />
												</div>
											);
										})
									}
								</div>
							}
					 {
	                  this.state.personInfo.profileStatus && this.state.personInfo.profileStatus == "New" ?
	                  <div className="marginTop15 col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
	                    <button  className=" col-lg-2 pull-right btn btn-success"onClick={this.changeStatus.bind(this)}>  
	                      <span className="">Accept Profile</span>
	                    </button>
	                  </div>
	                  :
	                  null
                  	}
					</div>
						
					: 
					( this.state.personInfo == null ?
					
					<div className=" pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter  fz18">
						<label className="marginTop12">No Data Found</label>
					</div>
					:
					<div className=" pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter fz18 marginTop12">
						<img src="/images/loading.gif"/>
					</div>
					)
				}
			</div>
	  );
	} 
}
export default withRouter(EmployeeProfile); 
