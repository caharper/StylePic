import React from 'react'
import StyleSlideBar from './style-slide-bar'
import { Text, View, Image, ImageBackground, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { OutlinedTextField } from 'react-native-material-textfield';
import ColRowsInputs from './col-row-inputs'

import styles from './styles';

export default class SelectionPage extends React.Component {

    state = {
        rows: 3,
        cols: 3,
    }

    renderPieces() {
        const pieces = [];
        for(let i = 0; i < (this.state.rows * this.state.cols); i++){
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
                <View style={{ flex: 1 }} key={uri}>
                    <View>
                        <ColRowsInputs />
                    </View>
                    <View style={styles.bottom}>
                        <ImageBackground source={{ uri }} style={styles.selectingStylesImage}>
                        {/*<View style={styles.grid}>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            <TouchableOpacity style={styles.piece}/>
                            {this.renderPieces()}
                        </View>*/}
                        </ImageBackground>
                        <View style={{borderTopWidth: 1}}>
                            <StyleSlideBar boxNumber={"Harry"}/>
                        </View>
                </View>
                </View>
            ))
        )
    }
}