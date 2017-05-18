/**
 * Created by yoyo on 16/7/19.
 */
import React,{Component} from 'react'
import Swiper from 'react-native-swiper'
import {
  TouchableOpacity,Text,StyleSheet,View,Alert,WebView
} from 'react-native'
import {CSS} from '../view/CSS/CSS'
import {mixed} from '../lib/tools'
import GFWebView from '../view/Custom/GFWebView'
export  default class  TestSwiper extends Component{
	constructor(props){
		super(props)
		this.state={
			uri:''
		}
	}
	_onPress(uri){
		this.props.navigator.push({name:'GFWebView',component:GFWebView,uri:uri,title:'ddd'})
	}
	render(){
		return <View style={{flex:1}}>
			<Swiper height={100} autoplay={true} paginationStyle={styles.paginationStyle}>
				<TouchableOpacity onPress={this._onPress.bind(this,"https://www.baidu.com")} style={[{backgroundColor:'red'},styles.slide]}>
					<Text>https://www.baidu.com</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this._onPress.bind(this,"http://cn.bing.com")} style={[{backgroundColor:'pink'},styles.slide]}>
					<Text>http://cn.bing.com</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this._onPress.bind(this,"http://www.apple.com")} style={[{backgroundColor:'yellow'},styles.slide]}>
					<Text>https://www.apple.com/cn</Text>
				</TouchableOpacity>
			</Swiper>
		</View>
	}
}
const styles=StyleSheet.create({
	slide:mixed({
	  	flex:1
	},CSS.fd(),CSS.itemCenter()),
	paginationStyle:mixed({
		//backgroundColor:'#ffffff',
		paddingRight:CSS.pixel(25),
		position:'absolute',
		bottom:0
	},CSS.fd(),CSS.hAlign('flex-end'))
})