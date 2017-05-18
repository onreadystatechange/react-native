/**
 * Created by yjy on 16/7/27.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    ListView
} from 'react-native';

import {CSS} from '../view/CSS/CSS'

export default class TestPicker extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.onScrollCount = 0;
        this.state = {
            dataSource: ds.cloneWithRows(['row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row'])
        };
    }

    _renderRow(rowData: string, sectionID: number, rowID: number) {
        return(
            <View style = {{height: 25, justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{fontSize: CSS.pixel(28), color: '#a0a0a0', backgroundColor: 'rgba(0,0,0,0)'}}>{'row'+rowID}</Text>
            </View>
        )
    }

    _renderRow2(rowData: string, sectionID: number, rowID: number) {
        return(
            <View style = {{height: 25, justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{fontSize: CSS.pixel(36), color: '#4a4a4a', backgroundColor: 'rgba(0,0,0,0)'}}>{'row'+rowID}</Text>
            </View>
        )
    }

    _renderHeader() {
        return(
            <View style = {{height: 100}} />
        )
    }

    _renderFooter() {
        return(
            <View style = {{height: 100}} />
        )
    }

    _onScrollEndDrag(e) {
        console.log('_onScrollEndDrag');
        let y = e.nativeEvent.contentOffset.y;
        let onScrollEndDragCount = this.onScrollCount;
        // setTimeout(() => {if(onScrollEndDragCount == this.onScrollCount) {
        //     this._onScrollEnd(y);
        // }}, 500)
        let start = Date.now();
        if(this.fixInterval){
            clearInterval(this.fixInterval);
        }
        this.fixInterval = setInterval(() => this._timeFix(start, y, onScrollEndDragCount),10);
    }

    _timeFix(start, y, onScrollEndDragCount) {
        let now = Date.now();
        let end = 200;
        if(now - start > end) {
            clearInterval(this.fixInterval);
            if(onScrollEndDragCount == this.onScrollCount) {
                this._onScrollEnd(y);
            }
        }
        console.log('now:'+now+'start:'+start+'end:'+end);
    }

    _onMomentumScrollEnd(e) {
        console.log('_onMomentumScrollEnd');
        let y = e.nativeEvent.contentOffset.y;
        this._onScrollEnd(y);
    }

    _onScroll(e) {
        this.onScrollCount++;
        let y = e.nativeEvent.contentOffset.y;
        this.refs._ListView2.scrollTo({y: y, animated: false})
    }

    _onScrollEnd(y) {
        let y1 = y-(y%25);
        if(y%25 > 12.5) {y1 = y1+25}
        if(y != y1) {
            this.refs._ListView.scrollTo({y: y1, animated: true});
            console.log(y, y1/25);
        }
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'green'}}>
                <View style = {{height: 225, backgroundColor: '#ffffff', marginTop: 200}}>
                    <ListView
                        dataSource = {this.state.dataSource}
                        renderRow = {this._renderRow.bind(this)}
                        renderHeader = {() => this._renderHeader()}
                        renderFooter = {() => this._renderFooter()}
                        bounces = {false}
                        onScrollEndDrag = {(e) => {this._onScrollEndDrag(e)}}
                        onMomentumScrollEnd = {(e) => {this._onMomentumScrollEnd(e)}}
                        onScroll = {(e) => {this._onScroll(e)}}
                        scrollEventThrottle = {16}
                        showsVerticalScrollIndicator = {false}
                        ref = '_ListView'
                    />
                </View>
                <View style = {{height: 25, marginTop: -125, backgroundColor: '#ffffff'}} pointerEvents = 'none'>
                    <View style = {{height: CSS.pixel(1), backgroundColor: '#a2a2a2'}} />
                    <ListView
                        dataSource = {this.state.dataSource}
                        renderRow = {this._renderRow2.bind(this)}
                        showsVerticalScrollIndicator = {false}
                        ref = '_ListView2'
                    />
                    <View style = {{height: CSS.pixel(1), backgroundColor: '#a2a2a2'}} />
                </View>
                <View style = {{height: 100}}  pointerEvents = 'none' />
            </View>
        )
    }
}