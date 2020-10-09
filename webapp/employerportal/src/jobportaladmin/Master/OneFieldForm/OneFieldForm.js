import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import IAssureTable         from '../../../coreadmin/IAssureTable/IAssureTable.jsx';
import axios                from 'axios';
import swal                 from 'sweetalert';
import { withRouter }       from 'react-router-dom';
import _                    from 'underscore';
import S3FileUpload         from 'react-s3';
import 'bootstrap/js/tab.js';
import './OneFieldForm.css'
var apiLink = "";
class OneFieldForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "user_ID"      : "",
            "startRange"   : 0,
            "limitRange"   : 10,
            "editId"       :  '',
            "fieldValue"   : "",
            "categoryImage" :"",
            "pageUrl"      : "",
        };
    }
    componentDidMount() {
        apiLink =  this.props.tableObjects.apiLink;
        const user_ID = localStorage.getItem("user_ID")
        const companyID =   localStorage.getItem("companyID")

        this.setState({
            user_ID : user_ID,
            companyID : companyID,
            editId:this.props.editId
        },()=>{
            this.edit(this.state.editId)
            
        })

    $.validator.addMethod("regxonefield", function (value, element, regexpr) {
      return regexpr.test(value);
    }, "Please enter valid field value");
        
         jQuery.validator.setDefaults({
          debug: true,
          success: "valid"
        });
        $("#vendorLocationType").validate({
          rules: {
            fieldName: {
              required      : true,
              regxonefield  :/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/,
            },
          },
          errorPlacement: function (error, element) {
            if (element.attr("name") === "fieldName") {
              error.insertAfter("#OneFieldInput");
            }
          }
        });
    }
   componentDidUpdate(prevProps) {
    if(this.props.editId !== this.state.editId){
      this.setState({editId : this.props.editId},
                    ()=>{
                      //console.log("global componentDidUpdate editId = ",this.state.editId);
                    });
    }
  }

    componentWillReceiveProps(nextProps) {
        if(nextProps.editId){
            this.edit(nextProps.editId);
        }else{
            this.setState({
                fieldName: "",
                iconUrl  : "",
                editId: "",
                "categoryImage":"",
            })
        }
    }
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        var fieldName = this.props.fields.attributeName
        this.setState({
            fieldName : event.target.value
        },()=>{
        });

    }
    submitType(event) {
        event.preventDefault();
        if(this.props.editId)
        {
            var formValues ={
                "companyID"     : this.state.companyID,
                "fieldID"       : this.props.editId,
                "fieldValue"    : this.state.fieldName,
                "iconUrl"       : this.state.categoryImage,
                "updatedBy"     : this.state.user_ID
            }
            console.log("formValues",formValues);
        if ($('#vendorLocationType').valid()) {
            axios.patch(apiLink+'/patch', formValues)
                .then((response) => {
                    this.setState({
                        fieldName    : "",
                        categoryImage :"",
                        editId       : ""
                    },()=>{
                        this.props.history.push(this.props.tableObjects.editUrl);
                    })
                    this.getData(this.state.startRange, this.state.limitRange);
                    swal(" ",this.props.fields.title+" updated Successfully");
                })
                .catch((error) => {
                })
        }
        }else
        {
            var formValues = {
                "companyID"     : this.state.companyID,
                "fieldValue"    : this.state.fieldName,
                "iconUrl"       : this.state.categoryImage,
                "createdBy"     : this.state.user_ID
            }
            console.log("formValues",formValues);

        if ($('#vendorLocationType').valid()) {
            axios.post(apiLink+'post', formValues)
                .then((response) => {
                    console.log("response",response);
                    if (response.data.created) {
                        swal(" ", this.state.fieldName+" "+this.props.fields.title+" submitted Successfully");
                    }else{
                        swal(" ", this.state.fieldName+" "+this.props.fields.title+" already exists");
                    }
                    this.getData(this.state.startRange, this.state.limitRange);
                    this.setState({
                       fieldName    : "",
                       categoryImage : "",
                       iconUrl      : ""
                     })
                })
                .catch((error) => {
                    
                })
        }

        }
      
    }
    updateType(event) {
        event.preventDefault();
         var formValues ={
                "companyID"     : this.state.companyID,
                "fieldID"       : this.props.editId,
                "fieldValue"    : this.state.fieldName,
                "iconUrl"       : this.state.categoryImage,
                "updatedBy"     : this.state.user_ID
            }
        if ($('#vendorLocationType').valid()) {
            axios.patch(apiLink+'/patch', formValues)
                .then((response) => {
                    this.setState({
                        fieldName    : "",
                        categoryImage :"",
                        editId       : ""
                    },()=>{
                        this.props.history.push(this.props.tableObjects.editUrl);
                    })
                    this.getData(this.state.startRange, this.state.limitRange);
                    swal(" ",this.props.fields.title+" updated Successfully");
                })
                .catch((error) => {
                })
            }
            
    }
    getDataCount() {
        axios.get('/api/vendorLocationType/get/count')
            .then((response) => {
               
                this.setState({
                    dataCount: response.data.dataCount
                })

            })
            .catch((error) => {
                
            });
    }
    getData(startRange, limitRange) {
        var data = {
            startRange: startRange,
            limitRange: limitRange
        }
        axios.post(apiLink+'get/list', data)
            .then((response) => {

                var tableData = response.data.map((a, i)=>{
                    return({
                        _id                                 : a._id,
                        companyID                           : a.companyID ? a.companyID : this.state.companyID,
                        [this.props.fields.attributeName]   : a[this.props.fields.attributeName],
                        iconUrl                             : "<img class='uploadedImage' src="+a.iconUrl+">"
                    })
                })
                var filterByCompanyID = tableData.filter(field => field.companyID == this.state.companyID);

                this.setState({
                    tableData: filterByCompanyID
                })
            })
            .catch((error) => {});
    }
    edit(id) {
        $('label.error').html('')
        var fieldName = this.props.fields.attributeName;
        axios.get(apiLink+'get/one/' + id)
            .then((response) => {
                if (response.data) {
                    this.setState({

                        "fieldName": response.data[fieldName],
                        "categoryImage": response.data.iconUrl,
                    },()=>{
                    });
                }
            })
            .catch((error) => {
                
            });
    }
    docBrowse(event) {
        event.preventDefault();
        var name = event.target.name
        var docBrowse = [];
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            for (var i = 0; i < event.currentTarget.files.length; i++) {
                var file = event.currentTarget.files[i];
                if (file) {
                    var fileName = file.name;
                    // console.log('fileName',fileName);
                    var ext = fileName.split('.').pop();
                    if (ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "JPG" || ext === "PNG" || ext === "JPEG") {
                        if (file) {
                            var objTitle = { fileInfo: file }
                            docBrowse.push(objTitle);

                        } else {
                            swal(" ","Files not uploaded");
                        }//file
                    } else {
                        swal(" ","Allowed images formats are (jpg,png,jpeg)");
                    }//file types
                }//file
            }//for 
            
            if (event.currentTarget.files) {
                 this.setState({
                    ["gotImage"+name]: true

                })
                main().then(formValues => {
                        this.setState({
                            [name]: formValues[0].docBrowse,
                        },()=>{
                             console.log("categoryImage0",this.state.categoryImage)
                        })
                });

                async function main() {
                    var formValues = [];
                    for (var j = 0; j < docBrowse.length; j++) {
                        var config = await getConfig();
                        var s3url = await s3upload(docBrowse[j].fileInfo, config, this);
                        const formValue = {
                            "docBrowse": s3url,
                            "status": "New"
                        };
                        formValues.push(formValue);
                    }
                    return Promise.resolve(formValues);
                }


                function s3upload(image, configuration) {

                    return new Promise(function (resolve, reject) {
                        S3FileUpload
                            .uploadFile(image, configuration)
                            .then((Data) => {
                                resolve(Data.location);
                            })
                            .catch((error) => {
                            })
                    })
                }
                function getConfig() {
                  return new Promise(function (resolve, reject) {
                      axios
                        .get('/api/projectsettings/get/S3')
                        .then((response) => {
                            const config = {
                                bucketName: response.data.bucket,
                                dirName: 'propertiesImages',
                                region: response.data.region,
                                accessKeyId: response.data.key,
                                secretAccessKey: response.data.secret,
                            }
                            resolve(config);
                        })
                        .catch(function (error) {
                        })
                    })
                }
            }
        }
    }
    deleteDoc(event){
    event.preventDefault();
        var name = event.target.getAttribute("name");
        this.setState({
            [name]: "",
            ["gotImage"+name]: false

        },()=>{
        // console.log('name',this.state.categoryImage);
        })
    }

    render() {
        console.log("categoryImage",this.state.categoryImage);
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">{this.props.fields.title === "Location Type"? this.props.fields.title+"s" : this.props.fields.title } </h4>
                                </div>
                                <section className="Content">
                                    <div className="row">
                                        <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
                                        {
                                            this.props.fields.hasImage === true ?
                                            <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="vendorLocationType" >
                                                    <div className="form-margin col-lg-6 col-lg-offset-1 col-md-6 col-sm-12 col-xs-12 pdcls">
                                                        <div id="OneFieldInput">
                                                            <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">{this.props.fields.title} <i className="astrick">*</i></label>
                                                            <input type="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.fieldName} ref={this.props.fields.attributeName} name="fieldName" onChange={this.handleChange.bind(this)} placeholder={this.props.fields.placeholder}  required/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 OFFImageDiv " id="LogoImageUpOne" >
                                                            <div><i className="fa fa-camera"></i> <br /><p>UPLOAD IMAGE</p></div>
                                                            <input onChange={this.docBrowse.bind(this)}  id="LogoImageUp" type="file" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="categoryImage" />
                                                        </div>
                                                        {
                                                          this.state.categoryImage ?
                                                            <div className="col-lg-12 col-md-2 col-sm-12 col-xs-12 nopadding CustomImageUploadOF">
                                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                                      <label className="labelform deletelogo col-lg-12 col-md-12 col-sm-12 col-xs-12" id={this.state.categoryImage} name="categoryImage" onClick={this.deleteDoc.bind(this)}>x</label>
                                                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogosOF" id="categoryImage">
                                                                          {
                                                                            this.state.categoryImage.split('.').pop() === "pdf" || this.state.categoryImage.split('.').pop() === "PDF" ?
                                                                            <img src="/images/pdfImg.png" className="img-responsive profileImageDivlogoStyleOF"/>
                                                                            
                                                                            :
                                                                           <img src={this.state.categoryImage} className="img-responsive profileImageDivlogoStyleOF" />
                                                                      }
                                                                      </div>
                                                                  </div>
                                                            </div>
                                                            :
                                                             ( this.state.gotImagecategoryImage  ?
                                                                <div className="col-lg-12 col-md-2 col-sm-12 col-xs-12 nopadding CustomImageUploadOF">
                                                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding marginsBottom" id="hide">
                                                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 brdlogosOF" id="categoryImage">
                                                                            <img src="/images/loading.gif" className="img-responsive profileImageDivlogoStyleOF"/>
                                                                      </div>
                                                                  </div>
                                                            </div>
                                                            :
                                                            null)
                                                        }
                                                    </div>
                                                    <div className="form-margin col-lg-6 col-lg-offset-6 col-md-6 col-sm-12 col-xs-12">
                                                        {
                                                            this.props.editId ?
                                                            <button onClick={this.updateType.bind(this)} className="btn button3 pull-right">Update</button>
                                                            :
                                                            <button onClick={this.submitType.bind(this)} className="btn button3 pull-right">Submit</button>
                                                        }
                                                    </div>
                                                    <br />
                                                </form>
                                            :
                                            <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="vendorLocationType" onSubmit={this.submitType.bind(this)} >
                                                <div className="form-margin col-lg-8 col-lg-offset-2 col-md-6 col-sm-12 col-xs-12 pdcls">
                                                   <div id="OneFieldInput">
                                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">{this.props.fields.title} <i className="astrick">*</i></label>
                                                        <input type20="text"  className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" value={this.state.fieldName} ref={this.props.fields.attributeName} name="fieldName" onChange={this.handleChange.bind(this)} placeholder={this.props.fields.placeholder} required />
                                                    </div>
                                                </div>
                                                <br />
                                            </form>
                                        }
                                           
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <IAssureTable
                                                tableHeading={this.props.tableHeading}
                                                twoLevelHeader={this.state.twoLevelHeader}
                                                dataCount={this.state.dataCount}
                                                tableData={this.state.tableData}
                                                getData={this.getData.bind(this)}
                                                tableObjects={this.props.tableObjects}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        );
    }
}
export default withRouter(OneFieldForm)