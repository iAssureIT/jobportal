import React, {Component} from 'react';

import './LeftMenu.css';

export default class LeftMenu extends Component{


  constructor(props){
    super(props);
    console.log("I am in Constructor!");


    this.state = {
    LeftMenuView :"",
      
    };
  }  

  setActive(event){

    

    var fieldValue=event.currentTarget.id;
    console.log("fieldValue",fieldValue);
     // var fieldKey=event.currentTarget.name;
     // console.log("fieldKey",fieldKey);
    this.setState({
      LeftMenuView:fieldValue

    });

    var formValues={
      LeftMenuView: this.state.LeftMenuView,
    }
    console.log("formValues=",formValues);

}

  
  render(){
    
 
    return(
      
        <section className="LeftMenuWrapper col-lg-1">
         <div className="row">
      		<div className="LeftMenuInnerWrapper col-lg-12"> 
           <div className="row">
      			<div className={this.state.LeftMenuView==="mapView" ? "LeftMenuItem ActiveClass": "LeftMenuItem"} onClick={this.setActive.bind(this)}  id="mapView" value="mapView" name="LeftMenuView"> Map View
      			</div>

      			<div className={this.state.LeftMenuView==="functionalView" ? "LeftMenuItem ActiveClass": "LeftMenuItem"} onClick={this.setActive.bind(this)}  id="functionalView" value="functionalView" name="LeftMenuView"> Functional View
      			</div>

      			<div className={this.state.LeftMenuView==="industrialView" ? "LeftMenuItem ActiveClass": "LeftMenuItem"} onClick={this.setActive.bind(this)}  id="industrialView" value="industrialView" name="LeftMenuView"> Industrial View
      			</div>
      		</div>
          </div>
         </div>  
        </section>
      
    );
  }


}