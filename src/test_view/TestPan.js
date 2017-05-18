/**
 * Created by yjy on 16/8/9.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    PanResponder,
    Alert
} from 'react-native';

export default class TestPan extends Component {
    constructor(props) {
        super(props);
        this.width = 260;
        this.height = 30;
        this.blockLength = 40;
        let xz = (this.height-this.blockLength)/2;
        const x0 = [xz,xz,xz,xz];
        this.state = {
            x: x0
        }
    }

    getItem() {
        let arr = [0,0,0,0];
        return arr.map((item, i) => {
            let moveEvent = (evt) => {
                let x = this.state.x;
                let locationX = evt.nativeEvent.locationX;
                if(locationX > this.width-(this.blockLength/2)-((this.height-this.blockLength)/2)) {
                    locationX = this.width-(this.blockLength/2)-((this.height-this.blockLength)/2);
                }
                if (locationX < this.blockLength/2+((this.height-this.blockLength)/2)) {
                    locationX = this.blockLength/2+((this.height-this.blockLength)/2);
                }
                x[i] = locationX-this.blockLength/2;
                this.setState({x: x});
            };
            let panResponder = PanResponder.create({
                onStartShouldSetPanResponder: (evt, gestureState) => true,
                onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
                onMoveShouldSetPanResponder: (evt, gestureState) => true,
                onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
                onPanResponderGrant: (evt, gestureState) => {
                    moveEvent(evt);
                },
                onPanResponderMove: (evt, gestureState) => {
                    moveEvent(evt);
                }
            });
            let percent = parseInt((this.state.x[i]-((this.height-this.blockLength)/2))/(this.width-(this.height-this.blockLength)-this.blockLength)*100);
            return(
                <View key = {i} style = {{flexDirection: 'row', alignItems: 'center', marginTop: 25, paddingLeft: 25, paddingRight: 25}}>
                    <View style = {{height: this.height, width: this.width, backgroundColor: '#00b9e7', borderRadius: 10}} {...panResponder.panHandlers}>
                        <View style = {{width: this.blockLength, height: this.blockLength, borderRadius: 10, backgroundColor: '#fe5d5d', marginTop: (this.height-this.blockLength)/2, marginLeft: this.state.x[i]}} pointerEvents = 'none' />
                    </View>
                    <View style = {{flex: 1}} />
                    <Text style = {{fontSize: 18, color: 'black'}}>{percent}%</Text>
                </View>
            )
        })
    }

    _submit() {
        let percentSum = 0;
        for(let i = 0; i < this.state.x.length; i++) {
            let percent = parseInt((this.state.x[i]-((this.height-this.blockLength)/2))/(this.width-(this.height-this.blockLength)-this.blockLength)*100);
            percentSum += percent;
        }
        let xz = (this.height-this.blockLength)/2;
        const x0 = [xz,xz,xz,xz];
        this.setState({x: x0});
        Alert.alert('当前提交总和为'+percentSum+'%');
    }

    render() {
        return (
            <View style = {{flex: 1, backgroundColor: '#ffffff', paddingTop: 100}}>
                {this.getItem()}
                <View style = {{marginTop: 70, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress = {() => this._submit()}>
                        <View style = {{width: 80, height: 40, borderRadius: 5, backgroundColor: '#00b9e7', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style = {{fontSize: 18, color: '#ffffff'}}>提交</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}