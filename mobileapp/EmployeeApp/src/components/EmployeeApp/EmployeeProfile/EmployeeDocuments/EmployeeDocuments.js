import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image, TextInput,
  Platform,
  Alert,
} from 'react-native';
import { Button, Icon }             from "react-native-elements";
import CheckBox                     from 'react-native-check-box'
import { KeyboardAwareScrollView }  from 'react-native-keyboard-aware-scroll-view';
import axios                        from "axios";
import styles                       from './styles.js';
import { colors, sizes }            from '../../../../config/styles.js';
// import HeaderBar                    from '../../../layouts/Header/Header.js';
import { Fumi }                     from 'react-native-textinput-effects';
import FontAwesomeIcon              from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons       from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadPic                    from '../UploadPic/UploadPic.js';
import Dialog                       from "react-native-dialog";
import AsyncStorage                 from '@react-native-community/async-storage';
import ValidationComponent          from "react-native-form-validator";
import Loading                      from '../../../../layouts/Loading/Loading.js';
import moment                       from 'moment';
import RadioForm, 
      {RadioButton, 
      RadioButtonInput, 
      RadioButtonLabel}                       from 'react-native-simple-radio-button';
import ImagePicker                            from 'react-native-image-crop-picker';
import { RNCamera }                           from 'react-native-camera';
import { request,check,PERMISSIONS,RESULTS }  from 'react-native-permissions';
import { RNS3 }                               from 'react-native-aws3';
import DateTimePickerModal                    from "react-native-modal-datetime-picker";
import { connect }                            from 'react-redux';
import Modal                                  from "react-native-modal";

const window = Dimensions.get('window');

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

