import React, { Component }     from 'react';

import './PackageMaster.css'

class PackageMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageName       : "",
      validityPeriod    : "",
      jobPublish        : "",
      resumeDownload    : "",
      maxEmails         : "",
      videoIntroduction : "",
      robotInterview    : "",
      price             : "",
    };
  }
  /*======= componentDidMount() =======*/
  componentDidMount() {
   

  }
 
  /*======= handleChange() =======*/
  handleChange(event){
    var value = event.currentTarget.value;
    var name  = event.currentTarget.name;

    
    this.setState({
      [name]:value,
    })
  }
  handleSubmit(event){
    event.preventDefault();
    var formValues = { 
      packageName       : this.state.packageName,
      validityPeriod    : this.state.validityPeriod,
      jobPublish        : this.state.jobPublish,
      resumeDownload    : this.state.resumeDownload,
      maxEmails         : this.state.maxEmails,
      videoIntroduction : this.state.videoIntroduction,
      robotInterview    : this.state.robotInterview,
      price             : this.state.price,
    }
    console.log(formValues);
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
                                <div className="input-group ">
                                  <span className="input-group-addon inputBoxIcon">
                                    <i className="fa fa-user-circle"></i> 
                                  </span> 
                                  <input type="text" name="packageName" id="packageName" 
                                   className="form-control inputBox" 
                                   value={this.state.packageName} 
                                   onChange={this.handleChange.bind(this)}/>
                                </div> 
                                <span id="packageNameError" className="errorMsg"></span>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="validityPeriod" className="nameTitleForm">
                                  Validity Period
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group ">
                                  <span className="input-group-addon inputBoxIcon">
                                    <i className="fa fa-user-circle"></i> 
                                  </span> 
                                  <input type="text" name="validityPeriod" id="validityPeriod" 
                                   className="form-control inputBox"
                                   value={this.state.validityPeriod} 
                                   onChange={this.handleChange.bind(this)} />
                                </div> 
                                <span id="validityPeriodError" className="errorMsg"></span>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="price" className="nameTitleForm">
                                  Price
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group ">
                                  <span className="input-group-addon inputBoxIcon">
                                    <i className="fa fa-user-circle"></i> 
                                  </span> 
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
                                <label htmlFor="jobPublish" className="nameTitleForm">
                                  Job Publish
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group ">
                                  <span className="input-group-addon inputBoxIcon">
                                    <i className="fa fa-user-circle"></i> 
                                  </span> 
                                  <input type="number" name="jobPublish" id="jobPublish" 
                                   className="form-control inputBox" 
                                   value={this.state.jobPublish} 
                                   onChange={this.handleChange.bind(this)}/>
                                </div> 
                                <span id="jobPublishError" className="errorMsg"></span>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="resumeDownload" className="nameTitleForm">
                                  Resume Download
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group ">
                                  <span className="input-group-addon inputBoxIcon">
                                    <i className="fa fa-user-circle"></i> 
                                  </span> 
                                  <input type="number" name="resumeDownload" id="resumeDownload" 
                                   className="form-control inputBox"
                                   value={this.state.resumeDownload} 
                                   onChange={this.handleChange.bind(this)}/>
                                </div> 
                                <span id="resumeDownloadError" className="errorMsg"></span>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="maxEmails" className="nameTitleForm">
                                  Max Emails
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group ">
                                  <span className="input-group-addon inputBoxIcon">
                                    <i className="fa fa-user-circle"></i> 
                                  </span> 
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
                                <div className="input-group ">
                                  <span className="input-group-addon inputBoxIcon">
                                    <i className="fa fa-user-circle"></i> 
                                  </span> 
                                  <input type="number" name="videoIntroduction" id="videoIntroduction" 
                                   className="form-control inputBox" 
                                   value={this.state.videoIntroduction} 
                                   onChange={this.handleChange.bind(this)}/>
                                </div> 
                                <span id="videoIntroductionError" className="errorMsg"></span>
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="robotInterview" className="nameTitleForm">
                                  Robot Interview
                                    <sup className="nameTitleFormStar">*</sup>
                                </label>
                                <div className="input-group ">
                                  <span className="input-group-addon inputBoxIcon">
                                    <i className="fa fa-user-circle"></i> 
                                  </span> 
                                  <input type="number" name="robotInterview" id="robotInterview" 
                                   className="form-control inputBox" 
                                   value={this.state.robotInterview} 
                                   onChange={this.handleChange.bind(this)}/>
                                </div> 
                                <span id="robotInterviewError" className="errorMsg"></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                      <button className="buttonBack buttonBack2 pull-right" onClick={this.handleSubmit.bind(this)}> 
                          Submit
                       </button>
                    </div>
                  
                </div>
            </form>
         </div>           
      </div>           
    );
  }
}

export default PackageMaster;