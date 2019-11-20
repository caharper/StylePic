import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';

export default class GridButton extends React.Component {

    state ={
        rows: this.props.rows,
        cols: this.props.cols,
        highlight: false
    }

    highlightButton() {
        this.setState({ highlight: true });
        setTimeout(() => {
            this.setState({ highlight: false });
          }, 450);
    }

    componentDidUpdate(prevProps){
        if(prevProps.rows !== this.props.rows){
            this.setState({          
                rows: this.props.rows
            });
        }
        else if(prevProps.cols !== this.props.cols){
            this.setState({          
                cols: this.props.cols
            });
        }
    }

    render() {
        this.componentDidUpdate(this.props)
        return (
            <TouchableOpacity 
                style={this.state.highlight ?{
                    zIndex: 1,
                    borderWidth: 3,
                    borderStyle: 'solid',
                    borderColor: '#41FF00',
                    width: (Dimensions.get('window').width)/1.5/this.state.rows,
                    height: (Dimensions.get('window').height)/1.5/this.state.cols,
                    zIndex: 1
                }:{
                    zIndex: 1,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'white',
                    width: (Dimensions.get('window').width)/1.5/this.state.rows,
                    height: (Dimensions.get('window').height)/1.5/this.state.cols,
                    zIndex: 1
                }
            } onPress={() => this.highlightButton()}/>
        )
    }

}