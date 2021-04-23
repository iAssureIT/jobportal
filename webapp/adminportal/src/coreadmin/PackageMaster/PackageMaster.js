import React, { Component }     from 'react';
import Axios                    from 'axios';
import IAssureTable             from '../IAssureTable/IAssureTable.jsx';

import './PackageMaster.css'

class packagemaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageName       : "",
      validity          : "",
      jobsPublish       : "",
      resumeDownloads   : "",
      maxEmails         : "",
      videoIntroduction : "",
      robotInterviews   : "",
      price             : "",
      buttonText        : "Submit",
      currency          : "Rs",
      "startRange"      : 0,
      "limitRange"      : 10,
      tableHeading      :   {
                          packageName        : "Package Name",
                          validity           : "Validity Period",
                          jobsPublish        : "Jobs Publish",
                          resumeDownloads    : "Resume Downloads",
                          maxEmails          : "Max Emails",
                          videoIntroduction  : "Video Introduction",
                          robotInterviews    : "Robot Interviews",
                          price              : "Price",
                          actions            : "Action",
                        },
      tableObjects      :   {
                          paginationApply : false,
                          searchApply     : false,
                          editUrl         : "/package-master",
                          deleteMethod    : 'delete',
                          apiLink         : '/api/packagemaster',
                          downloadApply   : false
                      },
    };
  }
  /*======= componentDidMount() =======*/
  componentDidMount() {
      if(this.props.match.params.package_id){
          this.edit()
        }
        console.log("this.props.match.params.package_id",this.props.match.params.package_id)
        this.getData();
        Axios.get("/api/packagemaster/get/list")
        .then(response=>{
          console.log(response.data)
        })
        .catch(error=>{
          console.log(error)
        })
         Axios.get("/api/packagemaster/get/one/"+this.props.match.params.package_id)
      .then(response=>{
           
      }).catch(error=>{
        console.log(error);
      })
        
      //fetchSinglePackage
  }
 
  /*======= handleChange() =======*/
  handleChange(event){
    var value = event.currentTarget.value;
    var name  = event.currentTarget.name;

    
    this.setState({
      [name]:value,
    })
  }
  /*======= edit() =======*/
  edit(){
      Axios.get("/api/packagemaster/get/one/"+this.props.match.params.package_id)
      .then(response=>{
            var edit=response.data;
            this.setState({
                            packageName       : edit.packageName,
                            validity          : edit.validity,
                            jobsPublish       : edit.jobsPublish,
                            resumeDownloads   : edit.resumeDownloads,
                            maxEmails         : edit.maxEmails,
                            videoIntroduction : edit.videoIntroduction,
                            robotInterviews   : edit.robotInterviews,
                            price             : edit.price,
                            buttonText        :"Update"
            })
        this.getData();
      }).catch(error=>{
        console.log(error);
      })

  }
  /*======= getData() =======*/
  getData(){

    var formValues={startRange:this.state.startRange,limitRange:this.state.limitRange}
    Axios.post("/api/packagemaster/get/list",formValues)
          .then(response=>{
              var tableData = response.data.map((a, i)=>{
                 return {
                        _id                : a._id,
                        packageName        : a.packageName,
                        validity           : a.validity,
                        jobsPublish        : a.jobsPublish,
                        resumeDownloads    : a.resumeDownloads,
                        maxEmails          : a.maxEmails,
                        videoIntroduction  : a.videoIntroduction,
                        robotInterviews    : a.robotInterviews,
                        price              : a.price,
                    }
                  })
                   this.setState({
                      tableData : tableData,
                  });
              })
              .catch(error=>{
                console.log(error);
              })
             
  }
  
  /*======= handleSubmit() =======*/
  handleSubmit(event){
  event.preventDefault();
    var formValues = { 
                        packageName       : this.state.packageName,
                        package_id        : this.props.match.params.package_id, 
                        validity          : this.state.validity,
                        jobsPublish       : this.state.jobsPublish,
                        resumeDownloads   : this.state.resumeDownloads,
                        maxEmails         : this.state.maxEmails,
                        videoIntroduction : this.state.videoIntroduction,
                        robotInterviews   : this.state.robotInterviews,
                        price             : this.state.price,
                        currency          : this.state.currency,
                      }

         if(this.props.match.params.package_id){
          this.updateData(formValues);
        }else{
          this.insetData(formValues);
        }
        this.getData();
  }
  /*======= insetData() =======*/
  insetData(formValues){
    let status =  this.validateForm();
        if(status){
          Axios.post("/api/packagemaster/post",formValues)
             .then(response=>{
                  this.setState({
                      packageName        : "",
                      validity           : "",
                      jobsPublish        : "",
                      resumeDownloads    : "",
                      maxEmails          : "",
                      videoIntroduction  : "",
                      robotInterviews    : "",
                      price              : "",
                      currency           : "Rs",
                      buttonText         : "Submit",
                  })
             }).catch(error=>{
                console.log(error)
             })
       }
  }
  /*======= updateData() =======*/
  updateData(formValues){
        let status =  this.validateForm();
        if(status){
            Axios.patch("/api/packagemaster/patch",formValues)
               .then(response=>{
                    this.setState({
                        packageName        : "",
                        validity           : "",
                        jobsPublish        : "",
                        resumeDownloads    : "",
                        maxEmails          : "",
                        videoIntroduction  : "",
                        robotInterviews    : "",
                        price              : "",
                        currency           : "Rs",
                        buttonText         : "Submit",
                    })
                    this.props.history.push("/package-master");
               }).catch(error=>{
                  console.log(error)
               })
        }
       
  }
  /*======= validateForm() =======*/
  validateForm=()=>{
      let status = true;
      let regName = /^[a-zA-Z]+$/;
      if(typeof this.state.packageName !== "undefined"){
           if(!this.state.packageName.match(regName)){
              status = false;
              document.getElementById("packageNameError").innerHTML = "Please enter a valid Package Name";
           }else{
              document.getElementById("packageNameError").innerHTML = "";
           }       
        }
      if(this.state.validity.length<=0){
          document.getElementById("validityError").innerHTML= "Please Enter address type";  
          status=false; 
        }else{
          document.getElementById("validityError").innerHTML = ""; 
        } 
        if(this.state.videoIntroduction.length<=0){
          document.getElementById("videoIntroductionError").innerHTML= "Please Enter Video Introduction";  
          status=false; 
        }else{
          document.getElementById("videoIntroductionError").innerHTML = ""; 
        } 
        if(this.state.maxEmails.length<=0){
          document.getElementById("maxEmailsError").innerHTML= "Please Enter Max Emails";  
          status=false; 
        }else{
          document.getElementById("maxEmailsError").innerHTML = ""; 
        } 
        if(this.state.resumeDownloads.length<=0){
          document.getElementById("resumeDownloadsError").innerHTML= "Please Enter Resume Downloads";  
          status=false; 
        }else{
          document.getElementById("resumeDownloadsError").innerHTML = ""; 
        } 
        if(this.state.jobsPublish.length<=0){
          document.getElementById("jobsPublishError").innerHTML= "Please Enter Jobs Publish";  
          status=false; 
        }else{
          document.getElementById("jobsPublishError").innerHTML = ""; 
        } 
        if(this.state.robotInterviews.length<=0){
          document.getElementById("robotInterviewsError").innerHTML= "Please Enter Robot Interviews";  
          status=false; 
        }else{
          document.getElementById("robotInterviewsError").innerHTML = ""; 
        } 
        if(this.state.price.length<=0){
          document.getElementById("priceError").innerHTML= "Please Enter Price";  
          status=false; 
        }else{
          document.getElementById("priceError").innerHTML = ""; 
        } 
      return status;
  }
  /*======= render() =======*/
  render() {
    return (
      <div className="container-flix">
        <div className="col-lg-12 pageWrapper">
            <div className="box-header with-border row">
                <h4 className="weighttitle col-lg-12">Package Master</h4>
            </div>
            <form className="mainFormWrapper col-lg-12">
                <div className="mainFormBorder col-lg-12">
                    <div className="row paddingTopForm">
                        <div className="col-lg-12">
                            <div className="col-lg-4">
                                <label htmlFor="packageName" className="nameTitleForm">
                                  Package Name
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group input-group1 ">
                                  <input type="text" name="packageName" id="packageName" 
                                   className="form-control inputBox" 
                                   value={this.state.packageName} 
                                   onChange={this.handleChange.bind(this)}/>
                                </div> 
                                <span id="packageNameError" className="errorMsg"></span>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="validity" className="nameTitleForm">
                                  Validity Period
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group input-group1 ">
                                  <input type="text" name="validity" id="validity" 
                                   className="form-control inputBox"
                                   value={this.state.validity} 
                                   onChange={this.handleChange.bind(this)} />
                                </div> 
                                <span id="validityError" className="errorMsg"></span>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="price" className="nameTitleForm">
                                  Price in INR
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group input-group1 "> 
                                  <input type="number" name="price" id="price" 
                                   className="form-control inputBox" 
                                   value={this.state.price} 
                                   onChange={this.handleChange.bind(this)} />
                                </div> 
                                <span id="priceError" className="errorMsg"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row paddingTopForm">
                        <div className="col-lg-12">
                            <div className="col-lg-4">
                                <label htmlFor="jobsPublish" className="nameTitleForm">
                                  Job Publish
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group input-group1 ">
                                  <input type="number" name="jobsPublish" id="jobsPublish" 
                                   className="form-control inputBox" 
                                   value={this.state.jobsPublish} 
                                   onChange={this.handleChange.bind(this)}/>
                                </div> 
                                <span id="jobsPublishError" className="errorMsg"></span>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="resumeDownloads" className="nameTitleForm">
                                  Resume Download
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group input-group1 ">
                                  <input type="number" name="resumeDownloads" id="resumeDownloads" 
                                   className="form-control inputBox"
                                   value={this.state.resumeDownloads} 
                                   onChange={this.handleChange.bind(this)}/>
                                </div> 
                                <span id="resumeDownloadsError" className="errorMsg"></span>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="maxEmails" className="nameTitleForm">
                                  Max Emails
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group input-group1 ">
                                  <input type="number" name="maxEmails" id="maxEmails" 
                                   className="form-control inputBox"
                                   value={this.state.maxEmails} 
                                   onChange={this.handleChange.bind(this)} />
                                </div> 
                                <span id="maxEmailsError" className="errorMsg"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row paddingTopForm">
                        <div className="col-lg-12">
                            <div className="col-lg-4">
                                <label htmlFor="videoIntroduction" className="nameTitleForm">
                                  Video Introduction
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group input-group1 ">
                                  <input type="number" name="videoIntroduction" id="videoIntroduction" 
                                   className="form-control inputBox" 
                                   value={this.state.videoIntroduction} 
                                   onChange={this.handleChange.bind(this)}/>
                                </div> 
                                <span id="videoIntroductionError" className="errorMsg"></span>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="robotInterviews" className="nameTitleForm">
                                  Robot Interview
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group input-group1 "> 
                                  <input type="number" name="robotInterviews" id="robotInterviews" 
                                   className="form-control inputBox" 
                                   value={this.state.robotInterviews} 
                                   onChange={this.handleChange.bind(this)}/>
                                </div> 
                                <span id="robotInterviewsError" className="errorMsg"></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                      <button className="buttonBack buttonBack2 pull-right" onClick={this.handleSubmit.bind(this)}> 
                          {this.state.buttonText}
                       </button>
                    </div>
                    <div className="col-lg-12">
                        <IAssureTable 
                              tableHeading={this.state.tableHeading}
                              tableData={this.state.tableData}
                              getData={this.getData.bind(this)}
                              tableObjects={this.state.tableObjects}
                          />
                    </div>
                </div>
                  
            </form>
         </div>           
      </div>           
    );
  }
}

export default packagemaster;