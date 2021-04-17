import React, { Component } from 'react';

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';

import './Modal.css';

export default class Modal extends Component{

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
                          <button type="button" class="btn btn-default delModalBtnTwo col-lg-3" data-dismiss="modal">YES</button>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
            );
  }
}
