import React, { Component } from 'react';
import $ from 'jquery';
import jQuery from 'jquery';
import axios from 'axios';
import swal from 'sweetalert';
import S3FileUpload from 'react-s3';
import PhoneInput from 'react-phone-input-2';
import { withRouter } from 'react-router-dom';
import BulkUpload from "../../Common/BulkUpload/BulkUpload.js";
import MenuDiv from "../../Common/MenuDiv/MenuDiv.js";
import Autosuggest from 'react-autosuggest';
import Moment               from 'moment';
import 'bootstrap/js/tab.js';
import '../css/SupplierOnboardingForm.css';
import 'react-phone-input-2/lib/style.css';
import "bootstrap-toggle/css/bootstrap2-toggle.min.css";
import "bootstrap-toggle/js/bootstrap2-toggle.min.js";

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageYears         : 0, 
      ageMonths        : 0, 
      ageDays          : 0,
      lastName         : "",
      dob              : "",
      firstName        : "",
      middleName       : "",
      profilePhoto       : "",
      profileImageUrl    : "",
      gender             : "male",
      anniversaryDate    : "",  
      maritalStatus      : "",
      nationality        : "",
      panCardNo          : "",
      adhaarCardNo       : "",
      selectedValue      : [],
      inputNationality   : ["Indian","American"],
      languages        : [],
      inputLanguages     : [],
      imageUploaded      : true,
      profilePicture     : "",

      "imageUploaded"    : true,
      inputMaritalStatus : ["Single",,"Married", "Separated","Divorced","Widowed"], 

    };
 
    this.handleChange              = this.handleChange.bind(this);
    this.handleOptionChange        = this.handleOptionChange.bind(this);
    this.SubmitBasicInfo           = this.SubmitBasicInfo.bind(this);
  }
  componentDidMount() {
   
     
    }
   

  // =======================//
    handleChange(event) {
    event.preventDefault();
   
    const name = event.currentTarget.name;
    var value = event.currentTarget.value;

    this.setState({
      [name]: value
    });
    if(name==="dob"){
      this.calAge(value);
    }
  }


  setGender(event){
    event.preventDefault();
    var id  = event.currentTarget.id;
    console.log(id);
    this.setState({
      gender:id,
    })
  }

  delImgPreview(event){
    this.setState({
      profileImageUrl:""
    })
  }

  imgBrowse(event){
    event.preventDefault();
    console.log("heelo");
    var profilePicture = [];
    if (event.currentTarget.files ) {
    const imgFile = event.currentTarget.value;
    const files   = event.currentTarget.files;
    // imgValue      = imgFile.split(".");
    // if(imgValue[1] !== 'jpg'){
    //  this.setState({

    //  })
    // }

    const imgUrl =  URL.createObjectURL(event.target.files[0]);
    
    this.setState({
      profileImageUrl : imgUrl
    })
    var file = event.currentTarget.files[0];
    if (file) {
          var fileName = file.name;
          var fileSize = file.size;
          var ext = fileName.split('.').pop();
          if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "JPG" || ext === "PNG" || ext === "JPEG") {
            if(fileSize > 1048576){
              swal.fire("Allowed file size is 1MB");
            }else{
              if (file) {
                var objTitle = { fileInfo: file }
                profilePicture.push(objTitle);
              } else {
                swal.fire("Images not uploaded");
              }//file
            }
          } else {
            swal.fire("Allowed images formats are (jpg,png,jpeg)");
            this.setState({
              gotProfileImage:false
            })
          }//file types
        }
         if (event.currentTarget.files) {
        this.setState({
          gotProfileImage:true
        })
        main().then(formValues => {
         
    console.log(formValues)
          this.setState({
            profilePicture   : formValues[0].profilePicture,
            imageUploaded : false
          })
        });

        async function main() {
          var formValues = [];
        
            var config = await getConfig();
            var s3url = await s3upload(profilePicture[0].fileInfo, config, this);
            const formValue = {
              "profilePicture": s3url,
              "status": "New"
            };
            formValues.push(formValue);

          
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
            axios.post('/api/projectsettings/getS3Details/S3')
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
  // =======================//


  handleOptionChange(event) {
    const target = event.target;
    const name = target.name;
   

    this.setState({
      [name]: event.target.value
    });

  }
  calAge(dob){
    var currentDate = Moment(new Date());
      var age     = Moment.duration(currentDate.diff(dob));
      var Years   = age.years();
      var Months  = age.months();
      var days   = age.days();
      

      this.setState({
        ageYears : Years,
        ageMonths: Months,
        ageWeeks : days,
      })
  }
  SubmitBasicInfo(event) {
    event.preventDefault();

      var formValues = {

                firstName          : this.state.firstName,
                candidateID        : this.state.candidateID,
                middleName         : this.state.middleName,
                lastName           : this.state.lastName,
                dob                : this.state.dob,
                gender             : this.state.gender,
                anniversaryDate    : this.state.anniversaryDate,  
                maritalStatus      : this.state.maritalStatus,
                nationality        : this.state.nationality,
                panCard            : this.state.panCardNo,
                aadhaarCard        : this.state.adhaarCardNo,
                languagesKnown     : this.state.selectedValue,
                age            : this.state.age,
                profilePicture     : this.state.profilePicture,
                
              }
        
    }




  /*======== alphanumeric  =========*/

   getFileDetails(fileName){
     axios
      .get(this.state.fileDetailUrl+fileName)
      .then((response)=> {
      $('.fullpageloader').hide();  
      if (response) {
        this.setState({
            fileDetails         : response.data,
            failedRecordsCount  : response.data.failedRecords.length,
            goodDataCount       : response.data.goodrecords.length
        });
          console.log("response.data.goodrecords----",response.data.goodrecords);
          var tableData = response.data.goodrecords.map((a, i)=>{
            return{
                
                "entityType": a.entityType ? a.entityType : '-',
                "companyName": a.companyName ? a.companyName : '-',
                "groupName": a.groupName ? a.groupName : '-',
                "website": a.website ? a.website : '-',
                "companyPhone": a.companyPhone ? a.companyPhone : '-',
                "companyEmail": a.companyEmail ? a.companyEmail : '-',
                "CIN": a.CIN ? a.CIN : '-',
                "COI": a.COI ? a.COI : '-',
                "TAN": a.TAN ? a.TAN : "-",
            }
          })

          var failedRecordsTable = response.data.failedRecords.map((a, i)=>{
          return{
                
                "entityType": a.entityType ? a.entityType : '-',
                "companyName": a.companyName ? a.companyName : '-',
                "groupName": a.groupName ? a.groupName : '-',
                "website": a.website ? a.website : '-',
                "companyPhone": a.companyPhone ? a.companyPhone : '-',
                "companyEmail": a.companyEmail ? a.companyEmail : '-',
                "CIN": a.CIN ? a.CIN : '-',
                "COI": a.COI ? a.COI : '-',
                "TAN": a.TAN ? a.TAN : "-",
                "failedRemark"  : a.failedRemark     ? a.failedRemark : '-' 
          }
          })
          
        this.setState({
            goodRecordsTable    : tableData,
            failedRecordsTable  : failedRecordsTable
        })
      }
      })
      .catch((error)=> { 
        console.log('error', error);
      }) 
  }



  
  render() {
   
    return (

      <div className="basicInfoWrapper col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
        <section className="content">   
          <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
        {
            this.props.match.params.entityID && this.state.pathname === "appCompany" ? 
            null:
            <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
              <ul className="nav tabNav nav-pills col-lg-3 col-md-3 col-sm-12 col-xs-12 pull-right">
                <li className="active col-lg-5 col-md-5 col-xs-5 col-sm-5 NOpadding text-center"><a data-toggle="pill" href="#manual">Manual</a></li>
                <li className="col-lg-6 col-md-6 col-xs-6 col-sm-6 NOpadding  text-center"><a data-toggle="pill" href="#bulk">Bulk Upload</a></li>
              </ul>
            </div>
          }
            <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
              
                <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Candidate Master</h4>
              
            </div>

            <section className="Content tab-content">
                <div id="bulk" className="tab-pane fade in col-lg-12 col-md-1f2 col-sm-12 col-xs-12 mt">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerForm">
                    <BulkUpload url="/api/entitymaster/bulkUploadEntity"
                        data={{ "entityType": this.state.pathname, "createdBy": localStorage.getItem("user_ID"), "corporateId": localStorage.getItem("corporate_ID") }}
                        uploadedData={this.uploadedData}
                        fileurl="https://fivebees.s3.ap-south-1.amazonaws.com/prod/master/entitymaster.xlsx"
                        getFileDetails={this.getFileDetails.bind(this)}
                        fileDetails={this.state.fileDetails}
                        goodRecordsHeading={this.state.goodRecordsHeading}
                        failedtableHeading={this.state.failedtableHeading}
                        failedRecordsTable={this.state.failedRecordsTable}
                        failedRecordsCount={this.state.failedRecordsCount}
                        goodRecordsTable={this.state.goodRecordsTable}
                        goodDataCount={this.state.goodDataCount}
                    />
                  </div>
                </div>
                <div id="manual" className="tab-pane fade in active col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">

                <MenuDiv/>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">

                  <form id="BasicInfo">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                      <div className="col-lg-12 col-md-12 col-sm-12 supplierForm">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <br />
                        </div>
                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left NOpadding-right">
                            <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="firstName" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  First Name
                                  <i className="astrick">*</i>
                              </label>
                              <input type="text" id="firstName" 
                                     className="form-control capitalize col-lg-12 col-md-12 col-sm-12 col-xs-12" 
                                     value={this.state.companyName} 
                                     ref="firstName" name="firstName" 
                                     onChange={this.handleChange} />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="middleName" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Middle Name
                                  <i className="astrick">*</i>
                              </label>
                              <input type="text" id="middleName" 
                                      className="form-control capitalize col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                      value={this.state.middleName} ref="middleName" 
                                      name="middleName" 
                                      onChange={this.handleChange} required />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="lastName" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Last Name
                                  <i className="astrick">*</i>
                              </label>
                              <input type="text" id="lastName" 
                                      className="form-control capitalize col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                      value={this.state.lastName} ref="lastName" 
                                      name="lastName" 
                                      onChange={this.handleChange} required />
                            </div>
                         
                        </div>
                         <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left NOpadding-right">
                            <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="dob" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Date Of Birth
                                  <i className="astrick">*</i>
                              </label>
                              <input type="date" id="dob" 
                                     className=" form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 calender" 
                                     value={this.state.companyName} 
                                     ref="dob" name="dob" 
                                     onChange={this.handleChange} />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="Age" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Age
                                  <i className="astrick">*</i>
                              </label>
                              <div className="showFeild col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="row">
                                  {this.state.ageYears + "  Years, " + this.state.ageMonths +
                                     " Months, " + " And " + this.state.ageDays + " Days Old"}     
                                 </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="gender" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Gender
                                  <i className="astrick">*</i>
                              </label>
                              <div className=" ">
                                <div className={this.state.gender==="male"
                                        ? 
                                        "genderFeild col-lg-4 genderFeildActive" 
                                        : 
                                        "genderFeild col-lg-4" }  
                                   id="male" name="gender" 
                                   onClick={this.setGender.bind(this)}>

                                  <div className=" genderPadding" >
                                    Male
                                  </div>
                                </div>
                                <div className={this.state.gender==="female"
                                                ? "genderFeild col-lg-4 genderFeildActive" 
                                                : "genderFeild col-lg-4" } 
                                     id="female" name="gender" 
                                     onClick={this.setGender.bind(this)}>

                                  <div className=" genderPadding">
                                    Female
                                  </div>
                                </div>
                                <div className={this.state.gender==="transgender"
                                                ? "genderFeild col-lg-4 genderFeildActive" 
                                                : "genderFeild col-lg-4" } 
                                     id="transgender" name="gender" 
                                     onClick={this.setGender.bind(this)}>

                                  <div className=" genderPadding">
                                    Transgender
                                  </div>
                                </div>    
                              </div>    
                              
                            </div>
                            </div>
                         
                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left NOpadding-right">
                            <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="maritalStatus" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Marital Status
                                  <i className="astrick">*</i>
                              </label>
                             
                              <select required className="form-control capitalize  col-lg-12 col-md-12 col-sm-12 col-xs-12" 
                                  id="maritalStatus" value={this.state.maritalStatus}
                                  name="maritalStatus" placeholder="-- Select --" onChange={this.handleChange.bind(this)}>
                                    <option > -- Select -- </option>
                                    {
                                      this.state.inputMaritalStatus.length>0
                                      ? 
                                        this.state.inputMaritalStatus.map((elem,index)=>{
                                          return(
                                            <option value={elem._id} key={index}>
                                              {elem}
                                            </option>
                                          );
                                        })
                                        
                                      :
                                        null
                                    }
                                </select>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="anniversaryDate" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Anniversary Date
                                  <i className="astrick">*</i>
                              </label>
                              <input type="date" id="anniversaryDate" 
                                      className="form-control calender col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                      value={this.state.anniversaryDate} ref="anniversaryDate" 
                                      name="anniversaryDate" 
                                      onChange={this.handleChange} required />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="lastName" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Languages Spoken
                                  <i className="astrick">*</i>
                              </label>
                              <input type="text" id="lastName" 
                                      className="form-control  capitalize col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                      value={this.state.lastName} ref="lastName" 
                                      name="lastName" 
                                      onChange={this.handleChange} required />
                            </div>
                         
                        </div>

                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left NOpadding-right">
                            <div className=" col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="nationality" className="labelform  col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Nationality
                                  <i className="astrick">*</i>
                              </label>
                             
                              <select className="form-control capitalize  col-lg-12 col-md-12 col-sm-12 col-xs-12"  id = "nationality" 
                               value ={this.state.nationality} name="nationality" 
                               onChange={this.handleChange.bind(this)}>
                                  <option > -- Select -- </option>
                                  {
                                    this.state.inputNationality.length>0
                                    ? 
                                      this.state.inputNationality.map((elem,index)=>{
                                        return(
                                          <option value={elem._id} key={index}>
                                            {elem}
                                          </option>
                                        );
                                      })
                                      
                                    :
                                      null
                                  }
                              </select>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="panCardNo" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Pan Card No.
                                  <i className="astrick">*</i>
                              </label>
                              <input type="text" id="panCardNo" 
                                      className="form-control capitalize col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                      value={this.state.panCardNo} ref="panCardNo" 
                                      name="panCardNo" 
                                      onChange={this.handleChange} required />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="adhaarCardNo" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Aadhaar Card No.
                                  <i className="astrick">*</i>
                              </label>
                              <input type="text" id="adhaarCardNo" 
                                      className="form-control capitalize col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                      value={this.state.adhaarCardNo} ref="adhaarCardNo" 
                                      name="adhaarCardNo" 
                                      onChange={this.handleChange} required />
                            </div>
                         
                        </div>

                         <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left NOpadding-right">
                            
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                              <label htmlFor="adhaarCardNo" className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">
                                  Profile Picture
                                  <i className="astrick">*</i>
                              </label>
                              <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12 NOpadding ">
                                <div className="col-lg-12 col-md-3 col-sm-12 col-xs-12">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding " id="hide">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 uploadImageClient" id="LogoImageUpOne" title="Upload Image">
                                      <div><i className="fa fa-camera cursorPointer"></i></div>
                                      <input multiple onChange={this.imgBrowse.bind(this)} id="LogoImageUp" type="file" className="col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="companyLogo" />
                                    </div>
                                  </div>
                                </div>
                                
                              </div>
                               <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
                              {
                                  this.state.profilePicture && this.state.profilePicture.length > 0 ?
                                   
                                        <div  className="col-lg-4 col-md-3 col-sm-12 col-xs-12 CustomImageUploadBI NOpadding-right">
                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                            <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" title="Delete Logo"  id="logo" onClick={this.deleteLogo.bind(this)}>x</label>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 CustomImageUploadBIImg" id="LogoImageUpOne">
                                                  <img src={this.state.profileImageUrl} alt={"profilePicture"} className="img-responsive logoStyle" />
                                            </div>
                                          </div>
                                        </div>
                                     
                                    
                                    :
                                     (this.state.profileImageUrl ?
                                          <div className="col-lg-12 col-md-2 col-sm-12 col-xs-12 nopadding loaderBI">
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
                      </div>
                      
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                          <button className="btn button3 pull-right" onClick={this.SubmitBasicInfo.bind(this)} >Save & Next&nbsp;<i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
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
export default withRouter(BasicInfo);