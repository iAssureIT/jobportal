import React, {Component} from 'react';
import India from '../India/India.js';
import './MapComponent.css';



export default class MapComponent extends Component{


	constructor(props){
		super(props);

		 
	}
	componentDidMount(){
		
	}
	

	render(){
		return(
			<div>
					<India />
			</div>
		);
	}
}