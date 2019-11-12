import React from 'react';
import { NativeRouter, Route } from "react-router-native";
import CameraPage from './src/camera.page';
import StylePage from './src/style.page';

export default class App extends React.Component {
    render() {
        return (
            <NativeRouter>
                <Route exact path="/" component={CameraPage} />
                <Route exact path="/style.page" component={StylePage} />
            </NativeRouter>
        );
    };
};