/**
 * Created by yjy on 16/9/22.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    PanResponder,
    Animated,
    Easing,
    Platform
} from 'react-native';

import {CSS} from '../view/CSS/CSS'

const drawerWidth = CSS.width()-80;
const drawerRatio = 0.85;
const drawerVx = Platform.OS == 'ios' ? 3/10 : 1/10000000;

export default class TestDrawer extends Component {
    constructor(props) {
        super(props);
        this.lastX = 0;
        this.state = {
            drawerX: new Animated.Value(0),
            scaleY: new Animated.Value(1),
            listScaleX: new Animated.Value(0),
            listScaleY: new Animated.Value(0),
            listX: new Animated.Value(-drawerWidth/2)
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    open() {
        this._animatedEvent(drawerWidth, 'stop');
    }

    close() {
        this._animatedEvent(0, 'stop');
    }

    _moveEvent(gestureState) {
        let dx = gestureState.dx;
        let x = dx+this.lastX;
        if(x > drawerWidth) {
            x = drawerWidth;
        }
        if(x < 0) {
            x = 0;
        }
        this._animatedEvent(x, 'move');
    }

    _stopEvent(gestureState) {
        let vx = gestureState.vx;
        let dx = gestureState.dx;
        let x = dx+this.lastX;
        if(x > (drawerWidth)/2) {
            x = drawerWidth;
        } else {
            x = 0;
        }
        if (vx > drawerVx) {
            x = drawerWidth;
        }
        if (vx < -drawerVx) {
            x = 0;
        }
        this._animatedEvent(x, 'stop');
    }

    _animatedEvent(x, type) {
        let ratio = x/drawerWidth;
        let height = (1-ratio)*(1-drawerRatio)+drawerRatio;
        let listScaleX = ratio;
        let listScaleY = ratio;
        let listX = (1-ratio)*(-drawerWidth/2);
        let AnimatedArr = [
            {value: this.state.drawerX, toValue: x},
            {value: this.state.scaleY, toValue: height},
            {value: this.state.listScaleX, toValue: listScaleX},
            {value: this.state.listScaleY, toValue: listScaleY},
            {value: this.state.listX, toValue: listX}
        ];
        for(let i = 0; i < AnimatedArr.length; i++) {
            Animated.timing(AnimatedArr[i].value, {
                toValue: AnimatedArr[i].toValue,
                duration: type == 'stop' ? 300 : 0,
                easing: Easing.cos
            }).start(type == 'stop' ? i == AnimatedArr.length-1 ? () => {
                this.lastX = this.state.drawerX._value;     //结束时调用获取lastX
                if(this.lastX == 0) {
                    //抽屉关闭
                }
                if(this.lastX == drawerWidth) {
                    //抽屉打开
                }
            } : null : null);
        }
    }

    render() {
        let panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                this._moveEvent(gestureState);
            },
            onPanResponderMove: (evt, gestureState) => {
                this._moveEvent(gestureState);
            },
            onPanResponderRelease: (evt, gestureState) => {
                this._stopEvent(gestureState);
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            }
        });
        return (
            <View style = {{flex: 1, backgroundColor: '#ffffff'}}>
                <View style = {{flex: 1, backgroundColor: CSS.BLUECOLOR}} />
                <Animated.View style = {{position: 'absolute', left: this.state.listX, top: 0, width: drawerWidth, height: CSS.height(), backgroundColor: CSS.REDCOLOR, transform: [{scaleX: this.state.listScaleX}, {scaleY: this.state.listScaleY}]}}/>
                <Animated.View style = {{position: 'absolute', left: 0, top: 0, width: CSS.width(), height: CSS.height(), backgroundColor: 'pink', transform: [{scaleY: this.state.scaleY}, {translateX: this.state.drawerX}]}} {...panResponder.panHandlers} />
            </View>
        )
    }
}