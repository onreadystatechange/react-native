/**
 * Created by yjy on 2016/11/7.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import {CSS} from '../view/CSS/CSS'

export default class TestButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <TouchableOpacity onPress = {this.props.onPress}>
                <View style = {{borderRadius: CSS.pixel(5), padding: CSS.pixel(14), backgroundColor: '#00b9e7', width: (this.props.text.length*CSS.pixel(25))+CSS.pixel(28), alignItems: 'center'}}>
                    <Text style = {{fontSize: CSS.pixel(24), color: '#ffffff'}}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}