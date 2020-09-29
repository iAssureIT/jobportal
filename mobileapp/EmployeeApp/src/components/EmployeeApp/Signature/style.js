import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors ,projectName} from '../../../config/styles.js';
const window = Dimensions.get('window');
// const projectName = "pipito";

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
  },
  signature : {
    height : 400,
  },
  addlocbtn : {
    flex : 0.2,
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
    marginTop : 20,
    marginLeft : 80,
  },
  radiobtnlocation : {
    flex :1,
    flexDirection : "row",
    marginTop : 20,
    marginLeft : 30,
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
  carname: {
    fontSize : 28,
    textAlign : "center",
    color : "#fff",
},

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: projectName === "pipito" ?  "#510f99" :  "#3869F6",
    height: 300,
    borderColor : "#fff",
    flex: 1,
    position: 'absolute',
    opacity: 1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
},
    
});

