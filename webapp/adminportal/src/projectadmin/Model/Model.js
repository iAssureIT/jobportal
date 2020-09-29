import React, { Component }     from 'react';
import { render }               from 'react-dom';
import axios                    from 'axios';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import TwoFieldForm             from '../../coreadmin/Master/TwoFieldForm/TwoFieldForm.js';
import 'bootstrap/js/tab.js';
 
class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "locationType": "",

            "oneFields"         : {
                placeholder     : "Add Your Vehicle Brand & press 'Enter' Key",
                title           : "Vehicle Brand",
                attributeName   : "brand"
            },
            "oneTableHeading"   : {
                brand           : "Vehicle Brand",
                actions         : 'Action',
            },
            "oneTableObjects"   : {
                  deleteMethod  : 'delete',
                  apiLink       : '/api/brandmaster/',
                  paginationApply: false,
                  searchApply   : false,
                  editUrl       : '/project-master-data/oneField',
                  editUrl1      : '/project-master-data'
            },

            "fields"            : {
                placeholder          : "Enter model type..",
                title                : "Vehicle Model",
                secondtitle          : "Vehicle Brand",
                attributeName        : "model",
                secondAttributeId    : "brandId",
                secondAttributeName  : "brand"
            },
            "tableHeading"      : {
                brandName   : "Brand",
                model       : "Model",
                actions     : 'Action',
            },
            "tableObjects"      : {
                deleteMethod    : 'delete',
                apiLink         :'/api/modelmaster/',
                apiLink2        :'/api/brandmaster/',
                paginationApply : false,
                searchApply     : false,
                editUrl         : '/project-master-data'
            },
            "startRange"        : 0,
            "limitRange"        : 10000,
            "editId"            : '',
            "oneeditId"         : '',

            //=========  For Bulk Upload ==============

            "fileDetailUrl"      : "/api/modelmaster/get/filedetails/",
            goodRecordsHeading   : {
                brandName        : "Brand",
                model            : "Model",
            },
            failedtableHeading   :{
                brand            : "Brand",
                model            : "Model", 
                failedRemark     : "Failed Data Remark"
            },
            oneFieldfileDetailUrl      : "/api/brandmaster/get/filedetails/",
            oneFieldgoodRecordsHeading :{
                brand                       : "Brand",
            },
            oneFieldfailedtableHeading   :{
                brand                 : "Brand",
                failedRemark          :  "Failed Data Remark"
            },



        };
    }

    getOneFieldFileDetails(fileName){
         axios
          .get(this.state.oneFieldfileDetailUrl+fileName)
          .then((response)=> {
          $('.fullpageloader').hide();  
          if (response) {
            this.setState({
                oneFieldfileDetails         : response.data,
                oneFieldfailedRecordsCount  : response.data.failedRecords.length,
                oneFieldgoodDataCount       : response.data.goodrecords.length
            });

              var tableData = response.data.goodrecords.map((a, i)=>{
                return{
                    
                    "brand"   : a.brand          ? a.brand         : '-',
                }
              })

              var oneFieldfailedRecordsTable = response.data.failedRecords.map((a, i)=>{
              return{
                    
                    "brand"         : a.brand          ? a.brand         : '-',
                    "failedRemark"  : a.failedRemark     ? a.failedRemark : '-' 
              }
              })
              
            this.setState({
                oneFieldgoodRecordsTable    : tableData,
                oneFieldfailedRecordsTable  : oneFieldfailedRecordsTable
            })
          }
          })
          .catch((error)=> { 
            console.log('error', error);
          }) 
    }
    getTwoFieldFileDetails(fileName){
        axios
        .get(this.state.fileDetailUrl+fileName)
        .then((response)=> {
            console.log('response====',response);
            $('.fullpageloader').hide();  
            if (response) {
                this.setState({
                    fileDetails         : response.data,
                    failedRecordsCount  : response.data.failedRecords.length,
                    goodDataCount       : response.data.goodrecords.length
                });
                var tableData = response.data.goodrecords.map((a, i)=>{
                    console.log('a',a);
                    return{
                        "brandName"    : a.brandName          ? a.brandName         : '-',
                        "model"        : a.model            ? a.model           : '-',
                    }
                })
                var failedRecordsTable = response.data.failedRecords.map((a, i)=>{
                    console.log('a failedRecordsTable',a);
                    return{
                        "brand"         : a.brand          ? a.brand         : '-',
                        "model"         : a.model            ? a.model           : '-',
                        "failedRemark"  : a.failedRemark     ? a.failedRemark    : '-' 
                    }
                })
                this.setState({
                    goodRecordsTable    : tableData,
                    failedRecordsTable  : failedRecordsTable
                },()=>{
                    console.log('goodRecordsTable',this.state.goodRecordsTable);
                    console.log('failedRecordsTable',this.state.failedRecordsTable);
                })
            }
        })
        .catch((error)=> { 
            console.log('error', error);
        }) 
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <TwoFieldForm   fields={this.state.fields}
                                        tableHeading={this.state.tableHeading}
                                        tableObjects={this.state.tableObjects}
                                        editId ={this.props.editId}                                                       
                                        oneFields={this.state.oneFields}
                                        oneTableHeading={this.state.oneTableHeading}
                                        oneTableObjects={this.state.oneTableObjects}
                                        oneeditId ={this.props.oneFieldEditId}
                                        history={this.props.history}   
                                        
                                        bulkRequired={true}
                                        onefieldurl="/api/brandmaster/bulkUploadbrand" 
                                        onefieldfileurl="https://fivebees.s3.ap-south-1.amazonaws.com/prod/master/VehicleBrand.xlsx"
                                        getOneFieldFileDetails={this.getOneFieldFileDetails.bind(this)}
                                        oneFieldgoodRecordsHeading ={this.state.oneFieldgoodRecordsHeading}
                                        oneFieldfailedtableHeading={this.state.oneFieldfailedtableHeading}
                                        oneFieldfileDetails={this.state.oneFieldfileDetails}

                                        oneFielduploadedData={this.oneFielduploadedData} 
                                        oneFieldfailedRecordsTable ={this.state.oneFieldfailedRecordsTable}
                                        oneFieldfailedRecordsCount={this.state.oneFieldfailedRecordsCount}
                                        oneFieldgoodRecordsTable={this.state.oneFieldgoodRecordsTable}
                                        oneFieldgoodDataCount={this.state.oneFieldgoodDataCount}

                                        twofieldBulkRequired={true}
                                        url="/api/modelmaster/bulkUploadModel" 
                                        twofieldfileurl="https://fivebees.s3.ap-south-1.amazonaws.com/prod/master/VehicleModel.xlsx"
                                        getTwoFieldFileDetails={this.getTwoFieldFileDetails.bind(this)}
                                        goodRecordsHeading ={this.state.goodRecordsHeading}
                                        failedtableHeading={this.state.failedtableHeading}
                                        fileDetails={this.state.fileDetails}
                                        
                                        data={{"createdBy" : localStorage.getItem("user_ID") }} 
                                        uploadedData={this.uploadedData} 

                                        failedRecordsTable ={this.state.failedRecordsTable}
                                        failedRecordsCount={this.state.failedRecordsCount}
                                        goodRecordsTable={this.state.goodRecordsTable}
                                        goodDataCount={this.state.goodDataCount}
                                        masterFieldForm = {true}
                        />
                    </div>                                                 
                </div> 
            </div>
        );
    }
}
export default Model;

