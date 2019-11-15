import React from 'react';
import { View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

export default class StylePage extends React.Component {

    state = {
        rows: 3,
        cols: 3,
    }

    renderPieces() {
        const pieces = [];
        for(let i = 0; i < (this.state.rows * this.state.cols); i++){
            console.log("hello")
            pieces.push(<TouchableOpacity key={i} 
                style={{
                    zIndex: 1,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    width: (Dimensions.get('window').width)/this.state.rows,
                    height: (Dimensions.get('window').height)/this.state.cols}}
                />)
        }
        return pieces;
    }


    render () {
        return (
            this.props.location.state.captures.map(({ uri }) => (
                <View style={styles.styleImageContainer} key={uri}>
                    <ImageBackground source={{ uri }} style={styles.styleImage}>
                        <TouchableOpacity style={styles.backButton} onPress={() =>
                            this.props.history.push('/')}>
                            <Ionicons
                                name="md-close"
                                color="white"
                                size={40}
                            />
                        </TouchableOpacity>
                        <View style={styles.grid}>
                            {/* <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/> */}
                            {this.renderPieces()}
                        </View>
                        
                    </ImageBackground>
                </View>
            ))
        )
    }
}