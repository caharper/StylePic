import React from 'react';
import { NativeRouter, Route } from "react-router-native";
import CameraPage from './src/camera.page';
import StylePage from './src/style.page';
import SelectionPage from './src/selection.page'
import CameraRollPage from './src/camera.roll'

export default class App extends React.Component {
    render() {
        return (
            <NativeRouter>
                <Route exact path="/" component={CameraPage} />
                <Route exact path="/style.page" component={StylePage} />
                <Route exact path="/selection.page" component={SelectionPage} />
                <Route exact path="/camera.roll.page" component={CameraRollPage} />
            </NativeRouter>
        );
    };
};
