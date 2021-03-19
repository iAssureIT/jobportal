import React, { Component }     from 'react';
import "./Loader.css";
export default class Loader extends Component {
  constructor(props){
    super(props);
       
    }

    render(){
      if(this.props.type === "joblistloader"){
          return (  
                <div  className="joblistLoaderWrapper col-lg-12">
                  <div className="col-lg-12">
                    <div className="loaderContainer">
                    </div>
                    <div className="loaderContainer">
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

