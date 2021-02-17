import React, {Component} from 'react';

import './SubFunctionalAreawiseJobs.css';

export default class SubFunctionalJoblist extends Component{

    constructor(props){
        super(props);
        this.state={
            subFunJoblist:[{name: "Software Engineer", count:"335"}, {name: "Chemical Engineer", count:"45"}, {name: "Civil Engineer", count: "64"}, {name: "Electrical Engineer", count: "87"}, {name: "Mechanical Engineer", count: "64"}]
        }
    }
 
  render(){

    return(
        <section className="col-lg-9 FunctionalJobsWrapper">
            <div className="row">
                {
                    this.state.subFunJoblist.length > 0
                    ?
                        this.state.subFunJoblist.map((elem,index)=>{
                            return(
                                <div className="col-lg-3 FunctionalJobsRow">
                                    <div className="col-lg-12 FunctionalJobsBlock">
                                        <div className="FunctionalJobsBlockImg">
                                          <img src="/images/7.png" alt="FunctionJobsImg" className="FunctionalJobsPng"/>
                                        </div>

                                        <div className="FunctionalJobsBlockName">
                                            {elem.name}
                                        </div>

                                        <div className="FunctionalJobsBlockNumber">
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