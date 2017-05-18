
import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import First from '../src/test/First'
import Second from '../src/test/Second'
import Last from '../src/test/Last'
import Launcher from '../src/launcher'
import {CSS} from '../src/view/CSS/CSS'
import Input from './Input'
import Btn from './Btn'
export default class Index extends Component {

	constructor(props){
		super(props)
		this.state={
			account:'',
			password:'',
			num:60,
			show:true
		}
		this.loginInfo = {
			"token":"cpbxy2mk33f8e2jp3c66",
			"loginType": "1",
			"userNumber": '',
			"code":'',
			"deviceID": "23156456",
			"os": "android",
			"version": "1.0.0",
			"language": "CN",
			"channel":"sss",
			"deviceNO": "no5454"
		}
	}
	componentWillMount(){

	}
	getAccount(e){
		if(isNaN(e)){
			console.log('只能输入数字')
		}else{

			this.setState({account:e})
			this.loginInfo.userNumber=e;
		}
	}
	getPassword(e){
		if(isNaN(e)){
			console.log('验证码只能是数字')
		}else{
			this.setState({password:e})
			this.loginInfo.code=e;

		}
	}
	getMa(){
		if(!(/^1[34578]\d{9}$/.test(this.state.account))){ //判断输入的手机号是否正确
			alert('输入的手机号不正确')
			this.setState({account:''})
		}else {   //如果正确，发送ajax获得请求,获得验证码,并显示倒计时
			console.log(this.loginInfo)
			fetch('http://192.168.0.109:9081/travel-domain/user/sendVerifyCode', {
				method: 'POST',
				mode: 'cors',
				headers: {

					'token':'kzaz33iucv4aix7j2nva',

					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					businessType:1,
					userNumber:this.state.account
				})

			}).then(()=>this.countDown())
		}
	}
	countDown(){
		this.setState({show:false})
		this.timer=setInterval(() => {
			let num = this.state.num
			if(num>0) {
				num = num - 1
				this.setState( { num : num } )

			}else{
				this.timer && clearInterval(this.timer)
				this.setState({show:true})
				this.setState({num:60})
			}
		},1000)

	}
	login(){
		fetch('http://192.168.0.109:9081/travel-domain/user/login', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'token':'kzaz33iucv4aix7j2nva',
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( this.loginInfo)
		}).then((response)=>{

			if(response.ok){
				response.json().then( (json) =>{
					console.log(json.message)
					if(json.result==1||json.result==0){
						const { navigator} = this.props;

						if (navigator) {
							navigator.push({
								name:'Launcher',
								component:Launcher,
							})
						}
					}

				})
			}else{
				alert('提示');
			}
		})
	}
	changeNav(){
		const { navigator} = this.props;
		if (navigator) {
			navigator.push({
				name:'Launcher',
				component:Launcher,
			})
		}

	}
	render() {
		return (
			<View style={styles.container} >
				<View style = {styles.top}>
					<Image source={require('../src/images/logo.png')} />
				</View>

				<Input getAccount={(e)=>this.getAccount(e)}
				       getPassword={(e)=>this.getPassword(e)}
				       getMa={()=>this.getMa()}
				       account={this.state.account}
				       password={this.state.password}
				       num={this.state.num}
				       show={this.state.show}
				/>


				<Btn
					login={()=>this.login()}
				/>
			</View>
		);
	}
}

let styles = StyleSheet.create({
	container: {
		width:CSS.width(),
		height:CSS.height(),
	},

	top:{
		width:CSS.width(),
		height:CSS.pixel(736),

	}
});
