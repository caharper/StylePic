import React from 'react';
import { TouchableOpacity, Dimensions, Image, View } from 'react-native';

export default class GridButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            cols: this.props.cols,
            filter: this.props.filter,
            index: this.props.index
        }
    }

    isSelected() {
        if(this.props.currGridButton == this.state.index) {
            return true;
        }
        else {
            return false;
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.rows !== this.props.rows){
            this.setState({          
                rows: this.props.rows
            });
        }
        if(prevProps.cols !== this.props.cols){
            this.setState({          
                cols: this.props.cols
            });
        }
    }

    updateImage() {
        // if(this.state.filter !== this.props.filter){
        //     this.setState({
        //         filter: this.props.filter
        //     })
        //     console.log(this.props.filter)
            return(
                <Image style={{ width: 20, height: 20, position: 'absolute', zIndex: 100, borderRadius: 10, margin: 2 }} 
                    source={{uri: this.props.filter.sampleImgUrl}}>
                </Image>
            )
        //}
    }

    render() {
        this.componentDidUpdate(this.props)
        return (
            <View>
                <TouchableOpacity 
                style={this.isSelected() ?{
                    zIndex: 1,
                    borderWidth: 3,
                    borderStyle: 'solid',
                    borderColor: '#41FF00',
                    width: (Dimensions.get('window').width)/1.6/this.state.cols,
                    height: (Dimensions.get('window').height)/1.6/this.state.rows,
                    zIndex: 1
                }:{
                    zIndex: 1,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#DCDCDC',
                    width: (Dimensions.get('window').width)/1.6/this.state.cols,
                    height: (Dimensions.get('window').height)/1.6/this.state.rows,
                    zIndex: 1
                }
                } onPress={this.props.onSelect}/>
                {this.updateImage()}
            </View>
            
        )
    }

}