/**
 * Created by yjy on 16/7/25.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import {CSS} from '../view/CSS/CSS'

export default class TestRoundProgress extends Component {
    constructor(props) {
        super(props);
        this.radius = CSS.pixel(99);
        this.borderWidth = CSS.pixel(2);
        this.percent = 0.7;
        this.state = {

        };
    }

    _getBorder() {
        let arr = [];
        const pi = 3.1415926;
        let perimeter = 2*pi*this.radius;
        let n = perimeter/this.borderWidth;
        for(let i = 0; i < n*this.percent; i++) {
            arr.push(i);
        }
        return arr.map((item, i) => {
            let deg = 360/n*i;
            return(
                <View key = {i} style = {{height: this.radius*2, width: this.borderWidth, borderRadius: this.radius, position: 'absolute', top: 0, left: this.radius-(this.borderWidth/2), transform: [{rotate: deg+'deg'}]}}>
                    <View style = {{height: this.radius, width: this.borderWidth, borderRadius: this.radius, backgroundColor: '#fe675d'}} />
                    <View style = {{height: this.radius, width: this.borderWidth, borderRadius: this.radius}} />
                </View>
            )
        })
    }

    render() {
        return (
            <View style = {{width: this.radius*2, height: this.radius*2, backgroundColor: '#313139', borderRadius: this.radius}}>
                {this._getBorder()}
            </View>
        )
    }
}