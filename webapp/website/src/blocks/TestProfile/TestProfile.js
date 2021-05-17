import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import { withRouter }       from 'react-router-dom';
import Swal                 from 'sweetalert2';
import _                    from 'underscore';
import moment               from 'moment';
import 'bootstrap/js/tab.js';

class TestProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params ? this.props.match.params.emp_ID : '',
    };
  }

  componentDidMount() {
    console.log("Props",this.props);
    this.getData(this.state.id);  
  }

  getData(id) {
    console.log("emp profile get ID==>",id)
    axios.get("/api/personmaster/get/one/" + id)
    .then((response) => {
      console.log("personInfo===>>>",response.data)
      this.setState({
        personInfo    : response.data,
        type          : response.data.type,
        entityType    : response.data.entityType,
        address       : response.data.address,
        Documentarray :response.data.Documentarray,
      }, () => {
        this.getManagerData(this.state.personInfo.approvingAuthorityId1,this.state.personInfo.approvingAuthorityId2,this.state.personInfo.approvingAuthorityId3);
        this.getRoles(this.state.personInfo.userId)

      });
    })
    .catch((error) => {
      console.log("error /api/personmaster/get/one/ =>",error)
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
  getManagerData(managerID1,managerID2,managerID3){
    axios.get("/api/personmaster/get/User/"+managerID1)
    .then((response) => {
      var emp_id = response.data.data[0]._id
      axios.get("/api/personmaster/get/one/" + emp_id)
      .then((response) => {
        console.log("man1",response)
        this.setState({
          managerId1 : response.data._id,
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
        console.log("man1",response)
        this.setState({
          managerId2 : response.data._id,
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
        console.log("man1",response)
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

  LocationEdit(event) {
    this.props.history.push("/" + this.state.type + '/' + event.currentTarget.getAttribute('data-locationID'))

  }
  
  editBasicform(event) {
    localStorage.setItem("redirectToURL",window.location.pathname)

    this.props.history.push("/"+this.state.entityType+"/" + this.state.type + '/master/' + event.currentTarget.getAttribute('data-id'))
  }

  deleteEntity(event) {
    event.preventDefault();
    this.setState({ deleteID: event.currentTarget.getAttribute('data-id') })
    //for deletedStatus of DRIVER only--------------------------
    if (this.props.type === "driver") {
      $('#deleteStatusOfDriverModal').show();
    } else {
      //for deleting entity directly
      $('#deleteModal').show();
    }
  }

  confirmDelete(event) {
    var username = this.state.username
    event.preventDefault();
    axios.get("/api/personmaster/get/one/" + this.state.deleteID)
    .then((response) => {
      this.setState({
        "personID_tobedeleted": response.data.userId,
        "username": response.data.firstName + " " + response.data.lastName,
      }, () => {
        var formValues = {
          ID: this.state.deleteID,
          updatedBy: username,
        }
        axios.patch("/api/personmaster/patch/deletestatus", formValues)
          .then((response) => {
            var formValues = {
              user_id_tobedeleted: this.state.personID_tobedeleted,
              username: this.state.username,
            }
            axios
              .patch('/api/users/patch/deletestatus/', formValues)
              .then((response) => {
                // this.props.getPersons();
                window.location.reload();
                this.props.hideForm();
                $('#deleteVehicleModal').hide();
              })
              .catch(function (error) {
              })
          })
          .catch((error) => {
          })
      });
    })
    .catch((error) => {
    })
  }

  deleteStatusOfDriver(event) {
    event.preventDefault();
    axios.get("/api/personmaster/get/one/" + this.state.deleteID)
    .then((response) => {
      this.setState({
        "personID": response.data.userId,
        "username": response.data.firstName + " " + response.data.lastName,
      }, () => {
        var details = {
          driverID: this.state.deleteID,
          updatedBy: localStorage.getItem("user_ID")
        }
        axios.patch("/api/personmaster/patch/temp_delete_driver", details)
          .then((response) => {
            if (response.data) {
              this.props.getPersons();
              this.props.hideForm();
              $('#deleteStatusOfDriverModal').hide();
              var formValues = {
                user_id_tobedeleted: this.state.personID,
                username: this.state.username,
              }
              axios
                .patch('/api/users/patch/deletestatus/', formValues)
                .then((response) => {
                  Swal.fire('', "Record is deleted successfully", '');
                })
                .catch(function (error) {
                })
            } else {
              Swal.fire('', "Failed to delete", '');
            }
          })
          .catch((error) => {
          })
      });
    })
    .catch((error) => {
    })
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  closeModal(event) {
    event.preventDefault();
    $('#deleteModal').hide();
    $('#deleteStatusOfDriverModal').hide();
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
                      </div>
                      {/* <div id={this.state.personInfo._id} className="col-lg-6 noPadding"  title="delete" data-index data-id={this.state.personInfo._id} onClick={this.deleteEntity.bind(this)}> 
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
                  {this.state.personInfo.type === "employee" && this.state.personInfo.entityType === "corporate" ?
                  <div>
                  <ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
                    <li><i className="fa fa-mortar-board changeColor " aria-hidden="true"></i>&nbsp;&nbsp;<b>Category</b></li>
                    <li className="marginLeft5">&nbsp;&nbsp;{this.state.personInfo.empCategory ? this.state.personInfo.empCategory : "- NA -"}</li>
                  </ul>
                  <ul className="col-lg-4 col-md-4 col-sm-4 col-xs-12 noPadding listLI">
                    <li><i className="fa fa-star-half-empty changeColor " aria-hidden="true"></i>&nbsp;&nbsp;<b>Priority</b></li>
                    <li className="marginLeft5">{this.state.personInfo.empPriority ? (this.state.personInfo.empPriority == "1" ? "★" : this.state.personInfo.empPriority == "2" ? "★ ★" : "★ ★ ★" ): "- NA -"}</li>
                  </ul>
                  </div>
                  :
                  null
                }
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
                {this.state.type !== "driver" && this.state.personInfo.entityType === "corporate" ?
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
              {
                this.props.type !== "guest" && this.state.Documentarray && this.state.Documentarray.length > 0 &&
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderAllED  addMarginTopPM">
              
                <div className="col-lg-12 col-md-1 col-sm-12 col-xs-12">
                <h5 className="locationHeading">Document List</h5>
                </div>
                {
                  this.state.Documentarray.map((docdata, index) => {
                    return (
                      <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 seperaterBorder" key={index}>
                        <ul className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                          <li title="document"><b>{docdata.documentName}</b>: {docdata.documentNumber}</li>
                          <li title="document"><b>Document Valid From : </b>{moment(docdata.documentValidFrom).format("DD-MMM-YY")}</li>
                          <li title="document"><b>Document Valid To :</b> {moment(docdata.documentValidTo).format("DD-MMM-YY")}</li>
                          
                        </ul> 
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                            {
                              docdata.documentProof.imgUrl.length>0 ?
                                docdata.documentProof.imgUrl.map((doc,ind)=>{
                                  return (
                                    <div key={ind} className=" col-lg-2 col-md-3 col-sm-12 col-xs-12 NOpadding-left">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding margin-bottom9" id="hide">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " id="LogoImageUpOne">
                                          <a href={doc} target="_blank"  className="imageOuterContainerDM" title="Click to View"><img src={doc} className="img-responsive logoStyle" /></a>
                                        </div>
                                      
                                      </div>
                                    </div>
                                  );
                                })
                              :
                              null
                            }
                          
                        </div>
                      </div>
                    );
                  })
                }
              </div>
              }
            </div>
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
export default withRouter(TestProfile); 
