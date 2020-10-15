import React,{Component} from 'react';
import { render } from 'react-dom';
import moment     from 'moment';
import axios from 'axios';

export default class JobList extends Component{
	constructor(props) {
	   super(props);
	    this.state = {
	      
	    }
	}

	   
	componentDidMount(){

	}

  render(){
    return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
          <section className="content">
           	<div className="row">
            <h1>Job List</h1>
            </div>
          </section>
        </div>
   );
  }
}




