import { StyleSheet, Dimensions, Platform } from 'react-native';
import {colors,projectName} from '../../../config/styles.js';
export default StyleSheet.create({
    headpageimg : {
        borderColor : "#3869F6",
        marginTop : 30,
    },
    
    Bookingdate : {
        fontSize : 19,
        textAlign : "center",
        color : "#333",
        fontFamily: 'Montserrat-SemiBold',
        borderBottomColor : "#ddd",
        borderBottomWidth : 2,
        paddingBottom : 20,
    },
    empdetails : {
        fontSize : 14,
        color : "#333",
        fontFamily: 'Montserrat-Regular',
        padding : 5,
    },
    empdetailsdata : {
        fontSize : 14,
        color : "#333",
        fontFamily: 'Montserrat-SemiBold',
        padding : 5,
    },
    emptrip : {
        fontSize : 14,
        color : "#333",
        fontFamily: 'Montserrat-Regular',
        padding : 5,
    },
    emptripdata : {
        fontSize : 14,
        color : "#333",
        fontFamily: 'Montserrat-SemiBold',
        padding : 5,
    },
    Empdetailtitile : {
        fontSize : 18,
        color : "#333",
        fontFamily: 'Montserrat-SemiBold',
        marginTop : 10,
        padding : 5,
    },
    tripdetils : {
        fontSize : 18,
        color : "#3869F6",
        fontFamily: 'Montserrat-Bold',
        // marginTop : 1,
        padding : 10,
    },
    empdetials : {
        flex : 1, flexDirection : "row",
        borderBottomColor : "#ddd",
        borderBottomWidth : 2,
        paddingBottom : 20,
    },
    emptripdetials : {
        flex : 1, flexDirection : "row",
        borderBottomColor : "#ddd",
        borderBottomWidth : 2,
        paddingBottom : 20,
    },
    intermidiate : {
        flex : 1, flexDirection : "row",
        borderBottomColor : "#ddd",
        // borderBottomWidth : 2,
        paddingBottom : 20,
    },
    cardetails : {
        flex : 1, flexDirection : "row",
        borderBottomColor : "#ddd",
        borderBottomWidth : 2,
        paddingBottom : 20,
        padding : 5,
    },
    empdet : {
        flex : 0.4,
        padding : 5
    },
    empdetdata : {
        flex : 0.6,
        padding : 5
    },
    policy : {
        flex : 1,
        backgroundColor : "#F1F1F1",
        height : 80,
        borderRadius: 20,
        padding : 5
    },
    policydetails : {
        paddingLeft : 10,
        color : "#4471F6",
        textDecorationLine: 'underline',
        fontSize : 16,
        fontFamily: 'Montserrat-SemiBold',
    },
   
    parking : {
        flex : 1,
        padding : 13,
        color : "#333",
        fontSize : 16,
        fontFamily: 'Montserrat-SemiBold',

    },
    
    eemptrip : {
        flexWrap : "wrap",
        padding : 5
    },
    empidsdata : {
        fontSize : 15,
        color : "#333",
        fontFamily: 'Montserrat-SemiBold',
        padding : 5,
    },
    Estcost : {
        flex : 1, flexDirection : "row",
        paddingBottom : 20,
        // borderBottomColor : "#ddd",
        // borderBottomWidth : 2,
    },
    empids : {
        fontSize : 15,
        color : "#333",
        fontFamily: 'Montserrat-Regular',
        padding : 5,
    },
    tripdets : {
        flex : 0.5,
        padding : 5
    },
    tripdetsdata : {
        flex : 0.6,
        padding : 5
    },
   
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: "#3869F6",
        backgroundColor: projectName === "pipito" ?  "#510f99" :  "#3869F6",
        height: 400,
        borderColor : "#fff",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
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
    selectPlan: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 16,
        color: '#fff',
        // textAlign: 'center',
        paddingTop: 8, 
        // paddingLeft: 5,
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
    showcarbtn: {
        width: "50%",
        marginTop: 45,
        borderRadius: 30,
        marginHorizontal: 70,
        height: 40, marginBottom: 10,
        backgroundColor: projectName === "pipito" ?  "#510f99" :  "#283593",
    },
    tabviews: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        // backgroundColor: projectName === "pipito" ?  "#510f99" :  "#283593",
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
});


