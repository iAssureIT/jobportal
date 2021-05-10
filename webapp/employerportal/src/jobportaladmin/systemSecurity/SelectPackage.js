import React, { Component }  from 'react';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';
import Axios                 from 'axios';
import Moment                from 'moment';
import { withRouter }   from 'react-router-dom';
import { connect }           from 'react-redux';
import { bindActionCreators }   from 'redux';
import  * as mapActionCreator   from '../common/actions/index';
import "./SelectCompany.css";
import "./SelectPackage.css";


class SelectPackage extends Component {
constructor() {
    super();
    this.state = {
        
        packagemasterArray  : [],
        package_id          : "",
        price               : 0,
        validity            : "",
        paymentDetails      : {}
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
handleChange(event){
    event.preventDefault();
    var value = event.currentTarget.value;
    var name  = event.currentTarget.name;

    this.setState({
        [name]:value,
    })
}
handleSelection(event){
    event.preventDefault();
    console.log(event.currentTarget.getAttribute('data-id'))
    this.setState({ package_id : event.currentTarget.getAttribute('data-id'),
                    price : event.currentTarget.getAttribute('data-price'),
                    validity : event.currentTarget.getAttribute('data-validity') })
}
subscribePackage(event){
    event.preventDefault();
    console.log(this.props.selectedCompanyDetails)
    console.log(this.props.user_id)
    console.log(this.state.validity)
    
    var startDate   = Moment(new Date()).format("YYYY-MM-DD")
    var endDate     = Moment(startDate, "YYYY-MM-DD").add('month', this.state.validity).format("YYYY-MM-DD")

    var formValues={
      "package_id"        : this.state.package_id,
      "company_id"        : this.props.selectedCompanyDetails.company_id,
      "companyID"         : this.props.selectedCompanyDetails.companyID,
      "branch_id"         : this.props.selectedCompanyDetails.branch_id,
      "amount"            : this.state.price,  // amount in the smallest currency unit
      "currency"          : "INR",
      "receipt"           : "order_rcptid_11",
      "payment_capture"   : '0',
      "startDate"         : startDate,
      "endDate"           : endDate, 
      "paymentOrderId"    : "",
      "amountPaid"        : 0,
      "user_id"           : this.props.user_id  
    } 
    console.log(formValues)

    Axios.post('/api/packagesubscription/post',formValues)
      .then((response)=>{ 
        this.setState({
          paymentDetails : response.data,
        })
        if (this.state.paymentDetails.amountPaid > 0) {
            this.props.history.push("/invoicePage/"+this.state.paymentDetails.id);
        }else{
            this.props.history.push("/login");
        }
        
      })
      .catch(function(error){
          // if(error.message === "Request failed with status code 401")
          // {
          //    swal("Your session is expired! Please login again.","", "error");
          //    this.props.history.push("/");
          // }
      })
    //this.props.history.push("/login");
}
render() {
    return (
            <form className=" col-lg-10 col-lg-offset-1 signUpBoxFormWrapper signUpBoxFormWrapper2">
                 <div className="signUpBoxTitle">Select Package</div>
                <div className="row signUpBoxForm signUpBoxForm2">
                    {
                        this.state.packagemasterArray.length > 0
                     ?
                        this.state.packagemasterArray.map((elem,index)=>{
                            //console.log("index",elem,index);
                        return(
                            <div className="col-lg-4" key={index} onClick={this.handleSelection.bind(this)} data-id={elem._id} data-price={elem.price} data-validity={elem.validity}>
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
                <div className="col-lg-4 col-lg-offset-9 buttonOtpWrapper">
                <button className="buttonNext col-lg-5 pull-right" onClick={this.subscribePackage.bind(this)}>Subscribe</button>
                </div>
            </form>
     
    );
}

}
const mapStateToProps = (state)=>{ 
    return {
        selectedCompanyDetails  : state.selectedCompanyDetails,
        user_id                 : state.user_id,
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SelectPackage));


