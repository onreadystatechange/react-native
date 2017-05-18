/**
 * Created by yoyo on 16/8/9.
 */
import React, { Component } from 'react';
import {
	View,
	Image,
	ScrollView,Text,
	TouchableOpacity,TouchableWithoutFeedback,
	Alert,
    StyleSheet,Animated,Easing
} from 'react-native';

import {CSS} from '../view/CSS/CSS'
import {mixed} from '../lib/tools'


class PlayUI extends Component{
	render(){
		return <View style={{width:CSS.pixel(50),height:CSS.pixel(58),backgroundColor:'#00b9e7'}}>

		</View>
	}
}
export  default class  TestPlay extends  Component{
	constructor(props){
      super(props)
	}
	render(){
		return <View style={[CSS.fd(),CSS.itemCenter(),{flex:1}]}>
			<PlayUI/>
		  </View>
	}
}