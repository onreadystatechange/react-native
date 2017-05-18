/**
 * Created by yoyo on 2017/5/3.
 */
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
	TextInput,

} from 'react-native';
import {CSS} from '../src/view/CSS/CSS'
export default class Btn extends Component {

	constructor(props){
		super(props)
		this.state={

		}
	}
// {
// 	"token":"hhdfnhshjqtyhqswx3bp",
// 	"loginType": "1",
// 	"userNumber": "15209286951",
// 	"code": "8127",
// 	"deviceID": "23156456",
// 	"os": "android",
// 	"version": "1.0.0",
// 	"language": "CN",
// 	"channel":"sss",
// 	"deviceNO": "no5454"
// }
	render() {
		return (
			<View style={styles.container} >
				<View style = {styles.top}>
				<TouchableOpacity onPress={()=>this.props.login()}>
					<Image source={require('./images/go.png')} style = {styles.button} />
				</TouchableOpacity>
				</View>
				<View style = {styles.bottom}>
				<Text style = {styles.wai}>
					点击进入，即表示同意

						<Text style = {styles.nei} onPress = {()=>alert('用户协议')}>
							用户协议
						</Text>

				</Text>
				</View>
			</View>
		);
	}
}
// secureTextEntry
let styles = StyleSheet.create({
	container: {
		width:CSS.width(),
		position:'absolute',
		bottom:0,

	},
	top:{
		width:CSS.width(),
		height:CSS.pixel(120),
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
	},
	bottom:{
		width:CSS.width(),
		height:CSS.pixel(116),
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		
	},
	button:{
		width:CSS.pixel(643),
		height:CSS.pixel(121),
	},
	wai:{
		fontSize:CSS.pixel(20),
		color:'#666666',
		width:CSS.pixel(300),
		height:CSS.pixel(20),
	},
	nei:{
		fontSize:CSS.pixel(20),
		color:'#000000',
		width:CSS.pixel(100),
		height:CSS.pixel(20),
		textDecorationLine:'underline',
	}

});