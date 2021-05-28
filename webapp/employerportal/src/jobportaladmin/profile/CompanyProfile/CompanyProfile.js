import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}  					from 'react-router-dom';
import Swal                   from 'sweetalert2';
import _                      from 'underscore';
import IAssureTable           from './IAssureTable.jsx';
import ReactToPdf             from 'react-to-pdf';
import { connect }              from 'react-redux';
import { bindActionCreators }   from 'redux';
import  * as mapActionCreator   from '../../common/actions/index';

import 'bootstrap/js/tab.js';
import './CompanyProfile.css';

class CompanyProfile extends Component {
	
	constructor(props) {
      super(props);
    
      this.state = {
      	id : '',
      	//entityInfo : {},
      	entityInfo:false,
        loadMoreLoc: false,
        loadMoreContacts: false,
        tableHeading      : {
	        locationType     		: "Location Type",
	        addressLine1        : "Address",
	        GSTIN           		: "GSTIN",
	        PAN           			: "PAN",
	        Document      			: "Documents",
		    },
		    tableHeadingContact     : {
		        contactDetail     	: "Name Emp ID",
		        officelocation      : "Company Branch",
		        department          : "Department Designation",
		        email          			: "Email",
		        phone          			: "Phone",
		        role          			: "Role",
		        approvingauthority1  : "Approving Authority #1",
		        approvingauthority2  : "Approving Authority #2",
		        approvingauthority3  : "Approving Authority #3",
		        preApprovedAmount  	 : "preApproved Limits",
		    },
		    tableObjects      			: {
			    deleteMethod    			: 'delete',
			    apiLink         			: '/api/packagemaster/',
			    paginationApply 			: false,
			    searchApply     			: false,
			    editUrl         			: '/package-master'
			  },
      };
      this.isLoaded = false
    }
    componentWillReceiveProps(nextProps){
    	this.setState({
  			id : nextProps.id
  		},()=>{

  			axios.get("/api/entitymaster/get/one/"+this.state.id)
            .then((response)=>{
          	
              this.setState({
                  entityInfo : response.data,
                  entityType : response.data.entityType
              },()=>{
              	
              	
              });
            })
            .catch((error)=>{
            })
  		})
    }
	componentDidMount(){
    console.log("In componentDidMount..........");
/*		var userId =  localStorage.getItem("user_ID");

*/   
   var userId= this.props.userDetails.user_id;
 console.log("userId",userId);
		var company_Id = "";

		
		axios.get("/api/entitymaster/get/corporate")

			.then((response) => {
				this.setState({
					entityList   : response.data
				},()=>{
					console.log("entityList",this.state.entityList);
					for(var i=0; i<this.state.entityList.length; i++)
					{
						for(var j=0;j<this.state.entityList[i].contactPersons.length;j++)
						{

							if(this.state.entityList[i].contactPersons[j].userID == userId )
							{
								company_Id = this.state.entityList[i]._id
								break;
							}
						}
					}
					console.log("company_Id",company_Id);
					axios.get("/api/entitymaster/get/one/"+company_Id)
						.then((response) => {
							this.setState({
								corporateInfo   : response.data[0],
								locations 		: response.data[0].locations,
								contacts 			: response.data[0].contactData,
							},()=>{
								console.log("corporateInfo",this.state.corporateInfo);

								//this.getManagerData()
							})

						})
						.catch((error) => {
						})
				})

			})
			.catch((error) => {
			})
  	}
  	
  	 
	getContactsTable(){
    if(this.state.corporateInfo ){
			var contacts = this.state.corporateInfo.contactData;
			if(contacts){
			 var tableData = contacts.map((a, i)=>{
			 	
			 
	          return {
	            _id             	: a._id,
	            contactDetail     : "Name : "+"<a  title='View profile' target='_blank' href='/employee-profile/"+(a.personID)+"'>"+a.firstName + " " + a.lastName+"</a>"+ "</br> Emp Id : "+a.employeeID+"",
	            officelocation    : a.branchName ? a.branchName : " - " ,
	            department      	: a.departmentName ? a.departmentName +" "+a.designationName:" - ",
	            email     				: a.email ? a.email :" - ",
	            phone     				: a.phone ? a.phone :" - ",
	            role     					: a.role ? a.role :" - ",
	            approvingauthority1: a.bookingApprovalRequired == "Yes" ? "EmpID : " + (a.manager1Details ? a.manager1Details.employeeId:" -NA-") +" <br/> Name : "+(a.manager1Details ? a.manager1Details.firstName + " " + a.manager1Details.lastName:"-NA-") + " <br/>Phone No. "+(a.manager1Details ? a.manager1Details.contactNo:" -NA- "): "- NA -",
	            approvingauthority2: a.bookingApprovalRequired == "Yes" ? "EmpID : " + (a.manager2Details ? a.manager2Details.employeeId:" -NA-") +" <br/> Name : "+(a.manager2Details ? a.manager2Details.firstName + " " + a.manager2Details.lastName:"-NA-") + " <br/>Phone No. "+(a.manager2Details ? a.manager2Details.contactNo:" -NA- "): "- NA -",
	            approvingauthority3: a.bookingApprovalRequired == "Yes" ? "EmpID : " + (a.manager3Details ? a.manager3Details.employeeId:" -NA-") +" <br/> Name : "+(a.manager3Details ? a.manager3Details.firstName + " " + a.manager3Details.lastName:"-NA-") + " <br/>Phone No. "+(a.manager3Details ? a.manager3Details.contactNo:" -NA- "): "- NA -",
	            preApprovedAmount: a.bookingApprovalRequired == "Yes" ? "Amount : "+(a.preApprovedAmount  ? a.preApprovedAmount : " -NA- " )+ " <br/>Kilometer :  " +(a.preApprovedKilometer ? a.preApprovedKilometer:" -NA- ") + "<br/> Rides : " +(a.preApprovedRides? a.preApprovedRides:" -NA- ") :" - ",
	          
	           }
	        })
	        this.setState({
	          tableDataContact: tableData
	        })
	        console.log(this.state.tableDataContact,tableData)
			}
		}
	}

