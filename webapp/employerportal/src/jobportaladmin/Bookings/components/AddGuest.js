
import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import S3FileUpload from 'react-s3';
import moment from 'moment';
import _ from 'underscore';
import { withRouter } from 'react-router-dom';
import "bootstrap-toggle/css/bootstrap2-toggle.min.css";
import "bootstrap-toggle/js/bootstrap2-toggle.min.js";
import ImageLoader from 'react-load-image';
import PhoneInput from 'react-phone-input-2';


var contactarray = [];
var personIDOF = "";

class AddGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "personID": this.props.match.params ? this.props.match.params.fieldID : '',
      "corporateLocationArray": "",
      'toggleButtonValue': "Male",
      'workLocationId': "",
      'userId': "",
      'contactNumberAvailable': true,
      "profilePhoto": "",
      "companyId": "",
      "company_id": "",
      "listOfEmpEmail":[],
      "loading": false,
    };
    this.handleworklocationChange = this.handleworklocationChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);

  }

  Preloader(props) {
    return <img src="spinner.gif" />;
  }

  componentDidMount() {

    var role = [];
    var getCompany_Id = localStorage.getItem("company_Id")
    var getcompanyID = localStorage.getItem("companyID")
    var companyName = localStorage.getItem("companyName")
    this.setState({
        corporate_Id : getCompany_Id,
        companyID : getcompanyID,
        companyName : companyName
    },()=>{this.getEntityLocation(getCompany_Id)})
    
    $.validator.addMethod("regxEmail", function (value, element, regexpr) {
        return regexpr.test(value);
    }, "Please enter valid Email Id");
    $("#GuestInfo").validate({
        rules: {
            workLocation: {
                required: true
            },
            firstName: {
                required: true
            },
           
            lastName: {
                required: true
            },
            DOB: {
                required: true
            },
            contactNumber: {
                required: true,
            },
            email: {
                regxEmail: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$|^$)/,
                required: true,
            },
            
        },
    })
  }

  handleworklocationChange(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name;

    
    var vendorLocation = document.getElementById("workLocation");
    var locationID = vendorLocation.options[vendorLocation.selectedIndex].getAttribute("locationid");
    var value = event.target.value;
    this.setState({
      [name]: event.target.value,
      workLocationId: locationID,
     }, () => {
      if(name == "corporate")
      {
        this.setState({
            workLocation : "--Select Office Location--"
        })
      }
      this.getEntityLocation(this.state.corporate_Id);
    })

  }

  getEntityLocation(companyId) {
    // console.log("vendorId",companyId)
    axios.get('/api/entitymaster/get/one/' + companyId)
      .then((response) => {
        this.setState({
          corporateLocationArray: response.data[0]
        })
      })
      .catch((error) => {

      })
  }

  keyPress = (e) => {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (((e.keyCode < 48 || e.keyCode > 90)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode === 190 || e.keyCode === 46)) {
      e.preventDefault();
    }
  }
  keyPressNumber = (e) => {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 189]) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 58)) && (e.keyCode < 96 || e.keyCode > 105 || e.keyCode === 190 || e.keyCode === 46)) {
      e.preventDefault();
    }
  }
  isTextKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 189 && charCode > 32 && (charCode < 65 || charCode > 90)) {
      evt.preventDefault();
      return false;
    }
    else {
      return true;
    }
  }

  getSelectedGender(val, event) {
    this.setState({
      toggleButtonValue: val
    })
  }

  docBrowseSingle(event) {
    event.preventDefault();
    var name = event.target.name
    var docBrowse = [];
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      for (var i = 0; i < event.currentTarget.files.length; i++) {
        var file = event.currentTarget.files[i];
        if (file) {
          var fileName = file.name;
          var ext = fileName.split('.').pop();
          if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "pdf" || ext === "JPG" || ext === "PNG" || ext === "JPEG" || ext === "PDF") {
            if (file) {
              var objTitle = { fileInfo: file }
              docBrowse.push(objTitle);

            } else {
              swal("Photo not uploaded");
            }//file
          } else {
            swal("Allowed images formats are (jpg,png,jpeg, pdf)");
          }//file types
        }//file
      }//for 

      if (event.currentTarget.files) {
         this.setState({
                    ["gotImage"+name]: true

                })
        main().then(formValues => {
          var docBrowse = this.state[name];
          if(docBrowse){
          this.setState({
            [name]: formValues[0].docBrowse
          }, () => {
            console.log("name", [name])
          })
          }
        });

        async function main() {
          var formValues = [];
          for (var j = 0; j < docBrowse.length; j++) {
            var config = await getConfig();
            var s3url = await s3upload(docBrowse[j].fileInfo, config, this);
            const formValue = {
              "docBrowse": s3url,
              "status": "New"
            };
            formValues.push(formValue);
          }
          return Promise.resolve(formValues);
        }


        function s3upload(image, configuration) {

          return new Promise(function (resolve, reject) {
            S3FileUpload
              .uploadFile(image, configuration)
              .then((Data) => {
                resolve(Data.location);
              })
              .catch((error) => {
              })
          })
        }
        function getConfig() {
          return new Promise(function (resolve, reject) {
            axios
              .get('/api/projectsettings/get/S3')
              .then((response) => {
                const config = {
                  bucketName: response.data.bucket,
                  dirName: 'propertiesImages',
                  region: response.data.region,
                  accessKeyId: response.data.key,
                  secretAccessKey: response.data.secret,
                }
                resolve(config);
              })
              .catch(function (error) {
              })
          })
        }
      }
    }
  }
  deleteDocSingle(event) {
    event.preventDefault();
    var name = event.target.getAttribute("name");

    this.setState({
      [name]: "",
      ["gotImage"+name]: false


    })
  }

  changeMobile(event) {
    this.setState({
      contactNumber: event
    }, () => {
      if (this.state.contactNumber) {
        this.setState({
          contactNumberAvailable: this.state.contactNumber == "+" || this.state.contactNumber.length < 15 ? false : true
        }, () => {
        })
      }
    })
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    const token = $(event.target).attr('token');
    const indexof = $(event.target).attr('index');
    console.log("token==>",token);
    if(name == ['documentNumber'+indexof]){
    this.setState({
        ['documentName'+indexof] : token
        })
    }
    this.setState({
        [name]: event.target.value,
    }, () => {});
}