class EmployeeDocuments extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputFocusColor         : colors.textLight,
      value                   : 0,
      drivingLicenceNo        : '',
      drivingLicenceValidity  : "",
      adhaarCardNo            : "",
      openModal               : false,
      licenseProof            : [],
      aadharProof             : [],
      identityProof           : [],
      profilePhoto            : "",
      openCameraModal         : false ,
      user_id                 : "", 
      openAlertModal               : false,   
      dialogVisible           : false,
      imgPath                 : "",
      index                   : -1 ,            
    }
    
  }

    componentDidMount(){
    this.getUserData();
    this.getS3config();
  }


  UNSAFE_componentWillReceiveProps(nextProps){
    this.getUserData();
    this.getS3config();
  }
  getUserData(){
    AsyncStorage.getItem('user_id')
    .then((userId)=>{  
        this.setState({
          drivingLicenceNo        : this.props.drivingLicenceNo,
          drivingLicenceValidity  : this.props.drivingLicenceValidity,
          adhaarCardNo            : this.props.adhaarCardNo,
          licenseProof            : this.props.licenseProof,
          aadharProof             : this.props.aadharProof,
          identityProof           : this.props.identityProof,
          user_id                 : userId,
        })
    })
  }


  getS3config(){
    axios
      .get('/api/projectsettings/get/S3')
      .then((response)=>{
        // console.log("s3_response.............",response);
        const config = {
                          bucket              : response.data.bucket,
                          keyPrefix           : 'DriverDocuments',
                          region              : response.data.region,
                          accessKey           : response.data.key,
                          secretKey           : response.data.secret,
                          successActionStatus : 201
                       };
        this.setState({
          config : config
        })
      })
     .catch((error)=>{
              console.log(error);
        });
  }


   validInput = () => {
    const {
      drivingLicenceNo,
      drivingLicenceValidity,
      adhaarCardNo,
    } = this.state;
    let valid = true;
    this.validate({
      drivingLicenceNo: {
        required: true,
        regxLicenseNumber: true,
      },
      drivingLicenceValidity: {
        required: true,
      },
      adhaarCardNo: {
        required: true,
        regxAadharNumber: true,
      }
    });

    if (this.isFieldInError("drivingLicenceNo")) {
      let drivingLicenceNoError = this.getErrorsInField("drivingLicenceNo");
      this.setState({ drivingLicenceNoError });
      valid = false;
    } else {
      this.setState({ drivingLicenceNoError: "" });
      valid = true;
    }
    if (this.isFieldInError("drivingLicenceNo")) {
      this.setState({ drivingLicenceValidityError: this.getErrorsInField("drivingLicenceValidity") });
      valid = false;
    } else {
      this.setState({ drivingLicenceValidityError: "" });
      valid = true;
    }
    if (this.isFieldInError("adhaarCardNo")) {
      this.setState({ adhaarCardNoError: this.getErrorsInField("adhaarCardNo") });
      valid = false;
    } else {
      this.setState({ adhaarCardNoError: "" });
      valid = true;
    }

    return ((!this.isFieldInError("drivingLicenceNo")) && (!this.isFieldInError("drivingLicenceNo")) && (!this.isFieldInError("adhaarCardNo")));
  };

    validInputField = (stateName, stateErr) => {
    const {
      drivingLicenceNo,
      drivingLicenceValidity,
      adhaarCardNo,
    } = this.state;
    let valid = true;

    this.validate({
      [stateName]: {
        required: true,
      },
    });

    if (this.isFieldInError(stateName)) {
      let validinptError = this.getErrorsInField(stateName);
      this.setState({ validinptError });
      valid = false;
    } else {
      this.setState({ [stateErr]: "" });
    }

    return valid;
  };

    displayValidationError = (errorField) => {
    let error = null;
    if (this.state[errorField]) {
      error = <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{this.state[errorField][0]}</Text>
      </View>;
    }
    return error;
  }


  handleCancel = () => {
    this.setState({
     openModal  : false,
     openCameraModal: false,
     isLoading:false,
     dialogVisible:false,
   });
  };

  openModal(){
    this.setState({
     openModal      : true,
   });
  };



  handleSubmitProfileEdit(){
    if(this.validInput()){
      var userDetails = {
          licenseNo       : this.state.drivingLicenceNo,
          effectiveTo     : this.state.drivingLicenceValidity,
          licenseProof    : this.state.licenseProof,
          aadharNo        : this.state.adhaarCardNo,
          aadharProof     : this.state.aadharProof,
          identityProof   : this.state.identityProof,
          userId          : this.state.user_id,
        }
    this.props.employeeDocuments(userDetails);
    axios.post('/api/personmaster/post/documentsInfo', userDetails)
    .then((response) => {
      if(response.data.updated === true){
        this.setState({openAlertModal:true})
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
    }
  }


takePicture = async function(camera) {
    console.log("Inside takePicture");
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    if(data.uri){
      const file = {
        uri  : data.uri,
        name : data.uri.split('/').pop().split('#')[0].split('?')[0],
        type : 'image/jpeg',
      }
      if(file) {
        var fileName = data.uri; 
        var ext = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2); 
        console.log("ext=>",ext);
        if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){  
          if (file) {
            this.setState({isLoading:true})
            RNS3
            .put(file,this.state.config)
            .then((Data)=>{
                this.setState({
                  [this.state.imageType] : [Data.body.postResponse.location],
                  isLoading        : false,
                  openCameraModal  : false,
                  openModal        : false,
                })
            })
            .catch((error)=>{
              this.setState({isLoading:false});
              console.log("error=>",error);
            });
          }else{       
            this.setState({isLoading:false})
            Alert.alert("File not uploaded","Something went wrong","error");  
          }
        }else{
          this.setState({isLoading:false})
          Alert.alert("Please upload file","Only Upload  images format (jpg,png,jpeg)");   
        }
      }
    }
  };


   handleChoosePhoto = () => {
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available (on this device / in this context)');
          break;

        case RESULTS.DENIED:
          console.log('The permission has not been requested / is denied but requestable');
          break;

        case RESULTS.GRANTED:
        ImagePicker.openPicker({
              multiple: true,
              waitAnimationEnd: false,
              includeExif: true,
              forceJpg: true,
            }).then(response => {
              for (var i = 0; i<response.length; i++) {
                if(response[i].path){
                  const file = {
                    uri  : response[i].path,
                    name : response[i].path.split('/').pop().split('#')[0].split('?')[0],
                    type : 'image/jpeg',
                  }
                  if(file) {
                    var fileName = file.name; 
                    var ext = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2); 
                    if(ext=="jpg" || ext=="png" || ext=="jpeg" || ext=="JPG" || ext=="PNG" || ext=="JPEG"){  
                      if(file) {
                        console.log("inside");
                        this.setState({isLoading:true})
                        RNS3
                        .put(file,this.state.config)
                        .then((Data)=>{
                          if(this.state.imageType === "licenseProof"){
                            var proofTypeArray = this.state.licenseProof;
                            proofTypeArray.push(Data.body.postResponse.location);
                            this.setState({
                              "licenseProof" : proofTypeArray,
                            })
                          }else if(this.state.imageType === "aadharProof"){
                            var proofTypeArray = this.state.aadharProof;
                            proofTypeArray.push(Data.body.postResponse.location);
                            this.setState({
                              "aadharProof" : proofTypeArray,
                            })
                          }else if(this.state.imageType === "identityProof"){
                            var proofTypeArray = this.state.identityProof;
                            proofTypeArray.push(Data.body.postResponse.location);
                            this.setState({
                              "identityProof" : proofTypeArray,
                            })
                          } 
                          this.setState({
                            isLoading        : false,
                            openCameraModal  : false,
                            openModal        : false,
                          })
                        })
                        .catch((error)=>{
                          console.log("error=>",error);
                              this.setState({isLoading:false});
                              if(error.message === "Request failed with status code 401"){
                                Alert.alert("Your session is expired!"," Please login again.");
                                AsyncStorage.removeItem('fullName');
                                AsyncStorage.removeItem('token');
                                this.navigateScreen('MobileScreen');                                        
                              }else{
                                 this.setState({openModal1:true})
                              }
                        });
                      }else{       
                        this.setState({isLoading:false})
                        Alert.alert("File not uploaded","Something went wrong","error");  
                      }
                    }else{
                      this.setState({isLoading:false})
                      Alert.alert("Please upload file","Only Upload  images format (jpg,png,jpeg)");   
                    }
                  }
                }
              }  
          });
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
        }
    })
    .catch(error => {
      console.log("error=>",error);
    });    
  }


  showDatePicker(){
    this.setState({
      "isDatePickerVisible" : true
    })
  };
 
  hideDatePicker(){
    this.setState({
      "isDatePickerVisible" : false
    });
  }
 


  openModal(){
    console.log("Inside")
    this.setState({
     openCameraModal      : true,
   });
  };

   deleteimageWS = async () => {
      var index       = this.state.index;
      var filePath    = this.state.imgPath;
      var array       = [];

      if(this.state.imageType === "licenseProof"){
       array       = this.state.licenseProof;
      }else if(this.state.imageType === "aadharProof"){
       array       = this.state.aadharProof;
      }else{
       array       = this.state.identityProof;
      }

      array.splice(index, 1);
      this.setState({
        [this.state.imageType]  : array,
        dialogVisible : false
      });
  }

  render() {
    return (
      <React.Fragment>
        <ScrollView contentContainerStyle={styles.container} >
          <ImageBackground source={{}}  style={{width: window.width}} resizeMode="cover" >
          {
            <KeyboardAwareScrollView enabled>
              <View style={styles.pageView}>
                <View style={styles.modalView}>
                  <View style={{paddingHorizontal:15}}>
                    <View style={{flexDirection:'row'}}>  
                      <View style={[styles.formInputDocViewLeft, styles.marginBottom20]}>
                        <Fumi
                          label           ={'Driving Licence No.'}
                          onChangeText    ={(drivingLicenceNo) => { this.setState({ drivingLicenceNo }, () => { this.validInputField('drivingLicenceNo', 'drivingLicenceNoError'); }) }}
                          value           ={this.state.drivingLicenceNo}
                          keyboardType    ="default"
                          autoCapitalize  ='none'
                          iconClass       ={FontAwesomeIcon}
                          iconName        ={'id-card'}
                          iconColor       ={colors.inputText}
                          iconSize        ={20}
                          iconWidth       ={40}
                          inputPadding    ={16}
                          style           ={{borderWidth:1,borderColor:"#f1f1f1"}}
                          autoCapitalize  ={"words"}
                        />
                        {this.displayValidationError('drivingLicenceNoError')}
                      </View>
                       <TouchableOpacity style={styles.formInputDocViewRight} onPress={()=>this.setState({openModal:true,imageType:'licenseProof'})}>
                        <Icon name='upload' size={20} color={'#333'} type='font-awesome'/>
                      </TouchableOpacity>
                    </View> 
                    <View style={{flexDirection:"row",flexWrap:'wrap'}}>
                      {this.state.licenseProof && this.state.licenseProof.length > 0 ?
                        this.state.licenseProof.map((item,index)=>{
                          return(
                            <View key={index} style={[{width:'50%',flexDirection:'row',},(index%2==0?{paddingRight:5}:{paddingLeft:5})]}>
                              <ImageBackground
                                style={styles.proofImage}
                                source={{uri: item}}
                              >
                              <View style={{alignItems:'flex-end'}}>
                                <Icon size={25} name='close' type='font-awesome' color='#f00' iconStyle={styles.crossIcon} onPress = {()=>this.setState({dialogVisible:true,imgPath:item,imageType:"licenseProof",index:index})} />
                              </View>
                              </ImageBackground>
                            </View>  
                          )
                        })
                        :
                        []
                      }
                    </View>
                  </View>  
                  
                  <TouchableOpacity style={[styles.formInputView, styles.marginBottom20]} onPress={()=>this.setState({isDatePickerVisible:true})}>
                    <Fumi
                      label           ={'Driving Licence Validity'}
                      onChangeText    ={(drivingLicenceValidity) => {this.setState({drivingLicenceValidity}, () => { this.validInputField('drivingLicenceValidity', 'drivingLicenceValidityError'); }) }}
                      value           ={this.state.drivingLicenceValidity!==""? moment(this.state.drivingLicenceValidity).format('L'):""}
                      keyboardType    ="numeric"
                      autoCapitalize  ='none'
                      iconClass       ={FontAwesomeIcon}
                      iconName        ={'id-card'}
                      iconColor       ={colors.inputText}
                      iconSize        ={20}
                      iconWidth       ={40}
                      inputPadding    ={16}
                      style           ={{borderWidth:1,borderColor:"#f1f1f1"}}
                      editable        ={false}
                    />
                    {this.displayValidationError('drivingLicenceValidityError')}
                  </TouchableOpacity>

                  <View style={{paddingHorizontal:15}}>
                    <View style={{flexDirection:'row'}}>  
                      <View style={[styles.formInputDocViewLeft, styles.marginBottom20]}>
                        <Fumi
                          label           ={'Aadhaar Card No'}
                          onChangeText    ={(adhaarCardNo) => { this.setState({ adhaarCardNo }, () => { this.validInputField('adhaarCardNo', 'adhaarCardNoError'); }) }}
                          value           ={this.state.adhaarCardNo}
                          keyboardType    ="numeric"
                          autoCapitalize  ='none'
                          iconClass       ={FontAwesomeIcon}
                          iconName        ={'id-card'}
                          iconColor       ={colors.inputText}
                          iconSize        ={20}
                          iconWidth       ={40}
                          inputPadding    ={16}
                          style           ={{borderWidth:1,borderColor:"#f1f1f1"}}
                        />
                        {this.displayValidationError('adhaarCardNoError')}
                        </View>
                       <TouchableOpacity style={styles.formInputDocViewRight} onPress={()=>this.setState({openModal:true,imageType:'aadharProof'})}>
                        <Icon name='upload' size={20} color={'#333'} type='font-awesome'/>
                      </TouchableOpacity>
                    </View>    
                    <View style={{flexDirection:"row",flexWrap:'wrap'}}>
                      {this.state.aadharProof && this.state.aadharProof.length > 0 ?
                        this.state.aadharProof.map((item,index)=>{
                          return(
                            <View key={index} style={[{width:'50%',flexDirection:'row',},(index%2==0?{paddingRight:5}:{paddingLeft:5})]}>
                              <ImageBackground
                                style={styles.proofImage}
                                source={{uri: item}}
                              >
                              <View style={{alignItems:'flex-end'}}>
                                <Icon size={25} name='close' type='font-awesome' color='#f00' iconStyle={styles.crossIcon} onPress = {()=>this.setState({dialogVisible:true,imgPath:item,imageType:"aadharProof",index:index})} />
                              </View>
                              </ImageBackground>
                            </View>  
                          )
                        })
                        :
                        []
                      }
                    </View>
                  </View>

                  <View style={{paddingHorizontal:15}}>
                    <View style={{flexDirection:'row'}}>
                      <View style={[styles.formInputDocViewLeft, styles.marginBottom20,{justifyContent:"center"}]}>
                        <Text style={{fontWeight:'bold',color:"#666",fontSize:16}}>Identity Proof</Text>
                      </View>
                      <TouchableOpacity style={[styles.formInputDocViewRight,{borderWidth:0}]} onPress={()=>this.setState({openModal:true,imageType:'identityProof'})}>
                        <Icon name='upload' size={20} color={'#333'} type='font-awesome'/>
                      </TouchableOpacity>
                    </View>

                     <View style={{flexDirection:"row",flexWrap:'wrap',marginBottom:15,paddingVertical:10}}>
                      {this.state.identityProof && this.state.identityProof.length > 0 ?
                        this.state.identityProof.map((item,index)=>{
                          return(
                            <View key={index} style={[{width:'50%',flexDirection:'row'},(index%2==0?{paddingRight:5}:{paddingLeft:5})]}>
                              <ImageBackground
                                style={styles.proofImage}
                                source={{uri: item}}
                              >
                              <View style={{alignItems:'flex-end'}}>
                                <Icon size={25} name='close' type='font-awesome' color='#f00' iconStyle={styles.crossIcon} onPress = {()=>this.setState({dialogVisible:true,imgPath:item,imageType:"identityProof",index:index})} />
                              </View>
                              </ImageBackground>
                            </View>  
                          )
                        })
                        :
                        []
                      }
                    </View>   
                  </View>

                  {
                    this.state.btnLoading
                      ?
                      <Button
                        titleStyle={styles.buttonText}
                        title="Processing"
                        loading
                        buttonStyle={styles.button}
                        containerStyle={styles.buttonContainer}
                      />
                      :
                      <Button
                        onPress={this.handleSubmitProfileEdit.bind(this)}
                        titleStyle={styles.buttonText}
                        title="Save"
                        buttonStyle={styles.button}
                        containerStyle={styles.buttonContainer}
                      />
                  }
                </View>
              </View>
            </KeyboardAwareScrollView>  

              // :
              // <Loading />
          }   
          </ImageBackground>
          <Dialog.Container visible={this.state.openModal}>
            <View style={{flexDirection:"row"}}>           
              <TouchableOpacity style={styles.block1} onPress={this.handleChoosePhoto}>
                <Icon name="upload" type="font-awesome" size={50}  color="#aaa" style={{}} />
              </TouchableOpacity>
              <View style={{flex:0.1}}>
              </View>
              <TouchableOpacity style={styles.block2} onPress={()=>this.setState({openCameraModal:true})}>
                <Icon name="camera" type="material-community" size={50}  color="#aaa" style={{}} />
              </TouchableOpacity>
          </View>  
            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          </Dialog.Container>
          <Dialog.Container visible={this.state.openCameraModal}>
            {!this.state.isLoading ?
            <RNCamera
              style       = {styles.preview}
              type        = {RNCamera.Constants.Type.back}
              flashMode   = {RNCamera.Constants.FlashMode.on}
              captureAudio= {false}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              type        = 'rear'
              mirrorImage = {false}
            >
              {({ camera, status, recordAudioPermissionStatus }) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                      <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </RNCamera>
            :
            <View style = {styles.preview}>
              <Loading />
            </View>  
          }
            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          </Dialog.Container>  
           <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            onConfirm={(date)=>this.setState({"drivingLicenceValidity":date,"isDatePickerVisible":false})}
            onCancel={this.hideDatePicker}
          />
        </ScrollView>
         <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Description>
            Once deleted, you will not be able to recover this Image!
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Delete" onPress={this.deleteimageWS}/>
        </Dialog.Container>
        <Modal isVisible={this.state.openAlertModal}
          onBackdropPress={() => this.setState({ openAlertModal: false })}
          coverScreen={true}
          hideModalContentWhileAnimating={true}
          style={{ paddingHorizontal: '5%', zIndex: 999 }}
          animationOutTiming={500}>
          <View style={{ backgroundColor: "#fff",borderWidth:1,borderColor:"#eee", alignItems: 'center', borderRadius: 20, paddingVertical: 30, paddingHorizontal: 10 }}>
            <View style={{ justifyContent: 'center', backgroundColor: "#34be34", width: 50, height: 50, borderRadius: 25, overflow: 'hidden' }}>
              <Icon size={28} name='check' type='fontAwesome5' color='#fff' style={{}} />
            </View>
            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 15, textAlign: 'center',paddingVertical:20 }}>
              Your information updated successfully!
            </Text>
            <View style={{ borderBottomRightRadius: 500, marginTop: 15, flexDirection: 'row' }}>
              <Button
                onPress={() => this.setState({ openAlertModal: false })}
                titleStyle={styles.buttonText}
                title="OK"
                buttonStyle={{ width: '100%', height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
                containerStyle={styles.buttonContainer}
              />
            </View>
          </View>
        </Modal>
      </React.Fragment>
    );

  }
}

