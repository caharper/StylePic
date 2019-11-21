// Code adapted from https://medium.com/@df.eporwei/a-photo-picker-with-expo-for-react-native-9b7897b69f7f

import React, { Component } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {View, Text, StyleSheet, Dimensions, Button, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class CameraRollScreen extends Component {
 constructor(props) {
    super(props);
    this.state = {
    hasCameraPermission: null,
    image: null
    }
 }

 async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
 }

 _getPhotoLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  advanceState() {
    imageArr = [this.state.image];
    this.props.history.push({
      pathname: '/selection.page',
      state: {captures: imageArr, index: this.state.image.charCodeAt(0)}
    });
  }

 render() {
  const { image, hasCameraPermission } = this.state;
  if (hasCameraPermission === null) {
   return <View />
  }
  else if (hasCameraPermission === false) {
   return <Text>Access to camera has been denied.</Text>;
  }
  else {
   return (
    <View style={{ flex: 1 }}>
     <View style={styles.activeImageContainer}>
      {image ? (
       <Image source={{ uri: image }} style={{ flex: 1 }} />
      ) : (
        <Image source={{ uri: 'https://discountseries.com/wp-content/uploads/2017/09/default.jpg' }} style={{ flex: 1 }} />
      )}
    </View>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image ? (
        <TouchableOpacity onPress={() =>
          this.advanceState()}>
          <Ionicons
              name="md-arrow-round-forward"
              color="grey"
              size={40}
          />
        </TouchableOpacity>
      ) : (
        <Button 
          onPress={this._getPhotoLibrary.bind(this)} 
          title="Select a Photo"
        />
      )}
    </View>
   </View>
   );
  }
 }
}

const styles = StyleSheet.create({
 activeImageContainer: {
  flex: 1,
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height / 2,
  backgroundColor: "#eee",
  borderBottomWidth: 0.5,
  borderColor: "#fff"
 },
});