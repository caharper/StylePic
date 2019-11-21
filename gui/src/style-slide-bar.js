import React from 'react'
import { View, FlatList, Text, StyleSheet, Header, TouchableOpacity, Image } from 'react-native'
import { STYLES } from './style-list'
import { Style } from './style'
import StyleSlideItem from './style-slide-item'

import styles from './styles';

export default class StyleSlideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stylesList: STYLES,
            selectedStyle: -1
        }
    }

    onSelect(index) {
        this.setState({
            selectedStyle: index
        });
        this.props.onSelect(index)
    }

    render() {
        return(
            <View>
                <Text style={styles.slideBarHeader}>Styles</Text>
                <FlatList
                    horizontal={true}
                    data={this.state.stylesList}
                    renderItem={({ item, index }) => {
                        return (
                            <StyleSlideItem artist={item.artist} img={item.sampleImgUrl} index={index} currSelected={this.state.selectedStyle} setSelected={() => this.onSelect(index)}></StyleSlideItem>
                        )
                    }}
                    keyExtractor={(item) => item.artist}
                    extraData={this.state}>
                </FlatList>
            </View>
        );
    }
}