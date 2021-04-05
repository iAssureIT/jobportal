import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import S3FileUpload from 'react-s3';
import PhoneInput from 'react-phone-input-2';
import { withRouter } from 'react-router-dom';
import BulkUpload from "../../../BulkUpload/BulkUpload.js";
import Autosuggest from 'react-autosuggest';

import 'bootstrap/js/tab.js';
import '../css/SupplierOnboardingForm.css';
import 'react-phone-input-2/lib/style.css';
import "bootstrap-toggle/css/bootstrap2-toggle.min.css";
import "bootstrap-toggle/js/bootstrap2-toggle.min.js";

import { connect }            from 'react-redux';
import { bindActionCreators }   from 'redux';
import  * as mapActionCreator   from '../../../../../jobportaladmin/common/actions/index';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "pathname"      : this.props.entity,
      "companyLogo"   : [],
      "COI"   : [],

      "countryData"   : [],
      "imageUploaded" : true,
      "companyPhoneAvailable" : true, 
      "companyPhone"  : '',
      "country"  : "",
      "industryArray":[],
      "industry_id":"",
      "industry":"",
      value: '',
      suggestions: [],
      fileDetailUrl: "/api/entitymaster/get/filedetails/",
      goodRecordsHeading: {
        supplierOf: "Supplier Of",
        profileStatus: "Profile Status",
        entityType: "Entity Type",
        companyName: "Company Name",
        groupName: "Group Name",
        website: "Website",
        companyPhone: "Contact No",
        companyEmail: "Company Email",
        CIN: "CIN",
        COI: "COI",
        TAN: "TAN",
      },
      failedtableHeading: {
        supplierOf: "Supplier Of",
        profileStatus: "Profile Status",
        entityType: "Entity Type",
        companyName: "Company Name",
        groupName: "Group Name",
        website: "Website",
        companyPhone: "Contact No",
        companyEmail: "Company Email",
        CIN: "CIN",
        COI: "COI",
        TAN: "TAN",
      
      }
    };
 
    this.handleChange              = this.handleChange.bind(this);
    this.keyPress                  = this.keyPress.bind(this);
    this.handleOptionChange        = this.handleOptionChange.bind(this);
    this.SubmitBasicInfo           = this.SubmitBasicInfo.bind(this);
  }
  componentDidMount() {

    this.edit();
    axios.get('/api/industrymaster/get/list')
      .then((response) => {
        
        var industryArray = [];
        response.data.map((value,ind)=>{
          industryArray.push({_id: value._id, label : value.industry})
        })

        this.setState({ industryArray : industryArray })
      })
      .catch((error) => {
      })
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
    //console.log(this.props.userDetails.company_id)
    if (this.props.userDetails.company_id) {
      this.setState({
      entityID: this.props.userDetails.company_id
    }, () => {
      //console.log("this.props.userDetails.company_id",this.props.userDetails.company_id)
      this.edit();
    })
    }
    
    window.scrollTo(0, 0);
    $.validator.addMethod("regxA1", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid company name");
    $.validator.addMethod("regxA5", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid group name");
  /*  $.validator.addMethod("regxA2", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter a valid TAN Number.");*/
    $.validator.addMethod("regxA4", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter a valid website.");
    $.validator.addMethod("regxEmail", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter a valid email address.");
    jQuery.validator.addMethod("notEqual", function(value, element, param) {
      return this.optional(element) || value != param;
    }, "Please specify a different (non-default) value");
    $.validator.addMethod("regxGSTIN", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid GSTIN.");
    $.validator.addMethod("regxPAN", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid PAN.");
   /* $.validator.addMethod("regxA8", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter the valid CIN");
    */
    jQuery.validator.setDefaults({
      debug: true,
      success: "valid"
    });
    $("#BasicInfo").validate({
      rules: {
        companyName: {
          required: true,
          regxA1: /^[A-Za-z][A-Za-z0-9\-\s]/,
        },
        groupName: {
          required: true,
          regxA5: /^[A-Za-z][A-Za-z0-9\-\s]/,
        },
     /*   TAN: {
          regxA2: /^[A-Za-z]{4}[0-9]{5}[A-Za-z]$|^$/,
        },
        */
        website: {
          regxA4: /^([a-zA-Z0-9_\-:/.]+).([a-zA-Z]{2,5})$|^$/
        },
        companyEmail: {
          required: true,
          regxEmail: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
        },
        companyPhone: {
          required: true,
          notEqual:"+91"
        },
        country: {
          required: true,
          notEqual:""
        },
      /*  CIN: {
          regxA8: /^([L|U|l|u]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$|^$/,
        },*/
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "companyName") {
          error.insertAfter("#companyName");
        }
        if (element.attr("name") === "companyPhone") {
          error.insertAfter("#companyPhone");
        }
        if (element.attr("name") === "groupName") {
          error.insertAfter("#groupName");
        }
        if (element.attr("name") === "companyEmail") {
          error.insertAfter("#companyEmail");
        }
       /*  if (element.attr("name") === "TAN") {
          error.insertAfter("#TAN");
        }*/
        if (element.attr("name") === "website") {
          error.insertAfter("#website");
        }
        if (element.attr("name") === "country") {
          error.insertAfter("#country");
        }
       /*  if (element.attr("name") === "CIN") {
          error.insertAfter("#CIN");
        }*/
      }
    });
    $("#StatutoryInfo").validate({
      rules: {
        GSTIN: {
          required:true,
          regxGSTIN: /^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[A-Za-z1-9]{1}[z|Z]{1}[A-Za-z0-9]{1}$|^$/,
        },
        PAN: {
          required:true,
          regxPAN: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$|^$/,
        },
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "GSTIN") {
          error.insertAfter("#GSTIN");
        }
        if (element.attr("name") === "PAN") {
          error.insertAfter("#PAN");
        }
      }
    });

    axios.get('/api/entitymaster/getEntity/' + this.props.userDetails.company_id)
        .then((response) => {

          var industry = this.state.industryArray.filter((industry)=>{
            //console.log(industry._id)
            return industry._id  == response.data.industry_id
          })
          //console.log("industry", industry)
          //console.log("response", response.data)
          
          this.setState({
            "entityID": this.props.userDetails.company_id,
            "entityType": response.data.entityType,
            "companyName": response.data.companyName,
            "groupName": response.data.groupName,
            "website": response.data.website,
            "companyPhone": response.data.companyPhone,
            "companyEmail": response.data.companyEmail,
            "CIN": response.data.CIN,
            "COI": response.data.COI,
            "TAN": response.data.TAN,
            "companyLogo": response.data.companyLogo,
            "country": response.data.country,
            "countryCode": response.data.countryCode,
            "statutoryDetails": response.data.statutoryDetails,
            "value": industry[0] ? industry[0].label : "",
            suggestions: industry[0] ? this.getSuggestions(industry[0].label) : [] ,
            "userID": response.data.ID,
            "createdBy": localStorage.getItem("user_ID")
          })

          //console.log(".............................",response.data.entityType);
        })
        // .catch((error) => {
        // })
        this.getCountryConfigDetails()
      
  }
  
  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  handleCountryChange(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name;

    this.setState({
      country: event.target.value
    },()=>{
      var countryData = this.state.countryData
       var getTaxData = countryData.find(e=> e.country === this.state.country)
       console.log('getTaxData=>',getTaxData)
       if(getTaxData){
        console.log('getTaxData.countryCode=>',getTaxData.countryCode)
        this.setState({countryCode:getTaxData.countryCode})
       }
    });
  }
  handleOptionChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });
  }
  SubmitBasicInfo(event) {
    event.preventDefault();

    if(this.state.companyPhone === "" || this.state.companyPhone === undefined)
    {
      this.setState({
        companyPhoneAvailable : false
      })
    }
    else{
       this.setState({
        companyPhoneAvailable : true
      })
    }
    console.log(this.state.value, this.state.industry_id)
    if ($('#BasicInfo').valid() && this.state.companyPhoneAvailable) {
      var formValues = {
        "supplierOf": this.props.vendorID ? this.props.vendorID : localStorage.getItem("user_ID"),
        "profileStatus":"New",
        "entityID": this.props.userDetails.company_id,
        "entityType": this.state.pathname,
        "companyName": this.state.companyName,
        "groupName": this.state.groupName,
        "website": this.state.website,
        "companyPhone": this.state.companyPhone,
        "companyEmail": this.state.companyEmail,
        "country": this.state.country,
        "countryCode": this.state.countryCode,
        "CIN": this.state.CIN ? this.state.CIN.toUpperCase() :"",
        "COI": this.state.COI,
        "TAN": this.state.TAN ? this.state.TAN.toUpperCase() : "",
        "industry_id" : this.state.industry_id,
        "industry" : this.state.value,
        "companyLogo": this.state.companyLogo,
        "userID": this.state.userID,
        "createdBy": localStorage.getItem("user_ID")
      }

      console.log('formValues=>',formValues)
      if (this.props.userDetails.company_id) {
        
        axios.patch('/api/entitymaster/patch', formValues)
          .then((response) => {
            
            swal((this.state.pathname === "appCompany" ? "Organzational Settings" : this.state.pathname ) + " updated successfully.");
            $(".swal-text").css("text-transform", "capitalize");
            $(".swal-text").css("font-family", "sans-serif");
            this.props.history.push('/' + this.state.pathname + '/statutory-details/' + this.props.userDetails.company_id)
          })
          .catch((error) => {

          })
      } else {
        axios.post('/api/entitymaster/post', formValues)
        .then((response) => {
          console.log("response",response);
          swal((this.state.pathname === "appCompany" ? "Organzational Settings" : this.state.pathname ) + " created successfully.");
          $(".swal-text").css("text-transform", "capitalize");
          this.props.history.push('/' + this.state.pathname + '/statutory-details/' + response.data.entityID)
        })
        .catch((error) => {

        })
      }
    } else {
      $('select.error:first').focus();
      $('input.error:first').focus();

    }

  }
  imgBrowse(event) {
    event.preventDefault();
    var companyLogo = [];
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      for (var i = 0; i < event.currentTarget.files.length; i++) {
        var file = event.currentTarget.files[i];
        if (file) {
          var fileName = file.name;
          var fileSize = file.size;
          var ext = fileName.split('.').pop();
          if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "JPG" || ext === "PNG" || ext === "JPEG") {
            if(fileSize > 1048576){
							swal("Allowed file size is 1MB");
						}else{
              if (file) {
                var objTitle = { fileInfo: file }
                companyLogo.push(objTitle);
              } else {
                swal("Images not uploaded");
              }//file
            }
          } else {
            swal("Allowed images formats are (jpg,png,jpeg)");
            this.setState({
              gotImagecompanyLogo:false
            })
          }//file types
        }//file
      }//for 

      if (event.currentTarget.files) {
        this.setState({
          gotImagecompanyLogo:true
        })
        main().then(formValues => {
          var companyLogo = this.state.companyLogo;
          for (var k = 0; k < formValues.length; k++) {
            companyLogo.push(formValues[k].companyLogo)
          }

          this.setState({
            companyLogo   : companyLogo,
            imageUploaded : false
          })
        });

        async function main() {
          var formValues = [];
          for (var j = 0; j < companyLogo.length; j++) {
            var config = await getConfig();

            console.log('config=>',config)

            var s3url = await s3upload(companyLogo[j].fileInfo, config, this);
            const formValue = {
              "companyLogo": s3url,
              "status": "New"
            };
            formValues.push(formValue);
          }
          return Promise.resolve(formValues);
        }


        function s3upload(image, configuration) {
          console.log('image: ',image,configuration)
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
              .post('/api/projectsettings/getS3Details/S3')
              .then((response) => {
                const config = {
                  bucketName: response.data.bucket,
                  dirName: process.env.REACT_APP_ENVIRONMENT,
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
  docBrowse(event) {
    event.preventDefault();
    var COI = [];
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      for (var i = 0; i < event.currentTarget.files.length; i++) {
        var file = event.currentTarget.files[i];

        if (file) {
          var fileName = file.name;
          var fileSize = file.size;
          var ext = fileName.split('.').pop();
          if (ext === "jpg" || ext === "png" || ext === "pdf" || ext === "jpeg" || ext === "JPG" || ext === "PNG" || ext === "JPEG" || ext === "PDF") {
            if(fileSize > 1048576){
							swal("Your file size is exceeding max size allowed which is 1 MB.");
						}else{
              if (file) {
                var objTitle = { fileInfo: file }
                COI.push(objTitle);

              } else {
                swal("File not uploaded");
              }//file
            }
          } else {
            swal("Allowed file formats are (jpg, png, jpeg, pdf)");
            this.setState({
              gotImageCOI:false
            },()=>{
                console.log("gotImageCOI",this.state.gotImageCOI)

            })
          }//file types
        }//file
      }//for 

      if (event.currentTarget.files) {
        this.setState({
                gotImageCOI: true
            })
        main().then(formValues => {
          var COI = this.state.COI;
          for (var k = 0; k < formValues.length; k++) {
            COI.push(formValues[k].COI)
          }

          this.setState({
            COI: COI
          })
        });

        async function main() {
          var formValues = [];
          $("#imageLoader").show();
          for (var j = 0; j < COI.length; j++) {
            var config = await getConfig();
            console.log("config = ", config);
            
            var s3url = await s3upload(COI[j].fileInfo, config, this);
            const formValue = {
              "COI": s3url,
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
              .post('/api/projectsettings/getS3Details/S3')
              .then((response) => {
                const config = {
                  bucketName: response.data.bucket,
                  dirName: process.env.REACT_APP_ENVIRONMENT,
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
  keyPressWeb = (e) => {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190, 110]) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 190 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode === 110 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 90)) && (e.keyCode < 96)) {
      e.preventDefault();
    }
  }
  /*======== alphanumeric  =========*/
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
  componentWillReceiveProps(nextProps) {
    console.log("nextProps",nextProps)
    if (nextProps.entityID) {
      this.setState({
      entityID: this.props.userDetails.company_id
    }, () => {
      
      this.edit();
    })
    }
    //this.edit();
    this.handleChange = this.handleChange.bind(this);
  }
  admin(event) {
    event.preventDefault();
    this.props.history.push('/adminDashboard');
  }
  edit() {
    var entityID = this.state.entityID;
    if (entityID !== '') {
      axios.get('/api/entitymaster/getEntity/' + entityID)
        .then((response) => {
          var industry = this.state.industryArray.filter((industry)=>{
            return industry._id  == response.data.industry_id
          })
          //console.log("response", industry)
          this.setState({
            "entityID": this.props.userDetails.company_id,
            "entityType": response.data.entityType,
            "companyName": response.data.companyName,
            "groupName": response.data.groupName,
            "website": response.data.website,
            "companyPhone": response.data.companyPhone,
            "companyEmail": response.data.companyEmail,
            "CIN": response.data.CIN,
            "COI": response.data.COI,
            "TAN": response.data.TAN,
            "companyLogo": response.data.companyLogo,
            "country": response.data.country,
            "countryCode": response.data.countryCode,
            "statutoryDetails": response.data.statutoryDetails,
            "value": industry[0] ? industry[0].label : "",
            suggestions: industry[0] ? this.getSuggestions(industry[0].label) : [] ,
            "userID": response.data.ID,
            "createdBy": localStorage.getItem("user_ID")
          })
        })
        .catch((error) => {
        })
        this.getCountryConfigDetails()
    }
  }
  changeMobile(event) {
    this.setState({
      companyPhone: event
    }, () => {
      if (this.state.companyPhone) {
        this.setState({
          companyPhoneAvailable: this.state.companyPhone === "+" || this.state.companyPhone.length<15 ? false : true
        },()=>{
        })
      }
    })
  }
  deleteLogo(event) {
    event.preventDefault();
    var companyLogo = this.state.companyLogo;
    const index = companyLogo.indexOf(event.target.id);
    if (index > -1) {
      companyLogo.splice(index, 1);
    }
    this.setState({
      companyLogo: companyLogo,
      gotImagecompanyLogo : false
    })
  }
  deleteDoc(event) {
    event.preventDefault();
    var COI = this.state.COI;
    const index = COI.indexOf(event.target.id);
    if (index > -1) {
      COI.splice(index, 1);
    }
    this.setState({
      COI: COI,
      gotImageCOI: false

    })
  }
  getFileDetails(fileName) {

    axios
      .get(this.state.fileDetailUrl + this.state.pathname + "/" + fileName)
      .then((response) => {
        $('.fullpageloader').hide();
        if (response) {
          this.setState({
            fileDetails: response.data,
            failedRecordsCount: response.data.failedRecords.length,
            goodDataCount: response.data.goodrecords.length
          });
          if (this.state.pathname === "corporate") {
            var tableData = response.data.goodrecords.map((a, i) => {
              return {
                "supplierOf": a.supplierOf ? a.supplierOf : '-',
                "profileStatus": a.profileStatus ? a.profileStatus : '-',
                "entityType": a.entityType ? a.entityType : '-',
                "companyName": a.companyName ? a.companyName : '-',
                "groupName": a.groupName ? a.groupName : '-',
                "website": a.website ? a.website : '-',
                "companyPhone": a.companyPhone ? a.companyPhone : '-',
                "companyEmail": a.companyEmail ? a.companyEmail : '-',
                "CIN": a.CIN ? a.CIN : '-',
                "COI": a.COI ? a.COI : '-',
                "TAN": a.TAN ? a.TAN : "-"
              }
            })

            var failedRecordsTable = response.data.failedRecords.map((a, i) => {
              return {
                "supplierOf": a.supplierOf ? a.supplierOf : '-',
                "profileStatus": a.profileStatus ? a.profileStatus : '-',
                "entityType": a.entityType ? a.entityType : '-',
                "companyName": a.companyName ? a.companyName : '-',
                "groupName": a.groupName ? a.groupName : '-',
                "website": a.website ? a.website : '-',
                "companyPhone": a.companyPhone ? a.companyPhone : '-',
                "companyEmail": a.companyEmail ? a.companyEmail : '-',
                "CIN": a.CIN ? a.CIN : '-',
                "COI": a.COI ? a.COI : '-',
                "TAN": a.TAN ? a.TAN : "-"
              }
            })
          }

          this.setState({
            goodRecordsTable: tableData,
            failedRecordsTable: failedRecordsTable
          })
        }
      })
      .catch((error) => {
      })
  }

  getCountryConfigDetails(){
    axios.post('/api/countryspecificConfig/list')
    .then((response)=>{
      this.setState({countryData:response.data})
    })
    .catch((error) => {
      })
  }
  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());
   
    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return this.state.industryArray.filter(industry => regex.test(industry.label));
  }

  getSuggestionValue(suggestion) {
    return suggestion.label;
  }

  renderSuggestion(suggestion) {
    return (
      <span className="Autosuggestlist">{suggestion.label}</span>
    );
  }

  onChange = (event, { newValue , method}) => {
    if (method="type") {
      this.setState({ value: newValue, industry : newValue})
      
    }else{
      this.setState({
        value: newValue, industry_id :""
      });
    }
  };
 
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };
 
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSuggestionSelected=(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => { 
    //console.log("suggestion",suggestion)
    
    this.setState({industry_id : suggestion._id, industry : suggestionValue})
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Industry",
      value,
      onChange: this.onChange
    };
    return (

       <div className="col-lg-10 col-lg-offset-1 col-md-12 col-sm-12 col-xs-12 NOPadding">
        <section className="content1">   
          <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
      
               
            <section className="Content tab-content">
                <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Employer Details</h4>
             
                <div className="nav-center OnboardingTabs col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <ul className="nav nav-pills vendorpills col-lg-12 col-md-12  col-sm-12 col-xs-12">
                    <li className="active col-lg-3 col-md-3 col-sm-12 col-xs-12 pdcls pdclsOne btn1 NOpadding-left">
                      <a href={this.props.userDetails.company_id ? "/"+this.props.entity+"/basic-details/"+this.props.userDetails.company_id : "/"+this.props.entity+"/basic-details"} className="basic-info-pillss pills">
                        <i className="fa fa-info-circle" aria-hidden="true"></i> &nbsp;
                        Basic Info
                      </a>
                      <div className="triangleone triangleones" id="triangle-right"></div>
                    </li>
                    <li className="col-lg-3 col-md-3 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn2 disabled">
                      <div className="triangletwo" id="triangle-right1"></div>
                      <a href={this.props.userDetails.company_id ? "/"+this.props.entity+"/statutory-details/"+this.props.userDetails.company_id : "/"+this.props.entity+"/statutory-details" } className="basic-info-pillss backcolor">
                        <i className="fa fa-info-circle iconMarginLeft" aria-hidden="true"></i> &nbsp;
                        Statutory Info
                      </a>
                      <div className="triangleone forActive" id="triangle-right"></div>
                    </li>
                    <li className="col-lg-3 col-md-3 col-sm-12 col-xs-12 transactionTab pdcls pdclsOne btn2 disabled">
                      <div className="triangletwo" id="triangle-right1"></div>
                      <a href={this.props.userDetails.company_id ? "/"+this.props.entity+"/location-details/"+this.props.userDetails.company_id : "/"+this.props.entity+"/location-details" } className="basic-info-pillss backcolor">
                        <i className="fa fa-map-marker iconMarginLeft" aria-hidden="true"></i> &nbsp;
                        Locations
                      </a>
                      <div className="triangleone forActive" id="triangle-right"></div>
                    </li>
                    <li className="col-lg-3 col-md-3 col-sm-12 col-xs-12 transactionTab noRightPadding pdcls btn4 disabled">
                      <div className="trianglesix" id="triangle-right2"></div>
                      <a href={this.props.userDetails.company_id ? "/"+this.props.entity+"/contact-details/"+this.props.userDetails.company_id : "/"+this.props.entity+"/contact-details"} className="basic-info-pillss backcolor">
                        <i className="fa fa-phone phoneIcon" aria-hidden="true"></i> &nbsp;
                        Contact 
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">

                  <form id="BasicInfo">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="row">

                      <div className="col-lg-12 col-md-12 col-sm-12 supplierForm">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <br />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                        <div className="row">

                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls ">
                          <div className="row"> 
                            <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                              <div className=" col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Company Name<i className="astrick">*</i></label>
                                <input type="text" id="companyName" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.companyName} ref="companyName" name="companyName" onChange={this.handleChange} />
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Group Name<i className="astrick">*</i></label>
                                <input type="text" id="groupName" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.groupName} ref="groupName" name="groupName" onChange={this.handleChange} required />
                              </div>
                              
                              <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 NOpadding ">
                                <div className="col-lg-12 col-md-3 col-sm-12 col-xs-12">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding " id="hide">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 uploadImageClient" id="LogoImageUpOne" title="Upload Image">
                                      <div><i className="fa fa-camera cursorPointer"></i></div>
                                      <input multiple onChange={this.imgBrowse.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="companyLogo" />
                                    </div>
                                  </div>
                                </div>
                                
                              </div> 
                              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
                              {
                                  this.state.companyLogo && this.state.companyLogo.length > 0 ?
                                    this.state.companyLogo.map((logo, i) => {
                                      return (
                                        <div key={i} className="col-lg-4 col-md-3 col-sm-12 col-xs-12 CustomImageUploadBI NOpadding-right">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                            <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Delete Logo"  id={logo} onClick={this.deleteLogo.bind(this)}>x</label>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 CustomImageUploadBIImg" id="LogoImageUpOne">
                                                  <img src={logo} alt={"companyLogo"+i} className="img-responsive logoStyle" />
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })
                                    :
                                    ( this.state.gotImagecompanyLogo ?
                                          <div className="col-lg-12 col-md-2 col-sm-12 col-xs-12  loaderBI">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos1" id="profilePhoto">
                                                      <img src="/images/loading.gif" className="img-responsive logoStyle"/>
                                                </div>
                                            </div>
                                          </div>
                                :
                                null)
                                                                         
                                } 
                            </div>
                          </div>
                          </div>
                          <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                          <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Industry<i className="astrick">*</i></label>
                                <Autosuggest 
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                                getSuggestionValue={this.getSuggestionValue.bind(this)}
                                renderSuggestion={this.renderSuggestion.bind(this)}
                                onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                                inputProps={inputProps}
                              />
                              </div>
                              <div className=" col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Email<i className="astrick">*</i></label>
                                <input  type="email" id="companyEmail" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.companyEmail} ref="companyEmail" name="companyEmail" onChange={this.handleChange} required />
                              </div>

                              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <label className="labelform  NOpadding-left">Company Number<i className="astrick">*</i></label>
                                <PhoneInput
                                  country={'in'}
                                  value={this.state.companyPhone}
                                  name="companyPhone"
                                  inputProps={{
                                    name: 'companyPhone',
                                    required: true
                                  }}
                                  onChange={this.changeMobile.bind(this)}
                                />

                                {this.state.companyPhoneAvailable === true ? null : <label className="error">Please enter valid number</label>}
                                
                              </div>                                 
                            
                              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Website
                                  <a href="#" data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="Eg. www.abc.xyz" className="fa fa-question-circle"></i> </a>
                                </label>
                                <input type="text" id="website" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" onKeyDown={this.keyPressWeb} value={this.state.website} ref="website" name="website" onChange={this.handleChange} />
                              </div>
                             
                          </div>  
                          </div>
                          </div>
                        </div>
                        </div>
                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                        <div className=" col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Country<i className="astrick">*</i></label>
                                <select className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 errorinputText" value={this.state.country} ref="country" name="country" id="country" onChange={this.handleCountryChange.bind(this)} required>
                                  <option value="" disabled>--Select Country--</option>
                                  {
                                    this.state.countryData && this.state.countryData.length > 0 ?
                                      this.state.countryData.map((data, index) => {
                                        return (
                                          <option key={index} data-attribute={index}>{data.country}</option>
                                        );
                                      })
                                      :
                                      <option value="" disabled>Please enter country details in system preferences</option>
                                  }
                                </select>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 panerror" >
                          <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Tax Deduction Account Number
                            <a href="#" data-tip data-for='basicInfo2Tooltip' className="pull-right"> <i title="Eg. NGPO02911G" className="fa fa-question-circle"></i> </a>
                          </label>
                          <input maxLength="10" type="text" id="TAN" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText UpperCase" value={this.state.TAN} ref="TAN" name="TAN" onChange={this.handleChange} placeholder="NGPO02911G" />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                          <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Company Identification Number
                            <a href="#" data-tip data-for='basicInfo7Tooltip' className="pull-right"> <i title="Eg. L12345MH2019PTC123456" className="fa fa-question-circle"></i> </a>
                          </label>
                          <input type="text" id="CIN" maxLength="21" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 UpperCase inputText" placeholder="L12345MH2019PTC123456" value={this.state.CIN} ref="CIN" name="CIN" onChange={this.handleChange} />
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 ">
                           <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Add COI Doc (jpg, jpeg, png, pdf)</label>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos1" id="LogoImageUpOne">
                                  <div><i className="fa fa-upload"></i> <br /></div>
                                  <input multiple onChange={this.docBrowse.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="COI" />
                                </div>
                              </div>
                           
                            </div>
                            {
                              this.state.COI && this.state.COI.length > 0 ?
                                this.state.COI.map((doc, i) => {
                                  if(('extension',doc.substring(doc.lastIndexOf("."))) === '.pdf'){
                                    return (
                                      <div key={i} className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                          <label className="labelform deletelogoCOI col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Delete Document" id={doc} onClick={this.deleteDoc.bind(this)}>x</label>
                                          <div title={(doc.substring(doc.lastIndexOf("/"))).replace('/', "")} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos1 " id="LogoImageUpOne">
                                            <img src={'/images/pdf.png'} alt={"coi"+i} className="img-responsive logoStyle" />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }else{
                                    return (
                                      <div key={i} className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                          <label className="labelform deletelogoCOI col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Delete Document" id={doc} onClick={this.deleteDoc.bind(this)}>x</label>
                                          <div title={(doc.substring(doc.lastIndexOf("/"))).replace('/', "")} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos1" id="LogoImageUpOne">
                                            <img src={doc} alt={"coi"+i} className="img-responsive logoStyle" />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                })
                                :
                                ( this.state.gotImageCOI  ?
                                          <div className="col-lg-12 col-md-2 col-sm-12 col-xs-12 CustomImageUploadBILoading">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding " id="hide">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos1" id="LogoImageUpOne">
                                                      <img src="/images/loading.gif" className="img-responsive logoStyle"/>
                                                </div>
                                            </div>
                                          </div>
                                :
                                null)
                            }
                          </div>
                        </div>
                        </div>
                      </div>
                      </div>
                      
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                          <button className="btn button3 pull-right" onClick={this.SubmitBasicInfo.bind(this)} >Save & Next&nbsp;<i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                        </div>
                      </div>
                      </div>
                    </div>
                    </div>
                  </form>
                  </div>
                 
            </section>
          </div>
        </section>
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     vendorID: state.vendorID,
//     vendorLocationID: state.vendorLocationID
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     vendor: (vendorID, vendorLocationID) => dispatch({
//       type: 'VENDOR',
//       vendorID: vendorID,
//       vendorLocationID: vendorLocationID
//     }),
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BasicInfo));
/*export default withRouter(BasicInfo);
*/
const mapStateToProps = (state)=>{
    return {
        user_ID     : state.user_ID,    candidate_id   : state.candidate_id,
        selector    : state.selector,   jobList     : state.jobList,

        userDetails    : state.userDetails ,
        applicantsCountList : state.applicantsCountList
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo)