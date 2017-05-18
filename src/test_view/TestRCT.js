/**
 * Created by yoyo on 16/5/12.
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	ListView,StyleSheet,NativeModules,Image,Alert,TouchableWithoutFeedback,Animated,Easing
} from 'react-native'
var GxKit =NativeModules.GxKit
import RCTDeviceEventEmitter from "RCTDeviceEventEmitter";

import {CSS} from '../view/CSS/CSS'
import {Res_system} from '../lib/ResManger'
import {mixed} from '../lib/tools'
import Camera from 'react-native-camera-growface';
import Emitter from "../model/Emitter";
 /*class  TestRCT2 extends Component{

	constructor ( props ) {
		super( props );
		this.state={
			res:'fire'
		}
	}
	componentDidMount(){
		RCTDeviceEventEmitter.addListener('$native_msg$',function ( msg ) {
			console.log("系统消息",msg);
		})
		RCTDeviceEventEmitter.addListener('$receive_pay_load$',function ( msg ) {
			Alert.alert("收到来自推送的消息");
			console.log("收到来自推送的消息",msg);
		})
	}
	fixed(){
		GxKit.testPlay();
	}
	render(){
		return (GFVideoRecorder)
	}
}*/
export  default class TestRCT extends Component {
	constructor(props){
		super(props)
		this.state={
			capture_recording:false,
			d_long:new Animated.Value(CSS.width())
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<Camera ref={(cam) => {this.camera = cam;}}
					style={styles.preview}
					captureMode={Camera.constants.CaptureMode.video}
					aspect={Camera.constants.Aspect.fill}>
				</Camera>
				<View style={styles.toolsBar}>
					<View style={[{flex:1},CSS.fd(),CSS.itemCenter()]}>
						<TouchableWithoutFeedback onPress={this.takePicture.bind(this)}>
							<View style={[styles.capture]} >
								<View style={[{flex:1},CSS.fd(),CSS.itemCenter()]}>
									<View style={[styles.capture_circle,((this.state.capture_recording)?{width:20,height:20}:{borderRadius:25})]}></View>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
					<View style={styles.deadLineContainer}>
						{
							this.state.capture_recording?<Animated.View style={[styles.deadLine,{width:this.state.d_long}]}>
							</Animated.View>:null
						}

					</View>

				</View>
				<View style={[styles.navBar]}>
					<View style={[{flex:1,paddingTop:CSS.pixel(25)},CSS.fd(),CSS.vAlign('center')]}>
						<View style={{width:CSS.pixel(100)}}>
							<Image source={Res_system.barBack} style={{marginLeft:CSS.pixel(20),width:CSS.pixel(25),height:CSS.pixel(51)}}></Image>
						</View>
						<View style={[{flex:1},CSS.itemCenter()]}>
							<Text style={{color:"#ffffff",fontSize:CSS.pixel(30)}}>拍摄视频{this.state.timer}</Text>
						</View>
						<View style={{width:CSS.pixel(100)}}>
						</View>
					</View>

				</View>
			</View>
		);
	}
    stop(){

    }
	takePicture() {
		let self=this;
		if(this.state.capture_recording){
			this.camera.stopCapture()
		}else{
			Animated.timing( this.state.d_long , {
				toValue : 0 , duration : 6000, easing : Easing.linear
			} ).start(function (  ) {
				self.setState({capture_recording:false,d_long:new Animated.Value(CSS.width())});
				if(self.state.capture_recording){
					if(self.camera){
						self.camera.stopCapture();
					}
				}
			})
			this.camera.capture()
				.then((data) => {
					Emitter("video_comp",data.path);
					if(self.navigator){
						self.navigator.pop();
					}
				})
				.catch(err => console.error(err));
		}
		this.setState({capture_recording:!this.state.capture_recording})
		return false;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	navBar:{
		height:80,
		width:CSS.width(),
		backgroundColor:'rgba(0,0,0,0.9)',
		position:'absolute',
		top:0,
		left:0
	},
	toolsBar:mixed({
		position:'absolute',
		left:0,
		bottom:0,
		height:100,
		width:CSS.width(),
		backgroundColor:'rgba(0,0,0,0.7)'
	}),
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: CSS.height(),
		width: CSS.width()
	},
	capture_circle:mixed({
		height:50,
		width:50,
		backgroundColor:'red'
	}),
	capture:mixed({
		height:70,
		width:70,
		borderStyle:'solid',borderColor:'#ffffff'
	},CSS.radius(35),{borderWidth:5}),
	deadLineContainer:mixed({
		position:'absolute',
		top:0,
		left:0,
		height:CSS.pixel(2),
		width:CSS.width()
	},CSS.fd(),CSS.hAlign('flex-end')),
	deadLine:{
		height:CSS.pixel(2),
		backgroundColor:"rgb(122,219,66)"
	}

});
