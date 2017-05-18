/**
 * Created by yjy on 16/8/11.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    PanResponder,
    Animated,
    Easing
} from 'react-native';

import {CSS} from '../view/CSS/CSS'

export default class TestCard extends Component {
    constructor(props) {
        super(props);
        this.width = CSS.width();
        this.height = 100;
        this.blockWidth = this.width*0.6;
        this.blockHeight = this.height*0.8;
        this.moveDistance = this.width*0.7;
        this.x0 = this.moveDistance-((this.width-this.moveDistance)/2);
        this.state = {
            x: new Animated.Value(-this.x0)
        }
    }

    componentWillMount() {
        this.lastX = 0;
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let x = gestureState.dx;
                let dx = x-this.lastX;
                Animated.timing(this.state.x, {
                    toValue: this.state.x._value+dx,
                    duration: 0
                }).start();
                this.lastX = x;
            },
            onPanResponderRelease: (evt, gestureState) => {
                this.lastX = 0;
                let v = gestureState.vx;
                let x = -(this.state.x._value+this.x0);
                let n = parseInt(x/this.moveDistance);
                console.log(n);
                Animated.timing(this.state.x, {
                    toValue: -(this.moveDistance*n+this.x0),
                    duration: 500,
                    easing: Easing.linear
                }).start();
            }
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _getItem() {
        let arr = [0, 0, 0, 0];
        return arr.map((item, i) => {
            let marginHeight = (this.height-this.blockHeight)/2;
            let marginWidth = (this.moveDistance-this.blockWidth)/2;
            return(
                <View key = {i} style = {{flexDirection: 'row', marginTop: marginHeight}} pointerEvents = 'none'>
                    <View style = {{width: marginWidth}} />
                    <View style = {{width: this.blockWidth, height: this.blockHeight, backgroundColor: 'red'}} />
                    <View style = {{width: marginWidth}} />
                </View>
            )
        })
    }

    render() {
        return (
            <View style = {{marginTop: 100, width: this.width, height: this.height, backgroundColor: 'blue'}} {...this._panResponder.panHandlers}>
                <Animated.View style = {{flexDirection: 'row', transform: [{translateX: this.state.x}]}} pointerEvents = 'none'>
                    {this._getItem()}
                </Animated.View>
            </View>
        )
    }
}