import React,{Component} from 'react';
import { render } from 'react-dom';
import moment     from 'moment';
import Axios from 'axios';
import Swal         from 'sweetalert2';
import { Multiselect } from 'multiselect-react-dropdown';

import './JobPosting.css';





export default class JobPosting extends Component{
  constructor(props){
    super(props);

    this.state = {
      jobTitle    : "",
      jobLocation   : "",
      country     : "",
      functionalArea  : "",
      role      : "",
      workFromHome  : "",
      contactPerson   : "",
      email       : "",
      phone       : "",
      jobType     : "",
      jobTime     : "",
      lastDateAppl  : "",
      minSalary     : "",
      minSalPeriod  : "",
      maxSalary     : "",
      maxSalPeriod  : "",
      jobDesc     : "",
      minEducation  : "",
      minExperience   : "",

        funAreaArray: [
            { key: "IT"},
            { key: "Engineering - Mechanical/Automotive/Industrial"},
            { key: "Engineering - Environmental/Health/Safety"},
            { key: "Manufacturing/Engineering/R&D"},
            { key: "Analytics/Business Intelligence"},
            { key: "IT/Software Development - Network Administration/Security"},
            { key: "IT/Software Development - Embedded/EDA/VLSI/ASIC/Chip Description"}
          ],

          jobTypeArray: [
            { key: "IT"},
            { key: "Engineering - Mechanical/Automotive/Industrial"},
            { key: "Engineering - Environmental/Health/Safety"},
            { key: "Manufacturing/Engineering/R&amp;D"},
            { key: "Analytics/Business Intelligence"},
            { key: "IT/Software Development - Network Administration/Security"},
            { key: "IT/Software Development - Embedded/EDA/VLSI/ASIC/Chip Description"}
          ],

          jobTimeArray: [
            { key: "IT"},
            { key: "Engineering - Mechanical/Automotive/Industrial"},
            { key: "Engineering - Environmental/Health/Safety"},
            { key: "Manufacturing/Engineering/R&amp;D"},
            { key: "Analytics/Business Intelligence"},
            { key: "IT/Software Development - Network Administration/Security"},
            { key: "IT/Software Development - Embedded/EDA/VLSI/ASIC/Chip Description"}
          ],

        countryArray: [
            { key: "India"},
            { key: "United Kingdom"},
            { key: "Italy"},
            { key: "United States"},
            { key: "Canada"},
            { key: "Australia"},
            { key: "South Africa"}
          ],

        minSalArray: [
            { key: "0 - 3 Lac"},
            { key: "3 - 6 Lac"},
            { key: "6 - 10 Lac"},
            { key: "10 - 15 Lac"},
            { key: "15 - 25 Lac"},
            { key: "25 - 50 Lac"},
            { key: "50- 75 Lac"}
          ],

        maxSalArray: [
            { key: "0 - 3 Lac"},
            { key: "3 - 6 Lac"},
            { key: "6 - 10 Lac"},
            { key: "10 - 15 Lac"},
            { key: "15 - 25 Lac"},
            { key: "25 - 50 Lac"},
            { key: "50- 75 Lac"}
          ],

        priSkillsArray: [
            "Java",
            "Python",
            "Software Development",
            "Testing",
            "Cloud",
            "Oracle",
            "Html"
          ],

          secSkillsArray: [
            "Java",
            "Python",
            "Software Development",
            "Testing",
            "Cloud",
            "Oracle",
            "Html"
          ],

          otherSkillsArray: [
            "Java",
            "Python",
            "Software Development",
            "Testing",
            "Cloud",
            "Oracle",
            "Html"
          ],

          preferSkillsArray: [
            "Java",
            "Python",
            "Software Development",
            "Testing",
            "Cloud",
            "Oracle",
            "Html"
          ],
          
    }

     this.style =  {
                chips: {
                  color: "white"
                },
                searchBox: {
                  border: "1px solid #D3950A",
                 /* whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "34px",
              height: "34px",
              width: "100px",
              borderRadius: "0px",
              borderLeft: "transparent",
              marginLeft: "-3px"
              paddingBottom: "30px"*/
                },
                multiselectContainer: {
                  backgroundColor: "#242931",
                  color: "white",
                }
                };

      }
  
  handleChange = (event)=>{
    var name = event.currentTarget.name;
    var value = event.currentTarget.value;
    this.setState({ [name] : value});
  }
  
