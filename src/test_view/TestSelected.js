/**
 * Created by yoyo on 16/6/14.
 */


import React,{Component} from 'react'

import {View,TouchableOpacity,Text} from 'react-native'

export  default class  TestSelected extends  Component{
	constructor(props){
		super(props)
		this.state={
			selectedIndex:0
		}
	}
	_onPress(index){
		return ()=>{
			this.setState({selectedIndex:index})
		}
	}
	_render(index){
		if(0==index){
			return <Text>0</Text>
		}
		if(1==index){
			return <Text>1</Text>
		}
		if(2==index){
			return <Text>2</Text>
		}
	}
	render(){
		let self=this;
		return (
			<View>
				<View style={{flexDirection:'row'}}>
					{
						["button1","button2","button3"].map((title,index)=>{
							return <TouchableOpacity key={index} onPress={self._onPress(index).bind(self)}>
								<Text style={[{marginTop:80,marginLeft:20},self.state.selectedIndex==index?{color:'red'}:null]}>{title}</Text>
							</TouchableOpacity>
						})
					}
				</View>
				<View style={{marginTop:30}}>
					{
						this._render(this.state.index)
					}
				</View>
			</View>

		)
	}

}