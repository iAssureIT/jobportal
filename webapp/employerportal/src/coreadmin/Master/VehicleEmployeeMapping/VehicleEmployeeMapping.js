import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from "jquery";
import axios from 'axios';
import swal from 'sweetalert';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

class VehicleEmployeeMapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empCategory    : "",
      vehicleData:[], 
      id   : "",  
      company   : "",  
      VehicleCategory:"",
      mappingDetails:[] 
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.getData();
    this.getVehicleData();

   var getcompanyID = localStorage.getItem("companyID")
   console.log('getcompanyID: ',getcompanyID)
    this.setState({company: getcompanyID})
   
    $("#VehicleEmployeeMappingForm").validate({
    rules: {
      empCategory: {
        required: true,
      },
      VehicleCategory: {
        required: true,
      },
     
    }
    });  
  }

  componentWillReceiveProps(nextProps){
    this.getData()
    var getcompanyID = localStorage.getItem("companyID")
    this.setState({company: getcompanyID})
  }

  getVehicleData(){
        axios.get("/api/categorymaster/get/list")
        .then((response) => {
        	var vehicleData = []
        	response.data.map((data, ind) => {
                vehicleData.push({ id: data._id, VehicleCategory: data.category })
            });
            this.setState({ vehicleData: vehicleData })
        })
        .catch((error) => {
        }) 
    }
 
  handleChange(event){
    const {name,value} = event.target;
    this.setState({ 
      [name]:value
    });
  }  

  
  getData(){
    var data= {company : localStorage.getItem("companyID")}
    axios.post('/api/VehicleEmployeeMapping/companylist',data)
    .then((response) => {
      console.log('response: ',response.data)
        this.setState({ 
          mappingDetails : response.data,
        });
    })
    .catch((error) => {});
	}
  submit(event){
      event.preventDefault();
      var vehicleCatArray = this.state.VehicleCategory;
      var result = [];
      for(var i=0 ; i<vehicleCatArray.length ; i++){
      	result.push({category_id:vehicleCatArray[i]})
      }//i
        var formvalue ={
          empCategory    : this.state.empCategory, 
          VehicleCategory : result, 
          company:this.state.company,
          createdBy : localStorage.getItem("user_ID")
        }
        if($("#VehicleEmployeeMappingForm").valid()){
          if(result && result.length > 0){
            axios.post('/api/VehicleEmployeeMapping/post',formvalue)
            .then((response)=> {
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
              })
              this.getData();
            })
            .catch((error)=> {
            	console.log('error===>',error)
              swal({                
                    text: "Failed to add data!",
                  });
            })
          }else{
            swal('Please select atleast one vehicle category')
          }
        }
 
 
  }

  update(event){
    event.preventDefault();
     var vehicleCatArray = this.state.VehicleCategory;
      var result = [];
      for(var i=0 ; i<vehicleCatArray.length ; i++){
      	result.push({category_id:vehicleCatArray[i]})
      }//i
      var formvalues ={
      	id: this.state.id,
        empCategory    : this.state.empCategory, 
        VehicleCategory : result,
        company : this.state.company,
        updatedBy : localStorage.getItem("user_ID")
      }
      if($("#VehicleEmployeeMappingForm").valid()){
        axios.patch('/api/VehicleEmployeeMapping/patch',formvalues)
        .then((response)=> {
          this.getData();
          swal({                
                text: "Data Updated successfully!",
              });
          $('#empCategory').prop('disabled', false);
          this.dropDownListObject.value = null;
            this.setState({
              empCategory    : "", 
              VehicleCategory : "", 
              id:""
            })
            this.getData();
        })
        .catch((error)=> {
          swal({                
                text: "Failed to Update details!",
              });
        })
      }

}

    handleChangeCategory(event){
		if (event.value) {
			this.setState({VehicleCategory : event.value})
		}
    }

  edit(event) {
  	event.preventDefault();
    $("html,body").scrollTop(0);
    $('#empCategory').prop('disabled', true);
    var id = $(event.currentTarget).attr('id');
    console.log('id: ',id)
    axios.get('/api/VehicleEmployeeMapping/get/one/'+id)
      .then((response) => {
      	console.log('response: ',response)
      	var data = response.data.VehicleCategory;
      	var array = []
      	for(var i=0 ; i<data.length ; i++){
      		array.push(data[i].category_id)
      	}//i
      	this.dropDownListObject.value = array;
          this.setState({ 
            id : response.data._id,
            empCategory : response.data.empCategory,
            VehicleCategory : array,
          });
      })
      .catch((error) => {});
        
    }
  
  
  render() {
  	const categoryfields: object = { text: 'VehicleCategory', value: 'id' };
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		<div className="row">
			<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
				<section className="content">
					<div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
							<h4 className="weighttitle col-lg-12 col-md-12 col-xs-12 col-sm-12">Vehicle Category and Employee Category Mapping</h4>
          				</div>
				          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
				            <form id="VehicleEmployeeMappingForm">
				              <div className="form-margin col-lg-4 col-md-4 col-xs-12 col-sm-12  valid_box ">
				                <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Employee Category <i className="astrick">*</i></label>
					              <select className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
					                ref="empCategory" id="empCategory" value={this.state.empCategory} name="empCategory"
					                onChange={this.handleChange} >
					                <option value="" disabled={true}>-- Select --</option>
					                <option value="1">1</option>
					                <option value="2">2</option>
					                <option value="3">3</option>
					                
					              </select>
				              </div>
				              
				              <div className="form-margin col-lg-8 col-md-8 col-xs-12 col-sm-12  valid_box ">
				                <label className="labelform">Vehicle Category <span className="requiredsign">*</span></label>
				                <MultiSelectComponent id="categoryChange" ref={(scope) => { this.dropDownListObject = scope; }}
									dataSource={this.state.vehicleData}
				                    change={this.handleChangeCategory.bind(this)} mode='box'
									fields={categoryfields} placeholder="Select Vehicle category" 
									mode="CheckBox" selectAllText="Select All" 
									unSelectAllText="Unselect All" showSelectAll={true} hideSelectedItem={false}>
				                    <Inject services={[CheckBoxSelection]} />
				                </MultiSelectComponent>
				              </div>
				              
				              
				              <div className=" col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
				                {
				                    this.state.id === "" || this.state.id == undefined ?
				                        <button className="col-lg-3 col-md-2 col-xs-12 col-sm-12 col-xs-12 pull-right btn button3 topMargin outlinebox" type="submit" onClick={this.submit.bind(this)} >Submit</button>
				                    :
				                        <button className="col-lg-3 col-md-2 col-xs-12 col-sm-12 col-xs-12 pull-right btn button3 topMargin outlinebox" type="update" onClick={this.update.bind(this)} >Update</button>
				                }
				                
				              </div>
				            </form>
				            </div>
				           
		           			<div className="table-responsive topmr40 col-lg-12 col-md-12 col-sm-12 col-xs-12">
				              <table className="table iAssureITtable-bordered table-striped table-hover">
				                <thead className="tempTableHeader">
				                  <tr className="">
				                    <th className="umDynamicHeader srpadd textAlignCenter"> Employee Category </th>
				                    <th className="umDynamicHeader srpadd textAlignCenter"> Vehicle Category </th>
				                    <th className="umDynamicHeader srpadd textAlignCenter"> Action </th>
				                  </tr>
				                </thead>
				                <tbody>
						        {this.state.mappingDetails && this.state.mappingDetails.length > 0 ?
				           		this.state.mappingDetails.map((data,index)=>{
				           		return(
				                  <tr key={index}>
				                    <td>{data.empCategory}</td>
				                   <td>{data.vehicle && data.vehicle.length > 0 ?
				                   		data.vehicle.map((vehicle,ind)=>{
				                   			return(
				                   				<ul key={ind}>
				                   				<li>{vehicle.category}</li>
				                   				</ul>
				                   			)
				                   		})
				                   		:""
				                   }</td>
				                    <td className="textAlignCenter">
				                      <span>
				                          <button title="Edit" id={data._id}  onClick={this.edit.bind(this)}><i className="fa fa-pencil" ></i></button> &nbsp; &nbsp;
				                      </span>
				                      </td>
				                  </tr>
				                   )
						           	})
						            
						            :
						            <tr><td colSpan="3" className="textAlignCenter">No Data Found</td></tr>
						          }     
				                </tbody>
				              </table>
				            </div>
				           		
          			</div>
          		</section>
          	</div>
        </div>
      </div>

    );
  }
}
export default VehicleEmployeeMapping;

