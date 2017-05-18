/**
 * Created by yoyo on 16/5/5.
 */
import React,{
   Component,
   View,
    Text,
   TouchableOpacity
} from 'react-native'

export  default class  TestNick extends  Component{
	_onPress(e){
		//e.target  number???
	}
	render(){
		return (
			<TouchableOpacity onPress={this._onPress}>
				<View  style={{marginTop:100,height:300,width:300,backgroundColor:'red'}}>
				</View>
				<View style={{height:100,width:100,backgroundColor:'blue'}}>
				</View>
			</TouchableOpacity>

		)
	}
}