import React from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
//import { RNFS } from 'react-native-fs';
import ImgToBase64 from 'react-native-image-base64';
//import {RNFetchBlob} from "react-native-fetch-blob";

import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';


export default class CameraPage extends React.Component {
    camera = null;

    state = {
        captures: [],
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    submit() {
        // RNFetchBlob.config({fileCache: true})
        // .fetch("POST", url);
        // .then(res => {
        //     console.log(res.data);
        // })
        // .catch(err => console.log(err))
        //var RNFS = require('react-native-fs')
        //var base64data = RNFS.readFile(this.state.captures[0], 'base64');
        //console.log(base64data);
        var body = new FormData();
        let url = 'http://35.226.239.3:5000/upload';
        var photo = {
            image: null,
            type: 'image/jpg',
            name: 'photo.jpg'
        }
        this.state.captures.map(({ base64 }) =>(
        photo.image = base64))
        body.append('file',photo );
        console.log(body);
        fetch(url, {
            method: 'POST',
            body
        }).then((response) => {
            console.log(response.text());
        });
        // var RNFetchBlob = require('react-native-fetch-blob')
        // RNFetchBlob.fetch('POST', url, {
        //     'image': JSON.stringify(photo),
        // }, base64ImageString).then((res) => {
        //     console.log(res.text())
        // }).catch((err) =>{
        //     console.log(err)
        // })
    
      
        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', url);
        // xhr.send(body);
        // .then(res => {
        //     console.log(res.data);
        // })
        // .catch(err => console.log(err))
        // axios.post(url, form_data, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // })

    };


    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync({base64 : true});
        console.log(photoData);
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
        this.submit();
        //change scene once photo is taken
        this.props.history.push({
            pathname: '/style.page',
            state: { captures: this.state.captures }
        });
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        var perm = false
        if (camera.status === "granted" && audio.status === "granted") {
            perm = true
        }
        const hasCameraPermission = perm
        // const hasCameraPermission = (camera.status === "granted" && audio.status === "granted");

        this.setState({ hasCameraPermission: hasCameraPermission });
        //console.log(hasCameraPermission)
    };

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state; if (this.state.hasCameraPermission === null) {
            return <View />;
        } else if (this.state.hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>
                {captures.length > 0 && <Gallery captures={captures} />}
                <Toolbar
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
};