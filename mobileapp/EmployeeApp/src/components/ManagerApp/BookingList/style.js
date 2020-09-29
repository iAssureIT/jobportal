import { StyleSheet, Dimensions, Platform } from 'react-native';
import {colors,projectName} from '../../../config/styles.js';
export default StyleSheet.create({

    
    carsbookings: {
        flex: 1,
        flexDirection : "row",
    },
    boxhead: {
        flex: 0.4,
    },
    boxheads: {
        flex: 0.6,
        
    },
    logoImage:{
        height:60,
        width:50,
        borderRadius:100,
    },
    tabviews: {
        backgroundColor: '#fff', 
        // backgroundColor: projectName === "pipito" ?  "#510f99" :  "#283593",
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        
    },
    txtside: {
        flex: 1,
        flexDirection : "row",
    },
    daysago: {
        flex: 1,
        flexDirection : "row",
    },
    sliderView: {
        borderWidth: 1,
        borderRadius: 10,
    },
    itemtitlename: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 14,
        color: '#444',
        paddingLeft : 10,
        paddingBottom : 5,
    },
    picklocation: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 14,
        color: '#666',
        paddingLeft : 10,
        paddingBottom : 5,
    },
    // nameofemps: {
    //     fontFamily: "Montserrat-SemiBold",
    //     fontSize: 14,
    //     color: '#444',
    //     // paddingLeft : 15,
    //     // paddingBottom : 5,
    // },
    datetime: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 14,
        color: '#333',
        paddingLeft : 10,
        paddingBottom : 5,
        textAlign : "center",
    },
    date: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 14,
        textAlign : "center",
        color: '#510f99',
        paddingLeft : 10,
    },
    monthyear: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 14,
        alignSelf : "flex-start",        
        color: '#333',
        paddingLeft : 10,
    },
    itemtitle: {
        fontFamily: "Montserrat-Regular",
        fontSize: 14,
        color: '#333',
    },
    itemprice: {
        alignSelf : "flex-end",
        marginRight : 5,
        paddingTop : 5,
        color : "#333",
        fontFamily: "Montserrat-SemiBold",

    },
    itemdetails: {
        alignSelf : "flex-start",
        marginRight : 5,
        paddingTop : 5,
        color : "#333",
        fontFamily: "Montserrat-SemiBold",
        fontSize: 16,
    },
    carprice: {
        flex : 1,
        alignSelf : "flex-end",
        // backgroundColor : "#3E70D7",
        marginTop       : -10,
        // marginBottom    : 15,
        // marginRight     : -15,
        // height          : 30,
        // borderBottomLeftRadius : 30,
    },
    bookingdetails: {
        flex : 1,
        marginTop       : -15,
    },
    carbookingdetails: {
        flex : 1,
        // padding : 10,
    },
    carbookingdate: {
        flex : 0.2,
    },
    borderline: {
        flex : 0.1,
        padding : 10,
    },
    borderline: {
        // paddingRight : 0,
        marginRight : 0,
        borderRadius: 1, borderWidth: 1,
         borderColor: '#333', borderStyle: 'dotted'
    },
});
