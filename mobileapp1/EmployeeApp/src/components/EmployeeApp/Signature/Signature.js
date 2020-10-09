import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,Button,
  TouchableOpacity, TextInput, Image,TouchableHighlight,
} from 'react-native';
import axios from "axios";
import { Header, Card,Icon } from 'react-native-elements';
import styles from './style.js';
import ValidationComponent from "react-native-form-validator";
import HeaderBar from '../../../layouts/EmployeeHeader/Header.js';
import SignatureCapture from 'react-native-signature-capture';

export default class Signature extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


componentDidMount() {

}
saveSign() {
    this.refs["sign"].saveImage();
}

resetSign() {
    this.refs["sign"].resetImage();
}

_onSaveEvent(result) {
    console.log(result);
}
_onDragEvent() {
    console.log("dragged");
}

  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <View style={styles.overlay} />
        <HeaderBar navigation={navigation} showBackBtn={true} />
        
        <View style={styles.headpageimg}>
            <Text style={styles.carname}> Signature Capture </Text>
          </View>
        <ScrollView >
          <Card containerStyle={[styles.sliderView]}>
          <View style={{ flex: 1, flexDirection: "column" }}>
                <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>
 
                  <View style={{ flex: 1, flexDirection: "row" }}>
                      <View style={{ flex: 0.5,padding: 5 }}>
                        <Button
                          onPress={this.saveSign.bind(this)}
                          titleStyle={styles.buttonText}
                          title="Save"
                          buttonStyle={styles.buttonSignUp}
                          containerStyle={styles.buttonContainer}
                          />
                      </View>
                      <View style={{ flex: 0.5 ,padding: 5}}>
                        <Button
                          onPress={this.resetSign.bind(this)}
                          titleStyle={styles.buttonText}
                          title="Reset"
                          buttonStyle={styles.buttonSignUp}
                          containerStyle={styles.buttonContainer}
                          />
                      </View>
                  </View>
            </View>
          </Card>
        </ScrollView>
      </React.Fragment>
    );

  }
}
