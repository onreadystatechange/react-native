/**
 * Created by yoyo on 16/5/4.
 */
/**
 * Created by yoyo on 16/4/23.
 */
/**
 * Created by yoyo on 16/4/7.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {View , Text , Image , Animated , PanResponder, StyleSheet} from 'react-native'
function yes () { return true }
export  default class GesView extends Component {
	constructor(props){
		super(props);
		this.state= {
			res : 'loading' ,
			r : 0
		}
	}
	componentWillMount(){
		var self=this;
		this._panResponder = PanResponder.create( {
			onStartShouldSetPanResponder: yes,
			onStartShouldSetPanResponderCapture: yes,
			onMoveShouldSetPanResponder: yes,
			onMoveShouldSetPanResponderCapture: yes,
			onPanResponderGrant: (evt) => {},
			onPanResponderMove: (evt, gestureState) => {
				//console.warn('b')
				if(!evt.nativeEvent.touches){
					return false
				}
				console.warn(evt.nativeEvent.touches.length)
				console.log('touchs',evt.nativeEvent.touches);
			},
			onPanResponderTerminationRequest: yes,
			onPanResponderRelease: (evt) => {},
			onPanResponderTerminate: yes,
			onShouldBlockNativeResponder: yes
		} );
	}
	render(){
		return (
			<View  style={{flex:1,backgroundColor:'yellow'}} {...this._panResponder.panHandlers}>

			</View>
		)
	}
}
