/**
 * Created by yjy on 2016/11/11.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import {CSS, Toast} from '../view/CSS/CSS'
import {AMapLocation} from "react-native-amap";
import geocode from '../model/Geocode'

export default class TestAMapSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        // AMapLocation.getLatLon('北京市朝阳区').then(json => {
        //     console.log(json);
        //     this.setState({ address: 'resolve:'+json.latitude+',,,'+json.longitude });
        // }).catch(e => {
        //     console.log(e);
        //     this.setState({ address: 'reject:'+e });
        // });
        // let loaction = {latitude: 108.935664, longitude: 34.279049};
        // AMapLocation.getAddress(loaction).then(json => {
        //     console.log(json);
        // }).catch(e => {
        //     console.log(e);
        // })
        // geocode.getLatlonByAddress('北京市朝阳区阜通东大街6号').then(json => {
        //     //console.log(json)
        // });
        // geocode.getAddressByLatlon(116.480811, 39.989669).then(json => {
        //     console.log(json);
        // })
    }

    componentWillUnmount() {

    }

    _handlerBack(){
        this.props.navigator.pop();
    }

    _handlerPush(name, component) {
        this.props.navigator.push({name, component});
    }

    render() {
        return (
            <View style = {{flex: 1, backgroundColor: '#ffffff'}}>
                <ScrollView bounces = {false}>
                    <Text>地址： {this.state.address}</Text>
                    <Text>坐标： {'lat:'+this.state.lat+' lon:'+this.state.lon}</Text>
                </ScrollView>
            </View>
        )
    }
}