  getLocationsTable() {
    if(this.state.corporateInfo){
			var location = this.state.corporateInfo.locations;
			if(location){
			 var tableData = location.map((a, i)=>{
            var stateVar = a.state;
            var stateCode = a.stateCode;
            console.log('this.state.corporateInfo==>',this.state.corporateInfo)
            if(this.state.corporateInfo && this.state.corporateInfo.statutoryDetails && this.state.corporateInfo.statutoryDetails.length > 0){
                var statutoryInfo = this.state.corporateInfo.statutoryDetails.filter((elem)=>{return elem.state===stateVar || elem.stateCode === stateCode});
                console.log('statutoryInfo==*****===>',statutoryInfo)
                if(statutoryInfo && statutoryInfo.length > 0){
                    var PAN = statutoryInfo[0].PAN;
                    var GSTIN = statutoryInfo[0].GSTIN;
                    var GSTDocument = statutoryInfo[0].GSTDocument;
                    var PANDocument = statutoryInfo[0].PANDocument;
                }else{
                  var PAN = "";
                  var GSTIN = "";
                  var GSTDocument = [];
                  var PANDocument = [];
                }
            }else{
              var PAN = "";
              var GSTIN = "";
              var GSTDocument = [];
              var PANDocument = [];
            } 
	          return {
	            _id             	: a._id,
	            locationType     	: a.locationType,
	            addressLine1      : a.addressLine2+ " " + a.addressLine1 ,
	            GSTIN      				: GSTIN ? GSTIN :" - ",
	            PAN     					: PAN ? PAN :" - ",
	            Document          : GSTDocument.length>0 || PANDocument.length>0 ? GSTDocument.map((image,i)=>{return '<img src='+image+' class=" imgtabCP logoStyle" /> &nbsp;&nbsp;&nbsp;&nbsp;'}) + "" +PANDocument.map((image,i)=>{return '<img src='+image+' class=" imgtabCP logoStyle" />'}) :" No Image Found ",
	            //PANDocument     	: a.PANDocument.length>0 ? a.PANDocument.map((image,i)=>{return '<img src='+image+' class="img-responsive imgtabCP logoStyle" />'}) :" No Image Found ",
	          }
	        })
	        this.setState({
	          tableData: tableData
	        })
	        console.log(this.state.tableData)
			}
		}
	}

