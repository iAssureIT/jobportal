import React, { Component } from 'react';
import './UploadVideoModal.css';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';



export  default class UploadVideoModal extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	}
  	}

render(){
	return(


	<section className="container-fluid UploadVideoModalWrapper">
                <div className="UploadVideoModal col-lg-6 col-lg-offset-3">
                 
                    <div className="UploadVideoModalTitle col-lg-12">Video Introduction
                    </div>

                    <hr className="UploadVideoModalHr"/>

                    <div className="UploadVideoModalSentence col-lg-12">
                      Your Video Introduction will help recruiters to find your key skills.
                    </div>

                     <hr className="UploadVideoModalHr"/>

                    <div className="UploadVideoWrapper col-lg-6">
                    	<div className="UploadVideoIcon">
                    		<i class="fa fa-upload"></i>
                    	</div>

                    	<div className="UploadVideoText">
                    		Upload Video
                    	</div>

                    </div>

                    <div className="RecordVideoWrapper col-lg-6">
                    <div className="UploadVideoIcon">
                    		<FontAwesomeIcon icon={['fas', 'video']} />

                    	</div>

                    	<div className="UploadVideoText">
                    		Record Video
                    	</div>

                    </div>


                    
                
                </div>
         </section>

















	 );
}

}