getElementByIds()
  {
    var listOfEmpID = [];
    var listOfEmpEmail = [];
    var formvalues = { type :"guest" ,entityType:"corporate"}
    axios.post("/api/personmaster/get/list",formvalues)
        .then((response) => {
            this.setState({
                personListID   : response.data,
            })
            for(let i=0;i<this.state.personListID.length;i++)
            {
                listOfEmpID.push(this.state.personListID[i].employeeId)
                listOfEmpEmail.push(this.state.personListID[i].email)
            }
            this.setState({
                listOfEmpID:listOfEmpID,
                listOfEmpEmail:listOfEmpEmail
            },()=>{
                // console.log("listOfEmpID",this.state.listOfEmpID,this.state.listOfEmpEmail)
            })
        })
        .catch((error) => {
        })
  }

submitPerson(event) {
    event.preventDefault();
    
    if (this.state.contactNumber == "" || this.state.contactNumber == undefined) {
      this.setState({
        contactNumberAvailable: false
      })
    }
    else {
      this.setState({
        contactNumberAvailable: true
      })
    }
    
      var userDetails = {
        company_Id: this.state.corporate_Id,
        companyID: this.state.companyID,
        companyName: this.state.corporate,
        loginCredential: "No",
        firstName: this.state.firstName,
        middleName: this.state.middleName,
        lastName: this.state.lastName,
        gender: this.state.toggleButtonValue,
        contactNo: this.state.contactNumber,
        altContactNo: this.state.alternateNumber,
        workLocation: this.state.workLocation,
        workLocationId: this.state.workLocationId,
        type: "guest",
        email: this.state.email,
        profilePhoto: this.state.profilePhoto,
        status: "Active",
      }
    console.log("userDetails", userDetails)
    const main = async () => {
      if ($('#GuestInfo').valid() && this.state.listOfEmpEmail.indexOf(this.state.email) === -1) {
        
        axios.post('/api/personmaster/post', userDetails)
          .then((response) => {
            console.log('response', response, "userDetails", userDetails);
            if(response.data.duplicated)
            {
                swal("Guest Already Exists");

            }else{

            this.setState({
              firstName: "",
              middleName: "",
              lastName: "",
              DOB: "",
              gender: "",
              contactNumber: "",
              email: "",
            }, () => {
            swal("Guest Added Successfully");
            $('#addGuest').hide();
            $(".modal-backdrop").remove();
          
              this.getElementByIds();
            })


            }

          })
          .catch((error) => {

          })
      } else {
        if(this.state.listOfEmpEmail.indexOf(this.state.email) > -1)
        {

            swal("Email Already Exists")
        }
        $('select.error:first').focus();
        $('input.error:first').focus();
      }
    }
    main()
}


  render() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 guestForm">
        <form id="GuestInfo" className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 div_minHeight nopadding">
                 <div className=" col-lg-3 col-md-12 col-sm-12 col-xs-12 ">
                      <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 uploadGuestImage nopadding ">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 guestImg" id="ImageUpEmployee">
                              <div><i className="fa fa-camera"></i> <br /><p>UPLOAD PHOTO</p></div>
                              <input onChange={this.docBrowseSingle.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="profilePhoto" />
                            </div>

                            {
                              this.state.profilePhoto ?
                                <div className="col-lg-12 col-md-2 col-sm-12 col-xs-12 nopadding CustomImageUpload">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                    <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={this.state.profilePhoto} data-toggle="tooltip" title="Delete Image" name="profilePhoto" onClick={this.deleteDocSingle.bind(this)}>x</label>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogosPM" id="profilePhoto">

                                      {
                                        this.state.profilePhoto ?
                                          <img src={this.state.profilePhoto} className="img-responsive profileImageDivlogoStyle2" />
                                          :
                                          <img src="/images/login.png" className="img-responsive profileImageDivlogoStyle2" />
                                      }

                                    </div>
                                  </div>
                                </div>
                                :
                                 ( this.state.gotImageprofilePhoto  ?
                                    <div className="col-lg-12 col-md-2 col-sm-12 col-xs-12 nopadding CustomImageUpload">
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogosPM" id="profilePhoto">
                                                <img src="/images/loading.gif" className="img-responsive profileImageDivlogoStyle2"/>
                                          </div>
                                      </div>
                                </div>
                                :
                                null)

                            }
                          </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 " >
                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Office Location <sup className="astrick">*</sup></label>
                      <select id="workLocation" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.workLocation} ref="workLocation" name="workLocation" onChange={this.handleworklocationChange.bind(this)}>
                        <option value="" disabled={true}>--Select Office Location--</option>
                        {
                          this.state.corporateLocationArray && this.state.corporateLocationArray.locations && this.state.corporateLocationArray.locations.length > 0 ?
                            this.state.corporateLocationArray.locations.map((data, i) => {
                              // console.log("data",data)
                              return (
                                <option key={i} locationid={data._id} branch-code={data.branchCode} value={((data.locationType).match(/\b(\w)/g)).join('') + "-" + data.city + " " + data.stateCode + "-" + data.countryCode}>{((data.locationType).match(/\b(\w)/g)).join('')} - {data.area} {data.city}, {data.stateCode} - {data.countryCode}  </option>
                              );
                            })
                            :
                            null
                        }
                      </select>
                    </div>
                    
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding marbtm30">
                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 ">
                        <div id="firstName">
                          <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">First Name <i className="astrick">*</i></label>
                          <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.firstName} ref="firstName" name="firstName" id="firstName" onChange={this.handleChange} onKeyDown={this.isTextKey.bind(this)} required/>
                        </div>
                    </div>
                     <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 " >
                        <div id="middleName">
                          <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Middle Name </label>
                          <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.middleName} ref="middleName" name="middleName" onChange={this.handleChange} onKeyDown={this.isTextKey.bind(this)} />
                        </div>
                      </div>
                    <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div id="lastName">
                          <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Last Name <i className="astrick">*</i></label>
                          <input type="text" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.lastName} ref="lastName" name="lastName" id="lastName" onChange={this.handleChange} onKeyDown={this.isTextKey.bind(this)} required/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding marbtm30">
                    <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div id="DOB">
                          <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">DOB <i className="astrick">*</i></label>
                          <input type="date" id="DOB" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.DOB} max={moment(new Date).format("YYYY-MM-DD")} ref="DOB" name="DOB" onChange={this.handleChange} required/>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
                        <div id="email">
                          <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Email<i className="astrick">*</i>
                          </label>
                          <input type="email" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" value={this.state.email} ref="email" name="email" onChange={this.handleChange} placeholder="testemail@gmail.com" required />
                        </div>
                    </div>
                    <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div id="contactNumber">
                          <label className="labelform  NOpadding-left">Contact Number <i className="astrick">*</i></label>
                          <PhoneInput
                            country={'in'}
                            value={this.state.contactNumber}
                            name="contactNumber"
                            inputProps={{
                              name: 'contactNumber',
                            }}
                            onChange={this.changeMobile.bind(this)}
                          />
                        </div>
                        {this.state.contactNumberAvailable == true ? null : <label className="error">Please enter valid number</label>}

                    </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                    <div className=" col-lg-6 col-md-6 col-sm-12 col-xs-12 driver employee guest person">
                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Gender</label>
                        <div className="btn-group btn-group-toggle col-lg-12 nopadding" data-toggle="buttons">
                          <label className={this.state.toggleButtonValue === "Male" ? "btn toggleButton customToggleButton col-lg-3 btn-secondary active" : "btn toggleButton customToggleButton col-lg-3 btn-secondary "} value="Male" onClick={this.getSelectedGender.bind(this, "Male")}  >
                            <input type="radio"
                              name="options"
                              id="Male"
                              value="male"
                              autoComplete="off"
                              checked={this.state.toggleButtonValue === "Male" ? "checked" : "unchecked"}
                            /> Male
                        </label>
                          <label className={this.state.toggleButtonValue === "Female" ? "btn toggleButton customToggleButton col-lg-3 btn-secondary active" : "btn toggleButton customToggleButton col-lg-3 btn-secondary "} value="Female" onClick={this.getSelectedGender.bind(this, "Female")}>
                            <input type="radio" name="options" id="Female" value="Female" autoComplete="off" checked={this.state.toggleButtonValue === "Female" ? "checked" : "unchecked"} /> Female
                        </label>
                          <label className={this.state.toggleButtonValue === "Transgender" ? "btn toggleButton customToggleButton col-lg-5 noRightMargin btn-secondary active" : "btn toggleButton customToggleButton noRightMargin col-lg-5 btn-secondary "} value="Transgender" onClick={this.getSelectedGender.bind(this, "Transgender")}>
                            <input type="radio" name="options" id="Transgender" autoComplete="off" checked={this.state.toggleButtonValue === "Transgender" ? "checked" : "unchecked"} /> Transgender
                        </label>
                        </div>

                    </div>
                </div>
           
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                      <button className="btn button3 pull-right" onClick={this.submitPerson.bind(this)} >Submit&nbsp;</button>
                </div>
            </div>
         </form>
      </div>
    );
  }
}
export default withRouter(AddGuest);


