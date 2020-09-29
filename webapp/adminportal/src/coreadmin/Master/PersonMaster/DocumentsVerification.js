import React from 'react';
import OwlCarousel  from 'react-owl-carousel';
import swal from 'sweetalert';
import axios        from 'axios';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './PersonMaster.css';

export default class DocumentsVerification extends React.Component {

  constructor(props) {
  super(props);
    this.state = {
    personInfo  : "",
    remark : "",
    status : "",
    action : "",
    showRemark : false,
         
        };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      personInfo : nextProps.personInfo
      });
  }
   
  componentDidUpdate(prevProps, prevState){
    if(prevState.personInfo!==this.state.personInfo){
      this.setState({
        personInfo:this.state.personInfo,
      });
    }
  }
  componentDidMount(){


  }
  Reject(event){
    var documentName = event.target.getAttribute("data-action");

    var userDetails = {
      "document_id"    : this.state.ID,
      "status"        : "Rejected",
      "remark"        : this.state.remark,
      }
    console.log("========",userDetails);
    axios.patch('/api/personmaster/patch/document',userDetails)
    .then((response)=> {
        console.log("========",response.data);
        swal("Document Rejected");

         this.setState({
          [documentName] : false,
          })
         this.getPersonData(this.state.personInfo._id);
         
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
    axios.patch('/api/personmaster/patch/document',userDetails)
    .then((response)=> {
        console.log("========",response.data);
        swal("Document Approved");
        this.setState({
          [documentName]:false,
        })
         this.getPersonData(this.state.personInfo._id)
      })
      .catch((error)=> {
      console.log(error);
  });

  }
  getPersonData(user_Id)
  {
     axios.get("/api/personmaster/get/one/" + user_Id)
      .then((response) => {

        this.setState({
          personInfo    : response.data,
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

     axios.get("/api/personmaster/get/one/" + this.state.personInfo._id)
      .then((response) => {

        this.setState({
          personInfo    : response.data,
          documents    : response.data.Documentarray,
          [documentName]:false
        },()=>{
          console.log("documents",this.state.documents)
          for (let i=0;i<this.state.documents.length;i++)
          {
            if(this.state.documents[i].documentProof.status == "Rejected"  || this.state.documents[i].documentProof.status == "New" )
            {
              console.log("No All documents are Approved")
              var sendData = {
              "event": "Document Rejected", //Event Name
              "toUser_id": this.state.personInfo.userId, //To user_id(ref:users)
              "toUserRole":"driver",
              "company_id": this.state.personInfo.company_Id, //company_id(ref:entitymaster)
              "otherAdminRole":'corporateadmin',
              "variables": {
                'EmployeeName': this.state.personInfo.firstName + ' ' + this.state.personInfo.lastName,
                'CompanyName': this.state.personInfo.companyName,
               
              }
            }
           
            break;
            }
            else{
              var formValues = {
                personID :  this.state.personInfo._id,
                status : "Active"
              }
                console.log("formValues",formValues)
              axios.patch("/api/personmaster/patch/changeStatus", formValues)
              .then((response) => {
                console.log("response",response)
              })
              .catch((error) => {
                console.log("error",error)
              })
              break;
            }
          }
           console.log('sendData: ',sendData)
            axios.post('/api/masternotifications/post/sendNotification', sendData)
            .then((res) => {
            console.log('sendDataToUser in result==>>>', res.data)
            })
            .catch((error) => { console.log('notification error: ',error)})
         
        });
      })
      .catch((error) => {
        console.log("error",error)
    })
   

  
  }

  render() {
    return (
      <div className="">
       {/* <OwlCarousel
          className="owl-theme docverifications"
          loop
          margin={10}
          nav
          items={1}
        >*/}
        
        {this.state.personInfo ?
        <div className="col-lg-12 noPadding mainDivDV">
          {
          this.state.personInfo.Documentarray.map((image,index)=>{
            return(
                <div className="item col-lg-10 col-lg-offset-1 textAlignCenter heightOfInnerDiv">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 imageContainerDivDV" key={index}>
                    <label className="documentName col-lg-12">{image.documentName}</label>
                     {                      

                      image.documentProof.imgUrl && image.documentProof.imgUrl.length>0? 
                      image.documentProof.imgUrl.map((value,i)=>{
                        return(<img src ={value} className="imagewidheight col-lg-12 noPadding"/>)
                      })
                      :
                       <img src ="/images/Dummyimg.jpg"className="imagewidheight col-lg-12 noPadding"/>
                    }
                    {image.documentProof.status === "New" ? 
                    <div className="col-lg-12">
                        <button type="button" className="btn btn-success col-lg-5 marg10" data-action={image.documentName} id={image._id} onClick={this.approve.bind(this)}>Approve</button>
                        <button type="button" className="btn btn-danger col-lg-5 marg10" data-action={image.documentName} id={image._id}   onClick={this.RejectButton.bind(this)}>Reject</button>
                    </div>
                    :
                    (image.documentProof.status === "Rejected" ?
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
