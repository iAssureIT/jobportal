import { StyleSheet, Dimensions, Platform } from 'react-native';
import {colors,projectName} from '../../../config/styles.js';
export default StyleSheet.create({

    sliderView: {
        borderWidth: 1,
        borderRadius: 30,
        // borderColor: projectName === "pipito" ?  "#510f99" :  "#333",
    },
    sliderViews: {
        borderWidth: 1,
        borderRadius: 30,
        borderColor: projectName === "pipito" ? '#510f99' : '#376bff',
    },
    carborder: {
        borderWidth: 1,
        borderColor:  "#510f99",
    },
    carborders: {
        borderColor: "#999",
    },
    carouselhead: {
        // marginTop: 5,
    },
    carouselpage: {
        flex : 1,
        flexDirection : "row",
        // backgroundColor : "black"
    },
    purposebooking : {
        width : "100%",
        padding : 5,
        height: 50, 
        borderColor: '#bbb', borderWidth: 1,
        borderRadius: 10,
      },
    seatcapacity: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20, textAlign: "center",
        color: '#333',
    },
    carnametxt: {
        fontFamily: "Montserrat-Bold",
        fontSize: 18, textAlign: "center",
        color: projectName === "pipito" ? '#510f99' : '#376bff',
    },
    seat: {
        flex : 0.3,
    },
    carouseldata: {
        flex : 1,
        // marginRight: 0,
    },
    carouseldata1: {
        flex : 0.7,
        // marginRight: 0,
    },
    carouseldata2: {
        flex : 0.7,
        // marginRight: 0,
    },
    txtnote: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },

    carouselpageTitle: {
        flex: 1,
        // textAlign: "center",
        alignItems : 'flex-start',
        borderBottomColor: "#EBEBEB",
        // borderBottomWidth: 2,
        // paddingBottom: 10,
        // marginBottom: 15,
        // padding: 0,
    },
    selectPlan: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        paddingTop: 10, paddingLeft: 0,
    },
    btnimg: {
        fontFamily: "Montserrat-SemiBold",
        // fontSize: 16,
        color: '#fff',
        height : 30,
        textAlign: 'center',
        paddingTop: 2, paddingLeft: 2,
        // flex: 0.3,
        // borderColor : none,
    },
    showcarbtn: {
        width: "55%",
        marginTop: 10,
        borderRadius: 30,
        marginHorizontal: 50,
        height: 40, 
        backgroundColor: projectName === "pipito" ? '#510f99' : '#376bff',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: projectName === "pipito" ? '#510f99' : '#376bff',
        height: 300,
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
    // backgroundColor: '#fff',
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


