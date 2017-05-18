/**
 * Created by chuangxiangkeji on 2016/6/6.
 */
import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	PanResponder,
	Animated,
	Easing,
	ScrollView
} from 'react-native';

export  default class  TestAnimated extends Component{
	constructor(props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0)
		};
	}

	componentDidMount(){
		Animated.timing(          // Uses easing functions
			this.state.fadeAnim,    // The value to drive
			{toValue: 1},           // Configuration
			
		).start();
	}

	render(){
		return (
			<View style = {{flex: 1}}>

			</View>
		)
	}
}