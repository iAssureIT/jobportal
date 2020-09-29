
import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}       from 'react-router-dom';
import moment                   from 'moment';

import _                      from 'underscore';
import 'bootstrap/js/tab.js';

class SummaryStatistics extends Component {
  
  constructor(props) {
      super(props);
    
      this.state = {
        year : props.year,
        status:props.status,
        total:''
      };
      this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      year :nextProps.year,
      status :nextProps.status,
    },()=>{this.getData()})
    
  }
  componentDidMount(){
    this.setState({
        year : this.props.year,
        status : this.props.status,
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
  	var currentYear = this.state.year;
    var newYear = moment(currentYear).subtract(1,'years').format('YYYY');
    var april = newYear+'-04-01';
    var march = currentYear+'-03-31'
  	var formvalues ={
  		start :new Date(april),
  		end:new Date(march),
  		status : this.state.status
  	}
   axios.post('/api/bookingmaster/getStatistics',formvalues)
    .then((response) => {
    	if(response && response.data[0]){
	        this.setState({
	          total:response.data[0].count
	        })
	    }else{
	    	this.setState({
	          total:0
	        })
	    }
    })
    .catch((err)=>{console.log('err: ',err)})
  }

 

  render() {
        return (  
          <div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                <ul className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <li><b>Status :</b> {this.state.status ? this.state.status : 'All'}</li>
                  <li><b>Total Bookings :</b> {this.state.total}</li>
                </ul>
              </div>
         </div>     
      );
  } 
}
export default withRouter(SummaryStatistics); 
