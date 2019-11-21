import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Style } from './style'

export default class StyleSlideItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index
        }
    }

    isSelected() {
        if(this.props.selectedStyles[this.props.currGridButton] == this.state.index) {
            return "lightblue";
        }
        else {
            return "white";
        }
    }

    render() {
        return(
            <TouchableOpacity style={{flex: 1,
                padding: 7.5,
                flexDirection: 'column',
                alignItems: 'center',
                width: 90,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'grey',
                margin: 4,
                backgroundColor: this.isSelected(),
                zIndex: 2
                }}
                onPress={this.props.setSelected}>
                <Image 
                    style={{width: 75, height: 75}}
                    source={{uri: this.props.img}}
                    resizeMode={'cover'}
                ></Image>
                <Text style={{fontSize: 12, fontFamily: "Verdana-Italic"}}>{this.props.artist}</Text>
            </TouchableOpacity>
        );
    }
}