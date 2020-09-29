import React, { Component } from 'react';
import { render }           from 'react-dom';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import swal                 from 'sweetalert';
import moment               from 'moment';
import IAssureTable         from  '../../coreadmin/IAssureTable/IAssureTable.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

class EarlyMorningTimings extends Component{
   constructor(props) {
    super(props);
    this.state = {
      id                          : '',
      type                        : '',
      GSTRate                     : '',
      submitVal                   : true,
      startRange                  : 0,
      limitRange                  : 10,
      earlyMorningChargesFromTime : moment().format("","HH:mm"),
      earlyMorningChargesToTime   : moment().format("", "hh:mm"),
      earlyMorningTimingsData     : [],
      tableHeading                : {
                                    earlyMorningChargesFromTime   : "Early Morning Charges ( From Time )",
                                    earlyMorningChargesToTime     : "Early Morning Charges ( To Time )",
                                    actions                       : "Action"
      },
      tableObjects                : {
                                    deleteMethod    : 'delete',
                                    apiLink         : '/api/earlymorningtimingsmaster/',
                                    paginationApply : false,
                                    searchApply     : false,
                                    editUrl         : '/project-master-data'
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.editId){
      this.setState({
          id : nextProps.editId
        },()=>{

          axios.get("/api/earlymorningtimingsmaster/getSingleData/"+this.state.id)
              .then((response)=>{
          console.log("response",response);
                if(response.data.length>0)
                {
                  this.setState({
                    id                            : response.data[0]._id,
                    earlyMorningChargesFromTime   : response.data[0].earlyMorningChargesFromTime,
                    earlyMorningChargesToTime     : response.data[0].earlyMorningChargesToTime,
                    submitVal                     : false,
                  },()=>{
                    // console.log("state = ", this.state);                
                  });
                }
              })
              .catch((error)=>{
                console.log("Error getSingleData = ", error);   
              })
        })
    }
  }
  
  componentDidMount() {
    // console.log("props = ",this.props)
    this.getEarlyMorningTimingsTable(this.state.startRange,this.state.limitRange)
    this.getTimeFormat();
    // this.timeFormat24Hrs();
    console.log("earlyMorningChargesFromTime = ",this.state.earlyMorningChargesFromTime)

    jQuery.validator.setDefaults({
        debug   : true,
        success : "valid"
    });

    $("#EarlyMorningTimingsMasterForm").validate({
      rules: {
          earlyMorningChargesFromTime: {
              required : true,
          },
          earlyMorningChargesToTime: {
              required : true,
          },
      },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "earlyMorningChargesFromTime") {
          error.insertAfter("#earlyMorningChargesFromTime");
        }
        if (element.attr("name") === "earlyMorningChargesToTime") {
          error.insertAfter("#earlyMorningChargesToTime");
        }
      } 
    }); 
  }

  timeFormat24Hrs(){
    var timeVal = moment("21:00", "HH:mm");
    var hours = timeVal.getHours(); // gives the value in 24 hours format
    var minutes = timeVal.getMinutes() ; 
    var finalTime = "Time  - " + hours + ":" + minutes; 
    console.log("finalTime = ",finalTime); 
  }

  getTimeFormat(){
      axios.get('/api/timeformat/get')
           .then((response)=>{
              if(response.data.timeFormat){
                var timeFormat = response.data.timeFormat;
              }else{
                var timeFormat = "24 Hrs";
              }
              this.setState({
                timeFormatData : timeFormat
              }, ()=>{
                console.log("time format = ",this.state.timeFormatData);
              })
           })
           .catch((error)=>{
              swal(error)
           })
  }

  getEarlyMorningTimingsTable(startRange,limitRange){
    var data = {
            startRange: startRange,
            limitRange: limitRange
    }
    axios.post(this.state.tableObjects.apiLink+'get/list', data)
         .then((response) => {
            if (response.data) {
              var tableData = response.data.map((a, i)=>{
                return {
                  _id                            : a._id,
                  earlyMorningChargesFromTime    : a.earlyMorningChargesFromTime ? a.earlyMorningChargesFromTime : " - ",
                  earlyMorningChargesToTime      : a.earlyMorningChargesToTime ? a.earlyMorningChargesToTime : " - " ,
                }
              })
              this.setState({
                earlyMorningTimingsTableData : tableData
              })              
            }
         })
         .catch((error) => { 
            console.log("Error getEarlyMorningTimingsTable = ",error);         
         });
  }

  submitData(event){
    event.preventDefault();
    var formValues = {
      earlyMorningChargesFromTime       : this.state.earlyMorningChargesFromTime,
      earlyMorningChargesToTime         : this.state.earlyMorningChargesToTime,
    }

    var updateFormValues = {
      id                    : this.state.id,
      earlyMorningChargesFromTime  : this.state.earlyMorningChargesFromTime,
      earlyMorningChargesToTime    : this.state.earlyMorningChargesToTime,
    }

    console.log('formValues = ',formValues);
    if($("#EarlyMorningTimingsMasterForm").valid()){
      if (this.state.submitVal) {
        axios.patch('/api/earlymorningtimingsmaster/insertearlymorningtimings',formValues)
        .then((response)=> {          
          if(response.data.duplicated == true){
            swal(" ", "Early Morning Timings Already Exists");
          }else{
            this.getEarlyMorningTimingsTable(this.state.startRange,this.state.limitRange);
            swal({
              title : " ",
              text  : "Early Morning Charges Timings added successfully!",
            });
            this.setState({
              earlyMorningChargesFromTime : '',
              earlyMorningChargesToTime   : '',
              submitVal                   : true
            })
          }   
        })
        .catch(function (error) {
          swal({
            title : " ",
            text  : "Failed to add Early Morning Timings details!",
          });
        })
      }else{
        axios.patch('/api/earlymorningtimingsmaster/updateearlymorningtimings',updateFormValues)
        .then((response)=>{
          console.log("response.data.updated == ", response.data.updated);
          if(response.data.updated){
            this.getEarlyMorningTimingsTable(this.state.startRange,this.state.limitRange);            
            this.props.history.push(this.state.tableObjects.editUrl);
            this.setState({
                id                           : "",
                earlyMorningChargesFromTime  : "",
                earlyMorningChargesToTime    : "",
                submitVal                    : true,
              },()=>{
                swal({
                    title : " ",
                    text  : "Early Morning Timings Details Updated successfully!",
                  });            
              }); 
          }                    
        })
        .catch(function (error) {
            swal({
              title : " ",
              text  : "Failed to update Early Morning Timings Details!",
            })        
        })
      }
    }
}