EmployeeDocuments.defaultProps = {
  messages: {
    en: {
      numbers: 'This field must be a number.',
      email: 'Enter a valid email address',
      required: 'This field is required.',
      letters: 'It should only contain letters.',
      mobileNo: 'Enter a valid mobile number.',
      lettersOrEmpty: 'It should only contain letters.',
      minlength: 'Length should be greater than 5',
      regxLicenseNumber: 'Enter correct license number',
      regxAadharNumber: 'Enter correct adhaar number',
    }
  },

  rules: {
    numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
    email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$|^$/,
    required: /\S+/,
    letters: /^[a-zA-Z ]+$/,
    lettersOrEmpty: /^[a-zA-Z ]+$|^$/,
    regxLicenseNumber :/^[a-zA-Z]{2}[0-9]{13}$/,
    regxAadharNumber :/^[0-9]{12}$/,
    minlength(length, value) {
      if (length === void (0)) {
        throw 'ERROR: It is not a valid length, checkout your minlength settings.';
      } else if (value.length > length) {
        return true;
      }
      return false;
    },
  },
}

const mapStateToProps = (state)=>{
  return {
      drivingLicenceNo        : state.drivingLicenceNo,
      drivingLicenceValidity  : state.drivingLicenceValidity,
      adhaarCardNo            : state.adhaarCardNo,
      licenseProof            : state.licenseProof,
      aadharProof             : state.aadharProof,
      identityProof           : state.identityProof,
  }
};
const mapDispatchToProps = (dispatch)=>{
  return {
      employeeDocuments  : (employeeDocumentsValues)=> dispatch({type: "EMPLOYEE_DOCUMENTS",
                            employeeDocumentsValues       : employeeDocumentsValues,
                  }),
      
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeDocuments);
