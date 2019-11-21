import React from 'react';
import { View, ImageBackground, TouchableOpacity, CameraRoll } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

export default class FinalPage extends React.Component {

    savePhoto(uri) {
        CameraRoll.saveToCameraRoll(uri);
    }

    render () {
        return (
            this.props.location.state.captures.map(({ uri }) => (
                <View style={styles.styleImageContainer} key={uri}>
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
                </View>
            ))
        )
    }
}