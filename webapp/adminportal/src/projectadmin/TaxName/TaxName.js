import React, { Component }   from 'react';
import $                      from 'jquery';
import jQuery                 from 'jquery';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import IAssureTable           from '../../coreadmin/IAssureTable/IAssureTable.jsx';
import OneFieldForm             from '../../coreadmin/Master/OneFieldForm/OneFieldForm.js';
import _                      from 'underscore';
import 'bootstrap/js/tab.js';

class TaxName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taxName                        : "",
            profileCreated                 : false,
            "tableHeading"                 : {
                taxName                    : "Tax Name",
                actions                    : 'Action',
              },
              "fields" : {
                placeholder     : "Add tax name & press 'Enter' Key.",
                title           : "Tax Name",
                attributeName   : "taxName"
            },
              "tableObjects": {
                deleteMethod: 'delete',
                apiLink: '/api/taxnamemaster/',
                paginationApply: false,
                searchApply: false,
                editUrl: '/technicalMaster/tax-name'
            },
              "startRange"                : 0,
              "limitRange"                : 10,
              "editId"                    : this.props.match.params ? this.props.match.params.fieldID : ''
        };
    }
    componentDidMount() {
        var editId = this.props.match.params.fieldID;
         this.setState({
            editId: editId
        })
        var editId = this.props.match.params.fieldID;
       
         axios.get('/api/companysettings/')
        .then( (res)=>{   
          this.setState({profileCreated:true, companyInfo: res.data}) 
        })
        .catch((error)=>{
        });
       // this.getData(this.state.startRange, this.state.limitRange);

       // this.edit(editId);
        window.scrollTo(0, 0);
        $.validator.addMethod("regxA1", function(value, element, regexpr) {          
        return regexpr.test(value);
        }, "Tax Name should only contain letters & number.");
        
        jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
        });
        $("#taxMaster").validate({
        rules: {
            taxName: {
            required: true,
            regxA1: /^[A-Za-z_0-9 ][A-Za-z\d_ ]*$/,
            },
        },
            errorPlacement: function(error, element) {
                if (element.attr("name") === "taxName"){
                    error.insertAfter("#taxName");
                }
            }
        });
    }  
      componentWillReceiveProps(nextProps) {
        var editId = nextProps.match.params.fieldID;
        if (nextProps.match.params.fieldID) {
            this.setState({
                editId: editId
            })
        }
    }

    
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });   
    }
   /* submit(event){
        event.preventDefault();
        var formValues = {
            "taxName" : this.refs.taxName.value
        }
        if($("#taxMaster").valid()){
            axios.post('/api/preference/post', formValues)
            .then((response)=>{
                this.getData(this.state.startRange, this.state.limitRange);
                swal(response.data.message);
                this.setState({
                    taxName : ""
                })
            })
            .catch((error)=>{
                console.log('error', error);
            })
        }
    }
    update(event){
        event.preventDefault();
        var formValues = {
            "preferenceID" : this.state.editId,
            "taxName" : this.refs.taxName.value
        }
        if($("#taxMaster").valid()){
            axios.patch('/api/preference/patch', formValues)
            .then((response)=>{
                this.props.history.push('/taxname');
                swal(response.data.message);
                this.getData(this.state.startRange, this.state.limitRange);
                this.setState({
                    taxName : "",
                    editId : ""
                })
            })
            .catch((error)=>{
                console.log('error', error);
            })
        }
    }
    getDataCount(){
        axios.get('/api/preference/get/count')
        .then((response)=>{
          this.setState({
            dataCount : response.data.dataCount
          })
        })
        .catch((error)=>{
          console.log('error', error);
        });
    }
    getData(startRange, limitRange){
        var data={
            startRange : startRange,
            limitRange : limitRange
        }

        axios.patch('/api/preference/get/list', data)
        .then((response)=>{
            this.getDataCount();
            var tableData = response.data.map((a, i)=>{
                return {
                    _id : a._id,
                    taxName : a.taxName,
                }
            })
            console.log('table', tableData);
            this.setState({
                tableData : tableData
            })
            console.log(response.data);
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }
    edit(id){
        $("#taxMaster").validate().resetForm();
        axios.get('/api/preference/get/one/'+id)
        .then((response)=>{
            console.log('res', response);
            this.setState({
                "taxName"                  : response.data.taxName,
            });
            
        })
        .catch((error)=>{
            console.log('error', error);
        });
    }*/
    render() {
        return (
            <div className="container-fluid col-lg-12 col-md-12 col-xs-12 col-sm-12">
               <div className="row">
          <div className="formWrapper">
            <section className="content">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent ">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact NOpadding">
                    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right ">
                        <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Technical Masters</h4>
                    </div>
                  </div>     
                  <div className="boxMinHeight boxMinHeighttab addMarginTop">
                    <div  className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                      <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 noPadding"> 
                          {
                          this.state.profileCreated ?
                          <ul className="nav nav-tabs tabs-left sideways">
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12 active"><a className="tabLeft lettersp tablefthr" href="/technicalMaster/tax-name" >Tax Master</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12 "><a className="tabLeft lettersp tablefthr" href="/technicalMaster/tax-rate" >Tax Rate Master</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="/technicalMaster/location-type" >Location Types</a></li>
                          </ul>
                          :
                          <ul className="nav nav-tabs tabs-left sideways">
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12 active"><a className="tabLeft lettersp tablefthr" href="/technicalMaster/tax-name" >Tax Master</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12 "><a className="tabLeft lettersp tablefthr" href="/technicalMaster/tax-rate" >Tax Rate Master</a></li>
                            <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="/technicalMaster/location-type" >Location Types</a></li>
                          </ul>
                        }
                      </div>
                      <div className="tab-content col-lg-9 col-md-9 col-xs-12 col-sm-12">             

                        <div className="tab-pane active" id="">
                          <OneFieldForm fields={this.state.fields}
                            tableHeading={this.state.tableHeading}
                            tableObjects={this.state.tableObjects}
                            editId ={this.props.match.params.fieldID}
                            masterFieldForm = {true}
                            history={this.props.history} />  
                        </div>                            
                      </div> 
                    </div>
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
export default TaxName;

