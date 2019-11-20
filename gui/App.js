import React from 'react';
import { NativeRouter, Route } from "react-router-native";
import { Text, View, Image, FlatList } from 'react-native'
import CameraPage from './src/camera.page';
import StylePage from './src/style.page';
import StyleSlideBar from './src/style-slide-bar'
import StyleSlideItem from './src/style-slide-item'
import SelectionPage from './src/selection.page'
import CameraRollPage from './src/camera.roll'
import ColRowInputs from './src/col-row-inputs'
import { STYLES } from './src/style-list'

export default class App extends React.Component {
    render() {
        return (
            // <View>
            //     <StyleSlideBar></StyleSlideBar>
            // </View>
            <NativeRouter>
                <Route exact path="/" component={CameraPage} />
                <Route exact path="/style.page" component={StylePage} />
                <Route exact path="/selection.page" component={SelectionPage} />
                <Route exact path="/camera.roll.page" component={CameraRollPage} />
            </NativeRouter>
        );
    };
};
