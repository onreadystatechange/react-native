/**
 * Created by yoyo on 2017/5/3.
 */

import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
	TouchableHighlight,
} from 'react-native';


export default class Second extends Component {

	constructor(props){
		super(props)
		this.state={
			selectedTab:'我的',
		}
	}

	
	render() {
		return (
			<View style={styles.container} >
				<TouchableOpacity onPress={()=>this.props.onPressButton()}>
					<Text>退出登录</Text>
				</TouchableOpacity>
			</View>
		);
	}
}


let styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'pink'
	},
	welcome: {
		color: "white",
		fontSize: 13
	},
	selectedTabText: {
		color: "#999999",
		fontSize: 13
	},
	icon: {
		width: 20,
		height: 20
	}
});