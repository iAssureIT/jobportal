import React, { Component }   from 'react';
import $                      from 'jquery';
import jQuery                 from 'jquery';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import OneFieldForm           from '../../coreadmin/Master/OneFieldForm/OneFieldForm.js';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import moment from 'moment';
import 'bootstrap/js/tab.js';
var newDate = new Date();
class TaxRate extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            taxName                      : "",
            companyId                    : "",
            profileCreated               : false,
            "oneTableHeading"            : {
              taxName                    : "Tax Name",
              actions                    : 'Action',
            },
            "fields" : {
              placeholder     : "Add tax name & press 'Enter' Key.",
              title           : "Tax Name",
              attributeName   : "taxName"
            },
            "oneTableObjects": {
              deleteMethod: 'delete',
              apiLink: '/api/taxnamemaster/',
              paginationApply: false,
              searchApply: false,
              editUrl: '/technicalMaster/tax-rate/tax-name',
              editUrl1: '/technicalMaster/tax-rate'
            },
            // "oneeditId"                    : this.props ? this.props.match.params.fieldID : '',

            "tableHeading"                 : {
                taxName                    : "Tax Name",
                taxRate                    : "Tax Rate",
                effectiveFrom              : "Effective From",
                effectiveTo                : "Effective To",
                actions                    : 'Action',
              },
              "tableObjects"              : {
                deleteMethod              : 'patch',
                apiLink                   : '/api/companysettings',
                paginationApply           : false,
                searchApply               : false,
                editUrl                   : '/technicalMaster/tax-rate'
              },
              "startRange"                : 0,
              "limitRange"                : 10,
              "effectiveFrom"             : moment(newDate).format('YYYY-MM-DD'),
              "effectiveTo"               : moment(new Date("12/12/2999")).format('YYYY-MM-DD'),
              "editId"                    : ''
              // "editId"                    : this.props.match.params ? this.props.match.params.preferenceID : ''
        };
        
    }
    componentDidMount() {
        // this.getTaxData();
        axios.get('/api/companysettings/')
        .then( (res)=>{   
            console.log("companyInfo",res)
          this.setState({
            "profileCreated":true,
            "companyInfo": res.data,
            "companyId":res.data._id
        },()=>{
            this.getData(this.state.startRange, this.state.limitRange);

        }) 
        })
        .catch((error)=>{
        });
        // var editId = this.props.match.params.preferenceID;
        var editId = this.state.editId;
        console.log("editId",editId)
        this.getTaxData();
        this.edit(editId);
        window.scrollTo(0, 0);
        $.validator.addMethod("regxA1", function(value, element, regexpr) {          
        return regexpr.test(value);
        }, "Tax rate should only contain positive number.");
        
        jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
        });
        $("#taxRateMaster").validate({
        rules: {
            taxRate: {
                required: true,
                regxA1: /^[0-9][0-9]*$/,
            },
            effectiveFrom: {
                required: true,
            },
            effectiveTo: {
                required: true,
            },
        },
            errorPlacement: function(error, element) {
                if (element.attr("name") === "taxRate"){
                    error.insertAfter("#taxRate");
                }
                if (element.attr("name") === "effectiveFrom"){
                    error.insertAfter("#effectiveFrom");
                }
                if (element.attr("name") === "effectiveTo"){
                    error.insertAfter("#effectiveTo");
                }
            }
        });
    }  
    
    componentWillReceiveProps(nextProps) {
        this.getTaxData();
        // var editId = nextProps.match.params.preferenceID;
        // if(nextProps.match.params.preferenceID){
        //   this.setState({
        //     editId : editId
        //   })
        //   this.edit(editId);
        // }
    }
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });   
    }
    submit(event){
        event.preventDefault();
        var formValues = {
            "companyId"    : this.state.companyId,
            "taxSettings"   : {
              "taxType"       : this.state.taxName,
              "taxRating" : this.state.taxRate,
              "effectiveFrom" : this.state.effectiveFrom,
              "effectiveTo" : this.state.effectiveTo,
            }
                 
        }
        console.log("formValues",formValues)
        if($("#taxRateMaster").valid()){
            axios.patch('/api/companysettings/taxSettings', formValues)
            .then((response)=>{
                this.getData(this.state.startRange, this.state.limitRange);
                swal("Data submitted succesfully ");
                this.setState({
                    taxName         : "",
                    taxRate         : "",
                    effectiveFrom   : moment(newDate).format('YYYY-MM-DD'),
                    effectiveTo     : moment(new Date("12/12/2999")).format('YYYY-MM-DD')
                })
            })
            .catch((error)=>{
                console.log('error', error);
            })
        }
    }
    update(event){
        event.preventDefault();
        console.log("editId",this.state.editId,this.state.companyId)
        var taxID = this.state.editId ? this.state.editId.split(".")[1] : "";
        var companyId = this.state.editId ? this.state.editId.split(".")[0] : "";
        var formValues = {
            "companyId"    : companyId,
            "taxId" : taxID,
            "taxSettings"   : {
              "taxType"       : this.state.taxName,
              "taxRating" : this.state.taxRate,
              "effectiveFrom" : this.state.effectiveFrom,
              "effectiveTo" : this.state.effectiveTo,
            }

        }
        console.log("formValues",formValues)
        if($("#taxRateMaster").valid()){
            axios.patch('/api/companysettings/update_taxDetails', formValues)
            .then((response)=>{
                swal("Record Updated Succesfully");
                this.props.history.push('/technicalMaster/tax-rate');
                this.getData(this.state.startRange, this.state.limitRange);
                this.setState({
                    editId          : "",
                    taxName         : "",
                    taxRate         : "",
                    effectiveFrom   : moment(newDate).format('YYYY-MM-DD'),
                    effectiveTo     : moment(new Date("12/12/2999")).format('YYYY-MM-DD')
                })
            })
            .catch((error)=>{
                console.log('error', error);
            })
        }
    }
   /* getDataCount(){
        axios.get('/api/preference/get/list')
        .then((response)=>{
          this.setState({
            dataCount : response.data[0].taxDetails.length
          })
        })
        .catch((error)=>{
          console.log('error', error);
        });
    }
*/    getData(startRange, limitRange){
        var data={
            startRange : startRange,
            limitRange : limitRange
        }
        var companyID = this.state.companyId;
        console.log("companyId",this.state.companyId)
        axios.get('/api/companysettings/getTaxData/'+companyID)

        .then((response)=>{
            console.log("response=>",response);
            // this.getDataCount();
            var taxName = response.data[0].taxType;
            var id = response.data[0]._id;
            var tableData = response.data[0].taxSettings.map((a, i)=>{
                return {
                    _id             : id+"."+a._id,
                    taxName         : a.taxType,
                    taxRate         : a.taxRating,
                    effectiveFrom   : a.effectiveFrom ? moment( a.effectiveFrom).format('DD-MMM-YYYY') : "-",
                    effectiveTo     : a.effectiveTo ? moment( a.effectiveTo).format('DD-MMM-YYYY') : "-"
                }
            })
            console.log('table', tableData);
            this.setState({
                tableData : tableData.reverse()
            });
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }
    getTaxData(){
        axios.get('/api/taxnamemaster/get/list')
        .then((response)=>{
            this.setState({
                taxNameArray : response.data
            },()=>{
                console.log("taxNameArray",this.state.taxNameArray)

            })
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }
    edit(id){
        $("#taxRateMaster").validate().resetForm();
        var taxId = id ? id.split(".")[1] : id;
        axios.get('/api/companysettings/singleTaxDetails/'+taxId)
        .then((response)=>{
            console.log('edit', response.data)
            // var editData =  response.data.taxDetails.filter(a=>a._id === this.props.match.params.taxRateID)
            this.setState({
                "taxName"                  : response.data.taxSettings[0].taxType,
                "taxRate"                  :  response.data.taxSettings[0].taxRating,
                "effectiveFrom"            : moment( response.data.taxSettings[0].effectiveFrom).format("YYYY-MM-DD"),
                "effectiveTo"              : moment( response.data.taxSettings[0].effectiveTo).format("YYYY-MM-DD")
            });
            // moment(selectedDate1).subtract(1, "days").format("YYYY-MM-DD")
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }
    render() {
        var minEffectiveTo = new Date("12/12/2099");
        return (
          <div className="">
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h4 className="">Tax Master</h4>
          </div>
             <hr className="compySettingHr" />
             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <form className="col-lg-12 col-sm-12 col-xs-12 noPadding" id="taxRateMaster">
                  <div className="form-group col-lg-6 col-md-3 col-sm-12 col-xs-12"> 
                    <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Tax Name <i className="astrick">*</i></label>
                    <div className="input-group" id="packageType" >
                      <select id="" className="addonDiv col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.taxName} ref="taxName" name="taxName" onChange={this.handleChange.bind(this)}>
                        <option>--Select--</option>
                        {
                          this.state.taxNameArray && this.state.taxNameArray.length > 0 ?
                              this.state.taxNameArray.map((data, i)=>{
                                  return(
                                      <option key={i} value={data.taxName}>{data.taxName}</option>
                                  );
                              })
                          :
                          null
                        }
                      </select>
                      <div className="input-group-addon inputIcon plusIconBooking" data-toggle="modal"  data-target="#addOneField" title="Add Tax Name" ><i className="fa fa-plus "></i>
                      </div>
                      <div className="modal" id="addOneField" role="dialog">
                        <div className="adminModal adminModal-dialog marginTopModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="modal-content adminModal-content col-lg-8 col-lg-offset-2 col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12 noPadding">
                            <div className="modal-header adminModal-header col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <div className="adminCloseCircleDiv pull-right  col-lg-1 col-lg-offset-11 col-md-1 col-md-offset-11 col-sm-1 col-sm-offset-11 col-xs-12 NOpadding-left NOpadding-right">
                                  <button type="button" className="adminCloseButton" data-dismiss="modal" >&times;</button>
                             </div>
                            </div>
                            <div className="modal-body adminModal-body OneFieldModal col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <OneFieldForm fields={this.state.fields}
                                tableHeading={this.state.oneTableHeading}
                                tableObjects={this.state.oneTableObjects}
                                editId ={this.props.editId}
                                masterFieldForm = {true}
                                history={this.props.history}
                               />
                              
                            </div>
                            <div className="modal-footer adminModal-footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-lg-6 col-md-3 col-sm-12 col-xs-12"> 
                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Tax Rate (%) <i className="astrick">*</i></label>
                      <input type="number" min="1" max="99" id="taxRate" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.taxRate}  ref="taxRate" name="taxRate" onChange={this.handleChange.bind(this)} placeholder="Enter tax rate.." required/>
                  </div>
                  <div className="form-group col-lg-6 col-md-3 col-sm-12 col-xs-12 "> 
                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Effective From<i className="astrick">*</i></label>
                      <input type="date" id="effectiveFrom" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.effectiveFrom}  ref="effectiveFrom" name="effectiveFrom" onChange={this.handleChange.bind(this)} placeholder="Select date.." required/>
                  </div>
                  <div className="form-group col-lg-6 col-md-3 col-sm-12 col-xs-12"> 
                      <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Effective To <i className="astrick">*</i></label>
                      <input type="date" id="effectiveTo"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.effectiveTo}  ref="effectiveTo" name="effectiveTo" onChange={this.handleChange.bind(this)} placeholder="Select date.." required/>
                  </div>
                  <br/>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      {this.state.editId ?
                          <button onClick={this.update.bind(this)} className="btn button3 btn-primary pull-right">Update</button>
                          :
                          <button onClick={this.submit.bind(this)} className="btn button3 btn-primary pull-right">Submit</button>
                      }
                  </div> 
              </form>
              <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                  <IAssureTable 
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
      </div>
                                 
        );
    } 
}
export default TaxRate;

