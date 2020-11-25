import React, {Component} from 'react';

import './FunctionalAreawiseJobs.css';

export default class FunctionalAreawiseJobs extends Component{

    constructor(props){
        super(props);
        this.state={
            funJoblist:[{name: "Engineer", count: "1,130"}, {name: "Finance", count: "830"}, {name: "Accounting", count: "1240"}, {name: "Marketing", count: "1254"}, {name: "HR", count: "1460"}]
        }
    }

  render(){
    return(
            <div className="row"> 
                <section className="col-lg-12 AllJobsWrapper">
                    <div className="row">
                        {
                            this.state.funJoblist.length > 0
                            ?
                                this.state.funJoblist.map((elem,index)=>{
                                    return(
                                        <div className="col-lg-3 AllJobsRow">
                                            <div className="col-lg-12 AllJobsBlock">
                                                <div className="AllJobsBlockImg">
                                                  <img src="Images/7.png" alt="FunctionJobsImg" className="FunctionalJobsPng"/>
                                                </div>

                                                <div className="AllJobsBlockName">
                                                    {elem.name}
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
            </div>
        );
    }
}