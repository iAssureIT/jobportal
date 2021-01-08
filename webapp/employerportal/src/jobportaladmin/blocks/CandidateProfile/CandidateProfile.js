import React,{Component} from 'react';
import LeftAside    	 from './LeftAside/LeftAside.js';
import MiddelContent     from './MiddelContent/MiddelContent.js';
import RightAside    	 from './RightAside/RightAside.js';

/*import $                 from 'jquery';
import  jsPDF  		 	 from "jspdf"; */

import './CandidateProfile.css';

/*const ref = React.createRef();*/

class CandidateProfile extends Component{

	componentDidMount(){
			/*var doc = new jsPDF(); 
			var specialElementHandlers = { 
			    '#editor': function (element, renderer) { 
			        return true; 
			    } 
			};
			$('#submit').click(function () { 
			    doc.fromHTML($('#content').html(), 15, 15, { 
			        'width': 190, 
			            'elementHandlers': specialElementHandlers 
			    }); 
			    doc.save('sample-page.pdf'); 
			});*/
		}

	render(){
		return(
				<div className="container-fluid candidateProfileWrapper">
			        <div className="col-lg-12" id="content">
						<div className=" candidateProfile">
							<div className="row">
								<div className="  col-lg-12">
									<div className="col-lg-3">
										
											<LeftAside/>
										
									</div>
									<div className="col-lg-6">
										<div className="row">
											
											<MiddelContent/>
										
										</div>
									</div>
									<div className="col-lg-3">
										
											<RightAside/>
										
									</div>
								</div>
							</div>
						</div>
					</div><div id="page"></div>
					{/*<button id="submit">Export to  PDF</button> */}		
				</div>
			);
	}
}

export default CandidateProfile;





/*import React,	{Component} from 'react';
import LeftAside    	 from './LeftAside/LeftAside.js';
import MiddelContent     from './MiddelContent/MiddelContent.js';
import RightAside    	 from './RightAside/RightAside.js';

import $                 from 'jquery';
import jsPDF  		 	 from "jspdf";
import html2canvas       from "html2canvas";    

import './CandidateProfile.css';

export default class pdfGenerator extends Component {
	constructor(props) {
		super(props);
	this.state = {

	}
}

	jspdfGenerator = () => {
		var  doc = new jsPDF('p', 'pt');

		doc.text(20, 20,  'this is default text')

		doc.setFont('courier');

		doc.text(20, 30, 'This is text with courier font')

		doc.save("Generated.pdf");

	}

	render() {
		return(<button onClick={this.jspdfGenerator}>Generate PDF</button>);
	}

}*/





/*import React,	{Component, PropTypes} from 'react';
import LeftAside    	 from './LeftAside/LeftAside.js';
import MiddelContent     from './MiddelContent/MiddelContent.js';
import RightAside    	 from './RightAside/RightAside.js';

import $                 from 'jquery';
import jsPDF  		 	     from "jspdf";
import html2canvas       from "html2canvas";

import './CandidateProfile.css';


export default class Export extends Component {
  constructor(props) {
    super(props);
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf");
      })
    ;
  }


  render() {
    return (<div>
      <div className="mb5">
        <button onClick={this.printDocument}>Print</button>
      </div>
      <div id="divToPrint" className="mt4" {...({
        backgroundColor: '#f5f5f5',
        width: '210mm',
        minHeight: '297mm',
        marginLeft: 'auto',
        marginRight: 'auto'
      })}>
        <div>Note: Here the dimensions of div are same as A4</div> 
        <div>
        	<h1>Profile PDF Page</h1>
        	<LeftAside/>
        </div>
      </div>
    </div>);
  }
}
*/



/*import React from 'react';
import { render } from 'react-dom';
import ReactToPrint from "react-to-print";

export default class ComponentToPrint extends Component {
  render() {
    return (
      <table>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}
*/


/*
import React,	{Component} from 'react';
import ReactToPrint from 'react-to-print';

import CandidateProfile from './CandidateProfile.js';



export default class ComponentToPrint extends Component  {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            
            return <a href="#">Print this out!</a>;
          }}
          content={() => this.componentRef}
        />
        <CandidateProfile ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}
*/
