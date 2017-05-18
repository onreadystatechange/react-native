/**
 * Created by yjy on 16/8/30.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    Animated,
    Easing
} from 'react-native';

import {CSS} from '../view/CSS/CSS'
import {Res_Loading} from '../lib/ResManger'

export default class TestListView extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
            deg: new Animated.Value(0),
            deging: new Animated.Value(0),
            isRefreshing: false
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    _onScroll(e) {
        let y = e.nativeEvent.contentOffset.y;
        this.reFreshControl = (y < 0);
        console.log(y, this.reFreshControl);
        if(this.reFreshControling && y == 0) {
            Animated.timing(this.state.deging, {
                toValue: this.state.deg._value,
                duration: 0,
                easing: Easing.linear
            }).start(() => this._deging(0));
            this.setState({isRefreshing: true});
            this.reFreshControling = false;
        }
        if(y < 100) {
            this.loading = Animated.timing(this.state.deg, {
                toValue: y%100/100,
                duration: 0,
                easing: Easing.linear
            });
            this.loading.start();
        }
    }

    _deging(i) {
        let _i = i;
        _i++;
        Animated.timing(this.state.deging, {
            toValue: _i,
            duration: 500,
            easing: Easing.linear
        }).start(() => {
            this.state.isRefreshing ? this._deging(_i) : null
        });
    }

    _onScrollEndDrag(e) {
        if(this.reFreshControl) {
            this.reFreshControling = true;
            this._ListView.scrollTo({y:0, animated: true});
            setTimeout(() => {this.setState({isRefreshing: false}); this._ListView.scrollTo({y:100, animated: true})}, 3000);
            console.log('reFreshControl');
        }
    }

    _onMomentumScrollEnd(e) {

    }

    _onEndReached(e) {
        console.log('_onEndReached', e.nativeEvent.contentOffset.y);
    }

    _renderRow(rowData, sectionID, rowID) {
        return(
            <View style = {{width: CSS.width(), height: 50, backgroundColor: '#00b9e7'}}>
                <View style = {{width: CSS.width(), height: 2, backgroundColor: 'pink'}} />
            </View>
        )
    }

    _renderHeader() {
        return(
            <View style = {{width: CSS.width(), height: 100, alignItems: 'center', justifyContent: 'center'}}>
                {this.state.isRefreshing ?
                    <Animated.Image style = {{width: 50, height: 50, transform: [{rotate: this.state.deging.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']})}]}} source = {Res_Loading.refreshLoading} />
                    :
                    <Animated.Image style = {{width: 50, height: 50, transform: [{rotate: this.state.deg.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']})}]}} source = {Res_Loading.refreshLoading} />
                }
            </View>
        )
    }

    render() {
        return (
            <View style = {{flex: 1, backgroundColor: '#ffffff'}}>
                <ListView
                    dataSource = {this.state.dataSource}
                    renderRow = {(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}
                    enableEmptySections = {true}
                    onScroll = {e => this._onScroll(e)}
                    onScrollEndDrag = {(e) => {this._onScrollEndDrag(e)}}
                    onMomentumScrollEnd = {(e) => {this._onMomentumScrollEnd(e)}}
                    scrollEventThrottle = {16}
                    renderHeader = {() => this._renderHeader()}
                    contentInset = {{top: -100, left: 0, bottom: 0, right: 0}}
                    contentOffset = {{y: 100}}
                    ref = {ref => this._ListView = ref}
                    onEndReached = {(e) => this._onEndReached(e)}
                    onEndReachedThreshold = {50}
                />
            </View>
        )
    }
}