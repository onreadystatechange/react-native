/**
 * Created by yoyo on 2017/5/3.
 */
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

export default class First extends Component {

	constructor(props){
		super(props)
		this.state={
			selectedTab:'首页',
		}
	}


	render() {
		return (
			<View style={styles.container} >
					<Text style = {styles.welcome}>
						这是第一页，
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
		backgroundColor:'red'
	},
	welcome: {
		color: "white",
		fontSize: 13,

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