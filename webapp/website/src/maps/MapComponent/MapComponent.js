import React, {Component} from 'react';
import India from '../India/India.js';
import Maharashtra from '../Maharashtra/Maharashtra.js';
import './MapComponent.css';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';


class MapComponent extends Component{

	constructor(props){
		super(props);

		 
	}
	componentDidMount(){
		 console.log("pathname=",window.location.pathname)
	}
	

	render(){
		console.log(this.props.mapView)
		return(
			<div>
				{
				this.props.mapView == "India" ? <India /> : null
				}
				{
				this.props.mapView == "MH" ? <Maharashtra /> : null
				}
			</div>
		);
	}
}
const mapStateToProps = (state)=>{

    return {
        mapView          : state.mapView,
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);