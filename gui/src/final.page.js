import React from 'react';
import { View, ImageBackground, TouchableOpacity, CameraRoll, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

export default class FinalPage extends React.Component {

    savePhoto(uri) {
        CameraRoll.saveToCameraRoll(uri);
        Alert.alert('Success!', 'Your image has been saved to camera roll')
    }

    isString(s) {
        if(typeof s === "string") {
            return true;
        }
        else {
            return false;
        }
    }

    render () {

        return (
            this.props.location.state.captures.map(({ uri }) => (
                <View style={styles.styleImageContainer} key={!this.isString(this.props.location.state.captures[0]) ? (
                    uri
                    ) : (
                    this.props.location.state.index
                    )}>
                    {!this.isString(this.props.location.state.captures[0]) ? (
                        <ImageBackground source={{ uri }} style={styles.styleImage}>
                            <TouchableOpacity style={styles.advanceButton} onPress={() =>
                                this.savePhoto(uri)}>
                                <Ionicons
                                    name="md-download"
                                    color="white"
                                    size={40}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.backButton} onPress={() =>
                                this.props.history.push('/')}>
                                <Ionicons
                                    name="md-close"
                                    color="white"
                                    size={40}
                                />
                            </TouchableOpacity>
                        </ImageBackground>
                        ) : (
                        <ImageBackground source={{ uri: this.props.location.state.captures[0] }} style={styles.styleImage}>
                            <TouchableOpacity style={styles.advanceButton} onPress={() =>
                                this.savePhoto(uri)}>
                                <Ionicons
                                    name="md-download"
                                    color="white"
                                    size={40}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.backButton} onPress={() =>
                                this.props.history.push('/')}>
                                <Ionicons
                                    name="md-close"
                                    color="white"
                                    size={40}
                                />
                            </TouchableOpacity>
                        </ImageBackground>
                        )}
                </View>
            ))
        )
    }
}