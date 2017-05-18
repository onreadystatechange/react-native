/**
 * Created by yjy on 16/7/22.
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

export default class TestRefresh extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }
    
    componentDidMount() {
        setTimeout(() => {this.refs._ScrollView.scrollTo({y: 100, animated: false})}, 1)
    }

    _onScroll(e) {
        let y = e.nativeEvent.contentOffset.y;
        console.log(y);
        if(y == 0) {
            this.refs._ScrollView.scrollTo({y: 100, animated: false});
        }
    }
    
    render() {
        return (
            <ScrollView
                style = {{flex:1,backgroundColor:'#ffffff'}}
                bounces = {false}
                ref = '_ScrollView'
                onScroll = {(e) => this._onScroll(e)}
            >
                <View style = {{height: 100, backgroundColor: 'red'}} />
                <View style = {{height: 200, backgroundColor: 'blue'}} />
                <View style = {{height: 200, backgroundColor: 'yellow'}} />
                <View style = {{height: 200, backgroundColor: 'green'}} />
                <View style = {{height: 200, backgroundColor: 'black'}} />
            </ScrollView>
        )}
}