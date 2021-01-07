import React, {Component} from 'react';

import './IndustrywiseJobs.css';

export default class IndustrywiseJobs extends Component{


  
  
  render(){
    
 
    return(
           
                <section className="col-lg-12 AllJobsWrapper">
                    <div className="row">
                        {
                            this.props.industrialJobs.length > 0
                            ?
                                this.props.industrialJobs.map((elem,index)=>{
                                    console.log("industrialJobselements",elem.industry[0]);
                                    return(
                                        <div className="col-lg-3 AllJobsRow">
                                            <div className="col-lg-12 AllJobsBlock">
                                                <div className="AllJobsBlockImg">
                                                  <img src="images/7.png" alt="FunctionJobsImg" className="FunctionalJobsPng"/>
                                                </div>

                                                <div className="AllJobsBlockName">
                                                    {elem.industry[0].industry}
                                                </div>

                                                <div className="AllJobsBlockNumber">
                                                    {elem.count}
                                                </div>
                                            </div>   
                                        </div>
                                    );
                                })
                            :
                            null
                        }
                    </div>                  
                </section>
            
        );
  }


}