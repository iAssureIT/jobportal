import { StyleSheet, Dimensions, Platform } from 'react-native';
export default StyleSheet.create({
     container:{
    backgroundColor: '#fff',
    minHeight:'90%',
    width: window.width,
    // justifyContent:"center"
  },
    
    
    boxhead: {
        flex: 0.4,
    },
    boxheads: {
        flex: 0.6,
    },
    tabviews: {
        backgroundColor: '#fff',  borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        
    },
    txtside: {
        flex: 0.5,
        flexDirection : "row",
    },
    daysago: {
        flex: 0.2,
        borderRightWidth:0.5,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:5,
        paddingVertical:10,
    },
    carsbookings: {
        flex: 0.7,
        paddingHorizontal:5,
        paddingVertical:10,
    },
    sliderView: {
        borderWidth: 1,
        borderRadius: 10,
        padding:0,
        marginBottom:20,
    },
    itemtitlename: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 14,
        color: '#333',
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
        flex : 0.5,
        // backgroundColor : "#3E70D7",
        marginTop       : -15,
        marginBottom    : 15,
        marginRight     : -15,
        height          : 30,
        borderBottomLeftRadius : 30,
    },
    bookingdetails: {
        flex : 0.5,
        marginTop       : -15,
        

    },
    dateText:{
    fontSize:18,
    color: '#333',
    fontFamily:'Montserrat-SemiBold',
    alignSelf:"center"
  },
  historyBoxLeft:{
    height:78,
    borderRightWidth:1,
    flex:0.3,
    justifyContent:"center"
  },
  viewBookingTickets:{
    flex:0.1,
    backgroundColor:"#ddd",
    alignItems:"center",
    justifyContent:"center",
    borderTopRightRadius:10,
    borderBottomRightRadius:10
  },
});