  handleSubmit = (event)=>{
    event.preventDefault();

    var formValues = {
      jobTitle      : this.state.jobTitle,
      jobLocationCity   : this.state.jobLocation,
      jobLocationCountry  : this.state.country,
      functionalArea    : this.state.functionalArea,
      role        : this.state.role,
      workFromHome    : this.state.workFromHome,
      contactPerson     : this.state.contactPerson,
      email         : this.state.email,
      phone         : this.state.phone,
      jobType       : this.state.jobType,
      jobTime       : this.state.jobTime,
      lastDateAppl    : this.state.lastDateAppl,
      minCTC        : this.state.maxSalary,
      minSalPeriod    : this.state.minSalPeriod,
      maxCTC        : this.state.maxSalary,
      maxSalPeriod    : this.state.maxSalPeriod,
      jobDesc       : this.state.jobDesc,
      minEducation    : this.state.minEducation,
      minExperience     : this.state.minExperience, 
    };
    
    console.log("Inside handleSubmit",formValues);
    Axios.post("http://localhost:3007/api/jobs/addJob",formValues)
        .then(response => {
          console.log("Inside axios",response.data.message);
          if(response.data.message==="Job details Inserted Successfully"){
            console.log("response.data = ",response.data);
            //let student_id = response.data.student._id;

            Swal.fire("Congrats","Your Data is Submitted Successfully","success");
            /*this.setState({
                    jobTitle    : "",
                    jobLocation   : "",
                    country     : "",
                    functionalArea  : "",
                    role      : "",
                    workFromHome  : "",
                    contactPerson   : "",
                    email       : "",
                    phone       : "",
                    jobType     : "",
                    jobTime     : "",
                    lastDateAppl  : "",
                    minSalary     : "",
                    minSalPeriod  : "",
                    maxSalary     : "",
                    maxSalPeriod  : "",
                    jobDesc     : "",
                    minEducation  : "",
                    minExperience   : "",
                    });*/
            //this.props.history.push("/emp-profile/"+student_id);
          }
        })
        .catch(error =>{
          Swal.fire("Submit Error!",error.message,'error');
        })    
  }
  
