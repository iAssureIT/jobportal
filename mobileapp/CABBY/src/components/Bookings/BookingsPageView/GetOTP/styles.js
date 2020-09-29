import { StyleSheet, Dimensions,Platform } from 'react-native';
import {colors} from '../../../../config/styles.js';
const window = Dimensions.get('window');

export default StyleSheet.create({

  container:{
    backgroundColor: '#eee',
    minHeight:'90%',
    width: window.width,
    justifyContent:"center",
  },  
  pageView:{
   paddingHorizontal:20,
   paddingVertical:20,
   justifyContent:"center",
  },
 modalView:{
    paddingVertical:10,
    paddingHorizontal:10,
    backgroundColor:'#fff', 
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius:10,
  },
   
    linkLightText:{
    color: colors.textLight,
    fontSize: 15,
    fontFamily:"Montserrat-Regular",
  },
    loginTitleTxt:{
    fontSize: 22,
    color:'#333',
    fontFamily:"Montserrat-Bold",
  },
  
  button:{
    width:'50%',
    backgroundColor: colors.button,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50
  },
   buttonText:{
    color: colors.buttonText,
    fontSize: 13,
    fontFamily:"Montserrat-Regular",
  },

  linkText:{
    color: colors.primary,
    fontSize: 15,
    fontFamily:"Montserrat-Regular",
  },
  buttonStyleAccept:{
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor:colors.success,
  },
  buttonStyleReject:{
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor:colors.danger, 
  },
  buttonStyle:{
    width: '60%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor:colors.button, 
    alignSelf:'center',
    paddingVertical:20,
  },
  mainHeader:{
    borderWidth: 0,
    padding: 0,
    alignItems:"center",
    paddingVertical:15
  },
  mainHeaderText:{
    fontSize:25
  },
  subHeaderText:{
    fontSize:25,
    paddingVertical:5
  },
  smallText:{
    fontSize:18,
    paddingVertical:5
  },
  hrLine:{
    borderWidth:0.5
  },
  viewBox:{
    borderWidth: 0,
    padding: 0,
    paddingVertical:15
  },
   overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#3869F6",
        height: 400,
        borderBottomLeftRadius : 20,
        borderBottomRightRadius : 20,
    },
    borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color:"#333"
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
