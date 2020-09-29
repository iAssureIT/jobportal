import React, { Component } from 'react';
import { render }           from 'react-dom';
import $                    from 'jquery';
import jQuery               from 'jquery';
import TwoFieldForm         from '../../coreadmin/Master/TwoFieldForm/TwoFieldForm.js';
// import './PackageName.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';

class PackageName extends Component{
   constructor(props) {
        super(props);
        this.state = {
            "fields" : {
                placeholder          : "Enter Package Name",
                title                : "Package Name",
                secondtitle          : "Package Type",
                attributeName        : "packageName",
                secondAttributeId    : "packageTypeId",
                secondAttributeName  : "packageType"
            },
            "tableHeading": {
                packageType         : "Package Type",
                packageName         : "Package Name",
                actions             : 'Action',
            },
            "tableObjects": {
                deleteMethod    : 'delete',
                apiLink         :'/api/packagenamemaster/',
                apiLink2        :'/api/packagetypemaster/',
                paginationApply : false,
                searchApply     : false,
                editUrl         : '/project-master-data'
            },
            "startRange" : 0,
            "limitRange" : 10,
            "editId"     : ''
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                        <TwoFieldForm   
                            fields={this.state.fields}
                            tableHeading={this.state.tableHeading}
                            tableObjects={this.state.tableObjects}
                            editId ={this.props.editId}
                            history={this.props.history} 
                        />
                    </div> 
                </div>
            </div>
        )
    }

 }

 export default PackageName;