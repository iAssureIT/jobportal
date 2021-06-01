import React, { Component }  from 'react';
import "./success.css";
import Axios from 'axios';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';
import Moment                from 'moment';
import { connect }           from 'react-redux';
import { bindActionCreators }   from 'redux';
import  * as mapActionCreator   from '../common/actions/index';

class Success extends Component {
constructor() {
    super();
    this.state = {
        
        packagemasterArray  :[],
    }	
}	
componentDidMount(){
   Axios.get("/api/packagemaster/get/list")
        .then(response=>{
          //console.log(response.data);
          this.setState({packagemasterArray : response.data});
        })
        .catch(error=>{
          console.log(error)
        })
}

render() {
    console.log(this.props.invoiceDetails )
    return (
        this.props.invoiceDetails ? 
          <div className="row">
                <div className="col-lg-10 col-lg-offset-1 successWrapper">
                    <div className="row successHeader">
                        <div className="headerCircle">
                            <span className="headerCircleIcon">
                                <FontAwesomeIcon icon="check" />
                            </span>
                        </div>
                    </div>
                    <div className="row successBody">
                        <div className="successTitle">
                            Thank You !
                        </div>
                        <div className="successSubTitle">
                            Payment Completed Successfully !
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-4">
                            <div className="col-lg-6 successPointTitle">
                                Transaction Status 
                            </div>
                            <div className="col-lg-6 successPointTitle">
                             <div className="row">   : Success </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-4">
                            <div className="col-lg-6 successPointTitle">
                                Transaction Number 
                            </div>
                            <div className="col-lg-6 successPointTitle">
                              <div className="row">  :  {this.props.invoiceDetails.invoiceNumber} </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-4">
                            <div className="col-lg-6 successPointTitle">
                                Transaction Date 
                            </div>
                            <div className="col-lg-6 successPointTitle">
                              <div className="row">  :   {Moment(this.props.invoiceDetails.createdAt).format("DD-MM-YYYY")} </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-4">
                            <div className="col-lg-6 successPointTitle">
                                Name
                            </div>
                            <div className="col-lg-6 successPointTitle">
                              <div className="row">  :    {this.props.invoiceDetails.createdBy ? this.props.invoiceDetails.createdBy.profile.fullName : ""} </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-4">
                            <div className="col-lg-6 successPointTitle">
                                Mobile Number 
                            </div>
                            <div className="col-lg-6 successPointTitle">
                              <div className="row">  :  {this.props.invoiceDetails.createdBy ? this.props.invoiceDetails.createdBy.profile.email : ""} </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-4">

                            <div className="col-lg-6 successPointTitle">
                                Email ID
                            </div>
                            <div className="col-lg-6 successPointTitle">
                               <div className="row"> :  {this.props.invoiceDetails.createdBy ? this.props.invoiceDetails.createdBy.profile.mobile : ""}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-4">
                            <div className="col-lg-6 successPointTitle">
                                Amount
                            </div>
                            <div className="col-lg-6 successPointTitle">
                              <div className="row">  :   ₹ {this.props.amountPaid} </div>
                            </div>
                        </div>
                    </div>
                    <div className="row buttonWrapperSuccess">
                        <div className="col-lg-6 col-lg-offset-4">
                            <div className="col-lg-12">
                                {/*<button className="buttonNext buttonNext2 col-lg-4 pull-left">
                                     Back
                                </button>*/}
                                {!this.props.userDetails.loggedIn ? <a href="/login">
                                <button className="buttonNext buttonNext2 col-lg-4 pull-right"  >
                                     Login
                                </button>
                                </a> : ""}
                            </div>
                        </div>
                    </div>

                </div>
          </div>
          : null
     );
}

}
const mapStateToProps = (state)=>{ 
    return {
        userDetails    : state.userDetails
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (Success);


