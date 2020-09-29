import React from 'react';
import OwlCarousel  from 'react-owl-carousel';
import swal from 'sweetalert';
import axios        from 'axios';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../css/ListOfVehicles.css';
import '../css/ListOfEntityFilter.css';
import '../css/ListOfAllEntity.css';

export default class DocumentsVerificationVehicle extends React.Component {

  constructor(props) {
  super(props);
    this.state = {
    vehicleInfo  : "",
    remark : "",
    status : "",
    action : "",
    showRemark : false,
         
        };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      vehicleInfo : nextProps.vehicleInfo
      });
  }
   
  componentDidUpdate(prevProps, prevState){
    if(prevState.vehicleInfo!==this.state.vehicleInfo){
      this.setState({
        vehicleInfo:this.state.vehicleInfo,
      });
    }
  }

  Reject(event){
    var documentName = event.target.getAttribute("data-action");

    var userDetails = {
      "document_id"    : this.state.ID,
      "status"        : "Rejected",
      "remark"        : this.state.remark,
      }
    console.log("========",userDetails);
    axios.patch('/api/vehiclemaster/patch/document',userDetails)
    .then((response)=> {
        swal("Document Rejected");
         this.setState({
          [documentName] : false,
          })
         this.getPersonData(this.state.vehicleInfo._id);
         
      })
      .catch((error)=> {
      console.log(error);
  });
  }
  approve(event){
    var documentName = event.target.getAttribute("data-action");
    var ID = event.target.id;
    console.log("ID",ID,documentName);
    var userDetails = {
      "document_id"    : ID,
      "status"        : "Approved",
      "remark"        : "",
      }
    console.log("========",userDetails);
    axios.patch('/api/vehiclemaster/patch/document',userDetails)
    .then((response)=> {
        console.log("========",response.data);
        swal("Document Apprved");
        this.setState({
          [documentName]:false,
        })
         this.getPersonData(this.state.vehicleInfo._id)
      })
      .catch((error)=> {
      console.log(error);
  });

  }
  getPersonData(id)
  {    
     axios.get("/api/vehiclemaster/get/one/" + id)
      .then((response) => {

        this.setState({
          vehicleInfo    : response.data,
        });
      })
      .catch((error) => {
        console.log("error",error)
    })
  }
  RejectButton(event){
    var documentName = event.target.getAttribute("data-action");
    var ID = event.target.id;
    this.setState({
      [documentName] : true,
      documentName:documentName,
      ID:ID
    })

  }

  handleChange(event){
   const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });
  }  
  save(event){
     swal("Changes Saved");
    var documentName = event.target.getAttribute("data-action");
    var noRejected = false;

     axios.get("/api/vehiclemaster/get/one/" + this.state.vehicleInfo._id)
      .then((response) => {

        this.setState({
          vehicleInfo    : response.data,
          documents    : response.data.vehicleDocument,
          [documentName]:false
        },()=>{
          console.log("documents",this.state.documents)
          for (let i=0;i<this.state.documents.length;i++)
          {
            if(this.state.documents[i].status == "Rejected"  || this.state.documents[i].status == "New" )
            {
              noRejected = false;  
              break;         
            }else{
              noRejected = true;
            }
          }
          console.log("noRejected",noRejected);
          if(noRejected)
          {
            var formValues = {
                vehicleID :  this.state.vehicleInfo._id,
                status : "Active",
                updatedBy:  localStorage.getItem("user_ID")
              }
                console.log("formValues",formValues)
              axios.patch("/api/vehiclemaster/patch/changeStatus", formValues)
              .then((response) => {
                console.log("response",response)
              })
              .catch((error) => {
                console.log("error",error)
              })
          }
           /*console.log('sendData: ',sendData)
            axios.post('/api/masternotifications/post/sendNotification', sendData)
            .then((res) => {
            console.log('sendDataToUser in result==>>>', res.data)
            })
            .catch((error) => { console.log('notification error: ',error)})*/
         
        });
      })
      .catch((error) => {
        console.log("error",error)
    })
   

  
  }

  render() {
    return (
      <div className="">
      
        {this.state.vehicleInfo ?
        <div className="col-lg-12 noPadding mainDivDV">
          {
          this.state.vehicleInfo.vehicleDocument && this.state.vehicleInfo.vehicleDocument.map((image,index)=>{
            return(
                <div className="item col-lg-10 col-lg-offset-1 textAlignCenter heightOfInnerDiv">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 imageContainerDivDV" key={index}>
                    <label className="documentName col-lg-12">{image.documentName}</label>
                     {                      

                      image.vehicleDocImg && image.vehicleDocImg.length>0? 
                      image.vehicleDocImg.map((value,i)=>{
                        if( value!==null )
                        {
                        return(<img src ={value} className="imagewidheight col-lg-12 noPadding"/>)
                        }
                      })
                      :
                       <img src ="/images/Dummyimg.jpg"className="imagewidheight col-lg-12 noPadding"/>
                    }
                    {image.status === "New" ? 
                    <div className="col-lg-12">
                        <button type="button" className="btn btn-success col-lg-5 marg10 mgbt10" data-action={image.documentName} id={image._id} onClick={this.approve.bind(this)}>Approve</button>
                        <button type="button" className="btn btn-danger col-lg-5 marg10" data-action={image.documentName} id={image._id}   onClick={this.RejectButton.bind(this)}>Reject</button>
                    </div>
                    :
                    (image.status === "Rejected" ?
                      <label className="RejectedButton col-lg-12">Document Rejected</label>
                      :
                      <label className="ApprovedButton col-lg-12">Document Approved</label>

                      )
                  }
                  {this.state[image.documentName] ?
                  <div className="col-lg-12 noPadding">
                    <textarea id="w3mission" className="col-lg-12" placeholder="Remark" rows="2" cols="20" ref="remark" id="remark" value={this.state.remark} name="remark"  onChange={this.handleChange.bind(this)}>

                    </textarea>
                    <button type="button" className="btn btn-primary col-lg-5 marg10 pull-right" data-action={image.documentName}  onClick={this.Reject.bind(this)}>Submit</button>
                  </div>
                  :
                  null
                  }
                  </div>
                  
                </div>
              );
            })
          }
          <div className="col-lg-12"> 
            <button type="button" className="btn btn-primary col-lg-2 marg10 pull-right"   data-dismiss="modal" onClick={this.save.bind(this)}>Save</button>

          </div>
        </div>
          :
          null
        }           

        </div>
        );
}
}
