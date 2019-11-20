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
                    width: (Dimensions.get('window').width)/1.7/this.state.rows,
                    height: (Dimensions.get('window').height)/1.7/this.state.cols,
                    //width: 100,
                    //height: 100,
                    //position: 'absolute',
                    zIndex: 100
                }}/>)
        }
        return pieces;
    }

    render () {
        return (
            this.props.location.state.captures.map(({ uri }) => (
                <View style={{ flex: 1}} key={uri}>
                    <View>
                        <ColRowsInputs />
                    </View>
                    {/* <View style={{justifyContent: 'center', width: Dimensions.get('window').width}}> */}
                    <View style={styles.gridContainer}>
                        <View style={{position: 'absolute'}}>
                            <ImageBackground source={{ uri }} style={styles.selectingStylesImage} id={'img'}>
                            </ImageBackground>
                        </View>
                        <View style={styles.grid}>
                            {this.renderPieces()}
                        </View>
                    </View>
                    {/* </View> */}
                    
                    <View style={styles.bottom}>
                        <View style={{borderTopWidth: 1}}>
                            <StyleSlideBar boxNumber={"Harry"}/>
                        </View>
                    </View>    
                </View>
            ))
        )
    }
}