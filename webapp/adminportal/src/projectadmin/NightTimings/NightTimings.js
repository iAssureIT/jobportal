import React, { Component } from 'react';
import { render }           from 'react-dom';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import swal                 from 'sweetalert';
import IAssureTable         from  '../../coreadmin/IAssureTable/IAssureTable.jsx';

// import './NightTimings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/js/modal.js';

class NightTimings extends Component{
   constructor(props) {
    super(props);
    this.state = {
      id                : '',
      type              : '',
      GSTRate           : '',
      submitVal         : true,
      startRange        : 0,
      limitRange        : 10,
      nightTimingsData  : [],
      tableHeading      : {
                            nightChargesFromTime     : "Night Charges ( From Time )",
                            nightChargesToTime       : "Night Charges ( To Time )",
                            actions                  : "Action"
      },
      tableObjects      : {
                            deleteMethod    : 'delete',
                            apiLink         : '/api/nighttimingsmaster/',
                            paginationApply : false,
                            searchApply     : false,
                            editUrl         : '/project-master-data'
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps){

    this.setState({
        id : nextProps.editId
      },()=>{

        axios.get("/api/nighttimingsmaster/getSingleData/"+this.state.id)
            .then((response)=>{
              this.setState({
                id                    : response.data[0]._id,
                nightChargesFromTime  : response.data[0].nightChargesFromTime,
                nightChargesToTime    : response.data[0].nightChargesToTime,
                submitVal    : false,
              },()=>{
                // console.log("state = ", this.state);                
              });
            })
            .catch((error)=>{
            })
      })
  }
  
  componentDidMount() {
    // console.log("props = ",this.props)
    this.getNightChargesTimingsTable(this.state.startRange,this.state.limitRange)

    jQuery.validator.setDefaults({
        debug   : true,
        success : "valid"
    });

    $("#NightTimingsMasterForm").validate({
      rules: {
                nightChargesFromTime: {
                    required: true,
                },
                nightChargesToTime: {
                    required: true,
                },
            },
      errorPlacement: function (error, element) {
        if (element.attr("name") === "nightChargesFromTime") {
          error.insertAfter("#nightChargesFromTime");
        }
        if (element.attr("name") === "nightChargesToTime") {
          error.insertAfter("#nightChargesToTime");
        }
      } 
    }); 
  }

  getNightChargesTimingsTable(startRange,limitRange){
    var data = {
            startRange: startRange,
            limitRange: limitRange
    }
    axios.post(this.state.tableObjects.apiLink+'get/list', data)
         .then((response) => {
            if (response.data) {
              var tableData = response.data.map((a, i)=>{
                return {
                  _id                     : a._id,
                  nightChargesFromTime    : a.nightChargesFromTime ? a.nightChargesFromTime : " - ",
                  nightChargesToTime      : a.nightChargesToTime ? a.nightChargesToTime : " - " ,
                }
              })
              this.setState({
                nightTimingsTableData : tableData
              })              
            }
         })
         .catch((error) => { 
            console.log("Error getNightChargesTimingsTable = ",error);         
         });
  }

  submitData(event){
    event.preventDefault();
    var formValues = {
      nightChargesFromTime       : this.state.nightChargesFromTime,
      nightChargesToTime         : this.state.nightChargesToTime,
    }

    var updateFormValues = {
      id                    : this.state.id,
      nightChargesFromTime  : this.state.nightChargesFromTime,
      nightChargesToTime    : this.state.nightChargesToTime,
    }

    console.log('formValues = ',formValues);
    if($("#NightTimingsMasterForm").valid()){
      if (this.state.submitVal) {
        axios.patch('/api/nighttimingsmaster/insertnighttimings',formValues)
        .then((response)=> {          
          if(response.data.duplicated == true){
            swal(" ", "Night Timings Already Exists");
          }else{
            this.getNightChargesTimingsTable(this.state.startRange,this.state.limitRange);
            swal({
              title : " ",
              text  : "Night Charges Timings added successfully!",
            });
            this.setState({
              nightChargesFromTime : '',
              nightChargesToTime   : '',
              submitVal            : true
            })
          }   
        })
        .catch(function (error) {
          swal({
            title: " ",
            text: "Failed to add Night Timings details!",
          });
        })
      }else{
        axios.patch('/api/nighttimingsmaster/updateNightTimings',updateFormValues)
        .then((response)=>{
          console.log("response.data.updated == ", response.data.updated);
          if(response.data.updated){
            this.getNightChargesTimingsTable(this.state.startRange,this.state.limitRange);            
            this.props.history.push(this.state.tableObjects.editUrl);
            this.setState({
                id                    : "",
                nightChargesFromTime  : "",
                nightChargesToTime    : "",
                submitVal             : true,
              },()=>{
                swal({
                    title : " ",
                    text  : "Night Timings Detail Updated successfully!",
                  });            
              }); 
          }                    
        })
        .catch(function (error) {
          swal({
            title: " ",
            text: "Failed to update Night Timings Detail!",
          });
        })
      }
    }
}

handleChange(event){
  const {name,value} = event.target;
  this.setState({ 
    [name]:value
  });
}

edit(event){
  event.preventDefault();
  this.setState({submitVal : false})
  $("html,body").scrollTop(0);
  var id = event.currentTarget.id;
  console.log("edit ====> ", id);
  axios.get('/api/nighttimingsmaster/getSingleData/'+id)
  .then((response)=>{
    this.setState({
      id                    : response.data[0]._id,
      nightChargesFromTime  : response.data[0].nightChargesFromTime,
      nightChargesToTime    : response.data[0].nightChargesToTime
    })
  })
  .catch((error)=>{
    swal(error)
  })
    
}
delete(event){
  event.preventDefault();
  console.log(event.currentTarget.getAttribute('data-id'))
  this.setState({id: event.currentTarget.getAttribute('data-id')})
  $('#deleteModal').show();
  }
  delexpence(event){
    event.preventDefault();
      console.log('id',this.state.id);
    axios.delete('/api/nighttimingsmaster/delete/'+this.state.id)
    .then((response)=>{
      if (response.data) {
        $('#deleteModal').hide();   
        window.location.reload();
        // this.expenseType();
        swal({
          title : " ",
              text : "Record is deleted successfully.",
            });
      } else{
        swal({
          title : " ",
              text : "Failed to delete.",
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
                      <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Night Charges Timings</h4>
                  </div>
                  <form id="NightTimingsMasterForm"  >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pdcls">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 compForm compinfotp">
                        <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <div className="form-group">
                              <label className="labelform" >Night Charges ( From Time )</label><span className="astrick">*</span>
                              <div className="input-group" id="nightChargesFromTime">
                                <input className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="nightChargesFromTime" name="nightChargesFromTime" id="nightChargesFromTime" value={this.state.nightChargesFromTime} onChange={this.handleChange} />
                                <span className="input-group-addon inputIcon"><i className="fa fa-clock-o"></i></span>
                              </div>
                          </div>  
                        </div>
                        <div className="form-group formht col-lg-6 col-md-6 col-sm-12 col-xs-12">
                          <div className="form-group">
                              <label className="labelform" >Night Charges ( To Time )</label><span className="astrick">*</span>
                              <div className="input-group" id="nightChargesToTime">
                                <input className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12 inputText" type="time" ref="nightChargesToTime" name="nightChargesToTime" id="nightChargesToTime" value={this.state.nightChargesToTime} onChange={this.handleChange} />
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
                      tableData    ={this.state.nightTimingsTableData}
                      tableObjects ={this.state.tableObjects}
                      getData      ={this.getNightChargesTimingsTable.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
      );
  }

 }

 export default NightTimings;