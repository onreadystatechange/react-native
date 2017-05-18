/**
 * Created by yoyo on 2017/5/3.
 */
import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Image,
	ListView
} from 'react-native';

export default class HomeController extends React.Component{
	constructor(props){
		super(props)

	}
	render() {
		return (
			<View style={{marginTop: 64}}>
				<Text>这个第一页，点击跳转第二页</Text>
			</View>
		);
	}
}
