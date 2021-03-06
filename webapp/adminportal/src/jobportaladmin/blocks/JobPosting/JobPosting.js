import React, {Component}           from 'react';
import $                            from 'jquery';
import { FontAwesomeIcon }          from '@fortawesome/react-fontawesome';
import Axios                        from 'axios';
import Swal                         from 'sweetalert2';
import CKEditor                     from '@ckeditor/ckeditor5-react';
import ClassicEditor                from '@ckeditor/ckeditor5-build-classic';
import PhoneInput                   from 'react-phone-input-2';
import Moment                       from "moment";
import { WithContext as ReactTags } from 'react-tag-input';
import PlacesAutocomplete, {
        geocodeByAddress,
        getLatLng
                            }       from "react-places-autocomplete";
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';
import  * as mapActionCreator       from '../../Common/actions/index';
import BulkUpload                   from "../../../coreadmin/Master/BulkUpload/BulkUpload.js";

import PreviewModal                 from '../PreviewModal/PreviewModal.js';

 
import './JobPosting.css';
import 'react-phone-input-2/lib/style.css';


class JobPosting extends Component {

    constructor(props) {
        super(props);

        this.state = {
            company                   :   "", 
            company_id                :   "Select Employer",
            companylist               :   [],
            jobTitle                    :   "",
            industryList                :   [],
            functionalArea              :   "",
            functionalarea_id           :   "",
            functionalArealist          :   [],
            subFunctionalArea           :   "",
            subfunctionalarea_id        :   "", 
            subFunctionalArealist       :   [],
            jobRole                     :   "",
            jobrole_id                  :   "",
            jobRoleArray                :   [],
            gender                      :   "Male Only",
            workFromHome                :   false,
            jobType                     :   "",
            jobtype_id                  :   "",
            jobTypeArray                :   [],
            jobTime                     :   "",
            jobtime_id                  :   "",
            jobTimeArray                :   [],
            jobSector                   :   "",
            jobsector_id                :   "",
            jobSectorArray              :   [],
            jobShift                    :   "",
            jobshift_id                 :   "",
            jobShiftArray               :   [],
            positions                   :   "",
            jobDesc                     :   "",
            lastDateOfAppl              :   "",
            contactPersonName           :   "",
            contactPersonEmail          :   "",
            contactPersonPhone          :   "",
            address                     :   "",
            area                        :   "",
            cityVillage                 :   "",
            district                    :   "",
            districtArray               :   [],
            states                      :   "",
            stateArray                  :   [],
            stateCode                   :   "",
            country                     :   "",
            countryCode                 :   "",
            pincode                     :   "",
            pincodeExists               :   true,

            minSalary                   :   "",
            minSalPeriod                :   "Per Year",
            maxSalary                   :   "",
            maxSalPeriod                :   "Per Year",

            minEducation                :   "",
            mineducation_id             :   "",
            minEducationArray           :   [],

            minExperience               :   0,

            primarySkills               :   [],
            minPrimExp                  :   "",
            priSkillsArray              :   [],
            priSkillsArraylist          :   [],
            
            secondarySkills             :   [],
            minSecExp                   :   "",
            secSkillsArray              :   [],
            secSkillsArraylist          :   [],
            
            otherSkills                 :   [],
            minOtherExp                 :   "",
            otherSkillsArray            :   [],

            preferredSkills             :   "",
            preferredSkillsArray        :   [],
            
            otherSkillsArraylist        :   [],
            preferredSkillsArraylist    :   [],

            primarySkillTags            :   [],
            primarySkillSuggestions     :   [],
            
            secondarySkillTags          :   [],
            secondarySkillSuggestions   :   [],
            
            otherSkillTags              :   [],
            otherSkillSuggestions       :   [],
            
            preferredSkillTags          :   [],
            preferredSkillSuggestions   :   [],

            
            submitBtnText               :   "PUBLISH",
            fileDetailUrl               :   "/api/jobs/get/filedetails/",

            goodRecordsHeading: {
                jobTitle: "Job Title",
                companyName : "Employer",
                industry: "Industry",
                functionalarea: "Functional Area",
                subfunctionalarea: "Subfunctional Area",
                jobrole: "Job Role",
                gender: "Gender",
                jobsector: "Job Sector",
                jobtype: "Job Type",
                jobshift: "Job Shift",
                jobtime: "Job Time",
                positions : "Positions",
                location : "Job Location",
                minSalary : "Min Salary",
                maxSalary : "Max Salary",
                mineducation    : "Min Education",
                minExperience   : "Min Experience",
                contactPersonName : "Contact Person Name",
                contactPersonEmail : "Contact Person Email",
                contactPersonPhone : "Contact Person Phone"
              },
              failedtableHeading: {
                jobTitle: "Job Title",
                companyName : "Employer",
                industry: "Industry",
                functionalarea: "Functional Area",
                subfunctionalarea: "Subfunctional Area",
                jobrole: "Job Role",
                gender: "Gender",
                jobsector: "Job Sector",
                jobtype: "Job Type",
                jobshift: "Job Shift",
                jobtime: "Job Time",
                positions : "Positions",
                location : "Job Location",
                minSalary : "Min Salary",
                maxSalary : "Max Salary",
                mineducation    : "Min Education",
                minExperience   : "Min Experience",
                contactPersonName : "Contact Person Name",
                contactPersonEmail : "Contact Person Email",
                contactPersonPhone : "Contact Person Phone",
                failedRemark              : "Failed Data Remark"
              }
        }

        this.reactTags = React.createRef();
        
        this.handleDelete   = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag     = this.handleDrag.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);

    }

    componentDidMount() { 
        this.getStates();
        
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const token = userDetails.token;
        Axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
        
        Axios.get("/api/entitymaster/get/corporate", {"startRange":0,"limitRange":10000})
            .then(response => {
                    this.setState({
                        companylist: response.data
                    });
            })
            .catch(error => {
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();
                  Swal.fire("","Error while getting List data","error")
                      .then(okay => {
                        if (okay) {
                          window.location.href = "/login";
                        }
                      });
                }else{
                    Swal.fire("", "Error while getting List data", "");
                }


            })

        Axios.get("/api/functionalareamaster/get/list", {"startRange":0,"limitRange":10000})
            .then(response => {
                    this.setState({
                        functionalArealist: response.data
                    });
            })
            .catch(error => {
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();
                  Swal.fire("","Error while getting List data","error")
                      .then(okay => {
                        if (okay) {
                          window.location.href = "/login";
                        }
                      });
                }else{
                    Swal.fire("", "Error while getting List data", "");
                }

            })

        Axios.get("/api/subfunctionalareamaster/get/list", {"startRange":0,"limitRange":10000})
            .then(response => {
                this.setState({
                    subFunctionalArealist: response.data
                });
            })
            .catch(error => {
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();
                  Swal.fire("","Error while getting List data","error")
                      .then(okay => {
                        if (okay) {
                          window.location.href = "/login";
                        }
                      });
                }else{
                    Swal.fire("", "Error while getting List data", "");
                }

            })

        Axios.get("/api/jobrolemaster/get/list", {"startRange":0,"limitRange":10000})
            .then(response => {
                this.setState({
                    jobRoleArray: response.data
                });
            })
            .catch(error => {
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();
                  Swal.fire("","Error while getting List data","error")
                      .then(okay => {
                        if (okay) {
                          window.location.href = "/login";
                        }
                      });
                }else{
                    Swal.fire("", "Error while getting List data", "");
                }

            })    

        Axios.get("/api/jobtypemaster/get/list", {"startRange":0,"limitRange":10000})
            .then(response => {
                this.setState({
                    jobTypeArray: response.data
                });
            })
            .catch(error => {
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();
                  Swal.fire("","Error while getting List data","error")
                      .then(okay => {
                        if (okay) {
                          window.location.href = "/login";
                        }
                      });
                }else{
                    Swal.fire("", "Error while getting List data", "");
                }

            })

        Axios.get("/api/JobTimeMaster/get/list", {"startRange":0,"limitRange":10000})
            .then(response => {
                this.setState({
                    jobTimeArray: response.data
                });
                /*console.log("jobTimeArray", this.state.jobTimeArray);*/
            })
            .catch(error => {
                Swal.fire("Error while getting List data", error.message, 'error');
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();
                  Swal.fire("","Error while getting List data","error")
                      .then(okay => {
                        if (okay) {
                          window.location.href = "/login";
                        }
                      });
                }else{
                    Swal.fire("", "Error while getting List data", "");
                }

            })

        Axios.get("/api/jobsectormaster/get/list", {"startRange":0,"limitRange":10000})
            .then(response => {
                this.setState({
                    jobSectorArray: response.data
                });
                /*console.log("jobSectorArray", this.state.jobSectorArray);*/
            })
            .catch(error => {
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();
                  Swal.fire("","Error while getting List data","error")
                      .then(okay => {
                        if (okay) {
                          window.location.href = "/login";
                        }
                      });
                }else{
                    Swal.fire("", "Error while getting List data", "");
                }

                
            })

        Axios.get("/api/jobshiftmaster/get/list", {"startRange":0,"limitRange":10000})
            .then(response => {
                this.setState({
                    jobShiftArray: response.data
                });
                /*console.log("jobSectorArray", this.state.jobSectorArray);*/
            })
            .catch(error => {
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();
                  Swal.fire("","Error while getting List data","error")
                      .then(okay => {
                        if (okay) {
                          window.location.href = "/login";
                        }
                      });
                }else{
                    Swal.fire("", "Error while getting List data", "");
                }

                
            })   

        Axios.get("/api/qualificationmaster/get/list", {"startRange":0,"limitRange":10000})
            .then(response => {
                this.setState({
                    minEducationArray: response.data
                });
                /*console.log("jobSectorArray", this.state.jobSectorArray);*/
            })
            .catch(error => {
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();
                  Swal.fire("","Error while getting List data","error")
                      .then(okay => {
                        if (okay) {
                          window.location.href = "/login";
                        }
                      });
                }else{
                    Swal.fire("", "Error while getting List data", "");
                }

                Swal.fire("Error while getting List data", error.message, 'error');
            }) 

        Axios.get("/api/skillmaster/get/list", {"startRange":0,"limitRange":10000})
            .then(response => {
                var primarySkillSuggestions =  [];
                response.data.map((elem,index)=>{
                    primarySkillSuggestions.push({id:elem._id,text:elem.skill})
                })
                this.setState({
                    primarySkillSuggestions   : primarySkillSuggestions,
                    secondarySkillSuggestions : primarySkillSuggestions,
                    otherSkillSuggestions     : primarySkillSuggestions,
                    preferredSkillSuggestions : primarySkillSuggestions
                });

            })
            .catch(error => {
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();
                  Swal.fire("","Error while getting List data","error")
                      .then(okay => {
                        if (okay) {
                          window.location.href = "/login";
                        }
                      });
                }else{
                    Swal.fire("", "Error while getting List data", "");
                }

                
            })
        if (this.props.match.params.job_id) {
        let job_id = this.props.match.params.job_id;

            Axios.get("/api/jobs/get/one/" + job_id)
                .then(response => {
                    console.log("response.data : ", response.data);
                    this.setState({
                        job_id                  :   job_id,
                        company_id              :   response.data.company_id._id,
                        jobTitle                :   response.data.jobBasicInfo.jobTitle,
                        employerName            :   response.data.company_id.companyName,
                        employerLogo            :   response.data.company_id.companyLogo[0] ? response.data.company_id.companyLogo[0] : null,
                        industry_id             :   response.data.jobBasicInfo.industry_id ? response.data.jobBasicInfo.industry_id._id : "",
                        industry                :   response.data.jobBasicInfo.industry_id ? response.data.jobBasicInfo.industry_id.industry : "",
                        functionalarea_id       :   response.data.jobBasicInfo.functionalarea_id._id,
                        functionalArea          :   response.data.jobBasicInfo.functionalarea_id ? response.data.jobBasicInfo.functionalarea_id.functionalArea : "",
                        subfunctionalarea_id    :   response.data.jobBasicInfo.subfunctionalarea_id._id,
                        subFunctionalArea       :   response.data.jobBasicInfo.subfunctionalarea_id ? response.data.jobBasicInfo.subfunctionalarea_id.subfunctionalArea : "",
                        jobrole_id              :   response.data.jobBasicInfo.jobrole_id._id,
                        jobRole                 :   response.data.jobBasicInfo.jobrole_id.jobRole,
                        gender                  :   response.data.jobBasicInfo.gender,
                        workFromHome            :   response.data.jobBasicInfo.workFromHome,
                        jobtype_id              :   response.data.jobBasicInfo.jobtype_id._id,
                        jobType                 :   response.data.jobBasicInfo.jobtype_id.jobType,
                        jobtime_id              :   response.data.jobBasicInfo.jobtime_id._id,
                        jobTime                 :   response.data.jobBasicInfo.jobtime_id.jobTime,
                        jobsector_id            :   response.data.jobBasicInfo.jobsector_id ? response.data.jobBasicInfo.jobsector_id._id : "",
                        jobSector               :   response.data.jobBasicInfo.jobsector_id ? response.data.jobBasicInfo.jobsector_id.jobSector : "",
                        jobshift_id             :   response.data.jobBasicInfo.jobshift_id ? response.data.jobBasicInfo.jobshift_id._id : "",
                        jobShift                :   response.data.jobBasicInfo.jobshift_id ? response.data.jobBasicInfo.jobshift_id.jobShift : "",
                        positions               :   response.data.jobBasicInfo.positions,
                        jobDesc                 :   response.data.jobBasicInfo.jobDesc,
                        lastDateOfAppl          :   response.data.jobBasicInfo.lastDateOfAppl ? Moment(response.data.jobBasicInfo.lastDateOfAppl).format("YYYY-MM-DD") : "",
                        contactPersonName       :   response.data.jobBasicInfo.contactPersonName,
                        contactPersonEmail      :   response.data.jobBasicInfo.contactPersonEmail,
                        contactPersonPhone      :   response.data.jobBasicInfo.contactPersonPhone,

                        address                 :   response.data.location.address,
                        area                    :   response.data.location.area,
                        cityVillage             :   response.data.location.cityVillage,
                        district                :   response.data.location.district,
                        states                  :   response.data.location.state,
                        stateCode               :   response.data.location.stateCode,
                        country                 :   response.data.location.country,
                        countryCode             :   response.data.location.countryCode,
                        pincode                 :   response.data.location.pincode ? response.data.location.pincode : "",

                        minSalary               :   response.data.ctcOffered.minSalary,
                        minSalPeriod            :   response.data.ctcOffered.minSalPeriod,
                        maxSalary               :   response.data.ctcOffered.maxSalary,
                        maxSalPeriod            :   response.data.ctcOffered.maxSalPeriod,

                        mineducation_id         :   response.data.eligibility.mineducation_id ? response.data.eligibility.mineducation_id._id : "",
                        minEducation            :   response.data.eligibility.mineducation_id ? response.data.eligibility.mineducation_id.qualification : "",
                        minExperience           :   response.data.eligibility.minExperience ? response.data.eligibility.minExperience : 0,

                        minPrimExp              :   response.data.requiredSkills.minPrimExp,
                        minSecExp               :   response.data.requiredSkills.minSecExp,
                        minOtherExp             :   response.data.requiredSkills.minOtherExp,
                        submitBtnText           :   "UPDATE"
                    })

                    if (response.data.jobBasicInfo.workFromHome === true) {
                        document.getElementById("workFromHome").checked = true;
                    } else {
                        document.getElementById("workFromHome").checked = false;
                    }

                    
                    var primarySkillTags = [];
                    var secondarySkillTags = [];
                    var otherSkillTags = [];
                    var preferredSkillTags = [];


                    response.data.requiredSkills.primarySkills ?
                    this.state.primarySkillSuggestions.map((skill,index)=>{
                        response.data.requiredSkills.primarySkills.map((data,ind)=>{
                            if (skill.id == data.skill_id._id) {
                                primarySkillTags.push({ id : skill.id, text : skill.text })
                            }
                        })
                    }) : primarySkillTags = [];

                    response.data.requiredSkills.secondarySkills ? 
                    this.state.secondarySkillSuggestions.map((skill,index)=>{
                        response.data.requiredSkills.secondarySkills.map((data,ind)=>{
                            if (skill.id == data.skill_id._id) {
                                secondarySkillTags.push({ id : skill.id, text : skill.text })
                            }
                        })
                    }) : secondarySkillTags = [];

                    response.data.requiredSkills.otherSkills ? 
                    this.state.otherSkillSuggestions.map((skill,index)=>{
                        response.data.requiredSkills.otherSkills.map((data,ind)=>{
                            if (skill.id == data.skill_id._id) {
                                otherSkillTags.push({ id : skill.id, text : skill.text })
                            }
                        })
                    }) : otherSkillTags = [];

                    response.data.requiredSkills.preferredSkills ? 
                    this.state.preferredSkillSuggestions.map((skill,index)=>{
                        response.data.requiredSkills.preferredSkills.map((data,ind)=>{
                            if (skill.id == data.skill_id._id) {
                                preferredSkillTags.push({ id : skill.id, text : skill.text })
                            }
                        })
                    }) : preferredSkillTags = [];
                    this.setState({ 
                                    primarySkillTags    : primarySkillTags,
                                    secondarySkillTags  : secondarySkillTags,
                                    otherSkillTags      : otherSkillTags,
                                    preferredSkillTags  : preferredSkillTags
                    }) 
                    
                })

                // .catch(error => {
                //     //Swal.fire("Some error occured while updating job data", error.message, "error");
                // })
        }

    }

    validateForm = () => {
        var status = true;
        var regSpaceName =  /[a-zA-Z_]+$/;
        var jobTitle=this.state.jobTitle;
        var minEducation =this.state.minEducation;
        var minExperience =this.state.minExperience;
        var contactPersonName =this.state.contactPersonName;
        var tempEmail = this.state.contactPersonEmail.trim(); // value of field with whitespace trimmed off
        var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
        var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
        var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{5})$/;
        var regPincode = /^[1-9][0-9]{5}$/;
        var planguage = this.state.planguage
        console.log("errroe",planguage);

        console.log(this.state.company_id)

        if (this.state.company_id == "Select Employer") {
            document.getElementById("companyError").innerHTML = "Select employer";
            status = false;
        }
        else {
            document.getElementById("companyError").innerHTML = "";
            status = true;
        }

        if (this.state.jobTitle.length <= 0) {
            document.getElementById("jobTitleError").innerHTML = "Enter job title";
            status = false;
        }
        else if (this.state.jobTitle.length > 256) {
            document.getElementById("jobTitleError").innerHTML = "Job Title should be only 256 characters";
            status = false;
        }
        else if(!regSpaceName.test(jobTitle)) {
            document.getElementById("jobTitleError").innerHTML=  "Please enter valid name";  
            status=false; 
        }
        else {
            document.getElementById("jobTitleError").innerHTML = "";
            status = true;
        }
        
        if (this.state.address.length <= 0) {
            document.getElementById("addressError").innerHTML = "Enter job location";
            status = false;
        } else {
            document.getElementById("addressError").innerHTML = "";
            status = true;
        }
        
        if (this.state.states.length <= 0) {
            document.getElementById("statesError").innerHTML = "Select state";
            status = false;
        } else {
            document.getElementById("statesError").innerHTML = "";
            status = true;
        }

        if(typeof this.state.cityVillage !== "undefined"){
           if(!this.state.cityVillage.match(regSpaceName)){
              status = false;
              document.getElementById("cityVillageError").innerHTML = "Please enter a valid city name";
           }else{
                document.getElementById("cityVillageError").innerHTML = "";
           }       
        }
        
        if(typeof this.state.district !== "undefined"){
           if(!this.state.district.match(regSpaceName)){
              status = false;
              document.getElementById("districtError").innerHTML = "Please enter a valid district name";
           }else{
                document.getElementById("districtError").innerHTML = "";
           }       
        }
       
        if(this.state.pincode.length<=0){
            document.getElementById("pincodeError").innerHTML=  
            "Please enter your pincode";  
            status=false; 
        }else{ 

            if(!regPincode.test(this.state.pincode)){
                document.getElementById("pincodeError").innerHTML = "Please enter valid pincode";  
                status=false; 
            }else{
                document.getElementById("pincodeError").innerHTML = ""; 
                status = true;
            }
            
        }
        
        if(typeof this.state.functionalArea !== "undefined"){
            if(!this.state.functionalArea.match(regSpaceName)){
              status = false;
              document.getElementById("functionalAreaError").innerHTML = "Please enter a valid functional Area";
            }else{
                document.getElementById("functionalAreaError").innerHTML = "";
            }       
        }
        
        if(typeof this.state.subFunctionalArea !== "undefined"){
            if(!this.state.subFunctionalArea.match(regSpaceName)){
              status = false;
              document.getElementById("subFunctionalAreaError").innerHTML = "Please enter a valid sub-functional Area";
            }else{
                document.getElementById("subFunctionalAreaError").innerHTML = "";
            }       
        }

        if(typeof this.state.jobRole !== "undefined"){
            if(!this.state.jobRole.match(regSpaceName)){
              status = false;
              document.getElementById("jobRoleError").innerHTML = "Please enter a valid job Role";
            }else{
                document.getElementById("jobRoleError").innerHTML = "";
            }       
        }

        if (this.state.positions < 0) {
            document.getElementById("positionsError").innerHTML = "Please enter positive number";
            status = false;
        } 
        else if (this.state.positions.length <= 0) {
            document.getElementById("positionsError").innerHTML = "Please enter number";
            status = false;
        }
        else {
            document.getElementById("positionsError").innerHTML = "";
            status = true;
        }

        if (this.state.minSalary < 0) {
            document.getElementById("minSalaryError").innerHTML = "Please enter positive number";
            status = false;
        }
        else if (this.state.minSalary.length <= 0) {
            document.getElementById("minSalaryError").innerHTML = "Please enter minimum salary";
            status = false;
        }
        else {
            document.getElementById("minSalaryError").innerHTML = "";
            status = true;
        }

        if (this.state.maxSalary < 0) {
            document.getElementById("maxSalaryError").innerHTML = "Please enter positive number";
            status = false;
        }
        else if (this.state.maxSalary.length <= 0) {
            document.getElementById("maxSalaryError").innerHTML = "Please enter maximum salary";
            status = false;
        }
        else {
            document.getElementById("maxSalaryError").innerHTML = "";
            status = true;
        }

        if ((this.state.minSalary) > (this.state.maxSalary)){
            document.getElementById("maxSalaryError").innerHTML=  "Maximum salary is less than minimum salary";  
            status=false; 
        }

        if (this.state.minSalPeriod.length <= 0) {
            document.getElementById("minSalPeriodError").innerHTML = "Select period";
            status = false;
        } else {
            document.getElementById("minSalPeriodError").innerHTML = "";
            status = true;
        }

        if (this.state.maxSalPeriod.length <= 0) {
            document.getElementById("maxSalPeriodError").innerHTML = "Select period";
            status = false;
        } else {
            document.getElementById("maxSalPeriodError").innerHTML = "";
            status = true;
        }

        if(typeof this.state.minEducation !== "undefined"){
           if(!this.state.minEducation.match(regSpaceName)){
              status = false;
              document.getElementById("minEducationError").innerHTML = "Please enter a valid min Education";
           }else{
                document.getElementById("minEducationError").innerHTML = "";
           }       
        }

        if(this.state.minExperience == 0) {
            document.getElementById("minExperienceError").innerHTML = "Please enter positive number";
            status = false;
        }
        else if (this.state.minExperience.length <= 0) {
            document.getElementById("minExperienceError").innerHTML = "Please enter minimum experience";
            status = false;
        }
        else {
            document.getElementById("minExperienceError").innerHTML = "";
            status = true;
        }

        if( this.state.jobSector.length >0){
           if(!this.state.jobSector.match(regSpaceName)){
              status = false;
              document.getElementById("jobSectorError").innerHTML = "Please enter a valid job Sector";
           }else{
                document.getElementById("jobSectorError").innerHTML = "";
           }       
        }

        if( this.state.jobType.length >0){
           if(!this.state.jobType.match(regSpaceName)){
              status = false;
              document.getElementById("jobTypeError").innerHTML = "Please enter a valid job Type";
           }else{
                document.getElementById("jobTypeError").innerHTML = "";
           }       
        }

        if( this.state.jobTime.length >0){
           if(!this.state.jobTime.match(regSpaceName)){
              status = false;
              document.getElementById("jobTimeError").innerHTML = "Please enter a valid job Time";
           }else{
                document.getElementById("jobTimeError").innerHTML = "";
           }       
        }

        if(this.state.jobShift.length >0){
           if(!this.state.jobShift.match(regSpaceName)){
              status = false;
              document.getElementById("jobShiftError").innerHTML = "Please enter a valid job Shift";
           }else{
                document.getElementById("jobShiftError").innerHTML = "";
           }       
        }
        
        if(typeof this.state.contactPersonName !== "undefined"){
           if(!this.state.contactPersonName.match(regSpaceName)){
              status = false;
              document.getElementById("contactPersonNameError").innerHTML = "Please enter a valid contact Person Name";
           }else{
                document.getElementById("contactPersonNameError").innerHTML = "";
           }       
        }
        
        if(this.state.contactPersonEmail.length <=0 ){
            document.getElementById("contactPersonEmailError").innerHTML=  "Please enter your Email";  
            status=false; 
        }else if (
            !emailFilter.test(tempEmail)) { //test email for illegal characters
            document.getElementById('contactPersonEmailError').innerHTML = "Please enter a valid email address.";
        } else if (this.state.contactPersonEmail.match(illegalChars)) {
            document.getElementById('contactPersonEmailError').innerHTML = "Email contains invalid characters.";
        }else{
            document.getElementById("contactPersonEmailError").innerHTML = ""; 
            status = true;
        }

        if(this.state.contactPersonPhone.match(phoneno)){
            document.getElementById("contactPersonPhoneError").innerHTML = ""; 
            status = true;
          
        } else {
            document.getElementById("contactPersonPhoneError").innerHTML = "Please enter valid Mobile Number";  
            status=false; 
        }

        if(typeof this.state.planguage !== "undefined"){
            console.log("im in");
            if(!this.state.planguage.match(regSpaceName)&& !this.state.planguage == ""){
            console.log("im in flase");
              status = false;
              document.getElementById("primarySkillTagsError").innerHTML = "Please enter a valid Primary language name";
            }else{
            console.log("im in true");
                document.getElementById("primarySkillTagsError").innerHTML = "";
            } 
        }

        // if (this.state.primarySkillTags.length <= 0) {
        //     document.getElementById("primarySkillError").innerHTML = "Please select or enter primary skills";
        //     status = false;
        // } else {
        //     document.getElementById("primarySkillError").innerHTML = "";
        //     status = true;
        // }

        if (this.state.secondarySkillTags.length <= 0) {
            document.getElementById("secondarySkillTagsError").innerHTML = "Please select or enter secondary skills";
            status = false;
        } else {
            document.getElementById("secondarySkillTagsError").innerHTML = "";
            status = true;
        }

        if (this.state.otherSkillTags.length <= 0) {
            document.getElementById("otherSkillTagsError").innerHTML = "Please select or enter other skills";
            status = false;
        } else {
            document.getElementById("otherSkillTagsError").innerHTML = "";
            status = true;
        }
        return status;
    
}
    
    getStates() {
        Axios.get("http://locations2.iassureit.com/api/states/get/list/IN").then((response) => {
                this.setState({
                    stateArray: response.data
                })
                document.getElementById('Statedata').val(this.state.states);
            })

            .catch((error) => {

            })
    }

    handleChange = (event) => {
        var name = event.currentTarget.name;
        var value = event.currentTarget.value;
        this.setState({
            [name]: value
        });
    }

    setGender(event) {
        event.preventDefault();
        var id = event.currentTarget.id;
        this.setState({
            gender: id,
        })
       /* if(this.state.gender === "Male Only"){
                                
                                this.setState ({"<i className='fa fa-male'></i>"});
                            
                            }else{
                                
                                this.setState ({"<i className='fa fa-female'></i>"});
                                                                    
                            }*/
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            var formValues = {
                user_id                 :   this.props.userDetails.user_id,
                company_id              :   this.state.company_id,
                jobTitle                :   this.state.jobTitle,
                industry_id             :   this.state.industry_id,
                functionalArea          :   this.state.functionalArea,
                functionalarea_id       :   this.state.functionalarea_id,
                subFunctionalArea       :   this.state.subFunctionalArea,
                subfunctionalarea_id    :   this.state.subfunctionalarea_id,
                jobRole                 :   this.state.jobRole,
                jobrole_id              :   this.state.jobrole_id,
                gender                  :   this.state.gender,
                workFromHome            :   this.state.workFromHome,
                jobType                 :   this.state.jobType,
                jobtype_id              :   this.state.jobtype_id,
                jobTime                 :   this.state.jobTime,
                jobtime_id              :   this.state.jobtime_id,
                jobSector               :   this.state.jobSector,
                jobsector_id            :   this.state.jobsector_id,
                jobShift                :   this.state.jobShift,
                jobshift_id             :   this.state.jobshift_id,
                positions               :   this.state.positions,
                jobDesc                 :   this.state.jobDesc,
                lastDateOfAppl          :   this.state.lastDateOfAppl,
                contactPersonName       :   this.state.contactPersonName,
                contactPersonEmail      :   this.state.contactPersonEmail,
                contactPersonPhone      :   this.state.contactPersonPhone,

                address                 :   this.state.address,
                area                    :   this.state.area,
                cityVillage             :   this.state.cityVillage,
                district                :   this.state.district,
                states                  :   this.state.states,
                stateCode               :   this.state.stateCode,
                country                 :   this.state.country,
                countryCode             :   this.state.countryCode,
                pincode                 :   this.state.pincode,

                minSalary               :   this.state.minSalary,
                minSalPeriod            :   this.state.minSalPeriod,
                maxSalary               :   this.state.maxSalary,
                maxSalPeriod            :   this.state.maxSalPeriod,

                minEducation            :   this.state.minEducation,
                mineducation_id         :   this.state.mineducation_id,
                minExperience           :   this.state.minExperience,

                primarySkillTags        :   this.state.primarySkillTags,
                minPrimExp              :   this.state.minPrimExp,
                secondarySkillTags      :   this.state.secondarySkillTags,
                minSecExp               :   this.state.minSecExp,
                otherSkillTags          :   this.state.otherSkillTags,
                minOtherExp             :   this.state.minOtherExp,
                preferredSkillTags      :   this.state.preferredSkillTags,

            };

            console.log("formValues :", formValues);

            if (this.props.match.params.job_id) {
                formValues.job_id = this.state.job_id;
                this.updateData(formValues);
            } else {
                this.insertData(formValues);
            }
        }
    }


    insertData(formValues) {
        Axios.post("/api/jobs/post", formValues)

            .then(response => {
                console.log(formValues);
                if (response.data.created) {
                    let job_id = response.data.jobsData._id;

                    if(formValues.status==='draft'){
                        Swal.fire("", "Your job has been saved into draft jobs!", "");
                    }else{
                        Swal.fire("", "Your data is submitted successfully", "");
                    }
                    
                    this.setState({
                        jobTitle                :   "",
                        functionalarea_id       :   "",
                        subfunctionalarea_id    :   "",
                        jobrole_id              :   "",
                        gender                  :   "Male Only",
                        workFromHome            :   false,
                        jobtype_id              :   "",
                        jobTime                 :   "",
                        jobtime_id              :   "",
                        jobsector_id            :   "",
                        jobshift_id             :   "",
                        positions               :   "",
                        jobDesc                 :   "",
                        lastDateOfAppl          :   "",
                        contactPersonName       :   "",
                        contactPersonEmail      :   "",
                        contactPersonPhone      :   "",

                        address                 :   "",
                        area                    :   "",
                        cityVillage             :   "",
                        district                :   "",
                        states                  :   "",
                        stateCode               :   "",
                        country                 :   "India",
                        countryCode             :   "IN",
                        pincode                 :   "",

                        minSalary               :   "",
                        minSalPeriod            :   "",
                        maxSalary               :   "",
                        maxSalPeriod            :   "",
                        minEducation            :   "",
                        minExperience           :   "",

                        primarySkills           :   "",
                        minPrimExp              :   "",
                        secondarySkills         :   "",
                        minSecExp               :   "",
                        otherSkills             :   "",
                        minOtherExp             :   "",
                        preferredSkills         :   "",

                        status                  :   "Active"
                    });


                    this.props.history.push("/job-profile/" + job_id);
                }
            })

            .catch(error => {
                console.log(error);
                if(error.message === "Request failed with status code 401"){
                  var userDetails =  localStorage.removeItem("userDetails");
                  localStorage.clear();
                  Swal.fire({title  : ' ',
                            html    : "Your session is expired! You need to login again. "+"<br>"+" Click OK to go to Login Page",
                            text    :  "" })
                      .then(okay => {
                        if (okay) {
                          window.location.href = "/login";
                        }
                      });
                }else{
                    Swal.fire("", "Submit Error!", "");
                }
            })
    }


    updateData(formValues) {
        Axios.patch("/api/jobs/update", formValues)
            .then(response => {
                console.log("formValues :", formValues);
                if (response.data.message === "Job details updated Successfully!") {
                    console.log("response.data : ", response.data);
                    Swal.fire("", "your profile updated successfully!", "");
                    this.props.history.push("/job-profile/" + this.state.job_id);
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire("Update Error!", error.message, 'error');
            })
    }

    onEditorChange(evt) {
        this.setState({
            jobDesc: evt.editor.getData()
        });
    }

    setWorkFromHome(event) {
        this.setState({
            workFromHome: event.target.checked
        });
    }

    keyPressNumber = (e) => {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 189]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) { // let it happen, don't do anything return; } // Ensure that it is a number and stop the keypress if ((e.shiftKey || (e.keyCode < 48 || e.keyCode> 58)) && (e.keyCode < 96 || e.keyCode> 105 || e.keyCode === 190 || e.keyCode === 46)) {
            e.preventDefault();
        }
    }

    camelCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    handleChangeState(event) {
        var designation = document.getElementById("states");
        var stateCode = designation.options[designation.selectedIndex].getAttribute("statecode");
        this.setState({
            [event.target.name]: event.target.value,
            stateCode: stateCode
        });
    }

    handleChangePlaces = address => {
        this.setState({
            address: address
        });
    };

    handleSelect = address => {

        geocodeByAddress(address)
            .then((results) => {
                console.log(results)
                for (var i = 0; i < results[0].address_components.length; i++) {
                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {
                        switch (results[0].address_components[i].types[b]) {
                            case 'sublocality_level_1':
                                var area = results[0].address_components[i].long_name;
                                break;
                            case 'sublocality_level_2':
                                area = results[0].address_components[i].long_name;
                                break;
                            case 'locality':
                                var city = results[0].address_components[i].long_name;
                                break;
                            case 'administrative_area_level_1':
                                var state = results[0].address_components[i].long_name;
                                var stateCode = results[0].address_components[i].short_name;
                                break;
                            case 'administrative_area_level_2':
                                var district = results[0].address_components[i].long_name;
                                break;
                            case 'country':
                                var country = results[0].address_components[i].long_name;
                                var countryCode = results[0].address_components[i].short_name;
                                break;
                            case 'postal_code':
                                var pincode = results[0].address_components[i].long_name;
                                break;
                            default:
                                break;
                        }
                    }
                }

                console.log('states==>', state)

                this.setState({
                    area            :   area,
                    city            :   city,
                    district        :   district,
                    states          :   state,
                    country         :   country,
                    pincode         :   pincode,
                    stateCode       :   stateCode,
                    countryCode     :   countryCode
                })
            })

            .catch(error => console.error('Error', error));

        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.setState({
                'latLng': latLng
            }))
            .catch(error => console.error('Error', error));

        this.setState({
            address: address
        });
    };

    handleDelete(i) {
        const {
            tags
        } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({
            tags: [...state.tags, tag]
        }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({
            tags: newTags
        });
    }

    handleTagClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }
 
    

    onprimarySkillAddition (tag) {
        if (tag.id == tag.text) {
            tag.id = "" 
        }
        this.setState(state => ({ primarySkillTags: [...state.primarySkillTags, tag] }));
    }

    onprimarySkillClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    onprimarySkillDrag(tag, currPos, newPos) {
        const primarySkillTags = [...this.state.primarySkillTags];
        const newTags = primarySkillTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ primarySkillTags: newTags });
    }

    onprimarySkillDelete (i) {
        const { primarySkillTags } = this.state;
        this.setState({
          primarySkillTags: primarySkillTags.filter((tag, index) => index !== i),
        });
    }
    
    
    onsecondarySkillAddition (tag) {  
        if (tag.id == tag.text) {
            tag.id = "" 
        }
        this.setState(state => ({ secondarySkillTags: [...state.secondarySkillTags, tag] }));
    }

    onsecondarySkillClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    onsecondarySkillDrag(tag, currPos, newPos) {
        const secondarySkillTags = [...this.state.secondarySkillTags];
        const newTags = secondarySkillTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ secondarySkillTags: newTags });
    }

    onsecondarySkillDelete (i) {
        const { secondarySkillTags } = this.state;
        this.setState({
          secondarySkillTags: secondarySkillTags.filter((tag, index) => index !== i),
        });
    }

    onOtherSkillAddition (tag) {
        if (tag.id == tag.text) {
            tag.id = "" 
        }
        
        this.setState(state => ({ otherSkillTags: [...state.otherSkillTags, tag] }));
    }

    onOtherSkillClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    onOtherSkillDrag(tag, currPos, newPos) {
        const otherSkillTags = [...this.state.otherSkillTags];
        const newTags = otherSkillTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ otherSkillTags: newTags });
    }

    onOtherSkillDelete (i) {
        const { otherSkillTags } = this.state;
        this.setState({
          otherSkillTags: otherSkillTags.filter((tag, index) => index !== i),
        });
    }


    onPreferredAddition (tag) {
        if (tag.id == tag.text) {
            tag.id = "" 
        }
        this.setState(state => ({ preferredSkillTags: [...state.preferredSkillTags, tag] }));
    }

    onPreferredClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    onPreferredDrag(tag, currPos, newPos) {
        const preferredSkillTags = [...this.state.preferredSkillTags];
        const newTags = preferredSkillTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ preferredSkillTags: newTags });
    }

    onPreferredDelete (i) {
        const { preferredSkillTags } = this.state;
        this.setState({
          preferredSkillTags: preferredSkillTags.filter((tag, index) => index !== i),
        });
    }



    onChangecompany(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var company_id;
        var industry_id;
        if (document.querySelector('#company_id option[value="' + value + '"]')) {
            //company_id = document.querySelector('#company option[value="' + value + '"]').getAttribute("data-value")
            industry_id = document.querySelector('#company_id option[value="' + value + '"]').getAttribute("data-industry")
        }else{ //company_id = "" 
        }

        this.setState({  industry_id:industry_id },()=>{
            console.log(this.state)
        });  
    }   

    
    onChangeFunctionalArea(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var functionalarea_id;
        if (document.querySelector('#functionalArea option[value="' + value + '"]')) {
            functionalarea_id = document.querySelector('#functionalArea option[value="' + value + '"]').getAttribute("data-value")
        }else{ functionalarea_id = "" }

        this.setState({ functionalarea_id : functionalarea_id },()=>{
            console.log(this.state)
        });  
        
    }   

    onChangeSubFunctionalArea(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var subfunctionalarea_id;
        if (document.querySelector('#subFunctionalArea option[value="' + value + '"]')) {
            subfunctionalarea_id = document.querySelector('#subFunctionalArea option[value="' + value + '"]').getAttribute("data-value")
        }else{ subfunctionalarea_id = "" }

        this.setState({ subfunctionalarea_id : subfunctionalarea_id },()=>{
            console.log(this.state)
        });  
    }

    onChangeRole(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var jobrole_id;
        if (document.querySelector('#jobRole option[value="' + value + '"]')) {
            jobrole_id = document.querySelector('#jobRole option[value="' + value + '"]').getAttribute("data-value")
        }else{ jobrole_id = "" }

        this.setState({ jobrole_id : jobrole_id },()=>{
        });  
        
    }

    onChangeJobType(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var jobtype_id;
        if (document.querySelector('#jobType option[value="' + value + '"]')) {
            jobtype_id = document.querySelector('#jobType option[value="' + value + '"]').getAttribute("data-value")
        }else{ jobtype_id = "" }

        this.setState({ jobtype_id : jobtype_id },()=>{
            console.log(this.state)
        });  
        
    }

    onChangeJobTime(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var jobtime_id;
        if (document.querySelector('#jobTime option[value="' + value + '"]')) {
            jobtime_id = document.querySelector('#jobTime option[value="' + value + '"]').getAttribute("data-value")
        }else{ jobtime_id = "" }

        this.setState({ jobtime_id : jobtime_id },()=>{
            console.log(this.state)
        });  
        
    }

    onChangeJobShift(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var jobshift_id;
        if (document.querySelector('#jobShift option[value="' + value + '"]')) {
            jobshift_id = document.querySelector('#jobShift option[value="' + value + '"]').getAttribute("data-value")
        }else{ jobshift_id = "" }

        this.setState({ jobshift_id : jobshift_id },()=>{
            //console.log(this.state)
        });  
        
    }
    
    onChangeJobSector(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var jobsector_id;
        if (document.querySelector('#jobSector option[value="' + value + '"]')) {
            jobsector_id = document.querySelector('#jobSector option[value="' + value + '"]').getAttribute("data-value")
        }else{ jobsector_id = "" }

        this.setState({ jobsector_id : jobsector_id },()=>{
            //console.log(this.state)
        });  
    }
    onChangeMinEducation(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var mineducation_id;
        if (document.querySelector('#minEducation option[value="' + value + '"]')) {
            mineducation_id = document.querySelector('#minEducation option[value="' + value + '"]').getAttribute("data-value")
        }else{ mineducation_id = "" }

        this.setState({ mineducation_id : mineducation_id },()=>{
            //console.log(this.state)
        });  
    }
    getFileDetails(fileName){
     Axios
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
                jobTitle: a.jobBasicInfo.jobTitle,
                companyName : a.company_id.companyName,
                industry: a.jobBasicInfo.industry_id.industry,
                functionalarea: a.jobBasicInfo.functionalarea_id.functionalArea,
                subfunctionalarea: a.jobBasicInfo.subfunctionalarea_id.subfunctionalArea,
                jobrole: a.jobBasicInfo.jobrole_id.jobRole,
                gender: a.jobBasicInfo.gender,
                jobsector: a.jobBasicInfo.jobsector_id.jobSector,
                jobtype: a.jobBasicInfo.jobtype_id.jobType,
                jobshift: a.jobBasicInfo.jobshift_id.jobShift,
                jobtime: a.jobBasicInfo.jobtime_id.jobTime,
                positions : a.jobBasicInfo.positions,
                location : a.location.address+", "+a.location.district+", " +a.location.state+" - "+a.location.stateCode+" , "+a.location.country+" - "+a.location.countryCode+" , "+a.location.pincode,
                minSalary : a.ctcOffered.minSalary,
                maxSalary : a.ctcOffered.maxSalary,
                mineducation    : a.eligibility.mineducation_id.qualification,
                minExperience   : a.eligibility.minExperience,
                contactPersonName : a.jobBasicInfo.contactPersonName,
                contactPersonEmail : a.jobBasicInfo.contactPersonEmail,
                contactPersonPhone : a.jobBasicInfo.contactPersonPhone
            }
          })

          var failedRecordsTable = response.data.failedRecords.map((a, i)=>{
          return{
                
                jobTitle: a.jobTitle,
                companyID : a.companyID,  
                industry: a.industry,
                functionalarea: a.functionalarea,
                subfunctionalarea: a.subfunctionalarea,
                jobrole: a.jobrole,
                gender: a.gender,
                jobsector: a.jobsector,
                jobtype: a.jobtype,
                jobshift: a.jobshift,
                jobtime: a.jobtime,
                positions : a.positions,
                location : a.address+", "+a.district+", " +a.state+" - "+a.stateCode+" , "+a.country+" - "+a.countryCode+" , "+a.pincode,
                minSalary : a.minSalary,
                maxSalary : a.maxSalary,
                mineducation    : a.mineducation,
                minExperience   : a.minExperience,
                contactPersonName : a.contactPersonName,
                contactPersonEmail : a.contactPersonEmail,
                contactPersonPhone : a.contactPersonPhone,
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

render(){   
        const searchOptions =   { componentRestrictions: {country: "in"} }      
        const KeyCodes = {
          comma: 188,
          enter: 13,
        };

        const delimiters = [KeyCodes.comma, KeyCodes.enter];
    return(
                <div className="pageWrapper addJobBackgroundColor container-fluid">
                    <div className="row">
                        <div  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt20">
                          <ul className="nav tabNav nav-pills col-lg-3 col-md-3 col-sm-12 col-xs-12 pull-right">
                            <li className="active col-lg-5 col-md-5 col-xs-5 col-sm-5 NOpadding text-center"><a data-toggle="pill" href="#manual">Manual</a></li>
                            <li className="col-lg-6 col-md-6 col-xs-6 col-sm-6 NOpadding  text-center"><a data-toggle="pill" href="#bulk">Bulk Upload</a></li>
                          </ul>
                        </div>

                    <section className="Content tab-content">    
                        <div id="bulk" className="tab-pane fade in col-lg-12 col-md-1f2 col-sm-12 col-xs-12 mt">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerForm">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 outerForm">
                                <BulkUpload url="/api/jobs/post/bulk-upload-jobs"
                                    data={{ "createdBy": localStorage.getItem("user_ID") }}
                                    uploadedData={this.uploadedData}
                                    fileurl="https://testjobportal.s3.amazonaws.com/JobBulkUplaod.xlsx"
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
                        </div>
                        <div id="manual" className="tab-pane fade in active col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                            <div className="col-lg-12 addJobForm pageWrapperBorder borderColor">
                                <div className="col-lg-10 col-lg-offset-1 mainFormSection">
                                    <div className="addJobFormHeading col-lg-12"> Post A Job <div className="addJobFormHr col-lg-12"></div> </div>
                                    <form id="addJob" autoComplete="off">

                                        <div className="addJobMainHead col-lg-12">
                                            <i className="fa fa-info"></i> 
                                            <span className="addcompLeftPadding"> Add Company </span>
                                        </div>

                                        <div className="col-lg-6 addJobFieldRow text-left">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <label htmlFor="company" className="addjobformLable">
                                                        Company Name
                                                        <span className="asterisk"> &#42;</span>
                                                    </label>
                                                 
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i></span> 
                                                            {/*<input type="text" list="company" className="form-control addJobFormField" refs="company" id="selectcompany" value={this.state.company} name="company"
                                                            onChange={this.onChangecompany.bind(this)} />*/}
                                                            
                                                            <select name="company_id" id="company_id" className="companylist form-control addJobFormField" onChange={this.onChangecompany.bind(this)} value={this.state.company_id} >
                                                                <option disabled value="Select Employer" >Select Employer</option>
                                                                {this.state.companylist.map((item, key) =>
                                                                    <option key={key} value={item._id} data-industry={item.industry_id}>{item.companyName}</option>
                                                                )}
                                                            </select>
                                                    </div>
                                                    <span id="companyError" className="errorMsgJobPost"></span>
                                                </div>
                                            </div>              
                                        </div>    

                                        <div className="addJobFormHr col-lg-12"></div>
                                    
                                        <div className="addJobMainHead col-lg-12">
                                            <i className="fa fa-info"></i> 
                                            <div className="labelLeftPadding"> Basic Info </div>
                                        </div>

                                        <div className="col-lg-12 addJobFieldRow text-left">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="row">
                                                        <label htmlFor="jobTitle" className="addjobformLable col-lg-12">
                                                            Job Title
                                                            <span className="asterisk"> &#42; </span>
                                                            <div href="#" data-tip data-for='jobTitleTooltip' className="pull-right">
                                                                <i title="Please enter job title" className="fa fa-question-circle"></i>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i> </span> 
                                                        <input type="text" className="form-control addJobFormField" name="jobTitle" id="jobTitle" maxLength="50" value={this.state.jobTitle} onChange={this.handleChange}/>
                                                    </div>
                                                    <span id="jobTitleError" className="errorMsgJobPost"></span>
                                                </div>
                                                
                                                <div className="col-lg-6">
                                                    <div className="row">
                                                        <label htmlFor="address" className="addjobformLable col-lg-12"> Job Location <span className="asterisk">&#42;</span> </label>
                                                    </div>  
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField">
                                                            <FontAwesomeIcon className="addJobLocationIcon" icon={['fas', 'map-marker-alt']} />
                                                        </span> 
                                                        <PlacesAutocomplete
                                                            value           =   {this.state.address}
                                                            onChange        =   {this.handleChangePlaces}
                                                            onSelect        =   {this.handleSelect}
                                                            searchOptions   =   {searchOptions}>
                                                            
                                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>   (
                                                                    <div className="col-lg-12 form-control addJobFormField">
                                                                        <input maxLength="200"
                                                                            {...getInputProps({
                                                                                                placeholder: 'Search Address ...',
                                                                                                className: 'col-lg-12 location-search-input errorinputText',
                                                                                                id:"address",
                                                                                                name:"address"
                                                                                            })
                                                                            }
                                                                        />
                                                                        
                                                                        <div className={this.state.address ? "autocomplete-dropdown-container col-lg-12" : ""}>
                                                                            {loading && <div>Loading...</div>}
                                                                            {suggestions.map(suggestion => {
                                                                                                                const className = suggestion.active
                                                                                                                    ? 'suggestion-item--active'
                                                                                                                    : 'suggestion-item';
                                                                                                                // inline style for demonstration purpose
                                                                                                                const style = suggestion.active
                                                                                                                    ? { backgroundColor: 'var(--main-border-color)', cursor: 'pointer'}
                                                                                                                    : { backgroundColor: 'var(--form-field-background-color)', cursor: 'pointer', paddingLeft: '10px'};
                                                                            
                                                                                                                return (
                                                                                                                            <div
                                                                                                                                {...getSuggestionItemProps(suggestion, {
                                                                                                                                                                            className,
                                                                                                                                                                            style,
                                                                                                                                }                           )          }
                                                                                                                            >
                                                                                                                            <span> {suggestion.description} </span>
                                                                                                                            </div>
                                                                                                                        );
                                                                                                            }
                                                                                            )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                            )}
                                                        </PlacesAutocomplete>
                                                    </div>
                                                    <span id="addressError" className="errorMsgJobPost"></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 addJobFieldRow text-left">
                                            <div className="row">
                                                <div className="col-lg-3 addJobFixzIndex">
                                                    <div className="row">
                                                        <label htmlFor="states" className="addjobformLable col-lg-12"> State <span className="asterisk">&#42;</span> </label>
                                                    </div>
                                                    <div className="input-group"> 
                                                        <input type="text" className="form-control addJobFormField addJobState" ref="states" id="states" name="states" value={this.state.states} onChange={this.handleChange}/>
                                                        
                                                    </div>
                                                    <span id="statesError" className="errorMsgJobPost"></span>  
                                                </div>  
                                                
                                                <div className="col-lg-3 addJobFixzIndex">
                                                    <div className="row">
                                                        <label className="addjobformLable col-lg-12"> City <span className="asterisk">&#42;</span> </label>
                                                    </div>  
                                                    <div className="input-group"> 
                                                        <input type="text" className="form-control addJobFormField addJobState" ref="cityVillage" id="cityVillage" name="cityVillage" maxLength="50" value={this.state.cityVillage} onChange={this.handleChange}/>
                                                    </div>
                                                    <span id="cityVillageError" className="errorMsgJobPost"></span>
                                                </div>
                                                
                                                <div className="col-lg-3 addJobFixzIndex">
                                                    <div className="row">
                                                        <label className="addjobformLable col-lg-12"> District <span className="asterisk">&#42;</span> </label>
                                                    </div>
                                                    <div className="input-group"> 
                                                        <input type="text" className="form-control addJobFormField addJobState" ref="district" id="district" name="district" maxLength="50" value={this.state.district} onChange={this.handleChange}/>
                                                    </div>
                                                    <span id="districtError" className="errorMsgJobPost"></span>
                                                </div>
                                                
                                                <div className="col-lg-3 addJobFixzIndex">
                                                    <div className="row">
                                                        <label className="addjobformLable col-lg-12"> Pincode <span className="asterisk">&#42;</span> </label>
                                                    </div>
                                                    <div className="input-group"> 
                                                        <input type="text" className="form-control addJobFormField addJobState" ref="pincode" id="pincode" name="pincode" maxLength="06" value={this.state.pincode} onChange={this.keyPressNumber.bind(this)} onChange={this.handleChange}/>
                                                    </div>
                                                    <span id="pincodeError" className="errorMsgJobPost"></span>
                                                </div>
                                            </div>
                                        </div>
                                        

                                        <div className="form-group col-lg-12 addJobFieldRow text-left">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <label htmlFor="functionalArea" className="addjobformLable"> Functional Area <span className="asterisk">&#42;</span> </label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i></span> 
                                                            <input type="text" list="functionalArea" className="form-control addJobFormField" refs="functionalArea" 
                                                             name="functionalArea" id="selectFunctionalArea" maxLength="100" value={this.state.functionalArea} data-value={this.state.functionalarea_id}
                                                            onChange={this.onChangeFunctionalArea.bind(this)} />
                                                            <datalist name="functionalArea" id="functionalArea" className="functionalArealist" >
                                                                {this.state.functionalArealist.map((item, key) =>
                                                                    <option key={key} value={item.functionalArea} data-value={item._id}/>
                                                                )}
                                                            </datalist>
                                                    </div>
                                                    <span id="functionalAreaError" className="errorMsgJobPost"></span>
                                                </div>          
                                                
                                                <div className="col-lg-6 addJobFixzIndex">
                                                    <label htmlFor="subFunctionalArea" className="addjobformLable"> Sub-Functional Area <span className="asterisk">&#42;</span> </label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'briefcase']} /></span> 
                                                            <input type="text" list="subFunctionalArea" className="form-control addJobFormField" refs="subFunctionalArea"
                                                             id="selectSubFunctionalArea" maxLength="100" value={this.state.subFunctionalArea} name="subFunctionalArea"
                                                            onChange={this.onChangeSubFunctionalArea.bind(this)} />
                                                            <datalist name="subFunctionalArea" id="subFunctionalArea" className="subFunctionalArealist" >
                                                                {this.state.subFunctionalArealist.map((item, key) =>
                                                                    <option key={key} value={item.subfunctionalArea} data-value={item._id}/>
                                                                )}
                                                            </datalist>
                                                    </div>
                                                    <span id="subFunctionalAreaError" className="errorMsgJobPost"></span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group col-lg-12 text-left">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="row">
                                                        <label htmlFor="jobRole" className="addjobformLable col-lg-12"> Role <span className="asterisk">&#42;</span>
                                                            <div href="#" data-tip data-for='jobTitleTooltip' className="pull-right">
                                                                <i title="Please enter job role" className="fa fa-question-circle"></i>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'briefcase']} /></span> 
                                                            <div className="input-group col-lg-12">
                                                                <input type="text" list="jobRole" className="form-control addJobFormField" refs="jobRole" id="selectrole" maxLength="50" value={this.state.jobRole} name="jobRole"
                                                                onChange={this.onChangeRole.bind(this)} />
                                                                <datalist name="jobRole" id="jobRole" className="jobRoleArray" >
                                                                    {this.state.jobRoleArray.map((item, key) =>
                                                                        <option key={key} value={item.jobRole} data-value={item._id}/>
                                                                    )}
                                                                </datalist>
                                                            </div>
                                                    </div>
                                                    <span id="jobRoleError" className="errorMsgJobPost"></span>
                                                </div>
                                                
                                                <div className="col-lg-6">
                                                    <label htmlFor="gender" className="addJobGenderTitle"> Who Can Apply </label>
                                                    <div className="input-group addJobGenderFeildWrapper">
                                                        <div className={this.state.gender==="Male Only"? "addJobGenderField col-lg-4 addJobGenderActive" : "addJobGenderField col-lg-4" }  id="Male Only" name="gender" value="Male Only" onClick={this.setGender.bind(this)}>
                                                            <div className="row">
                                                                Male Only
                                                            </div>
                                                        </div>
                                                        <div className={this.state.gender==="Female Only"? "addJobGenderField col-lg-4 addJobGenderActive" : "addJobGenderField col-lg-4" } id="Female Only" name="gender" value="Female Only" onClick={this.setGender.bind(this)}>
                                                            <div className="row">
                                                                Female Only
                                                            </div>
                                                        </div>
                                                        <div className={this.state.gender==="Both (Male & Female)"? "addJobGenderField col-lg-4 addJobGenderActive" : "addJobGenderField col-lg-4" } id="Both (Male & Female)" name="gender" value="Both (Male & Female)"  onClick={this.setGender.bind(this)}>
                                                            <div className="row">
                                                                Both (Male & Female)
                                                            </div>
                                                        </div>          
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-3 text-left">
                                            <label htmlFor="workFromHome" className="containerWfh">
                                                Work From Home
                                                <input type="checkbox" name="workFromHome" id="workFromHome" value={this.state.workFromHome} onChange={this.setWorkFromHome.bind(this)} />
                                                <span className="checkmark2"></span>
                                            </label>
                                        </div>
                                        
                                        <div className="col-lg-12 addJobFieldRow text-left">
                                            <div className="row">
                                            <div className="col-lg-4">
                                                    <label htmlFor="jobSector" className="addjobformLable"> Job Sector </label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"><i className="fa fa-list-alt"></i></span> 
                                                           <input type="text" list="jobSector" className="form-control addJobFormField" refs="jobSector" id="selectjobSector" maxLength="50" value={this.state.jobSector} name="jobSector"
                                                            onChange={this.onChangeJobSector.bind(this)} />
                                                            <datalist name="jobSector" id="jobSector" className="jobSectorArray" >
                                                                {this.state.jobSectorArray.map((item, key) =>
                                                                  <option key={key} value={item.jobSector} data-value={item._id}/>
                                                                )}
                                                            </datalist>
                                                    </div>
                                                    <span id="jobSectorError" className="errorMsg"></span>
                                                </div>
                                                <div className="col-lg-4">
                                                    <label htmlFor="jobType" className="addjobformLable"> Job Type </label>
                                                    <div className="input-group col-lg-12">
                                                        <span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i> </span> 
                                                            <input type="text" list="jobType" className="form-control addJobFormField" refs="jobType" id="selectjobType" maxLength="50" value={this.state.jobType} name="jobType"
                                                            onChange={this.onChangeJobType.bind(this)} />
                                                            <datalist name="jobType" id="jobType" className="jobTypeArray" >
                                                                {this.state.jobTypeArray.map((item, key) =>
                                                                    <option key={key} value={item.jobType} data-value={item._id}/>
                                                                )}
                                                            </datalist>
                                                    </div>
                                                     <span id="jobTypeError" className="errorMsgJobPost"></span>
                                                </div>
                                                
                                                <div className="col-lg-4">
                                                    <label htmlFor="jobTime" className="addjobformLable"> Job Time </label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'business-time']} /></span> 
                                                           <input type="text" list="jobTime" className="form-control addJobFormField" refs="jobTime" id="selectJobTime" maxLength="50" value={this.state.jobTime} name="jobTime"
                                                            onChange={this.onChangeJobTime.bind(this)} />
                                                            <datalist name="jobTime" id="jobTime" className="jobTimeArray" >
                                                                {this.state.jobTimeArray.map((item, key) =>
                                                                  <option key={key} value={item.jobTime} data-value={item._id}/>
                                                                )}
                                                            </datalist>
                                                    </div>
                                                    <span id="jobTimeError" className="errorMsgJobPost"></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 addJobFieldRow text-left">
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <label htmlFor="jobShift" className="addjobformLable"> Job Shift </label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'business-time']} /></span> 
                                                           <input type="text" list="jobShift" className="form-control addJobFormField" refs="jobShift" id="selectJobShift" maxLength="50" value={this.state.jobShift} name="jobShift"
                                                            onChange={this.onChangeJobShift.bind(this)} />
                                                            <datalist name="jobShift" id="jobShift" className="jobShiftArray" >
                                                                {this.state.jobShiftArray.map((item, key) =>
                                                                  <option key={key} value={item.jobShift} data-value={item._id}/>
                                                                )}
                                                            </datalist>
                                                    </div>
                                                    <span id="jobShiftError" className="errorMsg"></span>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="row">
                                                        <label htmlFor="positions" className="addjobformLable col-lg-12"> No. of Positions  <span className="asterisk">&#42;</span></label>
                                                    </div>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"><i className="fa fa-users"></i></span> 
                                                        <input type="text" className="form-control addJobFormField" name="positions" id="positions" maxLength="50" value={this.state.positions} onChange={this.handleChange}/>
                                                    </div>
                                                    <span id="positionsError" className="errorMsgJobPost"></span>
                                                </div>
                                                
                                                <div className="col-lg-4 democlass">
                                                    <label htmlFor="lastDateOfAppl" className="addjobformLable"> Last Date of Application </label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"><i className="fa fa-calendar"></i></span> 
                                                        <input type="date" className="form-control addJobFormField" name="lastDateOfAppl" id="lastDateOfAppl" value={this.state.lastDateOfAppl} onChange={this.handleChange}/>
                                                    </div>
                                                     <span id="dateError" className="errorMsgJobPost"></span>
                                                </div>
                                            </div>  
                                        </div>

                                        <div className="col-lg-12 addJobFieldRow"> <div className="addJobFormHr col-lg-12"></div> </div>    
                                        
                                        <div className="addJobSubHead addJobSubHeadSalary col-lg-12">
                                            <i className="fa fa-rupee salaryIcon"></i>
                                            <div className="labelLeftPadding"> Salary </div>
                                        </div>
                                        
                                        <div className="col-lg-12 addJobFieldRow text-left">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="row row-no-gutters">
                                                        <div className="col-lg-8">
                                                            <label htmlFor="minSalary" className="addjobformLable"> Minimum Salary <i className="fa fa-rupee"></i> <span className="asterisk">&#42;</span> </label>
                                                            <div className="input-group">
                                                                <span className="input-group-addon addJobFormField"> <i className="fa fa-rupee addJobrupee"></i> </span> 
                                                                <input type="text" className="form-control addJobFormField" name="minSalary" id="minSalary" maxLength="50" value={this.state.minSalary} onChange={this.handleChange}/>
                                                            </div>
                                                            <span id="minSalaryError" className="errorMsgJobPost"></span>
                                                        </div>
                                                        
                                                        <div className="col-lg-4">
                                                            <label htmlFor="minSalPeriod" className="addjobformLable"> &nbsp; </label>
                                                            <select className="form-control addJobFormField minSalaryDropdown" name="minSalPeriod" id="minSalPeriod" value={this.state.minSalPeriod} onChange={this.handleChange}>
                                                                
                                                                <option selected> Per Year  </option>
                                                            </select>
                                                            <span id="minSalPeriodError" className="errorMsgJobPost"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-lg-6">
                                                    <div className="row row-no-gutters">
                                                        <div className="col-lg-8">
                                                            <label htmlFor="maxSalary" className="addjobformLable"> Maximum Salary <i className="fa fa-rupee"></i> <span className="asterisk">&#42;</span> </label>
                                                            <div className="input-group">
                                                                <span className="input-group-addon addJobFormField"><i className="fa fa-rupee addJobrupee"></i> </span> 
                                                                <input type="text" className="form-control addJobFormField" name="maxSalary" id="maxSalary" maxLength="50" value={this.state.maxSalary} onChange={this.handleChange}/>
                                                            </div>
                                                            <span id="maxSalaryError" className="errorMsgJobPost"></span>
                                                        </div>
                                                        
                                                        <div className="col-lg-4">
                                                            <label htmlFor="maxSalPeriod" className="addjobformLable"> &nbsp; </label>
                                                            <select className="form-control addJobFormField maxSalaryDropdown" name="maxSalPeriod" id="maxSalPeriod" value={this.state.maxSalPeriod} onChange={this.handleChange}>
                                                                
                                                                <option selected> Per Year  </option>
                                                            </select>
                                                            <span id="maxSalPeriodError" className="errorMsgJobPost"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 addJobFieldRow"> <div className="addJobFormHr col-lg-12"> </div> </div>
                                        
                                        <div className="col-lg-12 addJobSubHead">
                                            <i className="fa fa-book"></i>
                                            <div className="labelLeftPadding"> Required Education & Experience </div>
                                        </div>
                                        
                                        <div className="col-lg-12 addJobFieldRow text-left">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <label htmlFor="minEducation" className="addjobformLable"> Minimum Education Required <span className="asterisk">&#42;</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"> <i className="fa fa-graduation-cap"></i> </span> 
                                                        <input type="text" list="minEducation" className="form-control addJobFormField" refs="minEducation" id="selectminEducation" maxLength="50" value={this.state.minEducation} name="minEducation"
                                                        onChange={this.onChangeMinEducation.bind(this)} />
                                                        <datalist name="minEducation" id="minEducation" className="minEducationArray" >
                                                            {this.state.minEducationArray.map((item, key) =>
                                                              <option key={key} value={item.qualification} data-value={item._id}/>
                                                            )}
                                                        </datalist> 
                                                    </div>
                                                    <span id="minEducationError" className="errorMsgJobPost"></span>
                                                </div>
                                                
                                                <div className="col-lg-6">
                                                    <label htmlFor="minExperience" className="addjobformLable"> Minimum Overall Experience <span className="asterisk">&#42;</span></label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"> <i className="fa fa-history"></i> </span> 
                                                        <input type="number" className="form-control addJobFormField" name="minExperience" id="minExperience" maxLength="50" value={this.state.minExperience} onChange={this.handleChange}/>
                                                    </div>
                                                    <span id="minExperienceError" className="errorMsgJobPost"></span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-12 addJobFieldRow"> <div className="addJobFormHr col-lg-12"> </div> </div>
                                        
                                        <div className="col-lg-12 addJobSubHead addJobSubHeadSkills">
                                            <i className='fa fa-cog'> </i> 
                                            <div className="labelLeftPadding"> Expected Skills </div>
                                        </div>
                                        
                                        <div className="col-lg-12 addJobFieldRow text-left">
                                            <div className="row">
                                                <div className="col-lg-8 primarySkillsField">
                                                    <label htmlFor="primarySkills" className="addjobformLable"> Primary Skills </label>
                                                        <div className="input-group col-lg-12">
                                                            <span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span>
                                                            <ReactTags
                                                                //ref={this.reactTags}
                                                                tags            =   {this.state.primarySkillTags}
                                                                suggestions     =   {this.state.primarySkillSuggestions}
                                                                delimiters      =   {delimiters}
                                                                handleDelete    =   {this.onprimarySkillDelete.bind(this)}
                                                                handleAddition  =   {this.onprimarySkillAddition.bind(this)}
                                                                handleDrag      =   {this.onprimarySkillDrag.bind(this)}
                                                                handleTagClick  =   {this.onprimarySkillClick.bind(this)}
                                                                maxLength       =   "42" 
                                                            />
                                                        </div>
                                                        <span id="primarySkillTagsError" className="errorMsgJobPost"></span>
                                                </div>
                                                
                                                <div className="col-lg-4">
                                                    <label htmlFor="minPrimExp" className="addjobformLable"> Min. Experience Req. </label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"> <i className="fa fa-bar-chart"></i> </span> 
                                                        <input type="text" className="form-control addJobFormField" name="minPrimExp" id="minPrimExp" maxLength="50" value={this.state.minPrimExp} onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 addJobFieldRow text-left">
                                            <div className="row">
                                                <div className="col-lg-8 secondarySkillsField">
                                                    <label htmlFor="secondarySkills" className="addjobformLable"> Secondary Skills </label>
                                                    <div className="input-group col-lg-12">
                                                        <span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span>
                                                        <ReactTags
                                                            tags            =   {this.state.secondarySkillTags}
                                                            suggestions     =   {this.state.secondarySkillSuggestions}
                                                            delimiters      =   {delimiters}
                                                            handleDelete    =   {this.onsecondarySkillDelete.bind(this)}
                                                            handleAddition  =   {this.onsecondarySkillAddition.bind(this)}
                                                            handleDrag      =   {this.onsecondarySkillDrag.bind(this)}
                                                            handleTagClick  =   {this.onsecondarySkillClick.bind(this)}
                                                            maxLength       =   "42"
                                                        />    
                                                    </div>
                                                    <span id="secondarySkillTagsError" className="errorMsgJobPost"></span>
                                                </div>
                                                
                                                <div className="col-lg-4">
                                                    <label htmlFor="minSecExp" className="addjobformLable"> Min. Experience Req. </label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"> <i className="fa fa-bar-chart"></i> </span> 
                                                        <input type="text" className="form-control addJobFormField" name="minSecExp" id="minSecExp" maxLength="50" value={this.state.minSecExp} onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 addJobFieldRow text-left">
                                            <div className="row">
                                                <div className="col-lg-8 otherSkillsField">
                                                    <label htmlFor="otherSkills" className="addjobformLable"> Other Skills </label>
                                                    <div className="input-group col-lg-12">
                                                        <span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span>
                                                        <ReactTags
                                                            tags            =   {this.state.otherSkillTags}
                                                            suggestions     =   {this.state.otherSkillSuggestions}
                                                            delimiters      =   {delimiters}
                                                            handleDelete    =   {this.onOtherSkillDelete.bind(this)}
                                                            handleAddition  =   {this.onOtherSkillAddition.bind(this)}
                                                            handleDrag      =   {this.onOtherSkillDrag.bind(this)}
                                                            handleTagClick  =   {this.onOtherSkillClick.bind(this)}
                                                            maxLength       =   "42"
                                                        />
                                                    </div>
                                                    <span id="otherSkillTagsError" className="errorMsgJobPost"></span>
                                                </div>
                                                
                                                <div className="col-lg-4">
                                                    <label htmlFor="minOtherExp" className="addjobformLable"> Min. Experience Req. </label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"> <i className="fa fa-bar-chart"></i> </span> 
                                                        <input type="text" className="form-control addJobFormField" name="minOtherExp" id="minOtherExp" maxLength="50" value={this.state.minOtherExp} onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-12 addJobFieldRow text-left">
                                            <label htmlFor="preferredSkills" className="addjobformLable"> Preferred Skills but not mandatory </label>
                                            <div className="input-group col-lg-12 preferredSkillsField">
                                                <span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span>
                                                <ReactTags
                                                    tags            =   {this.state.preferredSkillTags}
                                                    suggestions     =   {this.state.preferredSkillSuggestions}
                                                    delimiters      =   {delimiters}
                                                    handleDelete    =   {this.onPreferredDelete.bind(this)}
                                                    handleAddition  =   {this.onPreferredAddition.bind(this)}
                                                    handleDrag      =   {this.onPreferredDrag.bind(this)}
                                                    handleTagClick  =   {this.onPreferredClick.bind(this)}
                                                    maxLength       =   "42"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-12 addJobFieldRow"> <div className="addJobFormHr col-lg-12"> </div> </div>
                                        
                                        <div className="addJobMainHead col-lg-12">
                                            <i className="fa fa-info"> </i> 
                                            <div className="labelLeftPadding"> Contact Info </div>
                                        </div>
                                        <div className="col-lg-12 addJobFieldRow text-left">
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <label htmlFor="contactPersonName" className="addjobformLable"> Contact Person <span className="asterisk">&#42;</span> </label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"> <i className="fa fa-user"> </i> </span> 
                                                        <input type="text" className="form-control addJobFormField" name="contactPersonName" id="contactPersonName" maxLength="100" value={this.state.contactPersonName} onChange={this.handleChange}/>
                                                    </div>
                                                    <span id="contactPersonNameError" className="errorMsgJobPost"> </span>
                                                </div>
                                                
                                                <div className="col-lg-4">
                                                    <label htmlFor="contactPersonEmail" className="addjobformLable"> Email <span className="asterisk">&#42;</span> </label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon addJobFormField"> <i className="fa fa-envelope-o"> </i> </span> 
                                                        <input type="text" className="form-control addJobFormField" name="contactPersonEmail" id="contactPersonEmail" maxLength="50" value={this.state.contactPersonEmail} onChange={this.handleChange}/>
                                                    </div>
                                                    <span id="contactPersonEmailError" className="errorMsgJobPost"> </span>
                                                </div>
                                                
                                                <div className="col-lg-4">
                                                    <label htmlFor="contactPersonPhone" className="addjobformLable"> Phone Number <span className="asterisk">&#42;</span> </label>
                                                    <PhoneInput
                                                        className = "input-group-addon addJobFormField form-control" 
                                                        country   = {'in'}
                                                        id        = "contactPersonPhone"
                                                        value     = {this.state.contactPersonPhone}
                                                        onChange  = {contactPersonPhone => this.setState({ contactPersonPhone })}
                                                    />
                                                    <span id="contactPersonPhoneError" className="errorMsgJobPost"></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 addJobFieldRow"> <div className="addJobFormHr col-lg-12"> </div> </div>

                                        <div className="addJobSubHead col-lg-12">
                                            <i className="fa fa-briefcase"> </i>
                                            <div className="labelLeftPadding"> Job Description </div>
                                        </div>
                                        
                                        <div className="description text-left col-lg-12">
                                            <div className="form-group">
                                              <label htmlFor="jobDesc" className="addjobformLable jobDesc"> Describe the responsibilities of this job, required work experience, skills, or education. </label>
                                                <div> 
                                                    <CKEditor
                                                        editor      =   {ClassicEditor}
                                                        data        =   {this.state.jobDesc}
                                                        id          =   "jobDesc"
                                                        onInit      =   { editor => {}}
                                                        onChange    =   {(event, editor) => {this.setState({ jobDesc: editor.getData() });} }
                                                        
                                                        onBlur      =   {   
                                                                            editor  =>  {
                                                                                            console.log( 'Blur.', editor );
                                                                                        }   
                                                                        }
                                                        
                                                        onFocus     =   {   
                                                                            editor  => {
                                                                                            console.log( 'Focus.', editor );
                                                                                        } 
                                                                        }
                                                    />  
                                                </div> 
                                            </div>
                                        </div>   

                                        <div className="col-lg-12"> 
                                                <button className="col-lg-2 btn addJobFormField addJobPreviewBtn pull-left" data-status = "draft" onClick={this.handleSubmit.bind(this)}>
                                                    Save for Later 
                                                </button>

                                                {/*<button type="button" data-toggle="modal" data-target="#robust" data-dismiss="modal" className="col-lg-2 btn  pull-right addJobFormField addJobPreviewBtn"> 
                                                    PREVIEW 
                                                </button>

                                                <PreviewModal jobInfo = {this.state} />*/}

                                                <button className="col-lg-2 btn  pull-right buttonYellow addJobSubmitBtn" data-status = "active" onClick={this.handleSubmit.bind(this)}> {this.state.submitBtnText} </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>    
                    </div>
                </div>
            );
}
}
const mapStateToProps = (state)=>{
    return {
        userDetails     : state.userDetails,
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispatchToProps)(JobPosting)