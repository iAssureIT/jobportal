
import React, { Component }   from 'react';
import $                      from 'jquery';
import axios                  from 'axios';
import {withRouter}       from 'react-router-dom';

import _                      from 'underscore';
import 'bootstrap/js/tab.js';

class CompanyList extends Component {
  
  constructor(props) {
      super(props);
    
      this.state = {
        entity : props.entity,
        statename : props.statename,
        label : props.label,
        reset : props.reset,
        companyList: [],
        company:''
      };
      this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.setState({
      entity :this.props.entity,
      statename :this.props.statename,
      label :this.props.label,
      reset :this.props.reset,
    },()=>{this.getCompany()})
    
  }

 componentWillReceiveProps(nextProps){
    this.setState({
      entity :nextProps.entity,
      label :nextProps.label,
      reset :nextProps.reset,
    },()=>{this.getCompany()
      if(this.state.reset == true){this.setState({company:""})}
    })
    
  }
 
  handleChange(event){
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    this.props.onSelectedItemsChange(this.state.statename,event.target.value)
    this.setState({
      [name]: event.target.value
    },()=>{
      var data = {
        [this.state.statename] : this.state.company
      }
      this.props.getCompanyData(data)
      
    });
  }

  getCompany() {
      axios.get('/api/entitymaster/get/'+this.state.entity)
        .then((response) => {
          this.setState({
            companyList: response.data
          })
        }).catch(function (error) {
        });
    }

  
  render() {
        return (  
          <div>
             <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.state.label}</label>
              <select id="company" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.company} ref="company" name="company" onChange={this.handleChange.bind(this)}>
                  <option disabled value="">--Select Company--</option>
                  <option value="All">All</option>
                  {
                      this.state.companyList && this.state.companyList.length > 0 ?
                          this.state.companyList.map((data, i)=>{
                              return(
                                  <option key={i} value={data._id}>{data.companyName} </option>
                              );
                          })
                      :
                      null
                  }
              </select> 
         </div>     
      );
  } 
}
export default withRouter(CompanyList); 
