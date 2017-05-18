/**
 * Created by yoyo on 16/6/28.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	ListView,StyleSheet,NativeModules,Image,Alert,TouchableWithoutFeedback,Animated,Easing
} from 'react-native'
var GxKit =NativeModules.GxKit

import {CSS} from '../view/CSS/CSS'
import {Res_system} from '../lib/ResManger'
import {mixed} from '../lib/tools'
import Camera from 'react-native-camera-growface';
import Emitter from "../model/Emitter";

export  default class  TestRecord extends Component{
	componentWillMount(){
		GxKit.fixedSelf()
	}
	_start(){
		GxKit.callSystemRecorder().then(x=>{
			console.log(x)
		}).catch(err=>{
			console.log('err',err)
		})
	}
	render(){
		return (<View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
			<Text onPress={this._start}>start</Text>
		</View>)
	}
}