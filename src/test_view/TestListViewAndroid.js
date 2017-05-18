/**
 * Created by yjy on 16/8/31.
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

export default class TestListViewAndroid extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
            deg: new Animated.Value(0),
            deging: new Animated.Value(0),
            isRefreshing: false
        }
    }

    componentWillMount() {

    }


    componentDidMount() {
        setTimeout(() => this._ListView.scrollTo({y: 200, animated: false}),100);
    }

    componentWillUnmount() {

    }

    _onScroll(e) {
        let y = e.nativeEvent.contentOffset.y;
        this.reFreshControl = (y < 100);
        this.refreshControlNotReach = (y > 100 && y < 200);
        if(this.reFreshControling && y == 100) {
            Animated.timing(this.state.deging, {
                toValue: this.state.deg._value,
                duration: 0,
                easing: Easing.linear
            }).start(() => this._deging(0));
            //this._deging(0);
            this.setState({isRefreshing: true});
            this.reFreshControling = false;
        }
        if(y < 200) {
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
            duration: 500*(_i-this.state.deging._value),
            easing: Easing.linear
        }).start(() => {
            this.state.isRefreshing ? this._deging(_i) : null
        });
    }

    _refreshControlJugde() {
        if(this.reFreshControl) {
            this.reFreshControling = true;
            this._ListView.scrollTo({y:100, animated: true});
            setTimeout(() => {this.setState({isRefreshing: false}); this._ListView.scrollTo({y:200, animated: true})}, 3000);
            console.log('reFreshControl');
        } else if(this.refreshControlNotReach) {
            this._ListView.scrollTo({y:200, animated: true});
        }
    }

    _onScrollEndDrag(e) {
        console.log('_onScrollEndDrag');
        this._refreshControlJugde()
    }

    _onMomentumScrollEnd(e) {
        console.log('_onMomentumScrollEnd');
        this._refreshControlJugde()
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
            <View style = {{width: CSS.width(), height: 200, paddingTop: 100, alignItems: 'center', justifyContent: 'center'}}>
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
                    renderHeader = {() => this._renderHeader()}
                    ref = {ref => this._ListView = ref}
                />
            </View>
        )
    }
}