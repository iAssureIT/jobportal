import React, { Component } from 'react';

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';

import './PreviewModal.css';

import Axios  from 'axios';
import Swal   from 'sweetalert2';
import Moment from "moment";

export default class PreviewModal extends Component{
  constructor(props){
    super(props);

   /* this.state = {
        jobTitle       :   ""
    }*/

  } 


  /*componentDidMount() {

                        this.setState({
                                        jobTitle      :   response.data.jobsData[0].jobBasicInfo.jobTitle
                                     })

                      }*/


  render() {
    return (
      <div id="robust" className="modal fade" role="dialog">
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="jobPostProfileWrapper container-fluid">
                            <div className="col-lg-9">
                              <div className="col-lg-12 leftSideMain">
                                <div className="row">
                                  <div className="col-lg-12 leftHeader">
                                    <div className="row">
                                      <div className="col-lg-3 leftImgContainer">
                                        <div className="col-lg-12">
                                          {/*<div className="imgbox col-lg-9">
                                            <img src="/images/iAssureIT_Logo.svg" className="companyProfileLogo"  alt="not found"/>
                                          </div>*/}
                                        </div>  
                                      </div>
                                      <div className="col-lg-9 imgContent">
                                        <div className="col-lg-12 contentMain">
                                          <div className="row">
                                            <div className="contentHead">
                                              {this.props.jobTitle}
                                            </div>
                                            <div className="subContentHead">
                                              <b>iAssure International Technologies Pvt Ltd</b>
                                            </div>
                                            <div className="locationinfo">
                                              {this.props.address}
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
                                          <div className="profileheading">
                                            Job Description
                                          </div>
                                          <div className="horizontalRightLine diamondBullet"></div>
                                          <div className="DescriptionContainer col-lg-12">
                                            <div className="profileContent">
                                              <div className="col-lg-12 jobDescContent">
                                                <div dangerouslySetInnerHTML = {{ __html : this.props.jobDesc}} />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-12 contentWrapper2">
                                        <div className="col-lg-12 profileSubContainer">
                                          <div className="profileheading"> 
                                            Required Education & Experience
                                          </div>
                                          <div className="horizontalRightLine diamondBullet"></div>
                                          <div className="DescriptionContainer col-lg-12">
                                            <div className="profileContent">
                                              <ul className="col-lg-12">
                                                <li><span className="eduSubtitle">
                                                  Minimum Education Required</span><br/>
                                                  <span className="eduDuration"> {this.props.minEducation} </span>
                                                </li>
                                                <li>
                                                  <span className="eduSubtitle"> Minimum Overall Experience </span><br/>
                                                  <span className="eduDuration"> {this.props.minExperience} </span>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-12 contentWrapper3">
                                        <div className="col-lg-12 profileSubContainer">
                                          <div className="profileheading"> 
                                            Expected Skills
                                          </div>
                                          <div className="horizontalRightLine diamondBullet"></div>
                                          <div className="DescriptionContainer col-lg-12">
                                            <div className="row">
                                              <div className="profileContent">
                                                <div className="row">
                                                  <ul className="skillsHeadOne">
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
                                                          {this.props.minPrimExp}
                                                        </span>
                                                      </li>
                                                      <p className="skillsList col-lg-5">
                                                        Mathematical aptitude<br/>
                                                        Problem-solving skills<br/>
                                                        Programming languages<br/>
                                                      </p>
                                                    </div>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              <div className="row">
                                                <div className="profileContent">
                                                  <div className="row">
                                                    <ul className="skillsHeadTwo">
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
                                                            {this.props.minSecExp}
                                                          </span>
                                                        </li>
                                                        <p className="skillsList col-lg-5">
                                                          Communication<br/>
                                                          Teamwork<br/>
                                                          Multitasking<br/>
                                                          Attention to detail<br/>
                                                        </p>
                                                      </div>
                                                    </ul>
                                                  </div>  
                                                </div>
                                              </div>    
                                            </div>
                                            <div>
                                              <div className="row">
                                                <div className="profileContent">
                                                  <div className="row">
                                                    <ul className="skillsHeadThree">
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
                                                            {this.props.minOtherExp}
                                                          </span>
                                                        </li>
                                                        <p className="skillsList col-lg-6">
                                                          Computer programming and coding<br/>
                                                          Problem-solving<br/>
                                                          Software Development<br/>
                                                          Object-oriented design<br/>
                                                        </p>
                                                      </div>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              <div className="row">
                                                <div className="profileContent1">
                                                  <div className="row">
                                                    <ul className="skillsHeadFour">
                                                      <div className="row">
                                                        <li className="col-lg-6">
                                                          <span className="skillsTitle">
                                                            Preferred Skills but not mandatory
                                                          </span>
                                                        </li>
                                                        <li className="col-lg-7">
                                                          <span className="skillSubtitle">
                                                          </span><br/>
                                                          <span className="skillDuration"></span>
                                                        </li>
                                                        <p className="skillsList col-lg-5">
                                                          Teamwork<br/>
                                                          Debug your resume<br/>
                                                          Written and verbal communication<br/>
                                                        </p>
                                                      </div>
                                                    </ul>
                                                  </div>
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
                              <div className="col-lg-12 rightSideMain">
                                <div className="row">
                                  {/*<div className="rightSideHeader">
                                    <div className="col-lg-12">
                                      <div className="row">
                                        <img src="/images/6.png" className="mapImg" alt="not found" />
                                      </div>
                                    </div>
                                  </div>*/}
                                </div>
                                <div className="col-lg-12">
                                  <div className="row">
                                    <div className="rightContentHead">
                                      Overview
                                    </div>
                                    
                                    <div className="rightSideTitle">
                                      Industry
                                    </div>
                                    <p className="rightSideSub">
                                      {this.props.industry_id}
                                    </p>
                                    
                                    <div className="rightSideTitle">
                                      Gender
                                    </div>
                                    <p className="rightSideSub">
                                      {this.props.gender}
                                    </p>
                                    
                                    <div className="rightSideTitle">
                                      Salary
                                    </div>
                                    <p className="rightSideSub">
                                      <i className="fa fa-inr"></i> {this.props.minSalary} {this.props.minSalPeriod} To &nbsp;<i className="fa fa-inr"></i> {this.props.maxSalary} {this.props.maxSalPeriod}{/*(Monthly)*/}
                                    </p>
                                    
                                    <div className="rightSideTitle">
                                      Job Type
                                    </div>
                                    <p className="rightSideSub">
                                      {this.props.jobtype_id}
                                    </p>
                                    
                                    <div className="rightSideTitle">
                                      Funtional Area
                                    </div>
                                    
                                    <p className="rightSideSub">
                                      {this.props.functionalarea_id}
                                    </p>
                                    
                                    <div className="rightSideTitle">
                                      Role
                                    </div>
                                    <p className="rightSideSub">
                                      {this.props.role}
                                    </p>

                                    <div className="col-lg-12">
                                      <div className="row">
                                        <img src="/images/2.png" className="rightSideImg" alt="not found" />
                                      </div>
                                    </div>
                                  </div>
                                </div>  
                              </div>
                            </div>  
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-danger" data-dismiss="modal">
                            close
                          </button> 
                        </div>
                      </div>
                    </div>
                  </div>
    );
  }
}
