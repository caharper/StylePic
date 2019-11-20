import React from 'react'
import StyleSlideBar from './style-slide-bar'
import { Text, View, Image, ImageBackground, TouchableOpacity, Dimensions, TextInput, StatusBar } from 'react-native'
import { OutlinedTextField } from 'react-native-material-textfield';
import ColRowsInputs from './col-row-inputs'
import { Ionicons } from '@expo/vector-icons';
import GridButton from './grid-button.js'

import styles from './styles';

export default class SelectionPage extends React.Component {

    state = {
        rows: 3,
        cols: 3,
    }

    renderPieces() {
        const pieces = [];
        for(let i = 0; i < (this.state.rows * this.state.cols); i++){
            // pieces.push(<TouchableOpacity key={i} 
            //     style={{
            //         zIndex: 1,
            //         borderWidth: 1,
            //         borderStyle: 'solid',
            //         borderColor: 'white',
            //         width: (Dimensions.get('window').width)/1.5/this.state.rows,
            //         height: (Dimensions.get('window').height)/1.5/this.state.cols,
            //         zIndex: 1
            //     }}/>)
            pieces.push(<GridButton key={i} rows={this.state.rows} cols={this.state.cols}/>)
        }
        return pieces;
    }

    increaseRows() {
        if(this.state.rows < 5) {
            return this.setState({rows: this.state.rows + 1});
        }
    }

    decreaseRows() {
        if(this.state.rows > 1) {
            return this.setState({rows: this.state.rows - 1});
        }
    }

    increaseCols() {
        if(this.state.cols < 5) {
            return this.setState({cols: this.state.cols + 1});
        }
    }

    decreaseCols() {
        if(this.state.cols > 1) {
            return this.setState({cols: this.state.cols - 1});
        }
    }

    render () {
        return (
            this.props.location.state.captures.map(({ uri }) => (
                <View style={{ flex: 1, backgroundColor: 'white'}} key={uri}>
                    <View style={styles.gridContainer}>
                        <View style={{position: 'absolute'}}>
                            <ImageBackground source={{ uri }} style={styles.selectingStylesImage}>
                            </ImageBackground>
                        </View>
                        <View style={styles.grid}>
                            {this.renderPieces()}
                        </View>
                    </View>
                    <View style={styles.rowsColsButtonsContainer}>
                        <View style={styles.rowsButtonsContainer}>
                            <TouchableOpacity style={styles.rowsButton} 
                                            onPress={() => this.increaseRows()}>
                                    <Ionicons
                                        name="md-arrow-round-up"
                                        color="black"
                                        size={40}
                                    />
                                </TouchableOpacity>
                                <Text style={{top: 15}}>Rows: {this.state.rows}</Text>
                                <TouchableOpacity style={styles.rowsButton}
                                                onPress={() => this.decreaseRows()}>
                                    <Ionicons
                                        name="md-arrow-round-down"
                                        color="black"
                                        size={40}
                                    />
                                </TouchableOpacity>
                        </View>
                        <View style={styles.colsButtonsContainer}>
                            <TouchableOpacity style={styles.rowsButton} 
                                            onPress={() => this.increaseCols()}>
                                    <Ionicons
                                        name="md-arrow-round-up"
                                        color="black"
                                        size={40}
                                    />
                                </TouchableOpacity>
                                <Text style={{top: 15}}>Cols: {this.state.cols}</Text>
                                <TouchableOpacity style={styles.rowsButton}
                                                onPress={() => this.decreaseCols()}>
                                    <Ionicons
                                        name="md-arrow-round-down"
                                        color="black"
                                        size={40}
                                    />
                                </TouchableOpacity>
                        </View>
                    </View>
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