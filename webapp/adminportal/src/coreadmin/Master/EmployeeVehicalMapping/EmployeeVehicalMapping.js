import React, { Component }     from 'react';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';
import IAssureTable             from '../../IAssureTable/IAssureTable.jsx';
import { withRouter }           from 'react-router-dom';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import "./EmployeeVehicalMapping.css";
class EmployeeVehicalMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "user_ID"              :  localStorage.getItem("user_ID"),
            "company_Id"              : localStorage.getItem("company_Id"),
            "id"              : "",
            "secondField"          : "",
            empCategory:"",
            VehicleCategory:"",
            company:"",
            "secondFieldData"      : [], 
            "companyArray"      : [], 
            "selectedIndex"        : "",
            "vehicalAvailable"     :true,
            "tableHeading": {
                empCategory: "Employee Category",
                company: "Corporate Name",
                vehicalCategory : "Vehical Category",
                actions: 'Action',
            },
            "tableObjects": {
                deleteMethod: 'delete',
                apiLink: '/api/VehicleEmployeeMapping/',
                paginationApply: false,
                searchApply: false,
                editUrl: '/project-master-data'
            },
            "startRange": 0,
            "limitRange": 10,
            "categoryID"           : '',
        };
    }   
    componentDidMount() {
        this.getVehicals();
        this.getCompany();
        this.getData();
        if(this.state.categoryID){  
            this.edit(this.state.categoryID);
        }

        
        $.validator.addMethod("regxonefield", function (value, element, regexpr) {
          return regexpr.test(value);
        }, "Please enter valid field value");
        
        jQuery.validator.setDefaults({
          debug: true,
          success: "valid"
        });
        $("#empVehicalCategory").validate({
        rules: {
            empCategory: {
              required: true,
            },
            company: {
              required: true,
            },
           /* vehicalCategory: {
              required: true,
            },*/
        },
        errorPlacement: function (error, element) {            
            if (element.attr("name") === "empCategory") {
              error.insertAfter("#empCategory");
            }
            /*if (element.attr("name") === "vehicalCategory") {
              error.insertAfter("#vehicalCategory");
            }*/
          }
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.editId)
        {
         this.edit(nextProps.editId);
        }
         
    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        this.setState({
            [name] : event.target.value
        });
    }
   
    submitCategory(event) {
        event.preventDefault();
        var vehicleCatArray = this.state.VehicleCategory;
      var result = [];
      for(var i=0 ; i<vehicleCatArray.length ; i++){
        result.push({category_id:vehicleCatArray[i]})
      }//i
        var formvalue ={
          empCategory    : this.state.empCategory, 
          company    : this.state.company, 
          VehicleCategory : result, 
          createdBy : localStorage.getItem("user_ID")
        }
        if(this.state.VehicleCategory)
        {
            this.setState({
                vehicalAvailable:true
            })
        }else{
             this.setState({
                vehicalAvailable:false
            })
        }
        if ($('#empVehicalCategory').valid() && this.state.vehicalAvailable) {
            axios.post('/api/VehicleEmployeeMapping/post',formvalue)
            .then((response) => {
                if(response.data.duplicated == true){
                    swal({                
                    text: "Duplicate Entry",
                  });
                }else{
              swal({                
                    text: "Details added successfully!",
                  });
            }
            this.dropDownListObject.value = null;
             this.setState({
                empCategory    : "", 
                VehicleCategory : "", 
                company : "", 
              })
              this.getData();
            })
            .catch((error) => {
                console.log("Error in Post API of Two field = ",error);
            })
        }      
    }
    updateCategory(event) {
        event.preventDefault();
        var vehicleCatArray = this.state.VehicleCategory;
        var result = [];
          for(var i=0 ; i<vehicleCatArray.length ; i++){
            result.push({category_id:vehicleCatArray[i]})
          }//i
          var formvalues ={
            id: this.state.id,
            empCategory    : this.state.empCategory, 
            company    : this.state.company, 
            VehicleCategory : result,
            updatedBy : localStorage.getItem("user_ID")
          }
       if ($('#empVehicalCategory').valid()) {
            axios.patch('/api/VehicleEmployeeMapping/patch',formvalues)
            .then((response) => {
                swal(" ","Record updated Successfully");
                $('#empCategory').prop('disabled', false);
                $('#company').prop('disabled', false);
                this.dropDownListObject.value = null;
                this.setState({
                     empCategory    : "", 
                      VehicleCategory : "", 
                      
                      company : "", 
                      id:""
                },()=>{
                    this.getData();
                    this.props.history.push("/project-master-data");
                })
            })
            .catch((error) => {
                swal(" ","Failed to Update Record");
            })
        }       
    }
  
    getData() {
        axios.post('/api/VehicleEmployeeMapping/list')
        .then((response) => {
            var tableData = response.data.map((value,i)=>{
                return{
                    _id : value._id,
                    empCategory: value.empCategory,
                    company: value.company[0].companyName,
                    vehicalCategory: value.vehicle ? value.vehicle.map((a,i)=>{return (a.category)}):"-NA-"
                }

            })
            this.setState({
                tableData: tableData
            })
        })
        .catch((error) => {          
        });
    }
   
    edit(id) {
        if(id){
            $("html,body").scrollTop(0);
            $('#empCategory').prop('disabled', true);
            $('#company').prop('disabled', true);
        axios.get('/api/VehicleEmployeeMapping/get/one/'+id)
          .then((response) => {
            //console.log('response: ',response)
            var data = response.data.VehicleCategory;
            var array = []
            for(var i=0 ; i<data.length ; i++){
                array.push(data[i].category_id)
            }//i
            this.dropDownListObject.value = array;
              this.setState({ 
                id : response.data._id,
                empCategory : response.data.empCategory,
                company : response.data.company,
                VehicleCategory : array,
              });
          })
          .catch((error) => {});
        }
    }
    getVehicals() {
        axios.get("/api/categorymaster/get/list")
            .then((response) => {
                var vehicalArray = [];
                response.data.map((data, ind) => {
                    vehicalArray.push({ id: data._id, VehicleCategory: data.category })
                });
                this.setState({ vehicalArray: vehicalArray })
            })
            .catch((error) => {
            })
    }
    getCompany() {
        axios.get('/api/entitymaster/get/corporate')
          .then((response) => {
            this.setState({
              companyArray: response.data
            }, () => {
            })
          }).catch(function (error) {
          });
    }
    handleChangeFilter(event){
        if (event.value) {
            this.setState({
                VehicleCategory: event.value
            },()=>{
                if(this.state.VehicleCategory)
                {
                    this.setState({
                        vehicalAvailable:true
                    })
                }else{
                     this.setState({
                        vehicalAvailable:false
                    })
                }
            })                   
        }
    }
    closeModal(event){
        event.preventDefault();
        $("#oneField").hide(); 
        $(".modal-backdrop").remove();
        this.props.history.push('/project-master-data')
    }


    render() {
        const vehicalfields: object = { text: 'VehicleCategory', value: 'id'};
        return (
            <div className="companyDisplayForm col-md-12">
                <section className="col-md-12 pageContent">
                    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                     <h4 className="weighttitle col-lg-12 col-md-11 col-xs-11 col-sm-11">Employee Vehical Mapping</h4>
                    </div>
                            <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="empVehicalCategory" >
                               

                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left NOpadding-right">
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person employee">
                                        <div id="company">
                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Corporate<i className="astrick">*</i></label>
                                        <select className="customSelect col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.company} ref="company" name="company" onChange={this.handleChange.bind(this)}>
                                            <option disabled value="">--Select Company--</option>
                                            {
                                                this.state.companyArray && this.state.companyArray.length > 0 ?
                                                    this.state.companyArray.map((data, i)=>{
                                                        return(
                                                            <option key={i} value={data.companyID}>{data.companyName} </option>
                                                        );
                                                    })
                                                :
                                                null
                                            }
                                        </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 driver person employee">
                                        <div id="empCategory">
                                          <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Employee Category <i className="astrick">*</i></label>
                                          <select className="customSelect col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                            ref="empCategory" value={this.state.empCategory} name="empCategory"
                                            onChange={this.handleChange.bind(this)} >
                                            <option value="" disabled={true} className="colorChange">Select Category</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12">
                                        <div id="vehicalCategory">
                                            <label className="labelform col-lg-12 col-md-12 col-xs-12 col-sm-12 ">Vehicals<i className="astrick">*</i></label>
                                           {/*} <MultiSelectComponent  
                                                className="form-control"
                                                name="vehicalCategory"
                                                dataSource={this.state.vehicalArray}
                                                value={this.state.vehicalCategory}
                                                change={this.handleChangeFilter.bind(this)}
                                                fields={vehicalfields} placeholder="Select Vehical" 
                                                mode="CheckBox" selectAllText="Select All" 
                                                unSelectAllText="Unselect All" showSelectAll={true}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>*/}
                                            <MultiSelectComponent id="categoryChange" ref={(scope) => { this.dropDownListObject = scope; }}
                                                dataSource={this.state.vehicalArray}
                                                change={this.handleChangeFilter.bind(this)} mode='box'
                                                fields={vehicalfields} placeholder="Select Vehicle category" 
                                                mode="CheckBox" selectAllText="Select All" 
                                                unSelectAllText="Unselect All" showSelectAll={true} hideSelectedItem={false}>
                                                <Inject services={[CheckBoxSelection]} />
                                            </MultiSelectComponent>
                                        </div>
                                        <label className="errorMsg">{this.state.vehicalAvailable == true?"":"This field is required"}</label>
                                    </div>
                                </div>
                                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt">
                                  {
                                    this.state.categoryID ?
                                      <button className="btn button3 pull-right" onClick={this.updateCategory.bind(this)} >Update&nbsp;</button>
                                      :
                                      <button className="btn button3 pull-right" onClick={this.submitCategory.bind(this)} >Submit&nbsp;</button>
                                  }
                                </div>
                            </form> 
                            <div className="oneFieldTable col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <IAssureTable
                                    tableHeading={this.state.tableHeading}
                                    dataCount={this.state.dataCount}
                                    tableData={this.state.tableData}
                                    getData={this.getData.bind(this)}
                                    tableObjects={this.state.tableObjects}
                                />
                            </div>
                            
                </section>
            </div>
        );
    }
}
export default EmployeeVehicalMapping;

