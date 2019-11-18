import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { STYLES } from './style-list'
import { Style } from './style'
import StyleSlideItem from './style-slide-item'

export default class StyleSlideBar extends React.Component {
    state = {
        stylesList: STYLES
    }

    render() {
        return(
            <View>
                <FlatList
                    horizontal={true}
                    data={this.state.stylesList}
                    renderItem={({ item }) => {
                        return (
                            <StyleSlideItem artist={item.artist} img={item.sampleImgUrl}></StyleSlideItem>
                        )
                    }}
                    keyExtractor={(item) => item.artist}>
                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1, 
        position: 'absolute', 
        bottom: 10
    }
});