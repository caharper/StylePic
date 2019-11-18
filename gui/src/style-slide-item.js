import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Style } from './style'

export default class StyleSlideItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bgColor: ""
        }
    }

    isSelected() {
        if(bgColor == "") {
            this.setState({
                bgColor: "lightblue"
            })
        }
        else {
            this.setState({
                bgColor: ""
            })
        }
    }

    render() {
        return(
            <View style={{flex: 1,
                padding: 7.5,
                flexDirection: 'column',
                alignItems: 'center',
                width: 90,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'grey',
                margin: 4, backgroundColor: this.state.bgColor}}
                onPress={() => this.isSelected()}>
                <Image 
                    style={{width: 75, height: 75}}
                    source={{uri: this.props.img}}
                    resizeMode={'cover'}
                ></Image>
                <Text style={{fontSize: 12, fontFamily: "Verdana-Italic"}}>{this.props.artist}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 7.5,
        flexDirection: 'column',
        alignItems: 'center',
        width: 90,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        margin: 4
    }
});