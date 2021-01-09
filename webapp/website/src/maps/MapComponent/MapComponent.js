import React, {Component, Suspense} from 'react';
//import India from '../India/India.js';
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
		 console.log("history pathname=",this.props.match)
	}
	

	render(){
		const MapView = () => {
	      switch(window.location.pathname) {
	        case "/":   return <India />;
	        case "MH":   return <Maharashtra />;
	        default:      return <h1>No map match</h1>
	      }
	    }
		//console.log(this.props.mapView)
		const India = React.lazy(() => import('../India/India.js'));
		return(
			<div>
				<Suspense fallback={<div>Loading...</div>}>
			        <MapView />
			    </Suspense>
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