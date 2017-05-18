/**
 * Created by yjy on 16/9/1.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    DeviceEventEmitter
} from 'react-native';

import {CSS} from '../view/CSS/CSS'

export default class TestScrollView extends Component {
    constructor(props) {
        super(props);
        this.y = 0;
        this.state = {
            keyboardHeight: 0
        }
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('keyboardWillShow', (e) => {

            let keyboardHeight = e.endCoordinates.height;
            //this.setState({keyboardHeight});
            this._ScrollView.scrollTo({y: this.y+keyboardHeight});
            console.log('keyboardWillShow', keyboardHeight);
        });
        DeviceEventEmitter.addListener('keyboardDidShow', (e) => {
            console.log('keyboardDidShow')
        });
        DeviceEventEmitter.addListener('keyboardWillChangeFrame', (e) => {
            console.log('keyboardWillChangeFrame')
        });
        DeviceEventEmitter.addListener('keyboardDidChangeFrame', (e) => {
            console.log('keyboardDidChangeFrame')
        });
        DeviceEventEmitter.addListener('keyboardWillHide', (e) => {
            console.log('keyboardWillHide');
            let _keyboardHeight = e.endCoordinates.height;
            let keyboardHeight = 0;
            //this.setState({keyboardHeight});
            this._ScrollView.scrollTo({y: this.y-_keyboardHeight});
        });
        DeviceEventEmitter.addListener('keyboardDidHide', (e) => {
            console.log('keyboardDidHide');
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners();
    }

    _onScroll(e) {
        if(this.props.onScroll) {
            this.props.onScroll(e)
        }
        this.y = e.nativeEvent.contentOffset.y;
    }

    render() {
        return (
            <View style = {{flex: 1, backgroundColor: '#ffffff'}}>
                <ScrollView
                    {...this.props}
                    bounces = {false}
                    onScroll = {(e) => this._onScroll(e)}
                    scrollEventThrottle = {0}
                    ref = {ref => this._ScrollView = ref}
                >
                    <View style = {{height: 667, backgroundColor: 'pink'}}>
                        <View style = {{height: 500}} />
                        <TextInput
                            style = {{width: 100, height: 50, backgroundColor: '#00b9e7'}}
                        />
                    </View>
                    <View style = {{height: this.state.keyboardHeight}} />
                </ScrollView>
            </View>
        )
    }
}