  render(){
     
     const { funAreaArray, jobTypeArray, jobTimeArray, countryArray, minSalArray, maxSalArray, priSkillsArray, secSkillsArray, otherSkillsArray, preferSkillsArray } = this.state;
        
    return(
      <div className="pageWrapper backgroundColor container-fluid">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 pageWrapperBorder borderColor mainForm">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="formSection">
                    <div className="formHeading">
                      Post A Job
                    </div>
                    <hr className="formHr"/>
                    <div className="formSubHeading">
                      <i className="fa fa-info" aria-hidden="true"></i> 
                      <span className="labelLeftPadding">Basic Info</span>
                    </div>
                    <form id="addJob">
                      <div className="col-lg-12 formFieldRow text-left">
                        <div className="row">
                          <div className="col-lg-6">
                            <label htmlFor="jobTitle" className="formLable"> Job title </label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-briefcase"></i> </span> 
                              <input type="text" name="jobTitle" id="jobTitle" className="form-control formField" value={this.state.jobTitle} onChange={this.handleChange}/>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="row row-no-gutters">
                              <div className="col-lg-8">
                                <label htmlFor="jobLocation" className="formLable"> Job Location </label>
                                <div className="input-group">
                                  <span className="input-group-addon formField"><i className="fa fa-map-marker"></i> </span> 
                                  <input type="text" name="jobLocation" id="jobLocation" className="form-control formField" value={this.state.jobLocation} onChange={this.handleChange}/>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <label htmlFor="country" className="formLable"> Country </label>
                                <select className="country form-control formField"> {/*value={this.state.country} onChange={this.handleChange}*/}
                                    <option>--Select--</option>
                                    <option>India</option>
                                    <option>USA</option>
                                    <option>UK</option>
                                    <option>Sweeden</option>
                                    <option>Germany</option>
                                  </select>
                                  {/*<Multiselect 
                                        options={countryArray}
                                        displayValue="key"
                                        singleSelect
                                        style={this.style}
                                    />*/}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-lg-12 formFieldRow text-left">
                        <div className="row">
                          <div className="col-lg-6">
                            <label htmlFor="functionalArea" className="formLable"> Fuctional Area </label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-foursquare"></i></span> 
                              {/*<input type="text" name="functionalArea" id="functionalArea" className="form-control formField" value={this.state.functionalArea} onChange={this.handleChange}/>*/}
                              {/*<span className="input-group-addon formField"><i className='fas fa-angle-down'></i> </span>*/}
                              <select className="form-control formField"> {/*value={this.state.country} onChange={this.handleChange}*/}
                                  <option>IT</option>
                                  <option>Engineering - Mechanical/Automotive/Industrial</option>
                                  <option>Engineering - Environmental/Health/Safety</option>
                                  <option>Manufacturing/Engineering/R&D</option>
                                  <option>Analytics/Business Intelligence</option>
                              </select>
                              {/*<Multiselect 
                                      options={funAreaArray}
                                      displayValue="key"
                                      singleSelect
                                      style={this.style}
                                  />*/}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <label htmlFor="Role" className="formLable"> Role </label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-registered"></i></span> 
                              <input type="text" name="Role" id="Role" className="form-control formField" value={this.state.Role} onChange={this.handleChange}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 formFieldRow text-left">
                        {/*<div className="form-check">
                              <input type="checkbox" id="workFromHome" className="formField"/>
                              <label className="form-check-label workLable formLable">Work From Home</label>
                          </div>  */}

                        <label className="containerWfh">Work From Home
                                                <input type="checkbox" name="workFromHome" id="workFromHome" value={this.state.workFromHome} onChange={this.handleChange} />
                                                <span className="checkmark2"></span>
                                            </label>
                      </div>
                      <div className="col-lg-12 formFieldRow text-left">
                        <div className="row">
                          <div className="col-lg-4">
                            <label htmlFor="contactPerson" className="formLable"> Contact Person </label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-user"></i></span> 
                              <input type="text" name="contactPerson" id="contactPerson" className="form-control formField" value={this.state.contactPerson} onChange={this.handleChange}/>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label htmlFor="email" className="formLable"> Email </label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-envelope-o"></i></span> 
                              <input type="text" name="email" id="email" className="form-control formField" value={this.state.email} onChange={this.handleChange}/>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label htmlFor="phone" className="formLable"> Phone Number </label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-phone"></i> </span> 
                              <input type="text" name="phone" id="phone" className="form-control formField" value={this.state.phone} onChange={this.handleChange}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 formFieldRow text-left">
                        <div className="row">
                          <div className="col-lg-4">
                            <label htmlFor="jobType" className="formLable"> Job Type </label>
                            <div className="input-group col-lg-12">
                              <span className="input-group-addon formField"><i className="fa fa-briefcase"></i> </span> 
                              {/*<input type="text" name="jobType" id="jobType" className="form-control formField" value={this.state.jobType} onChange={this.handleChange}/>*/}
                              <select className="form-control formField">
                                  <option>--Select--</option>
                                  <option>Full Time</option>
                                  <option>Internship</option>
                                  <option>Contract</option>
                                  <option>Part-time</option>
                                  <option>Temporary</option>
                              </select>
                              {/*<Multiselect 
                                      options={jobTypeArray}
                                      displayValue="key"
                                      singleSelect
                                      style={this.style}
                                  />*/}
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label htmlFor="jobTime" className="formLable"> Job Time </label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-clock-o"></i> </span> 
                              {/*<input type="text" name="jobTime" id="jobTime" className="form-control formField" value={this.state.jobTime} onChange={this.handleChange}/>*/}
                              <select className="form-control formField">
                                  <option>--Select--</option>
                                  <option>8 to 5</option>
                                  <option>9 to 6</option>
                              </select>
                              {/*<Multiselect 
                                      options={jobTimeArray}
                                      displayValue="key"
                                      singleSelect
                                      style={this.style}
                                  />*/} 
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label htmlFor="lastDateAppl" className="formLable"> Last Date of Application </label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-calendar"></i> </span> 
                              <input type="date" name="lastDateAppl" id="lastDateAppl" className="form-control formField" value={this.state.lastDateAppl} onChange={this.handleChange}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 formFieldRow">
                        <div className="row">
                          <hr className="formHr"/>
                        </div>
                      </div>
                      <div className="formSubHeadingHead">
                        <i className="fa fa-inr"></i> 
                        <span className="labelLeftPadding">Salary</span>
                      </div>
                      <div className="col-lg-12 formFieldRow text-left">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="row row-no-gutters">
                              <div className="col-lg-8">
                                <label htmlFor="minSalary" className="formLable"> Minimum Salary <i className="fa fa-inr"></i> </label>
                                <div className="input-group">
                                  <span className="input-group-addon formField"><i className="fa fa-money"></i> </span> 
                                  <input type="text" name="minSalary" id="minSalary" className="form-control formField" value={this.state.minSalary} onChange={this.handleChange}/>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <label htmlFor="minSalPeriod" className="formLable"> &nbsp; </label>
                                <select className="form-control formField" name="minSalPeriod" id="minSalPeriod" value={this.state.minSalPeriod} onChange={this.handleChange}>
                                    <option>--Select--</option>
                                    <option>Per Month</option>
                                    <option>Per Year</option>
                                  </select>
                                  {/*<Multiselect 
                                        options={minSalArray}
                                        displayValue="key"
                                        singleSelect
                                        style={this.style}
                                    />*/}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="row row-no-gutters">
                              <div className="col-lg-8">
                                <label htmlFor="maxSalary" className="formLable"> Maximum Salary <i className="fa fa-inr"></i> </label>
                                <div className="input-group">
                                  <span className="input-group-addon formField"><i className="fa fa-money"></i> </span> 
                                  <input type="text" name="maxSalary" id="maxSalary" className="form-control formField" value={this.state.maxSalary} onChange={this.handleChange}/>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <label htmlFor="maxSalPeriod" className="formLable"> &nbsp; </label>
                                <select className="form-control formField" name="maxSalPeriod" id="maxSalPeriod" value={this.state.maxSalPeriod} onChange={this.handleChange}>
                                    <option>--Select--</option>
                                    <option>Per Month</option>
                                    <option>Per Year</option>
                                  </select>
                                  {/*<Multiselect 
                                        options={maxSalArray}
                                        displayValue="key"
                                        singleSelect
                                        style={this.style}
                                    />*/}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 formFieldRow">
                        <div className="row">
                          <hr className="formHr"/>
                        </div>
                      </div>
                      <div className="formSubHeadingHead">
                        <i className="fa fa-briefcase"></i>
                        <span className="labelLeftPadding">Job Description</span>
                      </div>
                      <div className="description text-left">
                        <div className="form-group">
                            <label htmlFor="jobDesc" className="formLable jobDesc">Describe the responsibilities of this job, required work experience, skills, or education.</label>
                            <textarea className="form-control formField" rows="20" name="jobDesc" id="jobDesc" value={this.state.jobDesc} onChange={this.handleChange}></textarea>
                          </div>
                      </div>
                      <div className="col-lg-12 formFieldRow">
                        <div className="row">
                          <hr className="formHr"/>
                        </div>
                      </div>
                      <div className="formSubHeadingHead">
                        <i className="fa fa-book"></i>
                        <span className="labelLeftPadding">Required Education & Experience</span>
                      </div>
                      <div className="col-lg-12 formFieldRow text-left">
                        <div className="row">
                          <div className="col-lg-6">
                            <label htmlFor="minEducation" className="formLable"> Minimum Education Required </label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-graduation-cap"></i> </span> 
                              <input type="text" name="minEducation" id="minEducation" className="form-control formField" value={this.state.minEducation} onChange={this.handleChange}/>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <label htmlFor="minExperience" className="formLable"> Minimum Overall Experience </label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-history"></i> </span> 
                              <input type="text" name="minExperience" id="minExperience" className="form-control formField" value={this.state.minExperience} onChange={this.handleChange}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 formFieldRow">
                        <div className="row">
                          <hr className="formHr"/>
                        </div>
                      </div>
                      <div className="formSubHeadingHead">
                        <i className='fa fa-tasks'></i> 
                        <span className="labelLeftPadding">Expected Skills</span>
                      </div>
                      <div className="col-lg-12 formFieldRow text-left">
                        <div className="row">
                          <div className="col-lg-8">
                            <label htmlFor="primSkills" className="formLable"> Primary Skills </label>
                            <div className="input-group col-lg-12">
                              <span className="input-group-addon formField"><i className='fa fa-cog'></i> </span> 
                              {/*<div name="primSkills" id="primSkills" className="form-control formField" value={this.state.primSkills} onChange={this.handleChange}>*/}
                                {/*<ul className="nav nav-pills text-center">
                                    <li className="pillListItems">HTML</li>
                                    <li className="pillListItems">CSS</li>
                                    <li className="pillListItems">Node JS</li>
                                    <li className="pillListItems">React JS</li>
                                    <li><button className="pillButton">Add Skill <i className="fa fa-plus-circle"></i></button></li>
                                </ul>*/}
                                <Multiselect
                                  options={priSkillsArray}
                                  isObject={false}
                                  style={this.style}
                                />
                              {/*</div>*/}
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label htmlFor="minPrimExp" className="formLable"> Min. Experience Req.</label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-bar-chart"></i> </span> 
                              <input type="text" name="minPrimExp" id="minPrimExp" className="form-control formField" value={this.state.minPrimExp} onChange={this.handleChange}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 formFieldRow text-left">
                        <div className="row">
                          <div className="col-lg-8">
                            <label htmlFor="secSkills" className="formLable"> Secondary Skills </label>
                            <div className="input-group col-lg-12">
                              <span className="input-group-addon formField"><i className='fa fa-cog'></i> </span> 
                              {/*<div name="secSkills" id="secSkills" className="form-control formField" value={this.state.secSkills} onChange={this.handleChange}>
                                <ul className="nav nav-pills text-center">
                                    <li className="pillListItems">HTML</li>
                                    <li className="pillListItems">CSS</li>
                                    <li className="pillListItems">Node JS</li>
                                    <li className="pillListItems">React JS</li>
                                    <li><button className="pillButton">Add Skill <i className="fa fa-plus-circle"></i></button></li>
                                </ul>
                              </div>*/}
                              <Multiselect 
                                  options={secSkillsArray}
                                  isObject={false}
                                  style={this.style}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label htmlFor="minSecExp" className="formLable"> Min. Experience Req.</label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-bar-chart"></i> </span> 
                              <input type="text" name="minSecExp" id="minSecExp" className="form-control formField" value={this.state.minSecExp} onChange={this.handleChange}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 formFieldRow text-left">
                        <div className="row">
                          <div className="col-lg-8">
                            <label htmlFor="otherSkills" className="formLable"> Other Skills </label>
                            <div className="input-group col-lg-12">
                              <span className="input-group-addon formField"><i className='fa fa-cog'></i> </span> 
                              {/*<div name="otherSkills" id="otherSkills" className="form-control formField" value={this.state.otherSkills} onChange={this.handleChange}>
                                <ul className="nav nav-pills text-center">
                                    <li className="pillListItems">HTML</li>
                                    <li className="pillListItems">CSS</li>
                                    <li className="pillListItems">Node JS</li>
                                    <li className="pillListItems">React JS</li>
                                    <li><button className="pillButton">Add Skill <i className="fa fa-plus-circle"></i></button></li>
                                </ul>
                              </div>*/}
                              <Multiselect
                                  options={otherSkillsArray}
                                  isObject={false}
                                  style={this.style}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label htmlFor="minOtherExp" className="formLable"> Min. Experience Req.</label>
                            <div className="input-group">
                              <span className="input-group-addon formField"><i className="fa fa-bar-chart"></i> </span> 
                              <input type="text" name="minOtherExp" id="minOtherExp" className="form-control formField" value={this.state.minOtherExp} onChange={this.handleChange}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 formFieldRow text-left">
                        <label htmlFor="notMandateSkills" className="formLable"> Preferred Skills but not mandatory </label>
                        <div className="input-group col-lg-12">
                          <span className="input-group-addon formField"><i className='fa fa-cog'></i> </span> 
                          {/*<div type="text" name="notMandateSkills" id="notMandateSkills" className="form-control formField" value={this.state.notMandateSkills} onChange={this.handleChange}>
                            <ul className="nav nav-pills text-center">
                                <li className="pillListItems">HTML</li>
                                <li className="pillListItems">CSS</li>
                                <li className="pillListItems">Node JS</li>
                                <li className="pillListItems">React JS</li>
                                <li><button className="pillButton">Add Skill <i className="fa fa-plus-circle"></i></button></li>
                            </ul>
                          </div>*/}
                          <Multiselect
                            options={preferSkillsArray}
                            isObject={false}
                            style={this.style}
                          />
                        </div>
                      </div>
                      <div className="col-lg-7 col-lg-offset-5 pull-right">
                        <button className="btn formField previewBtn" > PREVIEW </button>
                        <button className="btn buttonYellow submitBtn"  onClick={this.handleSubmit}> SUBMIT </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


}




