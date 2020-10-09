import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import S3FileUpload from 'react-s3';
import _ from 'underscore';
import 'bootstrap/js/tab.js';
import './VehicleMaster.css';
import 'react-phone-input-2/lib/style.css';
import 'inputmask/dist/jquery.inputmask.js';
import moment from 'moment';
import IMask from 'imask';
import Loader from "../../coreadmin/Loader/Loader.js";
import "./VehicleMaster.css";
class VehicleMaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "pathname": this.props.match.params.entity,
            // "vehicleImage": [],
            // 'documentindex': 0,
            'showdocimg': false,
            "RCDoc": [],
            "insuranceDoc": [],
            "permitDoc": [],
            "authorizationDoc": [],
            "PUCDoc": [],
            "FitnessDoc": [],
            "categoryArray": [],
            "brandArray": [],
            "modelArray": [],
            "fuelTypeArray": [],
            "vehicleImage" : [],
            "imgBrowse"    : true,
            brand:"",
            model:"",
            category:"",
            workLocation:"",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {

        var compID = localStorage.getItem("companyID")
        var comp_Id = localStorage.getItem("company_Id")
        var companyName = localStorage.getItem("companyName")

        this.setState({
            vendorID: compID,
            companyID: compID,
            vendor_Id: comp_Id,
            companyName:companyName

        }, () => {
            this.getEntityLocation(this.state.vendor_Id);
        })

        this.getSuppliers();
        this.getEntity();
        this.getVehicleCategory();
        this.getDriverData();
        this.getFuelType();
        this.setState({
            vehicleID: this.props.match.params.vehicleID
        }, () => {
            this.edit();
        })

        window.scrollTo(0, 0);
        $.validator.addMethod("regxvendor", function (value, element, arg) {
            return arg !== value;
        }, "Please select the Vendor");
        $.validator.addMethod("regxworkLocation", function (value, element, arg) {
            return arg !== value;
        }, "Please select the Work Location");
        $.validator.addMethod("regxcategory", function (value, element, arg) {
            return arg !== value;
        }, "Please select the category");
        $.validator.addMethod("regxbrand", function (value, element, arg) {
            return arg !== value;
        }, "Please select the brand");
        $.validator.addMethod("regxmodel", function (value, element, arg) {
            return arg !== value;
        }, "Please select the model");
        $.validator.addMethod("regxA1", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid capacity");
        $.validator.addMethod("regxfuelType", function (value, element, arg) {
            return arg !== value;
        }, "Please select the Fuel Type");
        $.validator.addMethod("regxownership", function (value, element, arg) {
            return arg !== value;
        }, "Please select the Owner");
        $.validator.addMethod("regxvehicleDriveType", function (value, element, arg) {
            return arg !== value;
        }, "Please select the Vehicle Drive Type");
        $.validator.addMethod("regxpermitType", function (value, element, arg) {
            return arg !== value;
        }, "Please select the Permit Type");
        $.validator.addMethod("regxA5", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid Vehicle Number");
        $.validator.addMethod("regxA6", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "Please enter valid Vehicle Color");

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        $("#VehicleMaster").validate({
            rules: {
                vendor: {
                    required: true,
                    regxvendor: "-- Select Vendor --"
                },
                workLocation: {
                    required: true,
                    regxworkLocation: "-- Select Work Location --"
                },
                category: {
                    required: true,
                    regxcategory: "--Select Vehicle Category--"
                },
                brand: {
                    required: true,
                    regxbrand: "--Select Brand--"
                },
                // model: {
                //     required: true,
                //     regxmodel: "--Select Model--"
                // },
                capacity: {
                    required: true,
                    regxA1: /^[0-9\b]+$/,
                },
                fuelType: {
                    required: true,
                    regxfuelType: "--Select Fuel Type--"
                },
                ownership: {
                    required: true,
                    regxownership: "--Select Owner--"
                },
                vehicleDriveType: {
                    required: true,
                    regxvehicleDriveType: "--Select Vehicle Drive Type--"
                },
                permitType: {
                    required: true,
                    regxpermitType: "--Select Permit Type--"
                },
                vehicleNumber: {
                    required: true,
                    regxA5: /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/,
                },
                registrationDate: {
                    required: true,
                },
                insuranceDate: {
                    required: true,
                },
                permitValidUpto: {
                    required: true,
                },
                authorizationUpto: {
                    required: true,
                },
                PUCValidUpto: {
                    required: true,
                },
                FitnessValidUpto: {
                    required: true,
                },
                vehiclecolor: {
                    required: true,
                },

                vehicleDocDate0: {
                    required: true,
                },
                vehicleDocDate1: {
                    required: true,
                },
                vehicleDocDate2: {
                    required: true,
                },
                vehicleDocDate3: {
                    required: true,
                },
                vehicleDocDate4: {
                    required: true,
                },
                vehicleDocDate5: {
                    required: true,
                },
                vehicleDocDate6: {
                    required: true,
                },
                vehicleDocDate7: {
                    required: true,
                },
                vehicleDocDate8: {
                    required: true,
                },
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") === "vendor") {
                    error.insertAfter("#entity");
                }
                if (element.attr("name") === "workLocation") {
                    error.insertAfter("#vendorLocation");
                }
                if (element.attr("name") === "category") {
                    error.insertAfter("#category");
                }
                if (element.attr("name") === "brand") {
                    error.insertAfter("#brand");
                }
                // if (element.attr("name") === "model") {
                //     error.insertAfter("#model");
                // }
                if (element.attr("name") === "capacity") {
                    error.insertAfter("#capacity");
                }
                if (element.attr("name") === "fuelType") {
                    error.insertAfter("#fuelType");
                }
                if (element.attr("name") === "ownership") {
                    error.insertAfter("#ownership");
                }
                if (element.attr("name") === "vehicleDriveType") {
                    error.insertAfter("#vehicleDriveType");
                }
                if (element.attr("name") === "permitType") {
                    error.insertAfter("#permitType");
                }
                if (element.attr("name") === "vehicleNumber") {
                    error.insertAfter("#vehicleNumber");
                }
                if (element.attr("name") === "registrationDate") {
                    error.insertAfter("#registrationDate");
                }
                if (element.attr("name") === "insuranceDate") {
                    error.insertAfter("#insuranceDate");
                }
                if (element.attr("name") === "permitValidUpto") {
                    error.insertAfter("#permitValidUpto");
                }
                if (element.attr("name") === "authorizationUpto") {
                    error.insertAfter("#authorizationUpto");
                }
                if (element.attr("name") === "PUCValidUpto") {
                    error.insertAfter("#PUCValidUpto");
                }
                if (element.attr("name") === "FitnessValidUpto") {
                    error.insertAfter("#FitnessValidUpto");
                }
                if (element.attr("name") == "vehiclecolor") {
                    error.insertAfter("#vehiclecolor");
                }

                if (element.attr("name") === "vehicleDocDate0") {
                    error.insertAfter("#vehicleDocDate0");
                }
                if (element.attr("name") === "vehicleDocDate1") {
                    error.insertAfter("#vehicleDocDate1");
                }
                if (element.attr("name") === "vehicleDocDate2") {
                    error.insertAfter("#vehicleDocDate2");
                }
                if (element.attr("name") === "vehicleDocDate3") {
                    error.insertAfter("#vehicleDocDate3");
                }
                if (element.attr("name") === "vehicleDocDate4") {
                    error.insertAfter("#vehicleDocDate4");
                }
                if (element.attr("name") === "vehicleDocDate5") {
                    error.insertAfter("#vehicleDocDate5");
                }
                if (element.attr("name") === "vehicleDocDate6") {
                    error.insertAfter("#vehicleDocDate6");
                }
                if (element.attr("name") === "vehicleDocDate7") {
                    error.insertAfter("#vehicleDocDate7");
                }
                if (element.attr("name") === "vehicleDocDate8") {
                    error.insertAfter("#vehicleDocDate8");
                }
            }
        });
    }
    componentWillUnmount() {
        $("script[src='/js/adminLte.js']").remove();
        $("link[href='/css/dashboard.css']").remove();


    }
    getUploadFileAttachPercentage() {
        var uploadProgressPercent = localStorage.getItem("uploadUserImageProgressPercent");
        if (uploadProgressPercent) {
            var percentVal = parseInt(uploadProgressPercent);
            if (percentVal) {
                var styleC = {
                    width: percentVal + "%",
                    display: "block",
                    height: "8px",
                }
                var styleCBar = {
                    display: "block",
                    marginTop: 10,
                    height: "8px",
                }
            }
            if (!percentVal) {
                var percentVal = 0;

                var styleC = {
                    width: 0 + "%",
                    display: "none",
                    height: "8px",
                }
                var styleCBar = {
                    display: "none",
                    marginTop: 10,
                    height: "8px",
                }



            }
            if (percentVal === 100) {
                var percentVal = 0;

                var styleC = {
                    width: 0 + "%",
                    display: "none",
                    height: "8px",
                }
                var styleCBar = {
                    display: "none",
                    marginTop: 10,
                    height: "8px",
                }

            }
            return (
                <div>
                    <div className="progress col-lg-12" style={styleCBar}>
                        <div className="progress-bar progress-bar-striped active" role="progressbar"
                            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={styleC}>
                        </div>
                    </div>
                </div>
            );
        }
    }
    getUploadLogoPercentage() {
        var uploadProgressPercent = localStorage.getItem("imageprogress");
        if (uploadProgressPercent) {
            var percentVal = parseInt(uploadProgressPercent);
            if (percentVal) {
                var styleC = {
                    width: percentVal + "%",
                    display: "block",
                    height: "8px",
                }
                var styleCBar = {
                    display: "block",
                    marginTop: 10,
                    height: "8px",
                    padding: "0px",
                }
            }
            if (!percentVal) {
                var percentVal = 0;

                var styleC = {
                    width: 0 + "%",
                    display: "none",
                    height: "8px",
                }
                var styleCBar = {
                    display: "none",
                    marginTop: 10,
                    height: "8px",
                    padding: "0px",
                }

            }
            if (percentVal === 100) {
                var percentVal = 0;

                var styleC = {
                    width: 0 + "%",
                    display: "none",
                    height: "8px",
                }
                var styleCBar = {
                    display: "none",
                    marginTop: 10,
                    height: "8px",
                    padding: "0px",
                }

            }
            return (
                <div>
                    <div className="progress col-lg-12" style={styleCBar}>
                        <div className="progress-bar progress-bar-striped active" role="progressbar"
                            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={styleC}>
                        </div>
                    </div>
                </div>
            );
        }
    }

    handleChangeCategory(event){
        const target = event.target;
        const name = target.name;
        const value = event.target.value;

        this.setState({
            [name]: event.target.value
        },()=>{
             var catId = value.split("|")[0];
             this.getBrand(catId)
        }); 
    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        const token = $(event.target).attr('token');
        const indexof = $(event.target).attr('index');
        console.log("token==>", token);
        console.log("indexof==>", indexof);
        if (name == ['vehicleDocDate' + indexof]) {
            console.log("name in if==>", name);
            this.setState({
                ['documentName' + indexof]: token
            })
            
        }

        // const target = event.target;
        const value = event.target.value;
        const brandname = target.name;
        
        this.setState({
            [brandname]: event.target.value
        },()=>{
            if(brandname == "brand")
            {
             var brandId = value.split("|")[0];
             this.getModel(brandId)

            }
        });
        this.setState({
            [name]: event.target.value,
        }, () => { });
    }

    handleOptionChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });
    }
    submit(event) {
        event.preventDefault();
        var index = this.state.documentindex;
        // console.log("index in submit==>",index);
        // console.log("this.state.vehicleDocument Name==>",this.state[`documentName${i}`]);
        var docarr =[];
        var imgarr = [];
        for(var i=0; i<index; i++){
            if(this.state["docproofimg"+i]) {
                imgarr = (this.state["docproofimg"+i]).concat(this.state["DocProof"+i]);
            }else{
                imgarr =(this.state["DocProof"+i]);
            }
            var docvalue = 
            {
                documentName    :   this.state[`documentName${i}`],
                vehicleDocDate  :   this.state[`vehicleDocDate${i}`],
                vehicleDocImg   :   imgarr != null ? imgarr : [],
                status          :   "New",

            }
            // console.log("docvalue==>",docvalue);
            docarr.push(docvalue)
        } 
        this.setState({
            vehicleDocument : docarr,
        }, () => {
            // console.log("this.state.vehicleDocument==>",this.state.vehicleDocument);
        });
        // console.log("docarr==>",docarr);
        if ($('#VehicleMaster').valid()) {
            console.log("this.props", this.props)
            var formValues = {
                company_Id: this.state.vendor_Id,
                companyID: this.state.companyID,
                companyName: this.state.companyName,
                workLocation: this.state.workLocation,
                workLocationId: this.state.workLocationId,
                vehicleDocument : docarr,
                status: "Inactive",
                "vehicleImage": this.state.vehicleImage,
                "vehicleID": this.props.match.params.vehicleID,
                "categoryId": this.state.category.split('|')[0],
                "category": this.state.category.split('|')[1],
                "brandId": this.state.brand.split('|')[0],
                "brand": this.state.brand.split('|')[1],
                "modelId": this.state.model.split('|')[0],
                "model": this.state.model.split('|')[1],
                "capacity": this.state.capacity,
                "fuelTypeId": this.state.fuelType.split('|')[0],
                "fuelType": this.state.fuelType.split('|')[1],
                "vehicleDriveType": this.state.vehicleDriveType,
                "vehiclecolor": this.state.vehiclecolor,
                "ownership": this.state.ownership,
                "supplier": this.state.supplier,
                "vehicleNumber": this.state.vehicleNumber,
                "permitType": this.state.permitType,
                // "registrationDate": this.state.registrationDate,
                // "RCDoc": this.state.RCDoc,
                // "insuranceDate": this.state.insuranceDate,
                // "insuranceDoc": this.state.insuranceDoc,
                // "permitValidUpto": this.state.permitValidUpto,
                // "permitDoc": this.state.permitDoc,
                // "authorizationUpto": this.state.authorizationUpto,
                // "authorizationDoc": this.state.authorizationDoc,
                // "PUCValidUpto": this.state.PUCValidUpto,
                // "PUCDoc": this.state.PUCDoc,
                // "FitnessValidUpto": this.state.FitnessValidUpto,
                // "FitnessDoc": this.state.FitnessDoc,
                "createdBy": localStorage.getItem("user_ID")
            }
            console.log('formValues', formValues);
            if (this.props.match.params.vehicleID) {
                axios.patch('/api/vehiclemaster/patch', formValues)
                    .then((response) => {
                        console.log('responsepatch', response);
                        if (response.data.duplicated === true) {
                            swal(" ", "This vehicle number already exist.");
                        } else {
                            this.setState({
                                "vehicleImage": [],
                                "vehicleID": "",
                                "categoryId": "",
                                "category": "",
                                "brandId": "",
                                "brand": "",
                                "modelId": "",
                                "model": "",
                                "capacity": "",
                                "fuelTypeId": "",
                                "fuelType": "",
                                "vehicleDriveType": "",
                                "ownership": "",
                                "supplier": "",
                                "vehicleNumber": "",
                                "vehiclecolor": "",
                            })
                            swal(" ", "Vehicle details updated successfully.");
                            document.getElementById("submitbtn").innerHTML = "Submit";
                            this.props.history.push('/vehicle-list');
                        }
                    })
                    .catch((error) => {

                    })
            } else {
                axios.post('/api/vehiclemaster/post', formValues)
                    .then((response) => {
                        console.log('responsepost', response);
                        if (response.data.duplicated === true) {
                            swal(" ", "This vehicle number already exist.");
                        } else {
                            this.setState({
                                "vehicleImage": [],
                                "vehicleID": "",
                                "categoryId": "",
                                "category": "",
                                "brandId": "",
                                "brand": "",
                                "modelId": "",
                                "model": "",
                                "capacity": "",
                                "fuelTypeId": "",
                                "fuelType": "",
                                "vehicleDriveType": "",
                                "ownership": "",
                                "supplier": "",
                                "vehicleNumber": "",
                                "vehiclecolor": "",
                            })
                            swal(" ", "Vehicle details added successfully.");
                            this.props.history.push('/vehicle-list');
                        }
                    })
                    .catch((error) => {

                    })
            }
        } 
        else{
            $('select.error:first').focus();
            $('input.error:first').focus();
        }
        // else {
        //     $(event.target).parent().parent().find('.inputText.error:first').focus();
        // }

    }

    docBrowse(event) {
        event.preventDefault();
        $('#loader_img').show();
        // $('.fullpageloader').show();
        
        var name = event.target.name;
        var uploadedfiles = [];
        if (event.currentTarget.files && event.currentTarget.files[0]) {
          for (var i = 0; i < event.currentTarget.files.length; i++) {
            var file = event.currentTarget.files[i];
            if (file) {
              var fileName = file.name;
              var ext = fileName.split('.').pop();
              if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "pdf" || ext === "JPG" || ext === "PNG" || ext === "JPEG" || ext === "PDF") {
                var objTitle = { fileInfo: file }
                uploadedfiles.push(objTitle);
              } else {
                swal("Allowed file formats are jpg, png, jpeg, pdf");
              }//file types
            }//file
            else {
              swal("Files not uploaded");
            }//file
          }//for 
    
          if (event.currentTarget.files) {
            this.setState({
              ["gotImage" + name]: true
            })
            main().then(formValues => {
              var docBrowsearr = [];
              // var docBrowsearr = this.state[name];
              for (var k = 0; k < formValues.length; k++) {
                docBrowsearr.push(formValues[k].imgUrl)
              }
              console.log("docBrowsearr==>", docBrowsearr);
              console.log("formValues Img==>", formValues[0].imgUrl);
              this.setState({
                [name]: docBrowsearr,
                documentArray: docBrowsearr,
                        // docBrowse : true,

    
              }, () => {
              })
            });
    
            async function main() {
              var formValues = [];
              for (var j = 0; j < uploadedfiles.length; j++) {
                var config = await getConfig();
                var s3url = await s3upload(uploadedfiles[j].fileInfo, config, this);
                const documentProof = {
                  "imgUrl": s3url,
                  "status": "New",
                  "remark": "",
                  "createdBy": localStorage.getItem("user_ID"),
                  "createdAt": new Date(),
                };
                formValues.push(documentProof);
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
                    $('#loader_img').hide();
                    // console.log("response.data Img==>",response.data);
    
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
    imgBrowse(event) {
        event.preventDefault();
        var name = event.target.name
        var imgBrowse = [];
        this.setState({
                        imgBrowse : false,
                    }, () => {
                        console.log("this.state.imgBrowse==>",this.state.imgBrowse);
                    });
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            for (var i = 0; i < event.currentTarget.files.length; i++) {
                var file = event.currentTarget.files[i];

                if (file) {
                    var fileName = file.name;
                    var ext = fileName.split('.').pop();
                    if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "JPG" || ext === "PNG" || ext === "JPEG") {
                        if (file) {
                            var objTitle = { fileInfo: file }
                            imgBrowse.push(objTitle);
                            console.log('imgBrowse',imgBrowse);

                        } else {
                            swal(" ", "Files not uploaded");
                        }//file
                    } else {
                        swal(" ", "Allowed images formats are (jpg,png,jpeg)");
                    }//file types
                }//file
            }//for 

            if (event.currentTarget.files) {
                main().then(formValues => {
                    console.log('formValues',formValues);
                    var imgBrowse = this.state[name];
                    for (var k = 0; k < formValues.length; k++) {
                    console.log('formValues[k].imgBrowse',formValues[k].imgBrowse);
                        imgBrowse.push(formValues[k].imgBrowse)
                    }
                    console.log('imgBrowse',imgBrowse);

                    this.setState({
                        [name]: imgBrowse,
                        imgBrowse : true,
                    }, () => {
                    console.log('this.state.',this.state.vehicleImage);
                    })
                });

                async function main() {
                    var name = event.target.name
                    var formValues = [];
                    for (var j = 0; j < imgBrowse.length; j++) {
                        var config = await getConfig();
                        var s3url = await s3upload(imgBrowse[j].fileInfo, config, this);
                        const formValue = {
                            "imgBrowse": s3url,
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
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 90)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
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
    componentWillReceiveProps(nextProps) {
        this.edit();
        this.handleChange = this.handleChange.bind(this);
    }
    admin(event) {
        event.preventDefault();
        this.props.history.push('/adminDashboard');
    }
    edit() {
        var vehicleID = this.state.vehicleID;
        if (vehicleID !== '') {

            axios.get('/api/vehiclemaster/get/one/' + vehicleID)
                .then((response) => {
                    console.log("response", response.data);
                    var docarray = response.data.vehicleDocument;
                    var index = docarray;
                    // console.log("index in update==>",index);
                    // console.log("response docarray:=>", docarray)
                    var docarr =[]
                    for(var i=0; i<index.length; i++){
                        const docvalue = {
                            "documentName"          :docarray[i].documentName,
                            "vehicleDocDate"        :docarray[i].vehicleDocDate,
                            "documentProof"         :docarray[i].vehicleDocImg,
                                                    
                        }
                        docarr.push(docvalue)
                        this.setState({
                            ['documentName'+i]      : docarray[i].documentName,
                            ['vehicleDocDate'+i]    : docarray[i].vehicleDocDate,
                            ["docproofimg"+i]       : docarray[i].vehicleDocImg,
                            showdocimg              : true,
                        })
                        // console.log("docarr after push:=>", docarr)
                    } 
                    this.setState({
                        DocumentsDetails : docarr,
                    }, () => {
                        // console.log("this.state.Documentarray In edit==>",this.state.DocumentsDetails);
                    });
                    document.getElementById("submitbtn").innerHTML = "Update";
                    this.setState({
                        vehicleDocument : docarr,
                        "vendor_Id": response.data.company_Id,
                        "workLocation": response.data.workLocation,
                        "workLocationId": response.data.workLocationId,
                        "companyID": response.data.companyID,
                        "vehicleImage": response.data.vehicleImage,
                        "vendor": response.data.companyName,
                        "vehicleID": this.props.match.params.vehicleID,
                        "category": response.data.categoryId + "|" + response.data.category,
                        "brand": response.data.brandId + "|" + response.data.brand,
                        "model": response.data.modelId + "|" + response.data.model,
                        "capacity": response.data.capacity,
                        "fuelType": response.data.fuelTypeId + "|" + response.data.fuelType,
                        "vehicleDriveType": response.data.vehicleDriveType,
                        "ownership": response.data.ownership,
                        "supplier": response.data.supplier,
                        "vehicleNumber": response.data.vehicleNumber,
                        "vehiclecolor": response.data.vehiclecolor,
                        "registrationDate": moment(response.data.registrationDate).format("YYYY-MM-DD"),
                        "RCDoc": response.data.RCDoc,
                        "insuranceDate": moment(response.data.insuranceDate).format("YYYY-MM-DD"),
                        "insuranceDoc": response.data.insuranceDoc,
                        "permitType": response.data.permitType,
                        "permitValidUpto": moment(response.data.permitValidUpto).format("YYYY-MM-DD"),
                        "permitDoc": response.data.permitDoc,
                        "authorizationUpto": moment(response.data.authorizationUpto).format("YYYY-MM-DD"),
                        "authorizationDoc": response.data.authorizationDoc,
                        "PUCValidUpto": moment(response.data.PUCValidUpto).format("YYYY-MM-DD"),
                        "FitnessValidUpto": moment(response.data.FitnessValidUpto).format("YYYY-MM-DD"),
                        "PUCDoc": response.data.PUCDoc,
                        "FitnessDoc": response.data.FitnessDoc,
                    }, () => {
                        this.getEntityLocation(this.state.vendor_Id);
                        this.getModel(this.state.brand.split("|")[0])
                        this.getBrand(response.data.categoryId)
                    })
                })
                .catch((error) => {
                })
        }
    }
    deleteDoc(event) {
        var name = event.target.getAttribute("name");
        console.log("name",name);
        var deleteDoc = this.state[name];
        console.log("deleteDoc",deleteDoc,name)
        if(deleteDoc){
        const index = deleteDoc.indexOf(event.target.getAttribute("id"));
        if (index > -1) {
          deleteDoc.splice(index, 1);
        }
        this.setState({
          [name]: deleteDoc,
          ["gotImage"+name]: false

        })
        }
    }
    getVehicleCategory() {
        axios.get('/api/categorymaster/get/list')
            .then((response) => {
                this.setState({
                    categoryArray: response.data
                })
            })
            .catch((error) => {

            })
    }
    getBrand(id) {
        axios.get('/api/categoryBrandmaster/get/brandlist/'+id)
            .then((response) => {

                this.setState({
                    brandArray: response.data
                }, () => {
                    // console.log("brandArray", this.state.brandArray);
                })
            })
            .catch((error) => {

            })
    }
    getModel(brandId) {
        console.log('brandId==>',brandId)
        axios.get('/api/modelmaster/get/Modellist/'+brandId)
            .then((response) => {
                console.log("response in model==>",response.data)
                this.setState({
                    modelArray: response.data
                })
            })
            .catch((error) => {

            })
    }
    getFuelType() {
        axios.get('/api/fueltypemaster/get/list')
            .then((response) => {
                this.setState({
                    fuelTypeArray: response.data
                })
            })
            .catch((error) => {

            })
    }
    changeVehicleNumber(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        var dynamicMask = new IMask(document.getElementById('vehicleNumber'), {
            mask: [{
                mask: 'aa 00 aa 0000',
                prepare: function (str) {
                    return str.toUpperCase();
                },
            }]
        })

    }
    handleworklocationChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;

        var e = document.getElementById("entity");
        // var comp_Id = e.options[e.selectedIndex].getAttribute("comp_Id");
        // var compID = e.options[e.selectedIndex].getAttribute("compID");
        var vendorLocation = document.getElementById("vendorLocation");
        var locationID = vendorLocation.options[vendorLocation.selectedIndex].getAttribute("locationID");
        var value = event.target.value;
        this.setState({
            [name]: event.target.value,
            workLocationId: locationID,
            // vendorID: compID,
            // companyID: compID,
            // vendor_Id: comp_Id

        }, () => {
            console.log("vendor_Id", this.state.vendor_Id)
            this.getEntityLocation(this.state.vendor_Id);
        })
    }
    getEntity(entityCode) {
        axios.get('/api/entitymaster/get/vendor')
            .then((response) => {
                this.setState({
                    entityArray: response.data,
                }, () => {
                    // console.log("entityArray", this.state.entityArray)
                    if (this.state.entityArray && this.state.entityArray.lenght > 0) {
                        var EntityCode = this.state.entityArray.filter((a) => a.entityCode == entityCode);
                    }
                })
            })
            .catch((error) => {
            })
    }

    getDriverData() {
        // var entityname =this.state.pathname;
        var entityname = 'vehicle';
        console.log('entityname==>>', entityname);
        axios.get('/api/documentlistmaster/get/list/' + entityname)
            .then((response) => {
                var DocumentsDetails = response.data
                console.log('response of driver data==>>', DocumentsDetails);
                this.setState({
                    DocumentsDetails: DocumentsDetails,
                    documentindex: DocumentsDetails.length,
                })
            })
            .catch((error) => {
            })
    }

    getEntityLocation(companyId) {
        axios.get('/api/entitymaster/get/one/' + companyId)
            .then((response) => {
                console.log("response",response);
                this.setState({
                    vendorLocationArray: response.data[0]
                })
            })
            .catch((error) => {
            })
    }
    getSuppliers() {
        axios.get("/api/entitymaster/get/supplier")
            .then((response) => {
                this.setState({
                    supplierList: response.data.reverse()
                }, () => {
                    // console.log("Reverse supplierList :", this.state.supplierList);
                })
            })
            .catch((error) => {
            })
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Vehicle Master</h4>
                                </div>
                                <section className="Content">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <form id="VehicleMaster">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 submitForm NOpadding">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls NOpadding">
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls NOpadding">
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    {/*<div className="form-margin col-lg-4 col-md-6 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Vendor<sup className="astrick">*</sup></label>
                                                                        <select id="entity" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.vendor} ref="vendor" name="vendor" onChange={this.handleworklocationChange.bind(this)}>
                                                                            <option disabled value=" " selected>-- Select Vendor --</option>
                                                                            {
                                                                                this.state.entityArray && this.state.entityArray.length > 0 ?
                                                                                    this.state.entityArray.map((data, i) => {
                                                                                        return (
                                                                                            <option key={i} compID={data.companyID} comp_Id={data._id} value={data._companyName}>{data.companyName}</option>
                                                                                            // <option key={i} id={data.entityCode}>{data.entityCode}</option>
                                                                                        );
                                                                                    })
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </select>
                                                                    </div>*/}
                                                                    <div className="form-margin col-lg-4 col-md-6 col-sm-12 col-xs-12 marbtm30" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Work Location <sup className="astrick">*</sup></label>
                                                                        <select id="vendorLocation" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.workLocation} ref="workLocation" name="workLocation" onChange={this.handleworklocationChange.bind(this)}>
                                                                            <option disabled value="" >-- Select Work Location --</option>
                                                                            {
                                                                                this.state.vendorLocationArray && this.state.vendorLocationArray.locations.length > 0 ?
                                                                                    this.state.vendorLocationArray.locations.map((data, i) => {
                                                                                        return (
                                                                                             <option key={i} locationID={data._id} value={((data.locationType).match(/\b(\w)/g)).join('') + "-" + data.area + " " + data.city + " " + data.district +" "+ data.stateCode + "-" + data.countryCode}>{((data.locationType).match(/\b(\w)/g)).join('')} - {data.area} {data.city},{data.district} {data.stateCode} - {data.countryCode}  </option>
                                                                                        );
                                                                                    })
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                     <div className="form-margin col-lg-4 col-md-4 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Ownership<sup className="astrick">*</sup></label>
                                                                        <select id="ownership" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.ownership} ref="ownership" name="ownership" onChange={this.handleChange}>
                                                                            <option disabled value=" " selected>--Select Owner--</option>
                                                                            <option >Own</option>
                                                                            <option >Supplier</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                 {
                                                                        this.state.ownership === "Supplier" ?
                                                                            <div className=" col-lg-4 col-md-6 col-sm-12 col-xs-12" >
                                                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Supplier<sup className="astrick">*</sup></label>
                                                                                <select id="supplier" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.supplier} ref="supplier" name="supplier" onChange={this.handleChange.bind(this)}>
                                                                                    <option disabled value=" " selected>{"--Select Supplier --"}</option>
                                                                                    {
                                                                                        this.state.supplierList && this.state.supplierList.length > 0 ?
                                                                                            this.state.supplierList.map((data, i) => {
                                                                                                return (
                                                                                                    <option key={i} compID={data.companyID} comp_Id={data._id} value={data._companyName}>{data.companyName}</option>
                                                                                                );
                                                                                            })
                                                                                            :
                                                                                            null
                                                                                    }
                                                                                </select>
                                                                            </div>
                                                                            : null
                                                                    }
                                                                </div>
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Vehicle Category <sup className="astrick">*</sup></label>
                                                                        <select id="category" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.category} ref="category" name="category" onChange={this.handleChangeCategory.bind(this)}>
                                                                            <option disabled value="">--Select Vehicle Category--</option>
                                                                            {
                                                                                this.state.categoryArray && this.state.categoryArray.length > 0 ?
                                                                                    this.state.categoryArray.map((data, i) => {
                                                                                        return (
                                                                                            <option key={i} value={data._id + "|" + data.category}>{data.category}</option>
                                                                                        );
                                                                                    })
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Brand <sup className="astrick">*</sup></label>
                                                                        <select id="brand" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.brand} ref="brand" name="brand" onChange={this.handleChange}>
                                                                            <option disabled value="">--Select Brand--</option>
                                                                            {
                                                                                this.state.brandArray && this.state.brandArray.length > 0 ?
                                                                                    this.state.brandArray.map((data, i) => {
                                                                                        return (
                                                                                            <option key={i} value={data.brandId + "|" + data.brand}>{data.brand}</option>
                                                                                        );
                                                                                    })
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Model <sup className="astrick">*</sup></label>
                                                                        <select id="model" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.model} ref="model" name="model" onChange={this.handleChange}>
                                                                            <option disabled value="">--Select Model--</option>
                                                                            {
                                                                                this.state.modelArray && this.state.modelArray.length > 0 ?
                                                                                    this.state.modelArray.map((data, i) => {
                                                                                        return (
                                                                                            <option key={i} value={data._id + "|" + data.model}>{data.model}</option>
                                                                                        );
                                                                                    })
                                                                                    :
                                                                                    null
                                                                            }
                                                                            {/*<option value="5e31730c71c2006931010cdc|Other">Other</option>*/}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">

                                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Fuel Type <sup className="astrick">*</sup></label>
                                                                        <select id="fuelType" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.fuelType} ref="fuelType" name="fuelType" onChange={this.handleChange}>
                                                                            <option disabled value=" " selected>--Select Fuel Type--</option>
                                                                            {
                                                                                this.state.fuelTypeArray && this.state.fuelTypeArray.length > 0 ?
                                                                                    this.state.fuelTypeArray.map((data, i) => {
                                                                                        return (
                                                                                            <option key={i} value={data._id + "|" + data.fuelType}>{data.fuelType}</option>
                                                                                        );
                                                                                    })
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Vehicle Drive Type <sup className="astrick">*</sup></label>
                                                                        <select id="vehicleDriveType" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.vehicleDriveType} ref="vehicleDriveType" name="vehicleDriveType" onChange={this.handleChange}>
                                                                            <option disabled value=" " selected>--Select Vehicle Drive Type--</option>
                                                                            <option value="Private">Private</option>
                                                                            <option value="Commercial">Commercial</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Capacity <i className="astrick">*</i></label>
                                                                        <input type="number" id="capacity" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.capacity} ref="capacity" name="capacity" onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                   
                                                                    <div className="form-margin col-lg-4 col-md-4 col-sm-12 col-xs-12" >
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Permit Type<sup className="astrick">*</sup></label>
                                                                        <select id="permitType" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.permitType} ref="permitType" name="permitType" onChange={this.handleChange}>
                                                                            <option disabled value=" " selected>--Select Permit Type--</option>
                                                                            <option >All India</option>
                                                                            <option >State</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-margin  col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Vehicle Number <i className="astrick">*</i>
                                                                            <a data-tip data-for='basicInfo4Tooltip' className="pull-right"> <i title="MH 12 DE 1433" className="fa fa-question-circle"></i> </a></label>
                                                                        <input type="text" id="vehicleNumber" placeholder="MH 12 DE 1433" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.vehicleNumber} ref="vehicleNumber" name="vehicleNumber" onChange={this.changeVehicleNumber.bind(this)} required />
                                                                    </div>
                                                                </div>
                                                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                    <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Vehicle Color <i className="astrick">*</i></label>
                                                                        <input type="text" id="vehiclecolor" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.vehiclecolor} ref="vehiclecolor" name="vehiclecolor" onChange={this.handleChange} required />
                                                                    </div>

                                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 NOpadding">
                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                            <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Add Vehicle Image (jpg, jpeg, png)</label>
                                                                        </div>
                                                                        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 ">
                                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                                                                    <div><i className="fa fa-upload"></i> <br /></div>
                                                                                    <input multiple onChange={this.imgBrowse.bind(this)} id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="vehicleImage" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            this.state.imgBrowse === false 
                                                                            ?
                                                                            <div  className="col-lg-2 col-md- col-sm-12 col-xs-12">
                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom marginminus" id="hide">
                                                                                  
                                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                                                                        <img src="/images/loading.gif" className="img-responsive logoStyle" />
                                                                                    </div>
                                                                                    
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            :
                                                                            this.state.vehicleImage && this.state.vehicleImage.length > 0 ?
                                                                                this.state.vehicleImage.map((logo, i) => {
                                                                                    console.log('logo',logo, "i");
                                                                                    return (
                                                                                        logo ? 
                                                                                            <div key={i} className="col-lg-2 col-md- col-sm-12 col-xs-12">
                                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                                                                    <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={logo} name="vehicleImage" onClick={this.deleteDoc.bind(this)} title="Delete Image">x</label>                                                                                                       
                                                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                                                                                        <img src={logo} className="img-responsive logoStyle" />
                                                                                                    </div>
                                                                                                                                                                                                    
                                                                                                </div>
                                                                                            </div>
                                                                                        :null
                                                                                    );
                                                                                })
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {
                                                                    this.state.DocumentsDetails && this.state.DocumentsDetails.length > 0 ?
                                                                        this.state.DocumentsDetails.map((doc, i) => {
                                                                            return (
                                                                                <div key={i} className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                                                                    <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
                                                                                        <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                                                            <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">{doc.documentName} Valid To <i className="astrick">*</i></label>
                                                                                            <input type="date" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" max={ "9999-12-31" } name={"vehicleDocDate" + i} id={"vehicleDocDate" + i} value={doc.vehicleDocDate ?moment(this.state[`vehicleDocDate${i}`]).format("YYYY-MM-DD") : this.state[`vehicleDocDate${i}`]} index={i} token={doc.documentName} min={moment(new Date).format("YYYY-MM-DD")} ref={"vehicleDocDate" + i} onChange={this.handleChange} required />
                                                                                        </div>
                                                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpadding">
                                                                                            <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                                                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Add {doc.documentName} Document (jpg, jpeg, png, pdf)</label>
                                                                                            </div>
                                                                                            <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 ">
                                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom " id="hide">
                                                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne" >
                                                                                                        <div><i className="fa fa-upload"></i><br/></div>
                                                                                                        <input multiple onChange={this.docBrowse.bind(this)} name={"DocProof" + i} id={"ImgProof" + i} value={this.state[`ImgProof${i}`]} type="file" token={doc.documentName} className="LogoImageUp form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            {
                                                                                            
                                                                                                this.state["DocProof"+i] && this.state["DocProof" + i].length > 0 ?
                                                                                                    this.state["DocProof"+i].map((data, i) => {
                                                                                                        console.log("data DocProof==>", data);
                                                                                                        return (
                                                                                                            <div key={i} className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                                                                                    <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={data} name={"DocProof"+i} data-toggle="tooltip" title="Delete Image" onClick={this.deleteDoc.bind(this)}>x</label>
                                                                                                                    {
                                                                                                                        (data ? data.split('.').pop() : "") === "pdf" || (data ? data.split('.').pop() : "") === "PDF" ?
                                                                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdfContainerPM" >
                                                                                                                            <img src="/images/pdfImg.png" />
                                                                                                                            <span>{(data ? data.split('.').pop() : "")}</span>
                                                                                                                        </div>
                                                                                                                        :
                                                                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                                                                                                            <img src={data} className="img-responsive logoStyle" />
                                                                                                                        </div>
                                                                                                                    }
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        );
                                                                                                    })
                                                                                                    :
                                                                                                    (this.state["gotImageDocProof"+i] ?
                                                                                                              
                                                                                                            <div key={i} className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                                                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos marginminus" id="LogoImageUpOne"  >
                                                                                                                        <img src="/images/loading.gif" className="img-responsive logoStyle" />
                                                                                                                        
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        :
                                                                                                        null)
                                                                                            }
                                                                                            {
                                                                                                this.state.showdocimg ?
                                                                                                    this.state["docproofimg"+i]  && this.state["docproofimg"+i].length > 0 ?
                                                                                                        this.state["docproofimg"+i].map((data, index) => {
                                                                                                            
                                                                                                            return (
                                                                                                                
                                                                                                                <div key={index} className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                                                                                {console.log("data DocProof==>", data,i,index)}
                                                                                                                {
                                                                                                                    data !== null ?
                                                                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                                                                                        <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={data} name={"docproofimg"+i} data-toggle="tooltip" title="Delete Image" onClick={this.deleteDoc.bind(this)}>x</label>
                                                                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogos" id="LogoImageUpOne">
                                                                                                                        
                                                                                                                                <img src={data} className="img-responsive logoStyle" />
                                                                                                                           
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    : 
                                                                                                                    null
                                                                                                                }
                                                                                                                </div>
                                                                                                                
                                                                                                            );
                                                                                                        })
                                                                                                        :
                                                                                                        null
                                                                                                    :
                                                                                                    null
                                                                                            }
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
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                                                            <button id="submitbtn" className="btn button3 pull-right" onClick={this.submit.bind(this)} >Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
export default VehicleMaster;