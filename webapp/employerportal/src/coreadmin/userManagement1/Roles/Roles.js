import React, { Component } from 'react';
import OneFieldForm         from '../../Master/OneFieldForm/OneFieldForm.js';
class Roles extends Component{
   constructor(props) {
    super(props);
    this.state = {
      fields : {
        placeholder : "Enter the name of entity",
        title       : "Roles",
        attributeName : "role"
      },
      "tableHeading": {
                role: "Roles",
                actions: 'Action',
            },
            "tableObjects": {
                deleteMethod: 'delete',
                apiLink: '/api/roles/',
                paginationApply: false,
                searchApply: false,
                editUrl: '/umroleslist'
            },
            "startRange": 0,
            "limitRange": 10,
            "editId": this.props.match.params ? this.props.match.params.fieldID : ''
      };
  }
  componentDidMount() {
        var editId = this.props.match.params.fieldID;
       
        this.setState({
            editId: editId
        })
        var editId = this.props.match.params.fieldID;
        window.scrollTo(0, 0);
    }
     componentWillReceiveProps(nextProps) {
        var editId = nextProps.match.params.fieldID;
        if (nextProps.match.params.fieldID) {
            this.setState({
                editId: editId
            })
        }
    }

    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <OneFieldForm fields={this.state.fields}
                              tableHeading={this.state.tableHeading}
                              tableObjects={this.state.tableObjects}
                              editId ={this.props.match.params.fieldID}
                              history={this.props.history} />
            </div>

        );
    }
}

 export default Roles;