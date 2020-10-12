import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors} from '../../config/styles.js';

const window = Dimensions.get('window');

export default StyleSheet.create({
  amenitiesWrapper : {
    // backgroundColor: "#ff0",
  },
  container:{
    backgroundColor:colors.button,
    padding:0,
    margin:0,
    paddingTop:0,
    marginTop:0,
    ...Platform.select({
      ios:{
         height: 100 ,
          paddingTop:25,
      },
      android : {
      }
    }),
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    elevation: 2
  },
});