 getManagerData(managerID1,managerID2,managerID3){
      axios.get("/api/personmaster/get/User/"+managerID1)
        .then((response) => {
            this.setState({
                managerId1 : response.data.data[0]._id,
                manager1ID: response.data.data[0].employeeId,
                manager1Name : response.data.data[0].firstName +' '+response.data.data[0].lastName,
                approver1exist:'Yes'
            })            
        })
        .catch((error) => {
          console.log('error: ',error)
        })
        // axios.get("/api/personmaster/get/UserID/"+managerID2+"/"+this.state.corporateId)
        axios.get("/api/personmaster/get/User/"+managerID2)
        .then((response) => {
            this.setState({
              approver2exist : 'Yes',
              managerId2 : response.data.data[0]._id,
              manager2ID : response.data.data[0].employeeId,
              manager2Name : response.data.data[0].firstName +' '+response.data.data[0].lastName,
            })            
        })
        .catch((error) => {
          console.log('error: ',error)
        })
        // axios.get("/api/personmaster/get/UserID/"+managerID3+"/"+this.state.corporateId)
        axios.get("/api/personmaster/get/User/"+managerID3)
        .then((response) => {
            this.setState({
              approver3exist : 'Yes',
              managerId3 : response.data.data[0]._id,
              manager3ID : response.data.data[0].employeeId,
              manager3Name : response.data.data[0].firstName +' '+response.data.data[0].lastName,
            })            
        })
        .catch((error) => {
          console.log('error: ',error)
        })
 }
  editBasicform(event){
  	this.props.history.push("/"+this.state.corporateInfo.entityType+'/basic-details/'+event.currentTarget.getAttribute('data-id'))
  }
  editBasicformLocation(event){
    this.props.history.push("/"+this.state.corporateInfo.entityType+'/location-details/'+this.state.corporateInfo._id+"/"+event.currentTarget.getAttribute('data-id'))
  }
  editBasicformContact(event){
    this.props.history.push("/"+this.state.corporateInfo.entityType+'/contact-details/'+this.state.corporateInfo._id+"/"+event.currentTarget.getAttribute('data-id'))
  }
 
	changeStatus(event){
		event.preventDefault();
		var entityID = localStorage.getItem("company_Id");
		var companyName = localStorage.getItem("companyName");
		var userId = localStorage.getItem("user_ID");
    const email = localStorage.getItem("emailId");

		var formValues={
			entityID : entityID,
			status   : "Accepted by corporateadmin"
		}
		console.log("formValues",formValues);
		axios.patch("/api/entitymaster/patch/profileStatus",formValues)
    .then((response)=>{
  	
      this.setState({
          entityInfo : response.data,
      },()=>{

      	console.log("entityInfo",this.state.entityInfo);
      	var sendData = {
          "event": "Event3", //Event Name
          "toUser_id": userId, //To user_id(ref:users)
          "toUserRole":"corporateadmin",
          "company_id": entityID, //company_id(ref:entitymaster)
          // "otherAdminRole":'admin',
          "variables": {
          'CompanyName': companyName,
          'email': email
        	}
	      }
	      console.log("sendData",sendData);
	      axios.post('/api/masternotifications/post/sendNotification', sendData)
	        .then((res) => {
	          console.log("res",res);
	        })
        .catch((error) => { console.log('notification error: ', error) })
      	swal("Profile Approved");
      	 axios.get("/api/contract/get/one/entity/" + entityID)
          .then((response) => {
            console.log("response",response)
            if(response.data.length>0)
            {
              console.log("response",response.data);
              var contractDetails = response.data[0];
              this.setState({
                  contractDetails: contractDetails
              },()=>{
                if(this.state.contractDetails.status !== "Approved"){
                    this.props.history.push("/contract-view")
                    window.location.reload()


                }else{
                  this.props.history.push("/dashboard")
                  window.location.reload()

                
                }
              })
            }else{
               this.props.history.push("/no-contract")
                    window.location.reload()
            }
          })
          .catch((error) => {
          })

		});

	  })
    .catch((error)=>{
    	console.log("error",error);
    })
  }
   deleteEntity(event) {
    event.preventDefault();
    this.setState({ deleteID: event.currentTarget.getAttribute('data-id'),deleteName: event.currentTarget.getAttribute('data-name') })
    $('#deleteEntityModal').show();
  }
  closeModal(event) {
    event.preventDefault();
    $('#deleteEntityModal').hide();
  }
  confirmDelete(event) {
    event.preventDefault();
    var url="";

    if(this.state.deleteName == "contacts"){
      var formValues = {
				entityID: this.state.corporateInfo._id,
				contactID: this.state.deleteID
			}
			url = '/api/entitymaster/deleteContact/' + formValues.entityID + '/' + formValues.contactID;
    }else{
    	var formValues = {
				entityID: this.state.corporateInfo._id,
				location_ID: this.state.deleteID
			}
			url = '/api/entitymaster/deleteLocation/' + formValues.entityID + '/' + formValues.location_ID;

    }
    console.log("url",url)
    axios.delete(url)
    .then((response) => {
      if (response.data.deleted) {
      	$('#deleteEntityModal').hide();
          swal({
              text: "Data deleted successfully.",
          });
        	this.getCompanyData(this.state.entityID)

      } else {
          swal({
              text: "Failed to delete.",
          });
      }
      this.getContracts();
      $('#deleteEntityModal').hide();
    })
    .catch((error) => {
    })
  }
	
