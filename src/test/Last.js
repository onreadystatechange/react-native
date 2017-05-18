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
} from 'react-native';


export default class Last extends Component {

	constructor(props){
		super(props)
		this.state={
			selectedTab:'消息',
		}
	}


	render() {
		return (
			<View style={styles.container} >
				<Text style = {styles.welcome}>
					消息
				</Text>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'yellow'
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