import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    DeviceEventEmitter,
    TextInput,
    Alert
} from 'react-native';

import {CSS} from '../view/CSS/CSS'

export default class TestKeyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('keyboardWillShow', (e) => {
            console.log('keyboardWillShow');
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
            console.log('keyboardWillHide')
        });
        DeviceEventEmitter.addListener('keyboardDidHide', (e) => {
            console.log('keyboardDidHide')
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners();
    }

    render() {
        return (
            <View style = {{flex: 1, backgroundColor: '#ffffff'}}>
                <TextInput style = {{width: 100, height: 100, backgroundColor: 'pink'}}/>
            </View>
        )
    }
}
