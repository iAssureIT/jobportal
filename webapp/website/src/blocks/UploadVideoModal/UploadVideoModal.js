import React, { Component } from 'react';
import './UploadVideoModal.css';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Axios                        from 'axios';
import Swal                         from 'sweetalert2';
import S3FileUpload                 from 'react-s3';


export  default class UploadVideoModal extends Component {
	constructor(props) {
    super(props);
    this.state = {
        uploadedVideoURL : ""
    	}
  	}
    uploadVideo(event){
        event.preventDefault();
        var uploadedVideo = [];
        if (event.currentTarget.files ) {
        const imgFile = event.currentTarget.value;
        
        const videoUrl =  URL.createObjectURL(event.target.files[0]);
        
        this.setState({
            uploadedVideoURL : videoUrl
        })
        var file = event.currentTarget.files[0];
        if (file) {
          var fileName = file.name;
          var fileSize = file.size;

          var ext = fileName.split('.').pop();
          console.log(fileSize  )
          if (ext === "mp4" ) {
            if(fileSize > 1048576){
              Swal.fire("Allowed file size is 1MB");
            }else{
              if (file) {
                var objTitle = { fileInfo: file }
                uploadedVideo.push(objTitle);
              } else {
                Swal.fire("Images not uploaded");
              }//file
            }
          } else {
            Swal.fire("Allowed images formats are (jpg,png,jpeg)");
            this.setState({
              gotProfileImage:false
            })
          }//file types
        }
        if (event.currentTarget.files) {
        this.setState({
          gotProfileImage:true
        })
        main().then(formValues => {
         
        console.log(formValues)
          this.setState({
            uploadedVideo   : formValues[0].uploadedVideo,
            imageUploaded : false
          })
          Swal.fire(
                        'Uploaded!',
                        'Your video interview is saved',
                        'success'
                );
          document.getElementById("videoModalCloseButton").click();
        });

        async function main() {
          var formValues = [];
        
            var config = await getConfig();
            var s3url = await s3upload(uploadedVideo[0].fileInfo, config, this);
            const formValue = {
              "uploadedVideo": s3url,
              "status": "New"
            };
            formValues.push(formValue);

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
            Axios.post('/api/projectsettings/getS3Details/S3')
              .then((response) => {
                const config = {
                  bucketName: response.data.bucket,
                  dirName: process.env.REACT_APP_ENVIRONMENT,
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
                    		<i className="fa fa-upload"></i>
                            <input id="uplodVideoInput" type="file" onChange={this.uploadVideo.bind(this)} className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" title="" name="uploadVideo" />
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