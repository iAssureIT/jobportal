import React, { Component } from 'react';
import $                    from 'jquery';
import jQuery               from 'jquery';
import axios                from 'axios';
import swal                 from 'sweetalert';
import _                    from 'underscore';
import OneFieldForm         from '../../coreadmin/Master/OneFieldForm/OneFieldForm.js';
import 'bootstrap/js/tab.js';

class VendorCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // categoryName: "",
            "fields" : {
                    placeholder   : "Add category name..",
                    title         : "Vehicle Category",
                    api           : "/api/vendorCategory/",
                    attributeName : "category",
                    hasImage      : true

                },
            "tableHeading": {
                category: "Category Name",
                iconUrl : "Icon",
                actions: 'Actions',
            },
            "tableObjects": {
                deleteMethod: 'delete',
                apiLink: '/api/categorymaster/',
                paginationApply: false,
                searchApply: false,
                editUrl: '/project-master-data'
            },
            "startRange": 0,
            "limitRange": 10,
            "editId": ''
        };
    }
 
    render() {
        return (
                <div className="container-fluid">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 companyDisplayForm">
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">                                                           
                            <OneFieldForm fields={this.state.fields}
                                tableHeading={this.state.tableHeading}
                                tableObjects={this.state.tableObjects}
                                bulkRequired={false}
                                masterFieldForm = {true}
                                editId ={this.props.editId} 
                                history={this.props.history}
                                />  
                        </div>
                    </div>
                </div>
        );
    }
}
export default VendorCategory;

