/**
 * Created by yjy on 16/8/12.
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

export default class TestCard2 extends Component {
    constructor(props) {
        super(props);
        this.width = CSS.width();
        this.height = 125;
        this.blockWidth = this.width*0.708;
        this.blockHeight = this.height*0.8;
        this.moveDistance = this.width*0.733;
        this.ratio = 0.872;
        this.x0 = this.moveDistance-((this.width-this.moveDistance)/2);
        this.arrLength = 3;
        this.state = {
            currentPageFloat: 1
        }
    }

    componentDidMount() {
        setTimeout(() => {this.mainScroll.scrollTo({x: this.x0+this.moveDistance, animated: false})}, 0);
        setTimeout(() => {this.assistScroll.scrollTo({x: this.moveDistance, animated: false})}, 0);
    }

    _getItem() {
        let arr = [1, 2, 0, 1, 2, 0, 1];
        return arr.map((item, i) => {
            let marginWidth = (this.moveDistance-this.blockWidth)/2;
            let ratio = 0;
            let currentPageInt = parseInt(this.state.currentPageFloat);
            if(i == 2) {
                ratio = Math.abs(this.state.currentPageFloat-(this.arrLength+1)) < 0.1 ? 1 : 0;
            }
            if(i == this.arrLength+1) {
                ratio = Math.abs(this.state.currentPageFloat) < 0.1 ? 1 : 0;
            }
            if(i-1 == currentPageInt) {
                ratio = 1-this.state.currentPageFloat%1;
            } else if(i-1 == currentPageInt+1) {
                ratio = this.state.currentPageFloat%1;
            }
            let scaleY = this.ratio+((1-this.ratio)*ratio);
            let translateY = this.height*(1-scaleY)/8;
            return(
                <View key = {i} style = {{flexDirection: 'row'}}>
                    <View style = {{width: marginWidth}} />
                    <View style = {{width: this.blockWidth, height: this.blockHeight, backgroundColor: '#00b9e7',
                    transform: [{scaleY: scaleY}, {translateY: translateY}]}}>
                        <Text>{item}</Text>
                    </View>
                    <View style = {{width: marginWidth}} />
                </View>
            )
        })
    }

    _getView() {
        let arr = [0, 0, 0, 0, 0];
        return arr.map((item, i) => {
            let marginWidth = (this.moveDistance-this.blockWidth)/2;
            return(
                <View key = {i} style = {{flexDirection: 'row'}}>
                    <View style = {{width: marginWidth}} />
                    <View style = {{width: this.blockWidth, height: this.blockHeight}} />
                    <View style = {{width: marginWidth}} />
                </View>
            )
        })
    }

    _onAssistScroll(e) {
        let x = e.nativeEvent.contentOffset.x;
        if (Math.abs(x-((this.arrLength+1)*this.moveDistance)) < 0.0001) {
            this.mainScroll.scrollTo({x: this.moveDistance+this.x0, animated: false});
            this.assistScroll.scrollTo({x: this.moveDistance, animated: false});
        } else if (Math.abs(x) < 0.0001) {
            this.mainScroll.scrollTo({x: this.moveDistance*this.arrLength+this.x0, animated: false});
            this.assistScroll.scrollTo({x: this.moveDistance*this.arrLength, animated: false});
        } else {
            let mainX = x+this.x0;
            this.mainScroll.scrollTo({x: mainX, animated: false});
        }
        let currentPageFloat = x/this.moveDistance;
        this.setState({currentPageFloat});
    }

    render() {
        return (
            <View style = {{marginTop: 100, backgroundColor: '#ffffff'}}>
                <ScrollView
                    horizontal = {true}
                    pointerEvents = 'none'
                    ref = {ref => this.mainScroll = ref}
                    showsHorizontalScrollIndicator = {false}
                >
                    {this._getItem()}
                </ScrollView>
                <ScrollView
                    style = {{width: this.moveDistance, height: this.height, position: 'absolute', left: (this.width-this.moveDistance)/2, top: 0}}
                    horizontal = {true}
                    pagingEnabled = {true}
                    ref = {ref => this.assistScroll = ref}
                    onScroll = {e => this._onAssistScroll(e)}
                    scrollEventThrottle = {16}
                    showsHorizontalScrollIndicator = {false}
                >
                    {this._getView()}
                </ScrollView>
            </View>
        )
    }
}