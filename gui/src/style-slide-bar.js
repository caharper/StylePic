import React from 'react'
import { View, FlatList, Text, StyleSheet, Header, TouchableOpacity } from 'react-native'
import { STYLES } from './style-list'
import { Style } from './style'
import StyleSlideItem from './style-slide-item'

import styles from './styles';

export default class StyleSlideBar extends React.Component {
    state = {
        stylesList: STYLES,
        selectedStyle: 2,
    }

    constructor(props) {
        super(props);
    
        this.setSelected = this.setSelected.bind(this);
      }

    setSelected() {
        alert(Yuh);
        this.setState({
            selectedStyle: index
        })
    }

    render() {
        return(
            <View>
                <Text style={styles.slideBarHeader}>{this.props.boxNumber}</Text>
                <FlatList
                    horizontal={true}
                    data={this.state.stylesList}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => this.setSelected()}>
                                <StyleSlideItem artist={item.artist} img={item.sampleImgUrl} index={index} currSelected={this.state.selectedStyle}></StyleSlideItem>
                            </TouchableOpacity>                        
                        )
                    }}
                    keyExtractor={(item) => item.artist}>
                </FlatList>
            </View>
        );
    }
}