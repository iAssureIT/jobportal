import React, { Component }   from 'react';
// import $                      from 'jquery';
import axios                  from 'axios';
import moment                 from "moment";
//import IAssureTable             from '../../IAssureTable/IAssureTable.jsx';
import IAssureTable             from './IAssureTableFilewise.js';
//import "./Beneficiary.css";

class FilewiseJobList extends Component{
  
  constructor(props){
    super(props); 
    this.state = {
       tableHeading:{
            "fileName"     : "File Name",
            "uploadTime"   : "Uploaded At",
            "count"        : "Job Count",
            "actions"      : "Action"
          },
          "tableObjects"              : {
              deleteMethod              : 'delete',
              apiLink                   : '/api/jobs/file/delete/',
              paginationApply           : false,
              searchApply               : false,
            },
          startRange : 0,
          limitRange : 100000
    }
    
  }
  componentDidMount(){
    this.getCount();
    this.getData(this.state.startRange, this.state.limitRange);
  }
  getData(startRange, limitRange){
      var data = {
        startRange : startRange,
        limitRange : limitRange
      }
      axios.post('/api/jobs/get/files', data)
      .then((response)=>{
        //console.log(response);
        var tableData = response.data.map((a, i)=>{
            return {
              fileName    : a.fileName ? a.fileName : "Manual", 
              uploadTime  : a.uploadTime !== null ? moment(a.uploadTime).format('MMMM Do YYYY, h:mm:ss a') : "-", 
              count       : a.count !== NaN ? "<p>"+a.count+"</p>" : "a", 
              _id         : a.fileName+ "/" + a.uploadTime, 
            }
        })
         console.log('tableData', tableData)
        this.setState({
          tableData : tableData
        })
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }
    getCount(){
      axios.get('/api/jobs/get/files/count')
      .then((response)=>{
        // console.log(response.data)
        this.setState({
          dataCount : response.data
        })
      })
      .catch((error)=>{
        console.log('error', error);
      })
    }
  render() {
    return (
      <div className="container-fluid col-lg-12 col-md-12 col-xs-12 col-sm-12 modifiedTableIassure">
        <div className="row">
          <div className="formWrapper"> 
            <section className="content">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 contactdeilsmg pageSubHeader">
                      Filewise Jobs Details
                    </div>
                  </div>
                  <hr className="hr-head"/>
                  <div className="col-lg-10 col-lg-offset-1 col-md-12 col-xs-12 col-sm-12">
                    <IAssureTable 
                        id="FilewiseJobList"
                        tableHeading={this.state.tableHeading}
                        twoLevelHeader={this.state.twoLevelHeader} 
                        dataCount={this.state.dataCount}
                        tableData={this.state.tableData}
                        getData={this.getData.bind(this)}
                        tableObjects={this.state.tableObjects}
                      />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
export default FilewiseJobList