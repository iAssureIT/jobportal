import React, { Component } from 'react';

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import Axios                from 'axios';
/*import Swal                 from 'sweetalert2';*/

import './Modal.css';

export default class Modal extends Component{

constructor(props){
    super(props);
  }

/*getJobs = (event)=>{

        Axios.post("/api/jobs/joblist-for-employer")
        .then(response =>{
          console.log("employer joblist");
        })
        .catch(error=>{
          console.log("some error occured while getting joblist");
        })

}  */

deleteJob = (event)=>{
  
  const job_id = this.props.job_id;
  console.log("job_id",job_id);  
  
  if(job_id){
        Axios.delete("/api/jobs/delete/"+job_id)
        .then(response =>{
          if(response.data.message==="Job details deleted Successfully!"){
            var {mapAction} = this.props;

            /*Swal.fire(
                  'Deleted!',
                  'Job has been deleted successfully!',
                  'success'
              );*/

            window.location.reload();
          }
        })
        .catch(error=>{
          /*Swal.fire(
                "Some problem occured deleting job!",
                error.message,
                'error'
            )*/
        })
      }
  }

  render(){
            return (
              <div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog delModalMain">
                  <div class="modal-content delModalContent">
                    <div class="modal-header delHeader">
                      <button type="button" class="close delCloseBtn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body delModalBody">
                      <div class="delBodyText">
                        Are you sure <br />
                        you want to delete this job?
                      </div>
                      <div className="col-lg-12 delMainBtnDiv">
                          <button type="button" class="btn btn-default delModalBtnOne col-lg-3" data-dismiss="modal">NO</button> 
                          <button type="button" class="btn btn-default delModalBtnTwo col-lg-3" data-dismiss="modal" onClick={this.deleteJob}>YES</button>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
            );
  }
}
