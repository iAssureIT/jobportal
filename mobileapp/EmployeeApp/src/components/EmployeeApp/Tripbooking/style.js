import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors,projectName} from '../../../config/styles.js';

const window = Dimensions.get('window');

export default StyleSheet.create({
  amenitiesWrapper : {
    // backgroundColor: "#ff0",
  },
  Headercontainer:{
    backgroundColor:colors.button,
    padding:0,
    margin:0,
    paddingTop:0,
    marginTop:0,
    height: 150 ,
    borderBottomRightRadius : 40,
    borderBottomLeftRadius : 40,
    elevation: 2
  },
  marginBottom20 : {
    marginBottom:20,
  },
  marginTop20 : {
    marginTop:20,
  },
  purposeninstruction : {
    
    padding : 2,
  },
  addlocation : {
    flex : 1,
    flexDirection : "row",
    padding : 2,
    marginTop:10,

  },
  addloc : {
    // marginBottom:10,
    flex : 0.8,
  },
  addlocbtn : {
    flex : 0.3  ,
    padding : 5,
  },
  addstopline : {
    flex : 0.8,
  },
  addstopbtn : {
    flex : 0.2,
  },
  addstoplinebtn : {
    flex : 1,
    flexDirection : "row"
  },
  instruction : {
    padding : 5,
  },
  radiobtn : {
    flex :1,
    flexDirection : "row",
    // marginTop : 20,
    marginLeft : 80,
  },
  radiobtnlocation : {
    flex :1,
    flexDirection : "row",
    marginTop : 5,
    marginLeft : 30,
  },
  purposebooking : {
    height: 40, 
    borderColor: '#bbb', borderWidth: 1,
    borderRadius: 10,
  },
  carshows : {
    alignContent : "center"
    
  },
  sliderView: {
    borderWidth: 1,
    borderRadius: 30,
  },
  showaddedloc: {
    
  },
  scrolltime: {
    position : "absolute",
    opacity: 100,
    zIndex : 300,
  },
  headpageimg : {
    borderColor : "#3869F6",
    marginTop : 10,
  },
  carname: {
    fontSize : 28,
    textAlign : "center",
    color : "#fff",
},
bookingtxt: {
    fontSize:16,
    color: '#333333',
    fontFamily:'Montserrat-SemiBold',
},
selectcartxt: {
  marginTop : 20,
  padding:10,
    fontSize:16,
    color: '#333333',
    fontFamily:'Montserrat-SemiBold',
},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "#3869F6",
    backgroundColor: projectName === "pipito" ?  "#510f99" :  "#3869F6",
    height: 300,
    borderColor : "#fff",
    flex: 1,
    position: 'absolute',
    opacity: 1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
},
  formInputView : {
    // borderColor: colors.black,
    marginTop : 10,
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 30,
  },
  midcircle : {
    width: "6%",
    // flex: 0.1
  },
  empdet : {
    flex: 1,
    flexDirection : "row",
    padding : 5,
  },
  empname : {
    flex: 0.5,
    // padding : 5,
  },
  circlecar : {
    paddingTop:50,  zIndex: 1,
  },
  carimg : {
  height: 60,
    width: "100%",opacity:1,  zIndex: 1,
  },
 
  datetimeText : {
  borderBottomColor : colors.black,
  borderBottomWidth : 1,
  paddingBottom : 0,
    
  },
  dateText:{
    fontSize:20,
    color: '#3869F6',
    fontFamily:'Montserrat-SemiBold',
    alignSelf:"center",
  },
  
  dayText:{
    fontSize:16,
    color: '#333333',
    fontFamily:'Montserrat-SemiBold',
    alignSelf:"center",
  },
  bookingempname:{
    flex: 1,
    flexDirection : "row",
  },
  txtnameemp:{
    flex: 0.5,
  },
  txtempid:{
    flex: 0.5,
  },
  otheremp:{
    flex: 0.8,
  },
  otherempbtn:{
    flex: 0.2,
  },
  other:{
    flex: 1,
    flexDirection : "row",
  },
  carouseldata:{
    flex: 1,
    marginRight: 30,
    paddingHorizontal: 0,
  },
  timeText:{
    fontSize:14,
    color: '#333333',
    fontFamily:'Montserrat-SemiBold',
    alignSelf:"center", 
    paddingTop: 10,
  },
  monthText:{
    fontSize:16,
    color: '#6D6D6D',
    fontFamily:'Montserrat-SemiBold',
    alignSelf:"center",
    marginTop : 10,
    marginBottom : 10,
  },
  
  borderdate : {
    // flex: 0.48, 
    width: "47%",
    borderRadius : 10,
    borderColor: "#eee",
    borderWidth: 3, 
    height:90,
    zIndex: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    
  },
  selectPlan: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    color: '#fff',
    paddingTop: 8,
},
startselect: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    color: '#333',
    paddingHorizontal : 20,
    paddingTop: 48,
},
selecttime: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    color: '#333',
    paddingTop: 18,

},
locationbox: {
    fontFamily: "Montserrat-SemiBold",
    marginBottom : 20,
    // padding: 20,

},
btnimg: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 2,
    paddingLeft: 2,
    flex: 0.5,
},
showcarbtn: {
    width: "60%",
    marginTop: 45,
    borderRadius: 30,
    marginHorizontal: 70,
    height: 40, marginBottom: 10,
    backgroundColor: "#283593",
    backgroundColor: projectName === "pipito" ? '#510f99' : '#376bff',
},
okshowcarbtn: {
    width: "60%",
    marginTop: 45,
    borderRadius: 30,
    marginHorizontal: 50,
    height: 40, marginBottom: 10,
    backgroundColor: "#283593",
    backgroundColor: projectName === "pipito" ? '#510f99' : '#376bff',
},
addbtnshow: {
    borderRadius: 30,
    color : "#fff",
    height : 30,
    marginTop : 10,
    backgroundColor: projectName === "pipito" ? '#510f99' : '#376bff',
},
txtaddbtn: {
    textAlign : "center",
    color : "#fff",
    paddingTop : 5,
},
txtotherbtn: {
    textAlign : "center",
    color : "#283593",
    fontSize : 16,
},
closebtn: {
    
    paddingTop : 8
    
},
  button:{
    width:'100%',
    backgroundColor: colors.button,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius:50,

  },
  buttonText:{
    color: colors.buttonText,
    fontFamily:"Montserrat-Regular",
  },
  tripbutton:{
    marginBottom : 15,
    flex : 1,
    flexDirection : "row",
    // marginHorizontal : 80,
  },
  roundtripbtn:{
    width:'50%',
    backgroundColor: '#283593',
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius:50
  },
  cardstyle:{
    // width:'50%',
    // backgroundColor: '#283593',
    height: 340,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius:50
  },
  btntitile:{
    color : "#fff",
    alignSelf: 'center',
    justifyContent: 'center',
    
  },
  textStyle:{
    fontFamily:"Montserrat-Regular",
    backgroundColor:'transparent',
    paddingTop:0,
    marginTop:-6,
    left:10,
  },
  
  textLabel:{
    backgroundColor:'#fff',
    fontFamily:"Montserrat-Regular",
    top:-7,
    left:10,
    paddingHorizontal:2,
  },
  textContainer:{
    height:'auto',
    // padding : 1,
    paddingLeft:10
  },
  textInputContainer:{
    backgroundColor:'transparent',
    paddingRight : 25,
    // fontFamily:"Montserrat-Regular",
    borderBottomColor: "transparent"
  },
  // viewmore:{
  //   width: "80%", flexWrap: 'wrap'
  // },
  textStyle:{
    fontFamily:"Montserrat-Regular",
    backgroundColor:'transparent',
    // paddingTop:0,
    // marginTop:-6,
    left:10,
  },
  inputWrapper : {
    flex  : 1,
    // flexWrap: 'wrap',
    borderColor:'#666',
    borderWidth:1,
    borderRadius: 50,
  },
  // ===Textare ===?
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 80,
    padding: 5,
    backgroundColor: '#fff',
    borderColor : "#bbb",
    borderWidth : 1,
    borderRadius: 10,
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 70,
    fontSize: 14,
    color: '#333',
  },
});

