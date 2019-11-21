import React from 'react'
import StyleSlideBar from './style-slide-bar'
import { Text, View, Image, ImageBackground, TouchableOpacity, Dimensions, TextInput, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import GridButton from './grid-button.js'
import { STYLES } from './style-list'

import styles from './styles';

export default class SelectionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stylesList: STYLES,
            rows: 3,
            cols: 3,
            styleList: STYLES,
            selectedStyle: 0,
            selectedStyles: this.initializeSelecteds(),
            currGridButton: 0,
        }
    }
    printArr() {
        for(i = 0; i < 25; i++) {
            console.log(this.state.selectedStyles[i]);
        }
        console.log();
    }

    initializeSelecteds() {
        arr = [];
        for(i = 0; i < 25; i++) {
            arr.push(9);
        }
        return arr;
    }

    renderPieces() {
        const pieces = [];
        for(let i = 0; i < (this.state.rows * this.state.cols); i++){
            pieces.push(<GridButton key={i} 
                                    index={i}
                                    rows={this.state.rows} 
                                    cols={this.state.cols}
                                    filter={this.state.styleList[this.state.selectedStyle]}
                                    onSelect={() => this.onSelectedButton(i)}
                                    currGridButton={this.state.currGridButton}
                                    selectedStyles={this.state.selectedStyles}
                                    />)
        }
        return pieces;
    }

    onSelectedButton(index) {
        this.setState({
            currGridButton: index
        });
    }

    onSelectedStyle(index) {
        arr = this.state.selectedStyles;
        arr[this.state.currGridButton] = index;
        this.setState({
            selectedStyle: index,
            selectedStyles: arr
        })
        this.printArr();
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

    isString(s) {
        if(typeof s === "string") {
            return true;
        }
        else {
            return false;
        }
    }
    
    MyStatusBar() {
        return(
            <View style={{height: 20, backgroundColor: "gray" }}>
                <StatusBar translucent backgroundColor="gray" barStyle="light-content" />
            </View>
        )
    }

    advanceState() {
        s = "";
        for(i = 0; i < 25; i++) {
            s += this.state.selectedStyles[i].toString();
        }
        this.props.history.push({
            pathname: '/final.page',
            state: {captures: s,
                    rows: this.state.rows,
                    cols: this.state.cols,
                }
            
        });
    }

    moveBackState() {
        this.props.history.push({
            pathname: '/'
        });
    }

    render () {
        return (
            this.props.location.state.captures.map(({ uri }) => (
                <View style={{ flex: 1 }} key={!this.isString(this.props.location.state.captures[0]) ? (
                    uri
                    ) : (
                    this.props.location.state.index
                    )}>
                    {this.MyStatusBar()}
                    <View style={styles.gridContainer}>
                        <View style={{position: 'absolute'}}>
                            {!this.isString(this.props.location.state.captures[0]) ? (
                            <ImageBackground source={{ uri }} style={styles.selectingStylesImage} id={'img'}></ImageBackground>
                            ) : (
                            <ImageBackground source={{ uri: this.props.location.state.captures[0] }} style={styles.selectingStylesImage} id={'img'}></ImageBackground>
                            )}
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
                                        color="white"
                                        size={40}
                                    />
                                </TouchableOpacity>
                                <Text style={{top: 15}}>Rows: {this.state.rows}</Text>
                                <TouchableOpacity style={styles.rowsButton}
                                                onPress={() => this.decreaseRows()}>
                                    <Ionicons
                                        name="md-arrow-round-down"
                                        color="white"
                                        size={40}
                                    />
                                </TouchableOpacity>
                        </View>
                        <View style={styles.colsButtonsContainer}>
                            <TouchableOpacity style={styles.rowsButton} 
                                            onPress={() => this.increaseCols()}>
                                    <Ionicons
                                        name="md-arrow-round-up"
                                        color="white"
                                        size={40}
                                    />
                                </TouchableOpacity>
                                <Text style={{top: 15}}>Cols: {this.state.cols}</Text>
                                <TouchableOpacity style={styles.rowsButton}
                                                onPress={() => this.decreaseCols()}>
                                    <Ionicons
                                        name="md-arrow-round-down"
                                        color="white"
                                        size={40}
                                    />
                                </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <View style={{borderTopWidth: 1}}>
                            <StyleSlideBar currSelected={this.state.currGridButton} currGridButton={this.state.selectedStyles[this.state.currGridButton]} boxNumber={this.state.currGridButton + 1} onSelect={this.onSelectedStyle.bind(this)} selectedStyles={this.state.selectedStyles} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.selectionAdvanceButton} onPress={() =>
                        this.advanceState()}>
                        <Ionicons
                            name="md-arrow-round-forward"
                            color="green"
                            size={40}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectionGoBackButton} onPress={() =>
                        this.moveBackState()}>
                        <Ionicons
                            name="md-arrow-round-back"
                            color="red"
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
            ))
        )
    }
}
