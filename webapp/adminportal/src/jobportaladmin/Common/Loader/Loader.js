import React, { Component }     from 'react';
import "./Loader.css";
export default class Loader extends Component {
  constructor(props){
    super(props);
       
    }

    render(){
      if(this.props.type === "candidateJoblistLoader"){
          return (  
                <div  className="candidateJoblistLoaderWrapper col-lg-12">
                  <div className="col-lg-6">
                    <div className="loaderContainer">
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="loaderContainer">
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="loaderContainer">
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="loaderContainer">
                    </div>
                  </div>  
                </div>              
            );
          }
          else if(this.props.type === "JoblistLoader") {
            return (
              <div  className="joblistLoaderWrapper col-lg-12">
                <div className="col-lg-12">
                  <div className="joblistLoaderContainer">
                  </div>
                  <div className="joblistLoaderContainer">
                  </div>
                </div>
                
                
              </div>
              );
          }
          else{
              return (null);
            } 
    }
}

