import React, { Component }  from 'react';
import "./success.css";
import Axios from 'axios';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';


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
          console.log(response.data);
          this.setState({packagemasterArray : response.data});
        })
        .catch(error=>{
          console.log(error)
        })
}

render() {
    return (
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
                        <div className="col-lg-6 col-lg-offset-3">
                            <div className="col-lg-6 successPointTitle">
                                Transaction Status 
                            </div>
                            <div className="col-lg-6 successPointTitle">
                             <div className="row">   : Success </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <div className="col-lg-6 successPointTitle">
                                Transaction Number 
                            </div>
                            <div className="col-lg-6 successPointTitle">
                              <div className="row">  :  001 </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <div className="col-lg-6 successPointTitle">
                                Transaction Date 
                            </div>
                            <div className="col-lg-6 successPointTitle">
                              <div className="row">  :   21/04/2021</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <div className="col-lg-6 successPointTitle">
                                Name
                            </div>
                            <div className="col-lg-6 successPointTitle">
                              <div className="row">  :   John doe </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <div className="col-lg-6 successPointTitle">
                                Mobile Number 
                            </div>
                            <div className="col-lg-6 successPointTitle">
                              <div className="row">  :  +91 99123 45618 </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">

                            <div className="col-lg-6 successPointTitle">
                                Email ID
                            </div>
                            <div className="col-lg-6 successPointTitle">
                               <div className="row"> :  johndoe@gmail.com</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-3">
                            <div className="col-lg-6 successPointTitle">
                                Amount
                            </div>
                            <div className="col-lg-6 successPointTitle">
                              <div className="row">  :   ₹ 1416 </div>
                            </div>
                        </div>
                    </div>
                    <div className="row buttonWrapperSuccess">
                        <div className="col-lg-6 col-lg-offset-3">
                            <div className="col-lg-12">
                                <button className="buttonNext buttonNext2 col-lg-4 pull-left">
                                     Back
                                </button>
                                <button className="buttonNext buttonNext2 col-lg-4 pull-right"  >
                                     Print
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
          </div>
     );
}

}
export default Success;