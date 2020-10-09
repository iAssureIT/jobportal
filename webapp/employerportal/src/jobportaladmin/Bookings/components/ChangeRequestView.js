import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}       from 'react-router-dom';

import _                      from 'underscore';
import 'bootstrap/js/tab.js';

class ChangeRequestView extends Component {
  
  constructor(props) {
      super(props);
    
      this.state = {
        id : props.bookingId,
        remark:'',
        status:''
      };
      this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      id :nextProps.bookingId,
    },()=>{this.getData()})
    
  }
  componentDidMount(){
    this.setState({
        id : this.props.bookingId,
      },()=>{this.getData()})
   
  }
  
  handleChange(event){
    event.preventDefault();
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  getData(){
   axios.get('/api/bookingmaster/get/matchCRStatus/'+this.state.id)
    .then((response) => {
      if(response.data.data[0]){
        this.setState({
          remark:response.data.data[0].status.remark,
          status:response.data.data[0].status.value
        })
      }
    })
    .catch((err)=>{console.log('err: ',err)})
  }

 

  render() {
        return (  
          <div>
            {this.state.status == 'Change Request' ?
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h5 className="titleprofileTD col-lg-8">Change Request Details</h5>
                <ul className="col-lg-8 col-md-5 col-sm-5 col-xs-5 listfontED ">
                  <li><i className="fa fa-envelope " aria-hidden="true"></i>&nbsp;&nbsp;{this.state.remark}</li>
                </ul>
              </div>
            :
            null
          }
         </div>     
      );
  } 
}
export default withRouter(ChangeRequestView); 
