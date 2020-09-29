import { StyleSheet, Dimensions, Platform } from 'react-native';
import {colors,projectName} from '../../../config/styles.js';
export default StyleSheet.create({
    headpageimg : {
        borderColor : "#3869F6",
        marginTop : 30,
    },
    
    Bookingdate : {
        fontSize : 22,
        textAlign : "center",
        color : "#333",
        fontFamily: 'Montserrat-SemiBold',
        borderBottomColor : "#ddd",
        borderBottomWidth : 2,
        paddingBottom : 20,
    },
    
    Empdetailtitile : {
        fontSize : 18,
        color : "#333",
        fontFamily: 'Montserrat-Bold',
        marginTop : 10,
        padding : 10,
    },
    Empdetailtitile : {
        fontSize : 18,
        color : "#333",
        fontFamily: 'Montserrat-SemiBold',
        marginTop : 10,
        padding : 10,
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
        // borderBottomWidth : 2,
        paddingBottom : 20,
    },
    Estcost : {
        flex : 1, flexDirection : "row",
        paddingBottom : 20,
        // borderBottomColor : "#ddd",
        // borderBottomWidth : 2,
    },
    managerapproval : {
        flex : 1, flexDirection : "row",
        paddingBottom : 20,
        borderBottomColor : "#ddd",
        borderBottomWidth : 2,
    },
    driverdetails : {
        flex : 1, flexDirection : "row",
        paddingBottom : 20,
        // borderBottomColor : "#ddd",
        // borderBottomWidth : 2,
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
    empdets : {
        flex : 0.4,
        padding : 5
    },
    empdatadets : {
        flex : 0.6,
        padding : 5
    },
    empest : {
        flex : 0.7,
        padding : 5
    },
    appdate : {
        flex : 0.6,
        padding : 5
    },
    status : {
        flex : 0.4,
        padding : 5
    },
    cardet : {
        flex : 0.4,
        padding : 5
    },
    cardetdata : {
        flex : 0.6,
        padding : 5
    },
    Estcostnpolicy : {
        borderBottomColor : "#ddd",
        // borderBottomWidth : 2,
        paddingBottom : 20,
    },
    policy : {
        flex : 1,
        backgroundColor : "#F1F1F1",
        height : 80,
        borderRadius: 20,
        //  borderBottomColor : "#ddd",
        // borderBottomWidth : 2,
        padding : 5
    },
    policydetails : {
        paddingLeft : 10,
        color : "#4471F6",
        fontSize : 16,
        textDecorationLine: 'underline',
        fontFamily: 'Montserrat-SemiBold',
    },
   
    parking : {
        flex : 1,
        padding : 13,
        color : "#333",
        fontSize : 16,
        fontFamily: 'Montserrat-SemiBold',

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
    empids : {
        fontSize : 18,
        color : "#333",
        fontFamily: 'Montserrat-Regular',
        padding : 5,
    },
    driverdets : {
        fontSize : 14,
        color : "#333",
        fontFamily: 'Montserrat-Regular',
        padding : 5,
    },
    driverdetsdata : {
        fontSize : 15,
        color : "#333",
        fontFamily: 'Montserrat-SemiBold',
        padding : 5,
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
    empapp : {
        fontSize : 15,
        color : "#999",
        fontFamily: 'Montserrat-Regular',
        padding : 5,
    },
    empappdata : {
        fontSize : 15,
        color : "#666",
        fontFamily: 'Montserrat-Regular',
        padding : 5,
    },
    empidsdata : {
        fontSize : 18,
        color : "#333",
        fontFamily: 'Montserrat-SemiBold',
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
        backgroundColor: projectName === "pipito" ?  "#510f99" :  "#3869F6",
        height: 400,
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
        // height: 400,
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


