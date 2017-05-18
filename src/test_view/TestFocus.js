import React, { Component } from 'react';
import {
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';

import {CSS} from '../view/CSS/CSS'
import {Res_Common} from '../lib/ResManger'

export default class TestFocus extends Component {
    constructor(props){
        super(props);
        this.ratio = this.props.width/this.props.height || 0.618;
        this.imageSourceArr = [Res_Common.ICON_ARROW_BACK,Res_Common.ICON_ARROW_FORWARD,Res_Common.ICON_CHECK_MARK,Res_Common.ICON_DELETE];
        this.arrLength = this.imageSourceArr.length;
        this.imageSourceArr.unshift(this.imageSourceArr[this.arrLength-1]);
        this.imageSourceArr.push(this.imageSourceArr[1]);
        this.state={
            imageArr: this.imageSourceArr,
            currentPage: 1
        }
    }

    componentDidMount() {
        setTimeout(() => {this.refs._ScrollView.scrollTo({x: CSS.width(), animated: false})}, 0);
        setInterval(() => {this.refs._ScrollView.scrollTo({x: CSS.width()*(this.state.currentPage+1), animated: true});}, this.props.interval || 4000);
    }

    _onTouch(i) {
        if(this.props.onPress) {
            this.state.onPress(i);
        }
    }

    _getImage() {
        return this.state.imageArr.map((item, i) => {
            return (
                <TouchableOpacity onPress = {() => {this._onTouch(i)}}>
                    <Image key = {i} style = {{width: CSS.width(),height: CSS.width()*this.ratio}} source={item} resizeMode="stretch"/>
                </TouchableOpacity>
            )
        });
    }

    _getRound() {
        let arr = [];
        for(let j = 0; j < this.arrLength; j++) {
            arr.push(j);
        }
        return arr.map((item, i) => {
            return(
                <View key = {i} style = {{height: CSS.pixel(10), width: CSS.pixel(10), borderRadius: CSS.pixel(5), backgroundColor: '#000000', opacity: (this.state.currentPage-1 == i) ? 1 : 0.38, position: 'absolute', right: CSS.pixel((this.arrLength-i)*19+6), bottom: CSS.pixel(18)}} />
            )
        });
    }

    _onScrollEnd(e) {
        let x = e.nativeEvent.contentOffset.x;
        let currentPage = parseInt(x/CSS.width());
        if(currentPage == this.arrLength+1) {
            this.refs._ScrollView.scrollTo({x: CSS.width(),animated: false});
            currentPage = 1;
        }
        if(currentPage == 0) {
            this.refs._ScrollView.scrollTo({x: CSS.width()*this.arrLength,animated: false});
            currentPage = this.arrLength;
        }
        this.setState({currentPage: currentPage});
    }

    render() {
        return (
            <View style={{width: CSS.width(), height: CSS.width()*this.ratio, backgroundColor: '#ffffff'}}>
                <ScrollView
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    pagingEnabled = {true}
                    bounces={false}
                    onMomentumScrollEnd = {(e) => this._onScrollEnd(e)}
                    ref = "_ScrollView"
                >
                    {this._getImage()}
                </ScrollView>
                {this._getRound()}
            </View>
        )
    }
}