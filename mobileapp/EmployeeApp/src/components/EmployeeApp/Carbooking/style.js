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
  purposeninstruction : {
    marginBottom:10,
    padding : 5,
  },
  instruction : {
    padding : 5,
  },
  radiobtn : {
    flex :1,
    flexDirection : "row",
    marginTop : 20,
    marginLeft : 80,
  },
  purposebooking : {
    height: 40, 
    borderColor: '#bbb', borderWidth: 1,
    borderRadius: 10,
  },
  sliderView: {
    borderWidth: 1,
    borderRadius: 30,
  },
  headpageimg : {
    borderColor : "#3869F6",
    marginTop : 30,
  },
  carname: {
    fontSize : 28,
    textAlign : "center",
    color : "#fff",
},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: projectName === "pipito" ?  "#510f99" :  "#3869F6",
    height: 400,
    borderColor : "#fff",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
},
  empidtxt : {
    flex : 1,
    borderColor: "#666",
    borderWidth: 1,
    marginBottom : 20,
  },
  checkbtn: {
    flex: 0.2,
  },
  checkother: {
    flex: 1,
    flexDirection : "row",
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
 
employeename : {
  paddingBottom : 20,
  borderColor : "#333",
  // borderWidth : 1,
  // paddingBottom : 20,
  // alignSelf:"center",
    
  },
  dateText:{
    fontSize:50,
    color: '#3869F6',
    fontFamily:'Montserrat-SemiBold',
    alignSelf:"center",
    
  },

checkidbtn: {
  // marginTop : 10,
  borderRadius: 30,
  color : "#fff",
  height : 40,
  backgroundColor: projectName === "pipito" ?  "#510f99" :  "#283593",
},
txtaddbtn: {
  textAlign : "center",
  color : "#fff",
  paddingTop : 10
  
},
dayText:{
  fontSize:20,
  color: '#333333',
  fontFamily:'Montserrat-SemiBold',
  alignItems : "flex-start"
},
  
  borderdate : {
    // flex: 0.48, 
    width: "47%",
    borderRadius : 10,
    borderColor: "#eee",
    borderWidth: 3, height:170,
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
btnimg: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 2,
    paddingLeft: 2,
    flex: 0.5,
    // borderColor : none,
},
checkbtn: {
  padding : 15,
    flex: 0.3,
    // borderColor : none,
},
showcarbtn: {
    width: "60%",
    marginTop: 45,
    borderRadius: 30,
    marginHorizontal: 70,
    height: 40, marginBottom: 10,
    backgroundColor: projectName === "pipito" ?  "#510f99" :  "#283593",
},
nonactivecarbtn: {
    width: "60%",
    marginTop: 45,
    borderRadius: 30,
    marginHorizontal: 70,
    height: 40, marginBottom: 10,
    backgroundColor: projectName === "pipito" ?  "#999" :  "#283593",
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
  textStyle:{
    fontFamily:"Montserrat-Regular",
    backgroundColor:'transparent',
    // paddingTop:0,
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
  formInputView : {
    // borderColor: colors.black,
    marginTop : 10,
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 30,
  },
  textInputContainer:{
    backgroundColor:'transparent',
    // left:5,
    // fontFamily:"Montserrat-Regular",
    borderBottomColor: "transparent"
  },
  
});