  download(event) {
  event.preventDefault();
      $('#headerid').hide();
      $('#editPen').hide();
      $('#statusDiv').hide();
      $('#btnDiv').hide();


      $('#sidebar').toggleClass('active');
      $('#headerid').toggleClass('headereffect');
      $('#dashbordid').toggleClass('dashboardeffect')
      $('#sidebar').hide();
      $('#widgets').hide();
      $('#printButton').hide();
      $('.button2').hide();
      $('.main-footer').hide();
      $(".box-header").hide();
      $(".actions").hide();

      // document.getElementById("viewcontract").scale(2, 2);

      window.print();

      $('#headerid').show();
      $('#sidebar').toggleClass('active')
      $('#headerid').toggleClass('headereffect');
      $('#dashbordid').toggleClass('dashboardeffect')
      $('#sidebar').show();
      $('#widgets').show();
      $('#printButton').show();
      $('.button2').show();
      $('#editPen').show();
      $('#statusDiv').show();
      $('.main-footer').show();
      $(".box-header").show();
      $(".actions").show();

    }
	render() {
		const ref = React.createRef();

       	return (	
		       	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">	
		    {
        	this.state.corporateInfo 
        	?
    				<div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
					    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 boxshadeOP" id="pdfWrap" iref={ref}> 	
					    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding borderAll">
						    	<div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blueBack" style={{ backgroundImage: "url(/images/orgbackground.jpg)" }}>
                  {/*  <img src="/images/orgbackground.jpg" alt="background" className="blueBack" />*/}
						    		<div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 ">
							    		<div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 companyLogoImage noPadding">
											<img src={this.state.corporateInfo.companyLogo && this.state.corporateInfo.companyLogo.length > 0?this.state.corporateInfo.companyLogo[0]:"/images/noImagePreview.png"} className=""></img>
							    		</div> 
						    		</div>
						    		<div id="statusDiv" className="col-lg-1 col-md-4 col-sm-4 col-xs-4 noPadding pull-right marginTop12 textAlignCenter">{this.state.corporateInfo.profileStatus == "New"?<span className="newProfile" title="New Company Profile">New </span>:<span className="approvedProfile" title="Company Profile Approved">Approved </span>}</div>
						    	</div>
						    	<div className="col-lg-10 col-lg-offset-2 col-md-10 col-sm-10 col-sm-offset-4 col-xs-10 ">
						    		<div className="col-lg-10 col-md-4 col-sm-4 col-xs-4 orgHead noPadding">
						    			<label>{this.state.corporateInfo.companyName}</label>&nbsp;&nbsp;<span className="changeColor">( Company ID: <b>{this.state.corporateInfo.companyID}</b> )</span>
						    		</div>
						    		<div className="col-lg-1 col-md-2 col-sm-2 col-xs-2 editOption pull-right textAlignCenter changeColor noPadding">
							    		<div id={this.state.corporateInfo._id} className="customBtnCP col-lg-2 col-lg-offset-2"  title="Edit profile" data-index data-id={this.state.corporateInfo._id} onClick={this.editBasicform.bind(this)}>	
										    	<i className="fa fa-pencil " id="editPen" aria-hidden="true" ></i>
										  </div>
									    <div className="customBtnCP col-lg-2" title="Download as PDF">
	                        <i id="printButton" onClick={this.download.bind(this)} className="fa fa-download"></i>
	                    </div>
						    		</div>
						    		<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 noPadding">
						    			<ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding listLI changeColor">
												<li><i className="fa fa-envelope changeColor " aria-hidden="true"></i>&nbsp;&nbsp;{this.state.corporateInfo.companyEmail}</li>
												<li><i className="fa fa-phone changeColor" aria-hidden="true"></i>&nbsp;&nbsp;{this.state.corporateInfo.companyPhone}</li>
												<li><i className="fa fa-globe changeColor " aria-hidden="true"></i>&nbsp;&nbsp;{this.state.corporateInfo.website ? this.state.corporateInfo.website :" -NA- "}</li>
											</ul>
						    		</div>
						    	{/*	<div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 noPadding">
						    			<ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left listLI">
												<li>CIN&nbsp; : <b>{this.state.corporateInfo.CIN? this.state.corporateInfo.CIN :" -NA- "}</b>{this.state.corporateInfo.COI && this.state.corporateInfo.COI.length > 0 ? <a target="_blank" className="col-lg-2 col-sm-2 pull-right"><img src={this.state.corporateInfo.COI[0]}  className="coiImage "></img></a>:""}</li>
												{<li>CIN&nbsp; : <b>{this.state.corporateInfo.CIN? this.state.corporateInfo.CIN :" -NA- "}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.corporateInfo.COI && this.state.corporateInfo.COI.length > 0 ? <a target="_blank" className="col-lg-1 col-sm-2 pull-right" title="Click to view COI document" href={this.state.corporateInfo.COI[0]}><img src={this.state.corporateInfo.COI[0]}  className="coiImage "></img></a>:""}</li>}
												<li>&nbsp;</li>
												<li>TAN&nbsp; : <b>{this.state.corporateInfo.TAN ? this.state.corporateInfo.TAN : " -NA- "}</b></li>
											</ul>
						    		</div>		*/}		   
						    	</div>				   
						    </div>				   
			        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 singleClientDetails noPadding" data-child={this.state.corporateInfo._id} id={this.state.corporateInfo._id}>
									<div className="col-lg-1 col-lg-offset-11 noPadding">
						    	</div>
								</div>
			        	{
			        	this.state.locations && this.state.locations.length>0 &&
			        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
				        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 OrgListTitle noPadding">
										<label>Company Locations</label>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding" id="style-2">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cardDivCP paddingOfInner">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
													<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 cardColumnCP">
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
															LOCATION TYPE
														</div>                                                           
													</div>
													<div className="col-lg-8 col-md-3 col-sm-3 col-xs-3 cardColumnCP"> 
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
															ADDRESS
														</div>                                                           
													</div>
													{/*<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 cardColumnCP"> 
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
														
														</div>                                                           
													</div>
													<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 cardColumnCP">  
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
														
														</div>                                                           
													</div>*/}
													<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 nopadding textAlignCenter actions">  
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
															ACTIONS
														</div>                                                           
													</div>
												</div>
											</div>
										<div className="">
											{
												this.state.locations.map((data, index) => {
                            var stateVar = data.state;
                            var stateCode = data.stateCode;
                            if(this.state.corporateInfo && this.state.corporateInfo.statutoryDetails && this.state.corporateInfo.statutoryDetails.length > 0){
                                var statutoryInfo = this.state.corporateInfo.statutoryDetails.filter((elem)=>{return elem.state===stateVar || elem.stateCode === stateCode});
                                if(statutoryInfo && statutoryInfo.length > 0){
                                    var PAN = statutoryInfo[0].PAN;
                                    var GSTIN = statutoryInfo[0].GSTIN;
                                    var GSTDocument = statutoryInfo[0].GSTDocument;
                                    var PANDocument = statutoryInfo[0].PANDocument;
                                }else{
                                  var PAN = "";
                                  var GSTIN = "";
                                  var GSTDocument = [];
                                  var PANDocument = [];
                                }
                            }
													return (
                            
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cardDivDataCP" key={index} name={index} data-child={data._id + '-' + index} id={data._id}>
															<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
																<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 cardColumnCP">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP changeColor"><b>{data.locationType}</b></div>																	                                                        
																</div>
																<div className="col-lg-8 col-md-3 col-sm-3 col-xs-3 cardColumnCP"> 
																	<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP changeColor">#{(data.addressLine2 ? data.addressLine2 +"," :"") + data.addressLine1 +" "+(data.pincode ? ","+data.pincode : "" )}</div>                                                          
																</div>
																{/*<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 cardColumnCP">
																	{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP">{GSTIN ? GSTIN : "-"}</div>                                                           
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP">{GSTDocument && GSTDocument.length > 0 ? GSTDocument.map((data,index)=>{
																		return(
																			<img src={data} className="gstnDocCP"/>
																			)
																		})
																	:
																	null
																	}
																	</div> */}                                                          
															{/*	</div>
																<div className="col-lg-2 col-md-3 col-sm-3 col-xs-3 cardColumnCP"> */}
																                                                           
																	{/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP">{PAN ?PAN:"-"}</div>                                                          
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP">{PANDocument && PANDocument.length > 0 ? PANDocument.map((data,index)=>{
																		return(
																			<img src={data} className="gstnDocCP"/>
																			)
																		})
																	:
																	null
																	}
																	</div>  
																</div>
															*/}
																<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 nopadding actions">  
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardActionsCP">
																		<a><i className="fa fa-pencil edit" aria-hidden="true" title="Click to Edit" id={data._id} data-id={data._id} onClick={this.editBasicformLocation.bind(this)}></i></a> 
																		<a><i  className="fa fa-trash-o delete" aria-hidden="true" title="Click to Delete" data-name="location" data-id={data._id} onClick={this.deleteEntity.bind(this)}></i></a>
																	</div>                                                         
																</div>
	                                                            
															</div>
														</div>
													);
												})
											}
										</div>
										<div className="modal" id="deleteEntityModal" role="dialog">
					                        <div className="adminModal adminModal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12">
					                            <div className="modal-content adminModal-content col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
					                                <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
					                                    <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
					                                        <button type="button" className="adminCloseButton" data-dismiss="modal" onClick={this.closeModal.bind(this)}>&times;</button>
					                                    </div>
					                                </div>
					                                <div className="modal-body adminModal-body col-lg-12 col-md-12 col-sm-12 col-xs-12">
					                                    <h4 className="blackLightFont textAlignCenter examDeleteFont col-lg-12 col-md-12 col-sm-12 col-xs-12">Are you sure, do you want to delete?</h4>
					                                </div>
					                                <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
					                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					                                        <button type="button" className="btn adminCancel-btn col-lg-7 col-lg-offset-1 col-md-4 col-md-offset-1 col-sm-8 col-sm-offset-1 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.closeModal.bind(this)}>CANCEL</button>
					                                    </div>
					                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					                                        <button type="button" className="btn examDelete-btn col-lg-7 col-lg-offset-5 col-md-7 col-md-offset-5 col-sm-8 col-sm-offset-3 col-xs-10 col-xs-offset-1" data-dismiss="modal" onClick={this.confirmDelete.bind(this)} >DELETE</button>
					                                    </div>
					                                </div>
					                            </div>
					                        </div>
					                    </div>
									</div>
			        	</div>
			        	}
			        	{
				        	this.state.contacts && this.state.contacts.length>0 &&
				        	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
				        		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 OrgListTitle noPadding">
											<label>Contact Person Details</label>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cardDivCP paddingOfInner">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
												<div className="col-lg-3 col-md-2 col-sm-2 col-xs-2 cardColumnCP">
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
														NAME <br/>EMP ID
													</div>                                                           
												</div>
												{/*<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 cardColumnCP"> 
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
														DEPARTMENT <br/>DESIGNATION
													</div>                                                           
												</div>*/}
												<div className="col-lg-2col-md-2 col-sm-2 col-xs-2 cardColumnCP"> 
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
														COMPANY BRANCH
													</div>                                                           
												</div>
												<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 cardColumnCP">  
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
														EMAIL
													</div>                                                           
												</div>
												<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 cardColumnCP">  
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
														PHONE
													</div>                                                           
												</div>
												<div className="col-lg-1 col-md-2 col-sm-2 col-xs-2 cardColumnCP">  
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
														ROLE
													</div>                                                           
												</div>
												<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 nopadding textAlignCenter actions">  
													<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardHeadingCP">
														ACTIONS
													</div>                                                           
												</div>
                                                      
											</div>
											</div>
				        			<div className="">
											{
												this.state.contacts.map((data, index) => {

													return (
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cardDivDataCP changeColor" key={index} name={index} data-child={data._id + '-' + index} id={data._id}>
															<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
																<div className="col-lg-3 col-md-2 col-sm-2 col-xs-2 cardColumnCP">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  nopadding onhoverBlue cardDataCP changeColor"><a className="changeColor" href={"/employee-profile/"+data._id} target="_blank" title="View profile"> {data.firstName +" "+ data.lastName}</a></div>																	                                                        
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP">{(data.employeeID ? data.employeeID  :"") }</div>                                                          
																</div>
																{/*<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 cardColumnCP"> 
																	<div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP changeColor">{(data.departmentName ? data.departmentName  :"-") +" "+(data.designationName ? ", "+data.designationName : "-" )}</div>                                                          
																</div>*/}
																<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 cardColumnCP">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP changeColor">{data.branchName}</div>                                                           
																</div>
																<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 cardColumnCP"> 
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP changeColor">{data.email}</div>                                                          
																</div>
																<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 cardColumnCP"> 
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP changeColor">{data.phone}</div>                                                          
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP changeColor">{data.whatsappNo ? data.whatsappNo :""}</div>                                                          
																</div>
																<div className="col-lg-1 col-md-2 col-sm-2 col-xs-2 cardColumnCP"> 
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardDataCP changeColor">{data.role}</div>                                                          
																</div>
														
																<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 nopadding actions">  
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding cardActionsCP">
																		<a><i className="fa fa-pencil edit" aria-hidden="true" title="Click to Edit" id={data._id} data-id={data._id} onClick={this.editBasicformContact.bind(this)}></i></a> 
																		<a><i  className="fa fa-trash-o delete" aria-hidden="true" title="Click to Delete" data-name="contacts" data-id={data._id} onClick={this.deleteEntity.bind(this)}></i></a>
																	</div>                                                         
																</div>
	                                                            
															</div>
														</div>
													);
												})
											}
										</div>
				        	</div>
			          }						        
		          </div>
               {
                  this.state.corporateInfo.profileStatus == "New" ?
                  <div className="marginTop15 col-lg-12 col-md-12 col-sm-12 col-xs-12 noPadding">
                    <button  className=" col-lg-2 pull-right btn buttonAcceptProfile"onClick={this.changeStatus.bind(this)}>  
                      <span className="">Accept Profile</span>
                    </button>
                  </div>
                  :
                  null
                  }
	          </div>
	        :
            <div className="loadingImg">
            	<img src="/images/loading.gif"/>
            </div>
	      }
			</div>
	            
	    );
	} 
}

const mapStateToProps = (state)=>{
    return {
        selectedModal  : state.selectedModal,
        userDetails    : state.userDetails, subscriptionDetails   : state.subscriptionDetails 
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(CompanyProfile)); 
