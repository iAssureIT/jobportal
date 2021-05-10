import React, { Component }  from 'react';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';
import Axios                 from 'axios';
import Invoice from "./invoice.js";
import "./SelectCompany.css";
import "./SelectPackage.css";


class SelectPackage extends Component {
constructor() {
    super();
    this.state = {
        companyName     :"",
        companyBranch   :"",
        companyState    :"",
        companyCountry  :"",
        packagemasterArray  :[],
        hide :"none",
        hideForm :"block",

    }	
}	
componentDidMount(){
   Axios.get("/api/packagemaster/get/list")
        .then(response=>{
          console.log(response.data);
          this.setState({packagemasterArray : response.data});
        })
        .catch(error=>{
          console.log(error)
        })
}
subscribe(event){
    event.preventDefault();
    if(this.state.hide==="none"){
        this.setState({
            hide : "block",
            hideForm : "none",
        })
    }
}
handleChange(event){
    event.preventDefault();
    var value = event.currentTarget.value;
    var name  = event.currentTarget.name;

    this.setState({
        [name]:value,
    })
}
handleSubmit(event){
    event.preventDefault();
    this.props.history.push("/empsignuppage/");
}
render() {
    return (
        <div >
            <form className=" col-lg-10 col-lg-offset-1 signUpBoxFormWrapper signUpBoxFormWrapper2" style={{display:this.state.hideForm}}>
                 <div className="signUpBoxTitle">Select Package</div>
                <div className="row signUpBoxForm signUpBoxForm2">
                    {
                        this.state.packagemasterArray.length > 0
                     ?
                        this.state.packagemasterArray.map((elem,index)=>{
                            console.log("index",elem,index);
                        return(
                            <div className="col-lg-4" key={index}>
                                <div className="selectPackageWrapper">
                                    <div className="selectPackageTitle">
                                        {elem.packageName}
                                    </div>
                                    <div className= "row selectPackageTitleBorder">
                                        <div className="col-lg-4 col-lg-offset-4 packageBorder ">
                                            <div className="row">
                                                <div className=" packageBorder1">
                                                </div>
                                                <div className=" packageBorder2">
                                                </div>
                                                <div className=" packageBorder1">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="selectPackagePriceWrapper">
                                            <span className="selectPackageIcon1">
                                                <FontAwesomeIcon icon="rupee-sign" />
                                            </span>
                                            {elem.price}
                                        </div>
                                        <div className="selectPackageMonthWrapper">
                                            {elem.validity} Months
                                        </div>
                                    </div>
                                    <div className="selectPackageFeaturesWrapperMain">
                                        <div className="col-lg-12 selectPackageFeaturesWrapper">
                                            <div className="row selectPackageFeatures">
                                                <span className="selectPackageIcon1 col-lg-1">
                                                    <FontAwesomeIcon icon="plus-circle" />
                                                </span>
                                                <div className="col-lg-10">{elem.jobsPublish} Job Publish</div>
                                            </div>
                                            <div className="row selectPackageFeatures">
                                                <span className="selectPackageIcon1 col-lg-1">
                                                    <FontAwesomeIcon icon="plus-circle" />
                                                </span>
                                                <div className="col-lg-10">{elem.resumeDownloads} Resumes Download</div>
                                                
                                            </div>
                                            <div className="row selectPackageFeatures">
                                                <span className="selectPackageIcon1 col-lg-1">
                                                    <FontAwesomeIcon icon="plus-circle" />
                                                </span>
                                                <div className="col-lg-10">{elem.maxEmails} Max Emails</div>
                                                
                                            </div>
                                            <div className="row selectPackageFeatures">
                                                <span className="selectPackageIcon1 col-lg-1">
                                                    <FontAwesomeIcon icon="plus-circle" />
                                                </span>
                                                <div className="col-lg-10">{elem.videoIntroduction} Video Introduction</div>
                                                
                                            </div>
                                            <div className="row selectPackageFeatures">
                                                <span className="selectPackageIcon1 col-lg-1">
                                                    <FontAwesomeIcon icon="plus-circle" />
                                                </span>
                                                <div className="col-lg-10">{elem.robotInterviews} Robot Base Screening Interviews</div>
                                                
                                            </div>     
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            );
                         })
                    :
                    <div className="packagemasterNot">No Package Master Data Found</div>
                    }

                </div>
                <div className="buttonNext2Wrapper">
                    <button className="buttonNext buttonNext2 col-lg-2 pull-right" onClick={this.subscribe.bind(this)} >
                         Subscribe
                    </button>
                </div>
            </form>
            <div className="row" style={{display:this.state.hide}}>
                <div className="col-lg-10 col-lg-offset-1">
                    <Invoice/>
                </div>
            </div>
            </div>

     
    );
}

}
export default SelectPackage;