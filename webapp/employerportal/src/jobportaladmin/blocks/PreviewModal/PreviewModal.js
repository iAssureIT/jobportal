import React, { Component } from 'react';

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';

import './PreviewModal.css';

export default class PreviewModal extends Component{

  render(){
            return (
              <div id="robust" className="modal fade" role="dialog">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                   <div className="modal-header previewModal-header">
                      <button type="button" className="close previewCloseBtn" data-dismiss="modal">&times;</button>
                  </div>
                    <div className="modal-body">
                      <div className="jobProfileModalWrapper container-fluid">
                        <div className="col-lg-9">
                          <div className="col-lg-12 modalLeftSideMain">
                            <div className="row">
                              <div className="col-lg-12 ModalLeftHeader">
                                <div className="row">
                                  <div className="col-lg-4 leftImgModalContainer">
                                    <div className="col-lg-12">
                                      <div className="modalImgbox col-lg-9">
                                        <img src={this.props.jobInfo.employerLogo} className="modalProfileLogo"  alt="not found"/>
                                      </div>
                                    </div>  
                                  </div>
                                  <div className="col-lg-8 modalImgContent">
                                    <div className="col-lg-12 modalContentMain">
                                      <div className="row">
                                        <div className="modalContentHead">
                                          {this.props.jobInfo.jobTitle}
                                        </div>
                                        <div className="modalSubContentHead">
                                          {this.props.jobInfo.employerName}
                                        </div>
                                        <div className="modalLocationinfo">
                                          {this.props.jobInfo.address}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12 jobProfileMain">
                                <div className="row">
                                  <div className="col-lg-12 contentWrapper1">
                                    <div className="col-lg-12 profileSubContainer">
                                      <div className="modalProfileheading">
                                        Job Description
                                      </div>
                                      <div className="horizontalRightLine diamondBullet"></div>
                                      <div className="DescriptionContainer col-lg-12">
                                        <div className="profileContent">
                                          <div className="col-lg-12 modalJobDescContent">
                                            <div dangerouslySetInnerHTML = {{ __html : this.props.jobInfo.jobDesc}} />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 contentWrapper2">
                                    <div className="col-lg-12 profileSubContainer">
                                      <div className="modalProfileheading"> 
                                        Required Education & Experience
                                      </div>
                                      <div className="horizontalRightLine diamondBullet"></div>
                                      <div className="DescriptionContainer col-lg-12">
                                        <div className="profileContent">
                                          <ul className="col-lg-12">
                                            <li><span className="modalEduSubtitle">
                                              Minimum Education Required</span><br/>
                                              <span className="modalEduDuration"> {this.props.jobInfo.minEducation} </span>
                                            </li>
                                            <li>
                                              <span className="eduSubtitle"> Minimum Overall Experience </span><br/>
                                              <span className="modalEduDuration"> {this.props.jobInfo.minExperience} </span>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12 contentWrapper3">
                                    <div className="col-lg-12 profileSubContainer">
                                      <div className="modalProfileheading"> 
                                        Expected Skills
                                      </div>
                                      <div className="horizontalRightLine diamondBullet"></div>
                                      <div className="DescriptionContainer col-lg-12">
                                        <div className="row">
                                          <div className="profileContent">
                                            <div className="row">
                                              <ul className="modalSkillsHeadOne">
                                                <div className="row">
                                                  <li className="col-lg-5">
                                                    <span className="skillsTitle">
                                                      Primary Skills
                                                    </span>
                                                  </li>
                                                  <li className="col-lg-7">
                                                    <span className="skillSubtitle">
                                                      Min. Experience Req.
                                                    </span><br/>
                                                    <span className="skillDuration">
                                                      {this.props.jobInfo.minPrimExp}
                                                    </span>
                                                  </li>
                                                  <p className="modalSkillsList col-lg-5">
                                                    {
                                                      this.props.jobInfo.primarySkillTags.map((skill,index)=>{
                                                        return (
                                                                  <div>{skill.text }</div>
                                                                )
                                                      })
                                                    }
                                                  </p>
                                                </div>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                        
                                          <div className="row">
                                            <div className="profileContent">
                                              <div className="row">
                                                <ul className="modalSkillsHeadTwo">
                                                  <div className="row">
                                                    <li className="col-lg-5">
                                                      <span className="skillsTitle">
                                                        Secondary Skills
                                                      </span>
                                                    </li>
                                                    <li className="col-lg-7">
                                                      <span className="skillSubtitle">
                                                        Min. Experience Req.
                                                      </span><br/>
                                                      <span className="skillDuration">
                                                        {this.props.jobInfo.minSecExp}
                                                      </span>
                                                    </li>
                                                    <p className="modalSkillsList col-lg-5">
                                                      {
                                                        this.props.jobInfo.secondarySkillTags.map((skill,index)=>{
                                                          return (
                                                                    <div>{skill.text }</div>
                                                                  )
                                                        })
                                                      }
                                                    </p>
                                                  </div>
                                                </ul>
                                              </div>  
                                            </div>
                                          </div>    
                                        
                                          <div className="row">
                                            <div className="profileContent">
                                              <div className="row">
                                                <ul className="modalSkillsHeadThree">
                                                  <div className="row">
                                                    <li className="col-lg-5">
                                                      <span className="skillsTitle">
                                                        Other Skills
                                                      </span>
                                                    </li>
                                                    <li className="col-lg-7">
                                                      <span className="skillSubtitle">
                                                        Min. Experience Req.
                                                      </span><br/>
                                                      <span className="skillDuration">
                                                        {this.props.jobInfo.minOtherExp}
                                                      </span>
                                                    </li>
                                                    <p className="modalSkillsList col-lg-6">
                                                      {
                                                        this.props.jobInfo.otherSkillTags.map((skill,index)=>{
                                                          return(
                                                                  <div>{skill.text }</div>
                                                                )
                                                        })
                                                      }
                                                    </p>
                                                  </div>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        

                                          <div className="row">
                                            <div className="profileContent1">
                                              <div className="row">
                                                <ul className="modalSkillsHeadFour">
                                                  <div className="row">
                                                    <li className="col-lg-7">
                                                      <span className="skillsTitle">
                                                        Preferred Skills but not mandatory
                                                      </span>
                                                    </li>
                                                    <li className="col-lg-7">
                                                      <span className="skillSubtitle">
                                                      </span><br/>
                                                      <span className="skillDuration"></span>
                                                    </li>
                                                    <p className="modalSkillsList col-lg-6">
                                                      {
                                                        this.props.jobInfo.preferredSkillTags.map((skill,index)=>{
                                                          return(
                                                                    <div>{skill.text }</div>
                                                                )
                                                        })
                                                      }
                                                    </p>
                                                  </div>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/*<div className="col-lg-12">
                                    <div className="col-lg-4 buttonMain pull-right">
                                      <button className="btn bg-primary btnEdit col-lg-6">
                                        EDIT 
                                      </button>
                                      <button className="btn bg-primary btnSubmit col-lg-6">
                                        SUBMIT
                                      </button>
                                    </div>
                                  </div>*/}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="col-lg-12 ModalRightSideMain">
                            <div className="row">
                              {<div className="ModalRightSideHeader">
                                <div className="col-lg-12">
                                  <div className="row">
                                    <img src="/images/6.png" className="modalMapImg" alt="not found" />
                                  </div>
                                </div>
                              </div>}
                            </div>
                            <div className="col-lg-12">
                              <div className="row">
                                <div className="rightModalContentHead">
                                  Overview
                                </div>
                                
                                <div className="rightSideModalTitle">
                                  Industry
                                </div>
                                <p className="rightSideModalSub">
                                  {this.props.jobInfo.industry}
                                </p>
                                
                                <div className="rightSideModalTitle">
                                  Gender
                                </div>
                                <p className="rightSideModalSub">
                                  {this.props.jobInfo.gender}
                                </p>
                                
                                <div className="rightSideModalTitle">
                                  Salary
                                </div>
                                <p className="rightSideModalSub">
                                  <i className="rupeeIcon fa fa-inr"></i> {this.props.jobInfo.minSalary} {this.props.jobInfo.minSalPeriod} &nbsp;To &nbsp;<i className="rupeeIcon fa fa-inr"></i> {this.props.jobInfo.maxSalary} {this.props.jobInfo.maxSalPeriod}
                                </p>
                                
                                <div className="rightSideModalTitle">
                                  Job Type
                                </div>
                                <p className="rightSideModalSub">
                                  {this.props.jobInfo.jobType}
                                </p>
                                
                                <div className="rightSideModalTitle">
                                  Funtional Area
                                </div>
                                
                                <p className="rightSideModalSub">
                                  {this.props.jobInfo.functionalArea}
                                </p>
                                
                                <div className="rightSideModalTitle">
                                  Job Role
                                </div>
                                <p className="rightSideModalSub">
                                  {this.props.jobInfo.jobRole}
                                </p>

                                <div className="col-lg-12">
                                  <div className="row">
                                    <img src="/images/2.png" className="rightSideModalImg" alt="not found" />
                                  </div>
                                </div>
                              </div>
                            </div>  
                          </div>
                        </div>  
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="modalbtn" data-dismiss="modal">
                        Close
                      </button> 
                    </div>
                  </div>
                </div>
              </div>
            );
  }
}
