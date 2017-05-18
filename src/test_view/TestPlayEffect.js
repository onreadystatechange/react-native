/**
 * Created by yoyo on 16/8/9.
 */
import React, { Component } from 'react';
import {
	View,
	Image,
	ScrollView,Text,
	TouchableOpacity,TouchableWithoutFeedback,
	Alert,
    StyleSheet,Animated,Easing
} from 'react-native';

import {CSS} from '../view/CSS/CSS'
import {mixed} from '../lib/tools'

class GFPlayEffect extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return <Animated.View style={[{transform:[{rotate:`${this.props.deg||-45}deg`}]},{borderRadius:this.props.radius,backgroundColor:this.props.sectorColor||"red"}]}>
			<View style={{position:'absolute',height:this.props.radius*2,width:this.props.radius*2}}>
				{
					this.props.children
				}
			</View>
			<Animated.View style={{position:'absolute',left:0,top:0,transform:[{rotate:'-90deg'}]}}>
				<View style={[{backgroundColor:this.props.bgColor||"blue",width:this.props.radius*2,height:this.props.radius,borderTopLeftRadius:this.props.radius,borderTopRightRadius:this.props.radius}]}>
				</View>
				<View style={{width:this.props.radius*2,borderBottomLeftRadius:this.props.radius,borderBottomRightRadius:this.props.radius,height:this.props.radius}}>
				</View>
			</Animated.View>
			<View>
				<View style={[{backgroundColor:this.props.bgColor||"blue",width:this.props.radius*2,height:this.props.radius,borderTopLeftRadius:this.props.radius,borderTopRightRadius:this.props.radius}]}>
				</View>
				<View style={{width:this.props.radius*2,borderBottomLeftRadius:this.props.radius,borderBottomRightRadius:this.props.radius,height:this.props.radius}}>
				</View>
			</View>
		</Animated.View>
	}
}
export  default class  TestPlayEffect extends  Component{
	constructor(props){
      super(props)
	}
	componentDidMount(){

	}
	render(){
		return <View style={{flex:1,flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
					<GFPlayEffect bgColor={"gray"} sectorColor={"gray"} radius={50}>
						
					</GFPlayEffect>
		  </View>
	}
}
const styles=StyleSheet.create({
	circle:mixed()
})