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
export default class Input extends Component {

	constructor(props){
		super(props)
		this.state={
			account:'',
			password:'',
			num:60,
			show:true
		}
	}

	
	
	
	show(){ //显示获取密码还是显示倒计时
		if(this.props.show){
			return(
				<Text style = {styles.getMa} onPress = {()=>this.props.getMa()}>
					获取验证码
				</Text>
			)
		}else{
			return(
				<Text style = {styles.getMa}>
					{this.props.num}
				</Text>
			)
		}
	}
	render() {
		return (
			<View style={styles.container} >
				<View style = {styles.account}>
					<Image style={styles.login}source={require('../src/images/acc.png')}   />
					<TextInput
						style = {styles.accountInput}
						value = {this.props.account}
						placeholder='手机号码'
						maxLength={11}
					    onChangeText = {(e)=>this.props.getAccount(e)}>

					</TextInput>
				</View>
				<View style = {styles.pass} >
					<Image source={require('../src/images/pass.png')} style = {styles.login} />
					<TextInput
						style = {styles.passInput}
						value = {this.props.password}
						placeholder='验证码'
						maxLength={4}
						onChangeText = {(e)=>this.props.getPassword(e)}>

					</TextInput>

					{this.show()}
				</View>
				<View style = {styles.passLoginBox}>
						<Text style = {styles.passLogin} onPress = {()=> alert('密码登录暂无页面')}>
										密码登录
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
		height:CSS.pixel(322),

	},
	account:{
		flex:1,
		width:CSS.width(),
		height:CSS.pixel(120),
		flexDirection:'row',
	},
	accountInput:{
		width:CSS.width()-CSS.pixel(126),
		// marginLeft:CSS.pixel(126),
		// marginBottom:CSS.pixel(31),
		position:'absolute',
		left:CSS.pixel(126),
		bottom:CSS.pixel(31),
		height:CSS.pixel(30),
		fontSize:CSS.pixel(28),
		color:'#c6c6c6',

	},
	pass:{
		flex:1,
		width:CSS.width(),
		height:CSS.pixel(120),
		borderColor:'#c6c6c6',
		borderTopWidth:CSS.pixel(1),
		borderBottomWidth:CSS.pixel(1),
		flexDirection:'row',
	},
	passInput:{
		width:CSS.pixel(430),
		// marginLeft:CSS.pixel(126),
		// marginBottom:CSS.pixel(31),
		position:'absolute',
		left:CSS.pixel(126),
		bottom:CSS.pixel(31),
		height:CSS.pixel(30),
		fontSize:CSS.pixel(28),
		color:'#c6c6c6',
	},
	getMa:{
		width:CSS.pixel(145),
		height:CSS.pixel(28),
		position:'absolute',
		left:CSS.pixel(556),
		bottom:CSS.pixel(27),
		fontSize:CSS.pixel(28),
		color:'#ff5a4e',
		justifyContent:'center',
		textAlign:'center',


	},
	login:{
		width:CSS.pixel(38),
		height:CSS.pixel(44),
		position:'absolute',
		left:CSS.pixel(54),
		bottom:CSS.pixel(27),


	},
	passLoginBox:{
		width:CSS.width(),
		height:CSS.pixel(80),
		justifyContent:'center',
	},
	passLogin:{
		width:CSS.pixel(99),
		height:CSS.pixel(24),
		fontSize:CSS.pixel(24),
		position:'absolute',
		right:CSS.pixel(54),
		color:'#000000',

	}

});