handleChange(event){
  console.log("event target = ",event.target);
  console.log("event name = ",event.target.name);
  if(this.state.timeFormatData === "24 Hrs"){
    console.log("24 ===>")
    // this.timeFormat24Hrs();
  }else{
    console.log("12 ===>")
  }
  const {name,value} = event.target;
  this.setState({ 
    [name]:value
  }, ()=>{
    if (name === 'earlyMorningChargesFromTime') {
        console.log("earlyMorningChargesFromTime handleChange 1 = ", name);
        console.log("earlyMorningChargesFromTime handleChange 2 = ", value);
        this.setState({
          earlyMorningChargesFromTime : moment().format(value, "HH:mm a")
        }, ()=>{
          console.log("time = ", this.state.earlyMorningChargesFromTime);
        })
        

        
    }else if (name === 'earlyMorningChargesToTime') {
        console.log("earlyMorningChargesToTime handleChange 1 = ", name);
        console.log("earlyMorningChargesToTime handleChange 2 = ", value);
        
    }
  });
}

edit(event){
  event.preventDefault();
  this.setState({submitVal : false})
  $("html,body").scrollTop(0);
  var id = event.currentTarget.id;
  console.log("edit ====> ", id);
  axios.get('/api/earlymorningtimingsmaster/getSingleData/'+id)
  .then((response)=>{
    this.setState({
      id                           : response.data[0]._id,
      earlyMorningChargesFromTime  : response.data[0].earlyMorningChargesFromTime,
      earlyMorningChargesToTime    : response.data[0].earlyMorningChargesToTime
    })
  })
  .catch((error)=>{
    swal(error)
  })
    
}

delete(event){
  event.preventDefault();
  console.log(event.currentTarget.getAttribute('data-id'))
  this.setState({id : event.currentTarget.getAttribute('data-id')})
  $('#deleteModal').show();
  }
  delexpence(event){
    event.preventDefault();
    console.log('id',this.state.id);
    axios.delete('/api/earlymorningtimingsmaster/delete/'+this.state.id)
    .then((response)=>{
      if (response.data) {
        $('#deleteModal').hide();   
        window.location.reload();
        // this.expenseType();
        swal({
              title : " ",
              text  : "Record is deleted successfully.",
            });
      } else{
        swal({
              title : " ",
              text  : "Failed to delete.",
            });
      }
    })
    .catch((error)=>{
      swal(error)
    })
  }
  
  closeModal(event){
    event.preventDefault();
    $('#deleteModal').hide(); 
  }

  render(){
    
    return(
            <div className="container-fluid">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                  <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                      <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Early Morning Charges Timings</h4>
                  </div>
                  <form id="EarlyMorningTimingsMasterForm"  >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                        <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <div className="form-group">
                              <label className="labelform" >Early Morning Charges ( From Time )</label><span className="astrick">*</span>
                              <div className="input-group" id="earlyMorningChargesFromTime">
                                <input className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="earlyMorningChargesFromTime" name="earlyMorningChargesFromTime" 
                                       value={this.state.earlyMorningChargesFromTime} 
                                       onChange={this.handleChange.bind(this)}
                                />
                                <span className="input-group-addon inputIcon"><i className="fa fa-clock-o"></i></span>
                              </div>
                              {/*<DatePicker timeFormat={this.props.timeformat === '24' ? 'HH:mm' : 'hh:mm a'} </*/}
                          </div>  
                        </div>
                        <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <div className="form-group">
                              <label className="labelform" >Early Morning Charges ( To Time )</label><span className="astrick">*</span>
                              <div className="input-group" id="earlyMorningChargesToTime">
                                <input className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="earlyMorningChargesToTime" name="earlyMorningChargesToTime" 
                                      value={this.state.earlyMorningChargesToTime}
                                      onChange={this.handleChange} 
                                /> 
                                <span className="input-group-addon inputIcon"><i className="fa fa-clock-o"></i></span>
                              </div>
                          </div>  
                        </div>
                      </div>                    
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                      <button className="col-lg-2 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" onClick={this.submitData.bind(this)} >
                        { this.state.submitVal ? "Submit" : "Update" }  
                      </button>
                    </div>
                  </form>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <IAssureTable
                      tableHeading ={this.state.tableHeading}
                      tableData    ={this.state.earlyMorningTimingsTableData}
                      tableObjects ={this.state.tableObjects}
                      getData      ={this.getEarlyMorningTimingsTable.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
      );
  }
}

 export default EarlyMorningTimings;