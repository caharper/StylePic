import React from 'react'
import StyleSlideBar from './style-slide-bar'
import { Text, View, Image, ImageBackground, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { OutlinedTextField } from 'react-native-material-textfield';

import styles from './styles';

export default class ColRowInputs extends React.Component {

    state = {
        rows: 3,
        cols: 3,
    }

    fieldRef = React.createRef();
 
    onSubmit = () => {
      let { current: field } = this.fieldRef;
   
      console.log(field.value());
    };
   
    render() {
      return (
        <View>
          <OutlinedTextField
            label='Rows'
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
          />
          <OutlinedTextField
            label='Columns'
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
          />
        </View>
      );
    }
}