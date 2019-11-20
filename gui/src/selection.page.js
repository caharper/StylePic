import React from 'react'
import StyleSlideBar from './style-slide-bar'
import { Text, View, Image, ImageBackground, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { OutlinedTextField } from 'react-native-material-textfield';
import ColRowsInputs from './col-row-inputs'
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

export default class SelectionPage extends React.Component {

    state = {
        rows: 3,
        cols: 3,
        //highlight: false
    }

    // highlightButton() {
    //     this.setState({ highlight: true });
    //     setTimeout(() => {
    //         this.setState({ highlight: false });
    //       }, 1000);
    // }

    renderPieces() {
        const pieces = [];
        for(let i = 0; i < (this.state.rows * this.state.cols); i++){
            pieces.push(<TouchableOpacity key={i} 
                //style={this.state.highlight ? {borderColor: 'green'} : {} }
                style={{
                    zIndex: 1,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    width: (Dimensions.get('window').width)/1.5/this.state.rows,
                    height: (Dimensions.get('window').height)/1.5/this.state.cols,
                    zIndex: 1,
                }}
                //onPress={() => this.highlightButton()}
                />)
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
                <View style={{ flex: 1}} key={uri}>
                    <View>
                        {/* <ColRowsInputs /> */}
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